'use client';

import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import {
  Combobox,
  Group,
  Input,
  InputBase,
  useCombobox,
  ScrollArea,
  rem,
} from '@mantine/core';

interface IMultiSelectData {
  id: number | string;
  name: string;
}


interface IMultiSelect {
  data: IMultiSelectData[];
  value: string[];
  onChange(value: string[]): void;
  label?: string;
  placeholder?: string;
  error?: string;
  classNames?: {
    wrapper?: string;
    root?: string;
    input?: string;
    section?: string;
    label?: string;
    option?: string;
    dropdown?: string;
    error?: string;
  }
}

export const MultiSelect = ({
  data,
  value,
  label,
  placeholder,
  onChange,
  error,
  classNames,
}: IMultiSelect) => {
  const [chevronPosition, setChevronPosition] = useState(0);
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();

      setChevronPosition(0);
    },
    onDropdownOpen: () => {
      combobox.updateSelectedOptionIndex('active');

      setChevronPosition(180);
    },
  });

  const handleValueSelect = (currentValue: string) => {
    onChange(value.includes(currentValue) ? value.filter(el => el !== currentValue) : [...value, currentValue]);
  };

  const options = data.map(genre => (
    <Combobox.Option value={String(genre.id)} key={genre.id} active={value.includes(String(genre.id))} className={classNames?.option}>
      <Group gap='sm'>
        <span>{genre.name}</span>
      </Group>
    </Combobox.Option>
  ));

  const dataParser = (ids: string[]) => {
    const idMatch = ids.map(id => data.filter(genre => String(genre.id) === id)).flat();
    const names = idMatch.map(el => el.name);

    return names.join(', ');
  };

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <label className={classNames?.label}>{label}</label>
      <Combobox.DropdownTarget>
        <InputBase
          component='button'
          type='button'
          pointer
          rightSection={<IconChevronDown
            style={{
              width: rem(16),
              height: rem(16),
            }}
            transform={`rotate(${chevronPosition})`} />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents='none'
          error={error}
          classNames={classNames}
        >
          {dataParser(value) || <Input.Placeholder>{placeholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.DropdownTarget>
      <Combobox.Dropdown className={classNames?.dropdown}>
        <ScrollArea.Autosize type='scroll' mah={200} scrollbarSize={4}>
          {options}
        </ScrollArea.Autosize>
      </Combobox.Dropdown>
    </Combobox>
  );
};

