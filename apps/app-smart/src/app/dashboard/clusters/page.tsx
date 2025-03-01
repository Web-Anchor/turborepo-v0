'use client';

import { useGetClusters } from 'hooks/clusters';
import { PageTitle, Paragraph } from '@repo/ui/documents';
import { Button } from '@repo/ui/buttons';
import { CollectionCard } from '@repo/ui/cards';
import Link from 'components/Wrappers/Link';

export default function Page() {
  const { data } = useGetClusters({ userId: 1 });
  console.log('DATA', data);

  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center justify-between gap-4">
        <PageTitle text="Cluster" />
        <Button
          variant="primary"
          href="/dashboard/clusters/create"
          LinkComponent={Link}
        >
          Create Cluster
        </Button>
      </section>
      <Paragraph text='Add list new list clusters to your account. Group your lists together to organize your item lists. For more information, see the "Lists" section in the documentation.' />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((cluster) => (
          <CollectionCard
            key={cluster.id}
            {...cluster}
            LinkComponent={Link}
            href={`/dashboard/clusters/${cluster.id}`}
          />
        ))}
      </section>

      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
