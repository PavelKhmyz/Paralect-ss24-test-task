'use client';

import {
  AppShell,
  AppShellMain,
  AppShellNavbar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavigationToggle } from '@/features/show-navigation';
import { NavigationBar } from '@/widgets';
import classes from './layout.module.scss';

export const PageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
        <NavigationToggle onClick={toggleMobile} />
        {children}
      </AppShellMain>
    </AppShell>
  );
}
