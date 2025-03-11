'use client';

import { BentoGrid, GridCard } from '@repo/ui/grids';
import { useWhoIAm } from 'hooks/users';
import { getGreeting } from 'lib/utils';
import { Header } from '@repo/ui/headers';
import { useStatistics } from 'hooks/statistics';
import { StatisticCard } from '@repo/ui/cards/StatisticCard';
import { PageWrapper } from '@repo/ui/semantic';
import { ActivityCard } from '@repo/ui/cards/ActivityCard';
import { Link } from 'components/Wrappers/Link';

export default function Page() {
  const { data: user } = useWhoIAm();
  const { statistics } = useStatistics();
  console.log('📊 Statistics:', statistics);

  return (
    <PageWrapper>
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
        <GridCard className="lg:col-span-3">
          <StatisticCard
            name="Total Products"
            description="Total products available on the platform"
            updatedAt={statistics?.products?.[0]?.updatedAt}
            LinkComponent={Link}
            amount={statistics?.itemsCount}
            type="Products"
            status="Active"
          />
        </GridCard>
        <GridCard className="lg:col-span-3">
          <StatisticCard
            name="Total Orders"
            description="Total orders placed on the platform"
            updatedAt={statistics?.orders?.[0]?.updatedAt}
            LinkComponent={Link}
            amount={statistics?.ordersCount}
            type="Orders"
          />
        </GridCard>
        <GridCard className="lg:col-span-2">
          <div className="flex flex-1 justify-center items-center min-h-56 overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
            Sale Overview Graph
          </div>
        </GridCard>
        <GridCard className="lg:col-span-2">
          <div className="flex flex-1 justify-center items-center min-h-56 overflow-hidden rounded-lg bg-indigo-300 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
            Sale Overview Graph
          </div>
        </GridCard>
        <GridCard className="lg:col-span-6">
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
        </GridCard>

        <GridCard className="lg:col-span-8">
          <div className="flex flex-1 justify-center items-center min-h-56 overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
            Sales Overview
          </div>
        </GridCard>
        <GridCard className="lg:col-span-8">
          <div className="flex flex-1 justify-center items-center min-h-56 overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
            Sale Trends graph
          </div>
          <div className="flex flex-1 justify-center items-center min-h-56 overflow-hidden rounded-lg bg-indigo-300 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
            Order Trends graph
          </div>
        </GridCard>
      </BentoGrid>
      <Header
        description={[
          'Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in.',
          'Adipisicing sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in.',
        ]}
        type="page-header"
      />
    </PageWrapper>
  );
}
