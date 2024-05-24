import {
  AppShell,
  AppShellMain,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavigationToggle } from '@/features/show-navigation';
import { ErrorModal, NavigationBar } from '@/widgets';

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
      <NavigationBar onClick={toggleMobile} />
      <AppShellMain>
        <NavigationToggle onClick={toggleMobile} />
        {children}
        <ErrorModal />
      </AppShellMain>
    </AppShell>
  );
};
