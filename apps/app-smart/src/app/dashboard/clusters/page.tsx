'use client';

import { PageTitle, Paragraph } from '@repo/ui/document';
import { Button } from '@repo/ui/button';
import { useRouter } from 'next/navigation';
import { useGetClusters } from 'hooks/clusters';

export default function Home() {
  const router = useRouter();

  const { data } = useGetClusters({ userId: 1 });
  console.log('DATA', data);

  function createCluster() {
    router.push('/dashboard/cluster/create');
  }

  return (
    <div className="flex flex-col gap-4">
      <PageTitle text="Cluster" />
      <Paragraph text='Add list new list clusters to your account. Group your lists together to organize your item lists. For more information, see the "Lists" section in the documentation.' />
      <Button variant="primary" isLoading>
        Create Cluster
      </Button>
      <Button variant="primary" onClick={createCluster}>
        Create Cluster
      </Button>
      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
