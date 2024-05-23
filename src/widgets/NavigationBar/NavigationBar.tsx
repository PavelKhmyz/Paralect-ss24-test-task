'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CloseButton } from '@mantine/core';
import Logo from 'public/Logo.svg';
import classes from './NavigationBar.module.scss';

interface INavigationBar {
  onClick(): void
}

const ratedRegex = /\/rated-movies/;
const moviesRegex = /\/movies|\/$/;

export const NavigationBar = ({ onClick }: INavigationBar) => {
  const pathName = usePathname();

  const handleClose = () => {
    onClick();
  };

  return (
    <>
      <Link
        href='/' className={classes.logoLink}
        onClick={handleClose}
      >
        <Image src={Logo} alt='logo' />
      </Link>
      <Link
        href='/'
        className={pathName.match(moviesRegex) ? classes.navLinkActive : classes.navLink}
        onClick={handleClose}
      >
        Movies
      </Link>
      <Link
        href={'/rated-movies'}
        className={pathName.match(ratedRegex) ? classes.navLinkActive : classes.navLink}
        onClick={handleClose}
      >
        Rated movies
      </Link>
      <CloseButton
        onClick={handleClose}
        classNames={{
          root: classes.closeButton,
        }}
      />
    </>
  );
};
