'use client';

import React from 'react';
import {
  AppShell,
  AppShellMain,
  AppShellNavbar,
} from '@mantine/core';
import { NavigationBar } from '@/widgets';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { Header } from '@/widgets/Header/Header';
import classes from './layout.module.scss'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: '280px',
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
    >
      <AppShellNavbar
        className={classes.navBar}
        withBorder={false}
      >
        <NavigationBar onClick={toggleMobile} />
      </AppShellNavbar>
      <AppShellMain>
        <Header onClick={toggleMobile} />
        {children}
      </AppShellMain>
    </AppShell>
  );
}
