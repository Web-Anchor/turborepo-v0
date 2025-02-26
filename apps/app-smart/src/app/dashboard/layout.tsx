import { currentUser } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import Sidebar from './sidebar';
import { ClerkUser } from 'types/data-types';

export const metadata: Metadata = {
  title: 'Dashboard 📦',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = (await currentUser()) as ClerkUser | null;

  return (
    <Sidebar
      user={
        user && {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          updatedAt: user.updatedAt,
          lastActiveAt: user.lastActiveAt,
          createdAt: user.createdAt,
          imageUrl: user.imageUrl,
        }
      }
    >
      {children}
    </Sidebar>
  );
}
