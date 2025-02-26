import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SMART 📦',
  description: 'Stock Manager and Reporting Tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDevEnvironment =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';

  return (
    <ClerkProvider>
      <html
        lang="en"
        className="h-full bg-dark-gray text-white transition-all duration-300"
      >
        <head>
          {isDevEnvironment && (
            <script
              src="https://unpkg.com/react-scan/dist/auto.global.js"
              async
            />
          )}
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
          <Toaster position="top-right" closeButton richColors />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
