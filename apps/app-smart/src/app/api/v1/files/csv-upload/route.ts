import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'lib/axios';
import csvParser from 'csv-parser';
import fs from 'fs';
import { Item } from 'types/data-types';
import { inventoryItemStatusOptions } from 'lib/list-options';
import { CRETE_PRODUCTS_MUTATION } from '../../products/create/utils';

const handler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  console.log('CSV uploader triggered'); // from = body.form

  const products: Item[] = [];
  let uploadedItems = 0;
  let errors = null;
  const form = await req.formData();
  const file = form.get('file');

  if (
    !file ||
    !(file instanceof File) ||
    !file.name.endsWith('.csv') ||
    file.size === 0 ||
    file.size > 1024 * 1024 * 5 // 5MB
  ) {
    console.error('❌ Invalid file uploaded!');
    throw new Error('Invalid file uploaded!');
  }

  const filePath = `/tmp/${file.name}`;
  const fileStream = file.stream();
  const nodeStream = readStream(fileStream);

  const writeStream = fs.createWriteStream(filePath);
  nodeStream.pipeTo(
    new WritableStream({
      write(chunk) {
        writeStream.write(Buffer.from(chunk));
      },
      close() {
        writeStream.end();
      },
    })
  );

  await new Promise((resolve, reject) => {
    writeStream.on('finish', async () => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          products.push(row);
        })
        .on('end', async () => {
          const { data, errors: errorMsgs } = await addProductList(
            products,
            context?.user?.id
          );
          uploadedItems = data?.length || 0;
          errors = errorMsgs;
          console.log('Uploaded items:', data, uploadedItems);
          resolve(data);
        });
    });

    writeStream.on('error', (err) => {
      console.error('Error reading file:', err);
      reject(err);
      throw new Error('Error writing file');
    });
  });

  return Response.json({
    message: `Successfully uploaded ${uploadedItems} items`,
    data: errors ? [] : products,
    errors,
  });
};

export const POST = composeMiddleware([sessionAuth, handler]);

function readStream(fileStream: ReadableStream) {
  /**
   * @description Convert a Node.js ReadableStream to a Web Streams ReadableStream
   * @param {ReadableStream} fileStream - Node.js ReadableStream
   * @date 2025-02-28
   * @author Ed Ancerys
   */
  const nodeStream = new ReadableStream({
    start(controller) {
      const reader = fileStream.getReader();
      function push() {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          push();
        });
      }
      push();
    },
  });

  return nodeStream;
}

async function addProductList(products: (Item | any)[], userId: string) {
  if (products.length === 0 || !userId) {
    throw new Error('No products or user ID provided');
  }

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: CRETE_PRODUCTS_MUTATION,
    variables: {
      data: products?.map((product) => {
        console.log('Product:', product);

        if (!product['Name']) {
          throw new Error('Product name is required');
        }

        const blob: { sku?: string | null; [key: string]: any } = {
          name: product['Name'],
          description: product['Description'],
          category: product['Category'],
          quantity: validNumber(product['Quantity']),
          price: validNumber(product['Price']),
          status: inventoryItemStatusOptions?.includes(product['Status'])
            ? product['Status']
            : 'ACTIVE',
          reorderLevel: validNumber(product['Reorder Level']),
          unit: product['Unit'],
          supplier: product['Supplier'],
          leadTime: validNumber(product['Lead Time']),
          users: {
            connect: {
              id: userId,
            },
          },
          // Conditionally add properties if they pass the validStringValue check
          ...(validStringValue(product['SKU']) ? { sku: product['SKU'] } : {}),
          ...(validStringValue(product['Barcode'])
            ? { barcode: product['Barcode'] }
            : {}),
        };

        return blob;
      }),
    },
  });
  const errors = data?.errors?.map((err: Error) => err.message).join(', ');
  const createProducts =
    data?.data?.createProducts?.filter((p: any) => p) || []; // Remove null items
  console.log('CREATE PROD DATA:', data);

  return { data: createProducts, errors };
}

function validNumber(number: string | number): number {
  const num = Number(number);
  return isNaN(num) ? 0 : num;
}

function validStringValue(str: string): string | null {
  return typeof str === 'string' && str.trim() !== '' ? str.trim() : null;
}
