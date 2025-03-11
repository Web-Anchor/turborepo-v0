'use client';

// import { useGetOrders } from 'hooks/orders';
import { ActivityCard } from '@repo/ui/cards/ActivityCard';
import { ListPlus } from '@phosphor-icons/react';
import { dateToFormattedString } from '@repo/ui/utils.ts';
import { Link } from 'components/Wrappers/Link';
import { Header } from '@repo/ui/headings/header';

export default function Page() {
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

  return (
    <div className="flex flex-col gap-4">
      <Header
        title="Orders"
        subtitle="Manage your orders"
        description={[
          'Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in.',
          'Adipisicing sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in.',
        ]}
        type="page-header"
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
        description={[
          'Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in.',
          'Adipisicing sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in.',
        ]}
        type="page-header"
      />
    </div>
  );
}
