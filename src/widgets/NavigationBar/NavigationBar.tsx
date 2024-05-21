'use client';

import Image from 'next/image';
import Logo from 'public/Logo.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './NavigationBar.style.scss';

export const NavigationBar = () => {
  const pathName = usePathname();

  return (
    <>
      <Link
        href='/' className='logo-link'
      >
        <Image src={Logo} alt='logo' />
      </Link>
      <Link
        href='/'
        className={pathName === '/' ? 'nav-link nav-link-active' : 'nav-link'}
      >
        Movies
      </Link>
      <Link
        href={'/rated-movies'}
        className={pathName === '/rated-movies' ? 'nav-link nav-link-active' : 'nav-link'}
      >
        Rated movies
      </Link>
    </>
  );
};
