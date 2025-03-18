import type { Metadata } from 'next';
import { Suspense } from 'react';
import Sidebar from './sidebar';

export const metadata: Metadata = {
  title: 'Dashboard 📦',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Sidebar>{children}</Sidebar>
    </Suspense>
  );
}
