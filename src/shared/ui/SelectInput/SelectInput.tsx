'use client';

import { IconChevronDown } from '@tabler/icons-react';
import { rem, Select } from '@mantine/core';
import { useState } from 'react';
import colors from 'app/variable.module.scss';

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
  classNames?: {
    input: string;
    section: string;
    label: string;
    option: string;
    dropdown: string;
  }
}

export const SelectInput = ({
  label,
  value,
  error,
  data,
  onChange,
  classNames,
}: ISelectInput) => {
  const [chevronPosition, setChevronPosition] = useState(0);

  const handleRotateChevron = (value: number) => {
    setChevronPosition(value);
  };

  return (
    <Select
      label={label}
      classNames={classNames}
      allowDeselect={false}
      withCheckIcon={false}
      rightSection={<IconChevronDown
        style={{
          width: rem(16),
          height: rem(16),
          stroke: chevronPosition === 180 ? colors.purple500 : colors.grey500,
        }}
        transform={`rotate(${chevronPosition})`}
      />}
      data={data}
      value={value}
      error={error}
      onChange={onChange}
      onDropdownOpen={() => setChevronPosition(180)}
      onDropdownClose={() => handleRotateChevron(0)}
    />
  );
};
