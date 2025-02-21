import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard 📦',
};

import Sidebar from './sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Sidebar>{children}</Sidebar>;
}
