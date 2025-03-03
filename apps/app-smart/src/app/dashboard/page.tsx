'use client';

import { BentoGrid } from '@repo/ui/grids';
import { Paragraph } from '@repo/ui/documents';
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
    <div className="flex flex-col gap-4">
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
          <div className="flex p-px lg:col-span-6">
            <div className="flex flex-1 overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
              <img
                alt=""
                src="https://tailwindui.com/plus-assets/img/component-images/bento-02-integrations.png"
                className="h-80 object-cover"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-400">
                  Integrations
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  Connect your favorite tools
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus
                  massa.
                </p>
              </div>
            </div>
          </div>
        </BentoGrid>
      </div>

      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
