import { UserTable } from '@repo/ui/tables';
import { Filler } from '@repo/ui/fillers';
import { PageTitle, Paragraph } from '@repo/ui/documents';
import { BentoGrid } from '@repo/ui/grids';
import Link from 'components/Wrappers/Link';

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle text="Teams" />
      <UserTable
        users={[
          {
            name: 'John Doe',
            title: 'Software Engineer',
            department: 'Engineering',
            email: 'john.doe@gmail.com',
            role: 'Admin',
            image: 'https://picsum.photos/100',
            editLink: '/dashboard/',
            LinkComponent: Link,
          },
          {
            name: 'Ben Franklin',
            title: 'Software Engineer',
            department: 'Engineering',
            email: 'ben.fFranklin@gmail.com',
            role: 'User',
            editLink: '/dashboard/',
            image: 'https://picsum.photos/160',
          },
        ]}
      />
      <BentoGrid className="lg:grid-cols-6 lg:grid-rows-2">
        <Filler className="lg:col-span-2" />
        <Filler className="lg:col-span-2" />
        <Filler className="lg:col-span-2" />
        <Filler className="lg:col-span-3" />
        <Filler className="lg:col-span-3" />
        <Filler className="lg:col-span-4" />
        <Filler className="lg:col-span-2" />

        <Filler className="lg:col-span-3" />
        <Filler className="lg:col-span-3" />
      </BentoGrid>
      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
