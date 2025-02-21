import { BentoGridWrapper } from '@repo/ui/bento-grid';
import { Filler } from '@repo/ui/filler';

export default async function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
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
    </div>
  );
}
