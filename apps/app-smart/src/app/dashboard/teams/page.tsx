import { UserTable } from '@repo/ui/user-table';
import { Filler } from '@repo/ui/filler';
import { PageTitle, Paragraph } from '@repo/ui/document';

export default async function Home() {
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
            image: 'https://picsum.photos/100',
          },
          {
            name: 'Ben Franklin',
            title: 'Software Engineer',
            department: 'Engineering',
            email: 'ben.fFranklin@gmail.com',
            image: 'https://picsum.photos/160',
          },
        ]}
      />
      <Filler />
      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}
