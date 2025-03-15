'use client';

import { useRef, useState } from 'react';
import { useGetInventories } from 'hooks/inventories';
import { Button } from '@repo/ui/buttons';
import { Drawer } from '@repo/ui/drawers/drawer';
import { GenericTable } from '@repo/ui/tables/GenericTable';
import Link from 'components/Wrappers/Link';
import { classNames, dateToFormattedString } from '@repo/ui/utils.ts';
import { CaretRight, CubeTransparent } from '@phosphor-icons/react';
import { PageWrapper } from '@repo/ui/semantic';
import { HeaderTabs } from '@repo/ui/headings/headings';
import { usePathname } from 'next/navigation';
import { CreateForm } from './CreateForm';
import { downloadCSV, stringCleaner } from 'lib/utils';
import axios from 'axios';
import { toast } from 'sonner';
import { Inventory } from 'types/data-types';

type ComponentState = {
  drawer?: boolean;
};
export default function Page() {
  const path = usePathname();
  const [state, setState] = useState<ComponentState>({});
  const { data, isLoading, mutate } = useGetInventories({ userId: 1 });
  const csvRef = useRef<HTMLInputElement>(null);
  console.log('DATA', data);

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
      const { data } = await axios.post('/api/v1/inventory/all-inventory', {});
      const items: Inventory[] = data?.data;
      const csvData = items.map((item) => ({
        name: item.name,
        description: item.description,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        status: item.status,
        unit: item.unit,
        sku: item.sku,
        location: item.location,
        supplier: item.supplier,
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
      >
        <CreateForm
          onSuccess={() => setState((s) => ({ ...s, drawer: false }))}
        />
      </Drawer>

      {/* hidden input for csv from uploads */}
      <input type="file" className="hidden" ref={csvRef} onChange={csvUpload} />

      <HeaderTabs
        LinkComponent={Link}
        title="Inventory Management"
        description={[
          'Ad dolore ea cupidatat labore elit dolor aute.',
          'Proident anim irure pariatur enim excepteur ea. Ut culpa sit laboris culpa magna officia anim mollit cupidatat veniam. Ad ad non sint ullamco.',
        ]}
        headings={[
          {
            name: 'All',
            active: path === '/dashboard/inventory',
            href: '/dashboard/inventory',
          },
        ]}
        actions={
          <div className="flex sm:flex-row flex-wrap gap-4 mt-auto">
            <Button variant="primary" onClick={sample}>
              CSV Sample
            </Button>
            <Button variant="primary" onClick={() => csvRef.current?.click()}>
              CSV Uploads
            </Button>
            <Button variant="primary" onClick={downloadAsCsv}>
              Download as CSV
            </Button>
            <Button
              onClick={() => setState((s) => ({ ...s, drawer: true }))}
              variant="secondary"
            >
              Add New
            </Button>
          </div>
        }
        actionClassName="bottom-4"
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
                themeStatus(item.status)
              )}
            >
              {stringCleaner(item.status)}
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

      {!isLoading && !data?.length && (
        <div className="max-w-lg">
          <h2 className="text-base font-semibold">Create your first project</h2>
          <p className="mt-1 text-sm">
            Get started by selecting a template or start from an empty project.
          </p>
          <ul
            role="list"
            className="mt-6 divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            <li>
              <div className="group relative flex items-start space-x-3 py-4">
                <div className="shrink-0">
                  <span
                    className={classNames(
                      'bg-orange-500',
                      'inline-flex size-10 items-center justify-center rounded-lg'
                    )}
                  >
                    <CubeTransparent
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <Button
                  LinkComponent={Link}
                  href="/dashboard/inventory/create"
                  variant="link"
                  className="flex flex-1"
                >
                  <section className="flex flex-1">
                    Crete new Inventory Item
                  </section>
                  <div className="shrink-0 self-center mr-auto">
                    <CaretRight
                      className="w-5 h-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                </Button>
              </div>
            </li>
          </ul>
          <div className="mt-6 flex">
            <Button
              LinkComponent={Link}
              href="/dashboard/products/create"
              variant="link"
            >
              <section className="flex flex-1">or add new product</section>
            </Button>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

function themeStatus(status?: string): string {
  switch (status) {
    case 'IN_STOCK':
      return 'bg-green-100 text-green-800';
    case 'SOLD':
      return 'bg-red-100 text-red-800';
    case 'DAMAGED':
      return 'bg-yellow-100 text-yellow-800';
    case 'EXPIRED':
      return 'bg-blue-100 text-blue-800';
    case 'DISCONTINUED':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function csvHeaders() {
  const defaults = [
    'Name',
    'SKU',
    'Category',
    'Quantity',
    'Cost',
    'Price',
    'Status',
    'Unit',
    'SKU',
    'Location',
    'Supplier',
  ];
  return defaults;
}
