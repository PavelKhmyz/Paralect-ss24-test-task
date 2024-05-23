'use client';

import { Button, Input } from '@mantine/core';
import { useState } from 'react';
import { IconArrowRight, IconZoom } from '@tabler/icons-react';

interface ISearchInput {
  placeholder: string;
  onSubmit: (value: string) => void;
  classNames?: {
    section?: string;
    input?: string;
    button?: string;
    arrowIcon?: string;
  }
}

export const SearchInput = ({ placeholder, onSubmit, classNames }: ISearchInput) => {
  const [value, setValue] = useState('');

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Input
      className='search-imput'
      placeholder={placeholder}
      value={value}
      onChange={handleChangeValue}
      rightSectionPointerEvents="all"
      leftSection={<IconZoom />}
      classNames={classNames}
      rightSection={
        <>
          <Button className={classNames?.arrowIcon} variant='filled' onClick={() => onSubmit(value)}>
            <IconArrowRight/>
          </Button>
          <Button className={classNames?.button} variant='filled' onClick={() => onSubmit(value)}>
            Search
          </Button>
        </>
      }
    />
  );
};
