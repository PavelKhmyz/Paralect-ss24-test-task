'use client';

import { Button, Flex } from '@mantine/core';
import NextImage from 'next/image';
import Link from 'next/link';
import React from 'react';
import NotFundError from 'public/NotFoundError.svg';
import classes from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <Flex
      className={classes.notFoundWrapper}
      direction='column'
      align='center'
      justify='center'
    >
      <NextImage src={NotFundError} alt='404 - Not Found'/>
      <h3>We can`t find the page you are looking for</h3>
      <Button component={Link} href='/' classNames={{ root: classes.button }}>Go Home</Button>
    </Flex>
  );
};
