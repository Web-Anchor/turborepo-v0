'use client';

import { useGetClusters } from 'hooks/clusters';
import { PageTitle, Paragraph } from '@repo/ui/document';
import { Button } from '@repo/ui/button';
import { GroupCard } from '@repo/ui/card';
import Link from 'components/Wrappers/Link';

export default function Home() {
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
        {data?.map((cluster: any) => (
          <GroupCard
            key={cluster.id}
            {...cluster}
            LinkComponent={Link}
            href={`/dashboard/clusters/${cluster.id}`}
          />
        ))}
      </section>

      <GroupCard
        name="NameCard"
        description="DescriptionCard"
        itemCount="30"
        updatedAt="2021-10-10"
        tags={['tag1', 'tag2']}
      />
      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
