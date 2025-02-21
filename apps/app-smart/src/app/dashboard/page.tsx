import { BentoGridWrapper } from '@repo/ui/bento-grid';
import { Filler } from '@repo/ui/filler';

export default async function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
      <BentoGridWrapper>
        <div className="min-w-[200px] h-[200px] rounded-lg bg-gradient-to-br from-gray-200 to-solver-400 border-2 border-gray-300 lg:col-span-2"></div>
        <Filler />
        <Filler />
        <Filler className="lg:col-span-2" />
      </BentoGridWrapper>
    </div>
  );
}
