'use client';

import { useGetItems } from 'hooks/items';
import { PageTitle, Paragraph } from '@repo/ui/document';
import { Button } from '@repo/ui/button';
import Link from 'components/Wrappers/Link';
import ItemTable from '@repo/ui/tables';

export default function Page() {
  const { data } = useGetItems({});

  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center justify-between gap-4">
        <PageTitle text="Inventory Lists" />
        <Button
          variant="primary"
          href="/dashboard/products/create"
          LinkComponent={Link}
        >
          Create Item
        </Button>
      </section>
      <Paragraph text="Id ex dolor nostrud amet qui officia reprehenderit nulla sint nulla incididunt labore." />

      <ItemTable
        headers={headers()}
        items={data?.map((item) => ({
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
              href={`/dashboard/products/${item.id}`}
              variant="link"
            >
              Edit
            </Button>
          ),
        }))}
      />

      <Paragraph>
        Tempor sit aliqua qui ipsum nisi commodo et adipisicing mollit
        reprehenderit sint cillum eiusmod. Nostrud ea sunt qui officia officia
        magna qui laborum. Culpa velit exercitation velit do incididunt velit
        sit nostrud nostrud ea cillum commodo et ad. Aliqua enim id nulla
        laboris Lorem laboris commodo ut cupidatat. Ad dolore eu excepteur
        proident sunt est cupidatat irure amet id consequat exercitation
        consectetur. Anim ea pariatur dolor nisi veniam. Consequat et dolore
        fugiat reprehenderit officia sint aliquip qui laborum. Ullamco enim
        aliqua nulla in dolore officia ut laboris eiusmod in. Exercitation
        voluptate sit non ullamco excepteur ex.
      </Paragraph>
    </div>
  );
}

function headers() {
  const defaultHeaders = [
    { name: 'Name', className: '' },
    { name: 'Category', className: 'hidden sm:table-cell' },
    { name: 'Quantity', className: '' },
    { name: 'Price', className: '' },
    { name: 'Status', className: 'hidden sm:table-cell' },
    { name: 'Last Updated', className: 'hidden lg:table-cell' },
    { name: 'Actions', className: '' },
  ];

  return defaultHeaders;
}
