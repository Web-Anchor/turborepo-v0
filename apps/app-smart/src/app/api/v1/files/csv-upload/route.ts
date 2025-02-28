import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'axios';
import csvParser from 'csv-parser';
import fs from 'fs';
import { Item } from 'types/data-types';
import { inventoryItemStatusOptions } from 'lib/list-options';

const MUTATION = `
  mutation CreateItems($data: [ItemCreateInput!]!) {
    createItems(data: $data) {
      id
    }
  }
`;

const handler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  console.log('CSV uploader triggered'); // from = body.form

  const products: Item[] = [];
  let uploadedItems = 0;
  const form = await req.formData();
  const file = form.get('file');

  if (
    !file ||
    !(file instanceof File) ||
    !file.name.endsWith('.csv') ||
    file.size === 0 ||
    file.size > 1024 * 1024 * 5 // 5MB
  ) {
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
          const { data } = await addProductList(products, context?.user?.id);
          uploadedItems = data?.length || 0;
          console.log('Uploaded items:', data, uploadedItems);
          resolve(data);
        });
    });

    writeStream.on('error', (err) => {
      console.error('Error writing file:', err);
      reject(err);
      throw new Error('Error writing file');
    });
  });

  return Response.json({
    message: `Successfully uploaded ${uploadedItems} items`,
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

export async function addProductList(products: (Item | any)[], userId: string) {
  if (products.length === 0 || !userId) {
    throw new Error('No products or user ID provided');
  }

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION,
    variables: {
      data: products?.map((product) => {
        if (!product['Name']) {
          throw new Error('Product name is required');
        }

        return {
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
          sku: product['SKU'],
          barcode: product['Barcode'],
          supplier: product['Supplier'],
          leadTime: validNumber(product['Lead Time']),
          users: {
            connect: {
              id: userId,
            },
          },
        };
      }),
    },
  });

  return { data: data?.data?.createItems };
}

function validNumber(number: string | number): number {
  const num = Number(number);
  return isNaN(num) ? 0 : num;
}
