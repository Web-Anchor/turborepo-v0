'use client';

import { useGetItems } from 'hooks/items';
import { PageTitle, Paragraph } from '@repo/ui/document';
import { Button } from '@repo/ui/button';
// import { CollectionCard } from '@repo/ui/card';
import Link from 'components/Wrappers/Link';

export default function Page() {
  const { data } = useGetItems({ userId: 'cm7g46yzc00004sftmvfxky2f' });
  console.log('DATA', data);

  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center justify-between gap-4">
        <PageTitle text="Inventory Lists" />
        <Button
          variant="primary"
          href="/dashboard/items/create"
          LinkComponent={Link}
        >
          Create Item
        </Button>
      </section>
      <Paragraph text="Id ex dolor nostrud amet qui officia reprehenderit nulla sint nulla incididunt labore." />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((item, index) => {
          return <p key={index}>{item.id}</p>;
        })}
      </section>

      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
