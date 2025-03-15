'use client';

import { useGetProducts } from 'hooks/products';
import { Paragraph } from '@repo/ui/documents';
import { Button } from '@repo/ui/buttons';
import Link from 'components/Wrappers/Link';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import axios from 'lib/axios';
import { downloadCSV } from 'lib/utils';
import { Product } from 'types/data-types';
import { ActivityCard } from '@repo/ui/cards/ActivityCard';
import { Warning } from '@phosphor-icons/react';
import { classNames, dateToFormattedString } from '@repo/ui/utils.ts';
import { PageWrapper } from '@repo/ui/semantic';
import { HeaderTabs } from '@repo/ui/headings/headings';
import { usePathname } from 'next/navigation';
import { Drawer } from '@repo/ui/drawers/drawer';
import { GenericTable } from '@repo/ui/tables/GenericTable';

type ComponentState = {
  drawer?: boolean;
};

export default function Page() {
  const path = usePathname();
  const [state, setState] = useState<ComponentState>({});
  const { data, mutate } = useGetProducts({});
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
      console.log('res data', data);

      mutate();
      toast.success(data?.message || 'CSV uploaded successfully');
      if (data?.errors) {
        toast.error(data?.errors);
      }
    } catch (error) {
      toast.error((error as Error).message || 'Error uploading CSV');
    } finally {
      if (csvRef.current) {
        csvRef.current.value = '';
      }
    }
  }

  async function downloadAsCsv() {
    try {
      const { data } = await axios.post('/api/v1/products/all-products', {});
      const items: Product[] = data?.data;
      const csvData = items.map((item) => ({
        name: item.name,
        description: item.description,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        status: item.status,
        reorderLevel: item.reorderLevel,
        unit: item.unit,
        sku: item.sku,
        barcode: item.barcode,
        supplier: item.supplier,
        leadTime: item.leadTime,
      }));
      downloadCSV({
        headers: csvHeaders(),
        data: csvData,
        filename: `items-${new Date().toISOString()}.csv`,
      });
      toast.success(`Downloaded ${data.total} items as CSV`);
    } catch (error) {
      toast.error((error as Error).message || 'Error downloading CSV');
    }
  }

  function sample() {
    /**
     * @description Sample CSV data for products
     * @date 2025-03-01
     * @author Ed Ancerys
     */

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

    downloadCSV({ headers: csvHeaders(), data, filename: 'sample.csv' });
  }

  return (
    <PageWrapper>
      <Drawer
        open={state.drawer}
        onClose={() => setState((s) => ({ ...s, drawer: false }))}
      />
      <HeaderTabs
        LinkComponent={Link}
        title="Product Lists"
        description={[
          'Ad dolore ea cupidatat labore elit dolor aute.',
          'Proident anim irure pariatur enim excepteur ea. Ut culpa sit laboris culpa magna officia anim mollit cupidatat veniam. Ad ad non sint ullamco.',
        ]}
        headings={[
          {
            name: 'All',
            active: path === '/dashboard/products',
            href: '/dashboard/products',
          },
          {
            action: (
              <Button
                variant="link"
                onClick={() => setState((s) => ({ ...s, drawer: true }))}
                className={classNames(
                  'border-transparent text-gray-200 hover:text-indigo-300'
                )}
              >
                Create
              </Button>
            ),
          },
        ]}
        actions={
          <div className="flex gap-4">
            <Button variant="primary" onClick={sample}>
              CSV Sample
            </Button>
            <Button variant="primary" onClick={() => csvRef.current?.click()}>
              CSV Uploads
            </Button>
            <Button variant="primary" onClick={downloadAsCsv}>
              Download as CSV
            </Button>
          </div>
        }
      />

      {/* hidden input for csv from uploads */}
      <input type="file" className="hidden" ref={csvRef} onChange={csvUpload} />

      <ActivityCard
        activities={data
          ?.filter((item) => isLowOnStock(item.quantity, item.reorderLevel))
          ?.map((item) => ({
            message: `${item.name} is low on stock`,
            description: `Only ${item.quantity} left in stock`,
            updatedAt: dateToFormattedString(item.updatedAt),
            type: 'Products',
            status: 'Low Stock',
          }))}
        title="Low Stock Alerts"
        icon={<Warning className="text-red-500" size={24} />}
        hidden={
          !data ||
          data?.filter((item) => isLowOnStock(item.quantity, item.reorderLevel))
            .length === 0
        }
        LinkComponent={Link}
      />

      <GenericTable
        headers={[
          { name: 'Name' },
          { name: 'SKU' },
          { name: 'Category' },
          { name: 'Quantity' },
          { name: 'Cost' },
          { name: 'Price' },
          { name: 'Status' },
          { name: 'Updated At' },
          { name: '', className: classNames('flex items-center justify-end') },
        ]}
        data={data?.map((item) => ({
          name: item.name,
          sku: item.sku,
          category: item.category,
          quantity: item.quantity,
          cost: item.cost,
          price: item.price,
          // status: item.status,
          status: (
            <span
              className={classNames(
                'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20',
                themeStatus(
                  isLowOnStock(item.quantity, item.reorderLevel)
                    ? 'INACTIVE'
                    : 'ACTIVE'
                )
              )}
            >
              {isLowOnStock(item.quantity, item.reorderLevel)
                ? 'Low Stock'
                : 'Good Levels'}
            </span>
          ),
          updatedAt: dateToFormattedString(item.updatedAt),
          actions: (
            <Button
              variant="link"
              LinkComponent={Link}
              href={`/dashboard/inventory/${item.id}`}
            >
              View
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
    </PageWrapper>
  );
}

function csvHeaders() {
  const defaults = [
    'Name',
    'Description',
    'Category',
    'Quantity',
    'Price',
    'Status',
    'Reorder Level',
    'Unit',
    'SKU',
    'Barcode',
    'Supplier',
    'Lead Time',
  ];
  return defaults;
}

function isLowOnStock(quantity: number = 0, reorderLevel?: number) {
  try {
    return reorderLevel && quantity <= reorderLevel;
  } catch {
    return false;
  }
}

function themeStatus(status?: string): string {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-800';
    case 'INACTIVE':
      return 'bg-red-100 text-red-800';
    case 'DAMAGED':
      return 'bg-yellow-100 text-yellow-800';
    case 'UNDER_MAINTENANCE':
      return 'bg-blue-100 text-blue-800';
    case 'DISCONTINUED':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
