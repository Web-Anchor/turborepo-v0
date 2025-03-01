'use client';

import { useGetItems } from 'hooks/items';
import { PageTitle, Paragraph } from '@repo/ui/documents';
import { Button } from '@repo/ui/buttons';
import Link from 'components/Wrappers/Link';
import ItemTable from '@repo/ui/tables';
import { useRef } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

export default function Page() {
  const { data, mutate } = useGetItems({});
  const csvRef = useRef<HTMLInputElement>(null);

  async function csvUpload() {
    try {
      if (!csvRef?.current?.files) {
        throw new Error('No file selected');
      }
      const file = csvRef.current.files[0];
      const form = new FormData();
      form.append('file', file);

      const { data } = await axios.post('/api/v1/files/csv-upload', form);
      mutate();
      toast.success(data?.message || 'CSV uploaded successfully');
    } catch (error) {
      toast.error((error as Error).message || 'Error uploading CSV');
    } finally {
      if (csvRef.current) {
        csvRef.current.value = '';
      }
    }
  }

  function sample() {
    // csv sample file with headers
    const headers = () => [
      'Name',
      'Description',
      'Category',
      'Quantity',
      'Price',
      'Status',
      'Reorder Level',
      'Updated At',
      'Action',
    ];

    // sample data
    const data = [
      {
        name: 'Sample Product 1 (Required)',
        description: 'Sample Product 1 Description (Optional)',
        category: 'Sample Product 1 Category (Optional)',
        quantity:
          'Sample Product 1 Quantity (Required) - Enter a numeric value representing the stock quantity.',
        price:
          'Sample Product 1 Price (Required) - Enter the price in USD, e.g., 19.99.',
        status:
          'Sample Product 1 Status (Required) - Valid options: ACTIVE, INACTIVE, DAMAGED, DISCONTINUED.',
        reorderLevel:
          'Sample Product 1 Reorder Level (Optional) - Enter the stock level at which reordering is triggered.',
        unit: "Sample Product 1 Unit (Optional) - Specify the unit of measurement, e.g., 'kg', 'liters'.",
        sku: 'Sample Product 1 SKU (Optional) - Stock Keeping Unit, a unique identifier for the product.',
        barcode:
          "Sample Product 1 Barcode (Optional) - Enter the product's barcode number.",
        supplier:
          'Sample Product 1 Supplier (Optional) - Name of the supplier or vendor.',
        leadTime:
          'Sample Product 1 Lead Time (Optional) - Time (in days) it takes to restock the product.',
      },
      // Add more product objects as needed
    ];

    // download sample csv
    const csvContent = [headers().join(',')]
      .concat(
        data.map((item) => {
          const row = Object.values(item).map((value) =>
            value.toString().replace(',', ' ')
          );
          return row.join(',');
        })
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory_list.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('CSV downloaded successfully');
  }

  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center justify-between gap-4">
        <PageTitle text="Inventory Lists" />
        <section className="flex gap-4">
          <Button variant="primary" onClick={sample}>
            CSV Sample
          </Button>
          <Button variant="primary" onClick={() => csvRef.current?.click()}>
            CSV Uploads
          </Button>
          <Button
            variant="primary"
            href="/dashboard/products/create"
            LinkComponent={Link}
          >
            Create Product
          </Button>
        </section>
      </section>
      <Paragraph text="Id ex dolor nostrud amet qui officia reprehenderit nulla sint nulla incididunt labore." />
      {/* hidden input for csv from uploads */}
      <input type="file" className="hidden" ref={csvRef} onChange={csvUpload} />

      <ItemTable
        headers={headers()}
        items={data?.map((item) => ({
          name: item.name,
          description: item.description,
          category: item.category,
          quantity: item.quantity,
          price: item.price,
          status: item.status,
          reorderLevel: item.reorderLevel,
          updatedAt: item.updatedAt,
          action: (
            <Button
              LinkComponent={Link}
              href={`/dashboard/products/${item.id}`}
              variant="link"
            >
              Edit
            </Button>
          ),
        }))}
      />

      <Paragraph>
        Tempor sit aliqua qui ipsum nisi commodo et adipisicing mollit
        reprehenderit sint cillum eiusmod. Nostrud ea sunt qui officia officia
        magna qui laborum. Culpa velit exercitation velit do incididunt velit
        sit nostrud nostrud ea cillum commodo et ad. Aliqua enim id nulla
        laboris Lorem laboris commodo ut cupidatat. Ad dolore eu excepteur
        proident sunt est cupidatat irure amet id consequat exercitation
        consectetur. Anim ea pariatur dolor nisi veniam. Consequat et dolore
        fugiat reprehenderit officia sint aliquip qui laborum. Ullamco enim
        aliqua nulla in dolore officia ut laboris eiusmod in. Exercitation
        voluptate sit non ullamco excepteur ex.
      </Paragraph>
    </div>
  );
}

function headers() {
  const defaultHeaders = [
    { name: 'Name', className: '' },
    { name: 'Category', className: 'hidden sm:table-cell' },
    { name: 'Quantity', className: '' },
    { name: 'Price', className: '' },
    { name: 'Status', className: 'hidden sm:table-cell' },
    { name: 'Reorder level', className: 'hidden sm:table-cell' },
    { name: 'Last Updated', className: 'hidden lg:table-cell' },
    { name: 'Actions', className: '' },
  ];

  return defaultHeaders;
}
