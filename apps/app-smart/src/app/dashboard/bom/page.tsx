'use client';

import { useGetBOMs } from 'hooks/boms';
import { Button } from '@repo/ui/buttons';
import { CollectionCard } from '@repo/ui/cards/CollectionCard';
import Link from 'components/Wrappers/Link';
import { Header } from '@repo/ui/headers';
import { classNames } from '@repo/ui/utils.ts';
import { CaretRight, Ruler } from '@phosphor-icons/react';

export default function Page() {
  const { data, isLoading } = useGetBOMs({ userId: 1 });
  console.log('DATA', data);

  return (
    <div className="flex flex-col gap-4">
      <Header
        title="BOM"
        description={[
          'Bill of Materials (BOM) – sometimes called a “recipe” or “kit” – is the list of all the items needed to create a product. It includes all the raw materials, sub-assemblies, intermediate assemblies, sub-components, parts, and the quantities of each needed to manufacture a product.',
          'A Bill of Materials is essential for creating a detailed and accurate product design. It allows you to easily plan, track, and manage the components and sub-assemblies required to create a product.',
          'It is essential to keep the Bill of Materials updated and accurate. If a component or sub-component is no longer needed or needs to be replaced, it must be removed from the Bill of Materials and replaced with the new component or sub-component. If a component or sub-component is out of stock, it must be removed from the Bill of Materials.',
        ]}
        subtitle="Bill of Materials"
        type="page-header"
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((item, index) => (
          <CollectionCard
            key={index}
            description={item.description}
            name={item.name}
            itemCount={`${item.quantity} ${item.unit}`}
            LinkComponent={Link}
            href={`/dashboard/inventory/${item.id}`}
            type={'secondary'}
          />
        ))}
      </section>

      {!isLoading && !data?.length && (
        <div className="max-w-lg">
          <h2 className="text-base font-semibold">Create your first project</h2>
          <p className="mt-1 text-sm">
            Get started by selecting a template or start from an empty project.
          </p>
          <ul
            role="list"
            className="mt-6 divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            <li>
              <div className="group relative flex items-start space-x-3 py-4">
                <div className="shrink-0">
                  <span
                    className={classNames(
                      'bg-orange-500',
                      'inline-flex size-10 items-center justify-center rounded-lg'
                    )}
                  >
                    <Ruler className="w-6 h-6 text-white" aria-hidden="true" />
                  </span>
                </div>
                <Button
                  LinkComponent={Link}
                  href="/dashboard/bom/create"
                  variant="link"
                  className="flex flex-1"
                >
                  <section className="flex flex-1">Crete new BOM</section>
                  <div className="shrink-0 self-center mr-auto">
                    <CaretRight
                      className="w-5 h-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                </Button>
              </div>
            </li>
          </ul>
          <div className="mt-6 flex">
            <Button
              LinkComponent={Link}
              href="/dashboard/products/create"
              variant="link"
            >
              <section className="flex flex-1">or add new product</section>
            </Button>
          </div>
        </div>
      )}

      <Header
        description={[
          'A Bill of Materials helps you plan, track, and manage the components and sub-assemblies required to create a product, ensuring that you have all the necessary resources and that you are not wasting materials or time.',
        ]}
        type="page-header"
      />
    </div>
  );
}
