'use client';

import { useState } from 'react';
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

type ComponentState = {
  drawer?: boolean;
};
export default function Page() {
  const path = usePathname();
  const [state, setState] = useState<ComponentState>({});
  const { data, isLoading } = useGetInventories({ userId: 1 });
  console.log('DATA', data);

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
          <Button onClick={() => setState((s) => ({ ...s, drawer: true }))}>
            Add New
          </Button>
        }
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
          status: item.status,
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
