'use client';

import { IconChevronDown } from '@tabler/icons-react';
import { rem, Select } from '@mantine/core';
import { useState } from 'react';

interface ISelectInputData {
  value: string;
  label: string;
}

interface ISelectInput {
  label: string;
  value: string | null;
  error: string;
  data: ISelectInputData[];
  onChange: (value: string | null) => void;
}

export const SelectInput = ({
  label,
  value,
  error,
  data,
  onChange,
}: ISelectInput) => {
  const [chevronPosition, setChevronPosition] = useState(0);

  const handleRotateChevron = (value: number) => {
    setChevronPosition(value);
  };

  return (
    <Select
      label={label}
      withCheckIcon={false}
      rightSection={<IconChevronDown
        style={{ width: rem(16), height: rem(16) }}
        transform={`rotate(${chevronPosition})`} />}
      data={data}
      value={value}
      error={error}
      onChange={onChange}
      onDropdownOpen={() => setChevronPosition(180)}
      onDropdownClose={() => handleRotateChevron(0)}
    />
  );
};
