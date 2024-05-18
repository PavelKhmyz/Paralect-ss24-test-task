'use client';

import { Combobox, Group, Input, InputBase, useCombobox, ScrollArea } from '@mantine/core';

interface IData {
  id: number | string;
  name: string;
}


interface ICustomMultiSelect {
  data: IData[];
  value: string[];
  onChange(value: string[]): void;
  label?: string;
  placeholder?: string;
  rightSection?: JSX.Element;
  error?: string;
  onDropdownOpen?(): void;
  onDropdownClose?(): void;
}

export const CustomMultiSelect = ({ data, value, label, placeholder, onChange, rightSection, onDropdownOpen, onDropdownClose, error }: ICustomMultiSelect) => {
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();

      if (onDropdownClose) {
        onDropdownClose();
      }
    },
    onDropdownOpen: () => {
      combobox.updateSelectedOptionIndex('active');

      if(onDropdownOpen) {
        onDropdownOpen();
      }
    },
  });

  const handleValueSelect = (currentValue: string) => {
    onChange(value.includes(currentValue) ? value.filter(el => el !== currentValue) : [...value, currentValue]);
  };

  const options = data.map(genre => (
    <Combobox.Option value={String(genre.id)} key={genre.id} active={value.includes(String(genre.id))}>
      <Group gap="sm">
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
      <label className='mantine-InputBase-label'>{label}</label>
      <Combobox.DropdownTarget>
        <InputBase
          component='button'
          type='button'
          pointer
          rightSection={rightSection ? rightSection : <Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents='none'
          error={error}
        >
          {dataParser(value) || <Input.Placeholder>{placeholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <ScrollArea.Autosize type='scroll' mah={200} scrollbarSize={4}>
          {options}
        </ScrollArea.Autosize>
      </Combobox.Dropdown>
    </Combobox>
  );
};

