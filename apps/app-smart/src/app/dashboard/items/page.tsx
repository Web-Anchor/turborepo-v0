'use client';

import { useGetItems } from 'hooks/items';
import { PageTitle, Paragraph } from '@repo/ui/document';
import { Button } from '@repo/ui/button';
import Link from 'components/Wrappers/Link';
import ItemTable from '@repo/ui/tables';

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

      <ItemTable
        items={data?.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          category: item.category,
          quantity: item.quantity,
          price: item.price,
          status: item.status,
          updatedAt: item.updatedAt,
          action: (
            <Button
              LinkComponent={Link}
              href={`/dashboard/items/${item.id}`}
              variant="link"
            >
              Edit
            </Button>
          ),
        }))}
      />

      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
