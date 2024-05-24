import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import StoreProvider from '@/app/StoreProvider';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@/app/Root.style.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Arrow Flicks',
  description: 'Test task for paralect startup-summer-2024',
};

export const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript/>
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <MantineProvider>
            {children}
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
};
