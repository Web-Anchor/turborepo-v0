'use client';

import { BentoGrid } from '@repo/ui/grids';
import { Filler } from '@repo/ui/fillers';
import { Paragraph } from '@repo/ui/documents';
import { useWhoIAm } from 'hooks/users';
import { getGreeting } from 'lib/utils';
import { Header } from '@repo/ui/headers';
import { useStatistics } from 'hooks/statistics';
import { StatisticCard } from '@repo/ui/cards/StatisticCard';
import { Link } from 'components/Wrappers/Link';

export default function Page() {
  const { data: user } = useWhoIAm();
  const { data } = useStatistics();
  console.log('📊 Statistics:', data);

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
          <div className="flex flex-wrap gap-4 bg-white rounded-xl ring-1 ring-white/15 lg:col-span-6">
            <StatisticCard
              name="Total Users"
              description="Total users registered on the platform"
              // itemCount={data?.totalUsers}
              updatedAt="2023-03-22"
              tags={['Users']}
              LinkComponent={Link}
            />
            <StatisticCard
              name="Total Users"
              description="Total users registered on the platform"
              // itemCount={data?.totalUsers}
              updatedAt="2023-03-22"
              tags={['Users']}
              LinkComponent={Link}
            />
          </div>
          <div className="flex p-px lg:col-span-2">
            <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
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
          <div className="flex p-px lg:col-span-2">
            <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-bl-[2rem]">
              <img
                alt=""
                src="https://tailwindui.com/plus-assets/img/component-images/bento-02-security.png"
                className="h-80 object-cover"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-400">
                  Security
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  Advanced access control
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia.
                </p>
              </div>
            </div>
          </div>
          <div className="flex p-px lg:col-span-4">
            <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]">
              <img
                alt=""
                src="https://tailwindui.com/plus-assets/img/component-images/bento-02-performance.png"
                className="h-80 object-cover object-left"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-400">
                  Performance
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">
                  Lightning-fast builds
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  Sed congue eros non finibus molestie. Vestibulum euismod augue
                  vel commodo vulputate. Maecenas at augue sed elit dictum
                  vulputate.
                </p>
              </div>
            </div>
          </div>
        </BentoGrid>
      </div>

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

      <Paragraph>
        Welcome to the dashboard! Here you can view a summary of your
        store&#39;s performance and recent activity.
      </Paragraph>
      <BentoGrid className="lg:grid-cols-6 lg:grid-rows-2">
        <Filler className="lg:col-span-2">OverviewCard/Redirect</Filler>
        <Filler className="lg:col-span-2">OverviewCard/Redirect</Filler>
        <Filler className="lg:col-span-2">OverviewCard/Redirect</Filler>
        <Filler className="lg:col-span-3" />
        <Filler className="lg:col-span-3" />
        <Filler className="lg:col-span-4 h-72">
          List of recent updates (new orders, stock adjustments)
        </Filler>
        <Filler className="lg:col-span-2">
          Metrics for low-stock alerts, recent orders, sales totals
        </Filler>

        <Filler className="lg:col-span-3 h-56">
          Mini chart components (line/bar charts) for quick trends
        </Filler>
        <Filler className="lg:col-span-3">
          Mini chart components (line/bar charts) for quick trends
        </Filler>
      </BentoGrid>
      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
