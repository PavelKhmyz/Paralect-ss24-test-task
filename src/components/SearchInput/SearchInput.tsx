import { Button, em, Input, rem } from '@mantine/core';
import { useState } from 'react';
import { IconZoom } from '@tabler/icons-react';

interface ISearchInput {
  placeholder: string;
  onSubmit: (value: string) => void;
}

export const SearchInput = ({ placeholder, onSubmit }: ISearchInput) => {
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
      rightSection={
        <Button variant='filled' onClick={() => onSubmit(value)}>Search</Button>
      }
    />
  );
};
