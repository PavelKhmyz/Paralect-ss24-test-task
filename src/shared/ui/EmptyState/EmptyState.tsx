import { Button, Flex } from '@mantine/core';
import NextImage from 'next/image';
import NotRated from 'public/NotRated.svg';
import Link from 'next/link';

interface IEmptyState {
  classNames?: {
    wrapper?: string;
    button?: string;
  }
}

export const EmptyState = ({ classNames }: IEmptyState) => {
  return (
    <Flex
      className={classNames?.wrapper}
      direction='column'
      justify='center'
      align='center'
    >
      <NextImage src={NotRated} alt='No Rated Movies' />
      <h3>You haven`t rated any films yet</h3>
      <Button className={classNames?.button} component={Link} href='/'>Find movies</Button>
    </Flex>
  );
};
