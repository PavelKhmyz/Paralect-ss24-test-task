import { IconChevronDown } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { DateValue, YearPickerInput } from '@mantine/dates';

interface IYearInput {
  label: string;
  placeholder: string;
  value: DateValue;
  error: string;
  onChange: (value: DateValue) => void;
  classNames?: {
    input: string;
    section: string;
    label: string;
    calendarHeader: string;
    yearsListControl: string;
  }
}

export const YearInput = ({
  label,
  placeholder,
  value,
  error,
  onChange,
  classNames,
}: IYearInput) => {
  return (
    <YearPickerInput
      label={label}
      placeholder={placeholder}
      classNames={classNames}
      rightSection={<IconChevronDown style={{ width: rem(16), height: rem(16) }} />}
      rightSectionPointerEvents='none'
      value={value}
      error={error}
      onChange={onChange}
      allowDeselect
    />
  );
};
