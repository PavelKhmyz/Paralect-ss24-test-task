import NextImage from 'next/image';
import { Flex } from '@mantine/core';
import React from 'react';
import MoviesNotFoundImg from 'public/MoviesNotFound.svg';

export const MoviesNotFound = () => {
  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
    >
      <NextImage src={MoviesNotFoundImg} alt='Movies not found' />
      <h3>We don`t have such movies, look for another one</h3>
    </Flex>
  );
};
