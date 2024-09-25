import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import StoreProvider from '@/components/storeProvider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shocket App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-50">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          draggable
        />
      </body>
    </html>
  );
}
