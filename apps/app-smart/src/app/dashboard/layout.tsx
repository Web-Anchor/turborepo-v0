import type { Metadata } from 'next';
import Sidebar from './sidebar';

export const metadata: Metadata = {
  title: 'Dashboard 📦',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Sidebar>{children}</Sidebar>;
}
