import { IconChevronDown } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { DateValue, YearPickerInput } from '@mantine/dates';

interface IYearInput {
  label: string;
  placeholder: string;
  value: DateValue;
  error: string;
  onChange: (value: DateValue) => void;
}

export const YearInput = ({
  label,
  placeholder,
  value,
  error,
  onChange,
}: IYearInput) => {
  return (
    <YearPickerInput
      label={label}
      placeholder={placeholder}
      rightSection={<IconChevronDown style={{ width: rem(16), height: rem(16) }} />}
      value={value}
      error={error}
      onChange={onChange}
    />
  );
};
