import NextImage from 'next/image';
import NotRated from 'public/NotRated.svg';
import { Button, Flex } from '@mantine/core';
import Link from 'next/link';

export const EmptyState = () => {
  return (
    <Flex
      className='empty-rated-movies-wrapper'
      direction='column'
      justify='center'
      align='center'
    >
      <NextImage src={NotRated} alt='No Rated Movies' />
      <h3>You haven`t rated any films yet</h3>
      <Button component={Link} href='/'>Find movies</Button>
    </Flex>
  );
};
