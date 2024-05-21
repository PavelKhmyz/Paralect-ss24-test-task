'use client';

import NotFundError from 'public/NotFoundError.svg';
import { Button, Flex } from '@mantine/core';
import NextImage from 'next/image';
import Link from 'next/link';
import React from 'react';
import './NotFound.style.scss';

export default function NotFound () {
  return (
    <Flex
      className='not-found-wrapper'
      direction='column'
      align='center'
      justify='center'
    >
      <NextImage src={NotFundError} alt='404 - Not Found'/>
      <h3>We can`t find the page you are looking for</h3>
      <Button component={Link} href="/">Go Home</Button>
    </Flex>
  );
}
