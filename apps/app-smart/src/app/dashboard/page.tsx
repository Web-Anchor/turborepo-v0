import { BentoGridWrapper } from '@repo/ui/bento-grid';
import { Filler } from '@repo/ui/filler';
import { PageTitle, Paragraph } from '@repo/ui/document';

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle text="Dashboard" />
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
