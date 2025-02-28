'use client';

import { BentoGridWrapper } from '@repo/ui/bento-grid';
import { Filler } from '@repo/ui/filler';
import { PageTitle, Paragraph } from '@repo/ui/document';
import { useWhoIAm } from 'hooks/users';
import { getGreeting } from 'lib/utils';

export default function Page() {
  const { data: user } = useWhoIAm();

  return (
    <div className="flex flex-col gap-4">
      <PageTitle text="Dashboard" />
      <Paragraph>
        <span className="font-bold">
          {getGreeting()} {user?.firstName || user?.lastName}
        </span>
      </Paragraph>
      <Paragraph>
        Welcome to the dashboard! Here you can view a summary of your
        store&#39;s performance and recent activity.
      </Paragraph>
      <BentoGridWrapper className="lg:grid-cols-6 lg:grid-rows-2">
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
      </BentoGridWrapper>
      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
