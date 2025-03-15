'use client';

import { ActivityCard } from '@repo/ui/cards/ActivityCard';
import { ListPlus } from '@phosphor-icons/react';
import { classNames, dateToFormattedString } from '@repo/ui/utils.ts';
import { Link } from 'components/Wrappers/Link';
import { Header } from '@repo/ui/headings/header';
import { PageWrapper } from '@repo/ui/semantic';
import { HeaderTabs } from '@repo/ui/headings/headings';
import { useSearchParams } from 'next/navigation';
import { Button } from '@repo/ui/buttons';
import { useRef, useState } from 'react';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { Drawer } from '@repo/ui/drawers/drawer';
import { CreateForm } from './CreateForm';
// import { useGetOrders } from 'hooks/orders';

type ComponentState = {
  drawer?: boolean;
  synced?: boolean;
  fetching?: string;
};

export default function Page() {
  const params = useSearchParams();
  const [state, setState] = useState<ComponentState>({});
  // const { data } = useGetOrders({});
  const csvRef = useRef<HTMLInputElement>(null);

  async function csvUpload() {
    try {
      if (!csvRef?.current?.files) {
        throw new Error('No file selected');
      }
      const file = csvRef.current.files[0];
      const form = new FormData();
      form.append('file', file);

      // const { data } = await axios.post('/api/v1/files/csv-upload', form);
      // console.log('res data', data);

      // mutate();
      // toast.success(data?.message || 'CSV uploaded successfully');
      // if (data?.errors) {
      //   toast.error(data?.errors);
      // }
      toast.success('CSV uploaded successfully');
    } catch (error) {
      toast.error((error as Error).message || 'Error uploading CSV');
    } finally {
      if (csvRef.current) {
        csvRef.current.value = '';
      }
    }
  }
  const data = [
    {
      id: '1',
      amount: 2,
      items: [
        {
          name: 'Product 1',
          quantity: 1,
        },
        {
          name: 'Product 2',
          quantity: 1,
        },
      ],
      updatedAt: '2025-02-28T17:39:18',
    },
    {
      id: '2',
      amount: 1,
      items: [
        {
          name: 'Product 1',
          quantity: 1,
        },
      ],
      updatedAt: '2025-02-28T17:19:18',
    },
  ];
  console.log('path', params);

  async function syncOrders() {
    try {
      setState((s) => ({ ...s, fetching: 'sync' }));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // const { data } = await axios.post('/api/v1/orders/sync');
      setState((s) => ({ ...s, synced: true }));
    } catch (error) {
      toast.error((error as Error).message || 'Error syncing orders');
    } finally {
      setState((s) => ({ ...s, fetching: undefined }));
    }
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
      <HeaderTabs
        LinkComponent={Link}
        title="Orders"
        description={[
          'Ad dolore ea cupidatat labore elit dolor aute.',
          'Proident anim irure pariatur enim excepteur ea. Ut culpa sit laboris culpa magna officia anim mollit cupidatat veniam. Ad ad non sint ullamco.',
        ]}
        headings={[
          {
            name: 'All',
            active: params.has('type') === false,
            href: '/dashboard/orders',
          },
          {
            name: 'Etsy',
            active: params.get('type') === 'etsy',
            href: `/dashboard/orders?type=etsy`,
          },
          {
            name: 'Shopify',
            active: params.get('type') === 'shopify',
            href: `/dashboard/orders?type=shopify`,
          },
          {
            name: 'WooCommerce',
            active: params.get('type') === 'woocommerce',
            href: `/dashboard/orders?type=woocommerce`,
          },
          {
            name: 'Manual',
            active: params.get('type') === 'manual',
            href: `/dashboard/orders?type=manual`,
          },
        ]}
        actions={
          <div className="flex sm:flex-row flex-wrap gap-4 mt-auto">
            <Button variant="primary" onClick={syncOrders}>
              <ArrowsClockwise
                className={classNames(
                  'mr-2',
                  state.fetching === 'sync'
                    ? 'animate-spin text-green-600'
                    : 'text-white',
                  state.synced ? 'hidden' : 'inline-block'
                )}
                size={20}
              />
              {state.synced ? 'Synced' : 'Sync'}
            </Button>
            <Button
              onClick={() => setState((s) => ({ ...s, drawer: true }))}
              variant="secondary"
            >
              Create Manual Order
            </Button>
            <Button variant="primary" onClick={() => csvRef.current?.click()}>
              Import Orders
            </Button>
          </div>
        }
        actionClassName="bottom-4"
      />

      {/* hidden input for csv from uploads */}
      <input type="file" className="hidden" ref={csvRef} onChange={csvUpload} />

      <ActivityCard
        activities={data?.map((item) => ({
          message: `${item.amount} ${item.amount > 1 ? 'items' : 'item'} ordered`,
          description: `Order ID: ${item.id}`,
          updatedAt: dateToFormattedString(item.updatedAt),
          type: 'Products',
          status: 'Pending',
        }))}
        title="Recent Orders"
        icon={<ListPlus className="text-indigo-500" size={24} />}
        LinkComponent={Link}
      />

      <Header
        subtitle="Manage your orders"
        description={[
          'Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in.',
          'Adipisicing sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in.',
        ]}
        type="page-header"
      />
    </PageWrapper>
  );
}
