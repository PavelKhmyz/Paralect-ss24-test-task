import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import {
  ColorSchemeScript,
  MantineProvider,
} from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import StoreProvider from '@/app/StoreProvider';
import './Root.style.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Arrow Flicks',
  description: 'Test task for paralect summer-startup 2024',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
}
