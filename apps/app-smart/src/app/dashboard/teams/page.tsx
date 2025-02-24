import { UserTable } from '@repo/ui/user-table';
import { Filler } from '@repo/ui/filler';
import { PageTitle, Paragraph } from '@repo/ui/document';
import { BentoGridWrapper } from '@repo/ui/bento-grid';
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
      <BentoGridWrapper className="lg:grid-cols-6 lg:grid-rows-2">
        <Filler className="lg:col-span-2" />
        <Filler className="lg:col-span-2" />
        <Filler className="lg:col-span-2" />
        <Filler className="lg:col-span-3" />
        <Filler className="lg:col-span-3" />
        <Filler className="lg:col-span-4" />
        <Filler className="lg:col-span-2" />

        <Filler className="lg:col-span-3" />
        <Filler className="lg:col-span-3" />
      </BentoGridWrapper>
      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
