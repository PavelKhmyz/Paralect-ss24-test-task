import { ActionIcon } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './NavigationToggle.module.scss';

interface INavigationToggle {
  onClick(): void;
}

export const NavigationToggle = ({ onClick }: INavigationToggle) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <ActionIcon
      onClick={handleClick}
      className={classes.button}
    >
      <IconChevronRight/>
    </ActionIcon>
  );
};
