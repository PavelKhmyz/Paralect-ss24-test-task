import { IconSelector } from '@tabler/icons-react';
import { NumberInput as NumInput, rem } from '@mantine/core';

interface INumberInput {
  placeholder: string;
  minValue: number;
  maxValue: number;
  value: string | number;
  error: string;
  onChange: (value: string | number) => void;
  label?: string;
  classNames?: {
    wrapper?: string;
    root?: string;
    input?: string;
    section?: string;
    label?: string;
    error?: string;
  }
}

export const NumberInput = ({
  label,
  placeholder,
  minValue,
  maxValue,
  value,
  error,
  onChange,
  classNames,
}: INumberInput) => {
  return (
    <NumInput
      label={label}
      placeholder={placeholder}
      min={minValue}
      max={maxValue}
      rightSection={<IconSelector style={{ width: rem(16), height: rem(16) }} />}
      value={value}
      error={error}
      onChange={onChange}
      classNames={classNames}
    />
  );
};
