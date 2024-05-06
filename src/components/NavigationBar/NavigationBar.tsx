'use client';

import { NavLink } from '@mantine/core';
import Image from 'next/image';
import Logo from 'public/Logo.svg';
import { CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ITempStyle {
  container: CSSProperties;
  navContainer: CSSProperties;
  navLink: CSSProperties;
}

const tempStyles: ITempStyle = {
  container: {
    width: '280px',
    height: '100vh',
    backgroundColor: '#F2EBF9',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    gap: '80px',
  },
  navContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  navLink: {
    borderRadius: '8px',
    color: '#9854F6',
    fontWeight: 700,
  },
};

export const NavigationBar = () => {
  const pathName = usePathname();

  return (
    <header style={tempStyles.container}>
      <Image
        src={Logo}
        width={179}
        height={36}
        alt="Picture of the author"
      />
      <nav style={tempStyles.navContainer}>
        <NavLink
          component={Link}
          style={tempStyles.navLink}
          href='/'
          label='Movies'
          variant='filled'
          autoContrast
          color='#E5D5FA'
          active={pathName === '/'}
        />
        <NavLink
          component={Link}
          style={tempStyles.navLink}
          href='/some'
          label='Rated movies'
          variant='filled'
          autoContrast
          color='#E5D5FA'
          active={pathName === '/some'}
        />
      </nav>
    </header>
  );
};
