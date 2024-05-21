import React from 'react';
import {
  AppShell,
  AppShellMain,
  AppShellNavbar,
} from '@mantine/core';
import { NavigationBar } from '@/widgets';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell
      navbar={{
        width: '280px',
        breakpoint: 'sm',
      }}
    >
      <AppShellNavbar
        className='nav-bar'
        withBorder={false}
      >
        <NavigationBar />
      </AppShellNavbar>
      <AppShellMain>
        {children}
      </AppShellMain>
    </AppShell>
  );
}
