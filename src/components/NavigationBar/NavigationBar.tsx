'use client';

import { useMantineTheme } from '@mantine/core';
import Image from 'next/image';
import Logo from 'public/Logo.svg';
import { CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './NavigationBar.style.scss';

interface ITempStyle {
  navLink: CSSProperties;
}

const tempStyles: ITempStyle = {
  navLink: {
    color: '#9854F6',
    fontWeight: 700,
  },
};

export const NavigationBar = () => {
  const pathName = usePathname();
  const theme = useMantineTheme();

  return (
    <>
      <Link
        href='/' className='logo-link'
      >
        <Image src={Logo} alt='logo' />
      </Link>
      <Link href='/' className={pathName === '/' ? 'nav-link nav-link-active' : 'nav-link'}>
        Movies
      </Link>
      <Link href={'/rated-movies'} className={pathName === '/rated-movies' ? 'nav-link nav-link-active' : 'nav-link'}>
        Rated movies
      </Link>
    </>
  );
};
