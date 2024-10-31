import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ToastProvider from './ui/components/layout/ToastProvider';
import { QueryContextClient } from '@/context/QueryClientProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Todo List',
  description: 'A simple Todo List App - Test two to Tango',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} antialiased`}>
        <QueryContextClient>
          {children}
          <ToastProvider />
        </QueryContextClient>
      </body>
    </html>
  );
}

