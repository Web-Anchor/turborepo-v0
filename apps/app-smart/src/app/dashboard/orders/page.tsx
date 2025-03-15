'use client';

import { ActivityCard } from '@repo/ui/cards/ActivityCard';
import { ListPlus } from '@phosphor-icons/react';
import { classNames, dateToFormattedString } from '@repo/ui/utils.ts';
import { Link } from 'components/Wrappers/Link';
import { Header } from '@repo/ui/headings/header';
import { PageWrapper } from '@repo/ui/semantic';
import { HeaderTabs } from '@repo/ui/headings/headings';
import { usePathname } from 'next/navigation';
import { Button } from '@repo/ui/buttons';
import { useState } from 'react';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { toast } from 'sonner';
// import { useGetOrders } from 'hooks/orders';

type ComponentState = {
  drawer?: boolean;
  synced?: boolean;
  fetching?: string;
};

export default function Page() {
  const path = usePathname();
  const [state, setState] = useState<ComponentState>({});
  // const { data } = useGetOrders({});
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
            active: path === '/dashboard/orders',
            href: '/dashboard/orders',
          },
          {
            name: 'Etsy',
            active: path === '/dashboard/orders?type=etsy',
            href: `/dashboard/orders?type=etsy`,
          },
          {
            name: 'Shopify',
            active: path === '/dashboard/orders?type=shopify',
            href: `/dashboard/orders?type=shopify`,
          },
          {
            name: 'WooCommerce',
            active: path === '/dashboard/orders?type=woocommerce',
            href: `/dashboard/orders?type=woocommerce`,
          },
          {
            name: 'Manual',
            active: path === '/dashboard/orders?type=manual',
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
          </div>
        }
        actionClassName="bottom-4"
      />

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
