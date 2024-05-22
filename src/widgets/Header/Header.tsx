import { IconAdjustments, IconMenu2 } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import classes from './Header.module.scss';

interface IHeader {
  onClick(): void;
}

export const Header = ({ onClick }: IHeader) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <ActionIcon
      onClick={handleClick}
      variant='filled'
      className={classes.button}
    >
      <IconMenu2/>
    </ActionIcon>
  );
};
