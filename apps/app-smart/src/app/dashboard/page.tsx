import { BentoGridWrapper } from '@repo/ui/bento-grid';
import { Filler } from '@repo/ui/filler';
import { PageTitle, Paragraph } from '@repo/ui/document';

export default async function Home() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle text="Dashboard" />
      <BentoGridWrapper className="lg:grid-cols-6 lg:grid-rows-2">
        <Filler className="lg:col-span-2" />
        <Filler className="lg:col-span-2" />
        <Filler className="lg:col-span-2" />
        <Filler className="lg:col-span-3" />
        <Filler className="lg:col-span-3" />
        <Filler className="lg:col-span-4" />
        <Filler className="lg:col-span-2" />

        <Filler className="lg:col-span-3" />
        <Filler className="lg:col-span-3" />
      </BentoGridWrapper>
      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
