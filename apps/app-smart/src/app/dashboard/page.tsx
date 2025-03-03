'use client';

import { BentoGrid } from '@repo/ui/grids';
import { useWhoIAm } from 'hooks/users';
import { getGreeting } from 'lib/utils';
import { Header } from '@repo/ui/headers';
import { useStatistics } from 'hooks/statistics';
import { StatisticCard } from '@repo/ui/cards/StatisticCard';
import { ActivityCard } from '@repo/ui/cards/ActivityCard';
import { Link } from 'components/Wrappers/Link';

export default function Page() {
  const { data: user } = useWhoIAm();
  const { statistics } = useStatistics();
  console.log('📊 Statistics:', statistics);

  return (
    <div className="max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <Header
        title="Dashboard"
        subtitle={`${getGreeting()} ${user?.firstName || user?.lastName}`}
        description={[
          'Ad dolore ea cupidatat labore elit dolor aute.',
          'Proident anim irure pariatur enim excepteur ea. Ut culpa sit laboris culpa magna officia anim mollit cupidatat veniam. Ad ad non sint ullamco.',
          'This is a description',
        ]}
        type="page-header"
      />
      <BentoGrid>
        <div className="flex flex-wrap gap-4 p-2 bg-white rounded-xl ring-1 ring-white/15 lg:col-span-6">
          <StatisticCard
            name="Total Products"
            description="Total products available on the platform"
            updatedAt={statistics?.items?.[0]?.updatedAt}
            LinkComponent={Link}
            amount={statistics?.itemsCount}
            type="Products"
            status="Active"
          />
          <StatisticCard
            name="Total Orders"
            description="Total orders placed on the platform"
            updatedAt={statistics?.orders?.[0]?.updatedAt}
            LinkComponent={Link}
            amount={statistics?.ordersCount}
            type="Orders"
          />
        </div>
        <div className="flex flex-wrap gap-4 p-2 bg-white rounded-xl ring-1 ring-white/15 lg:col-span-6">
          <ActivityCard
            activities={[
              {
                updatedAt: '2025-02-28T17:39:18',
                message: 'New order placed',
                description: 'John Doe placed a new order for $123.45',
                type: 'Orders',
              },
              {
                updatedAt: '2025-02-28T17:19:18',
                message: 'Product delivered',
                description: 'Product #123 has been delivered',
                type: 'Products',
                status: 'Delivered',
              },
              {
                updatedAt: '2025-02-26T17:39:180',
                message: 'Payment received',
                description: 'Payment for order #123 received',
                type: 'Orders',
                status: 'Paid',
              },
            ]}
            title="Recent Activity"
            LinkComponent={Link}
          />
        </div>

        <div className="flex flex-1 justify-center col-span-6 items-center min-h-56 overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
          Sale Overview Graph
        </div>
        <div className="flex flex-wrap gap-4 p-2 bg-white rounded-xl ring-1 ring-white/15 lg:col-span-6">
          <div className="flex flex-1 justify-center items-center min-h-56 overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
            Sale Trends graph
          </div>
          <div className="flex flex-1 justify-center items-center min-h-56 overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
            Order Trends graph
          </div>
        </div>
      </BentoGrid>
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
