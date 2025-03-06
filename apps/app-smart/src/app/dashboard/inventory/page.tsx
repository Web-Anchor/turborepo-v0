'use client';

import { useGetInventories } from 'hooks/inventories';
import { Button } from '@repo/ui/buttons';
import { CollectionCard } from '@repo/ui/cards/CollectionCard';
import Link from 'components/Wrappers/Link';
import { Header } from '@repo/ui/headers';

export default function Page() {
  const { data, isLoading } = useGetInventories({ userId: 1 });
  console.log('DATA', data);

  return (
    <div className="flex flex-col gap-4">
      <Header
        title="Inventories"
        description={[
          'Ad dolore ea cupidatat labore elit dolor aute.',
          'Proident anim irure pariatur enim excepteur ea. Ut culpa sit laboris culpa magna officia anim mollit cupidatat veniam. Ad ad non sint ullamco.',
        ]}
        type="page-header"
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((item, index) => (
          <CollectionCard
            key={index}
            description={item.description}
            name={item.name}
            // itemCount={item.items.length}
            LinkComponent={Link}
            tags={item.tags.map((tag) => tag.name)}
            updatedAt={item.updatedAt}
            href={`/dashboard/lists/${item.id}`}
            type={'secondary'}
          />
        ))}
      </section>

      {!isLoading && !data?.length && (
        <div className="max-w-lg">
          <h2 className="text-base font-semibold">
            Create a new inventory item
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Add a new inventory item to your list. You can add as many items as
            you want.
          </p>

          <div className="mt-6 flex">
            <Button LinkComponent={Link} href="/dashboard/inventory/create">
              Add Inventory
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
