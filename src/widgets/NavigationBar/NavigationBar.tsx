'use client';

import Image from 'next/image';
import Logo from 'public/Logo.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CloseButton } from '@mantine/core';
import classes from './NavigationBar.module.scss';

interface INavigationBar {
  onClick(): void
}

export const NavigationBar = ({ onClick }: INavigationBar) => {
  const pathName = usePathname();

  const handleClose = () => {
    onClick();
  };

  return (
    <>
      <Link
        href='/' className={classes.logoLink}
      >
        <Image src={Logo} alt='logo' />
      </Link>
      <Link
        href='/'
        className={pathName === '/' ? classes.navLinkActive : classes.navLink}
      >
        Movies
      </Link>
      <Link
        href={'/rated-movies'}
        className={pathName === '/rated-movies' ? classes.navLinkActive : classes.navLink}
      >
        Rated movies
      </Link>
      <CloseButton
        onClick={handleClose}
        className={classes.closeButton}
      />
    </>
  );
};
