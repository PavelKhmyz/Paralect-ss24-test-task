'use client';

import { usePathname } from 'next/navigation';

const Movie = () => {
  const pathName = usePathname();

  return (
    <h1>{pathName}</h1>
  );
};

export default Movie;
