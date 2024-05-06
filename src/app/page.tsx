'use client';

import React from 'react';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Flex } from '@mantine/core';

const Movies = () => {

  return (
    <Flex
      style={{ padding: '40px 90px 0px 90px' }}
      direction='column'
    >
      <h1 style={{ marginBottom: '42px' }}>Movie</h1>
      <SearchBar />
    </Flex>
  );
};

export default Movies;
