import { Burger, Collapse, Flex } from '@mantine/core';
import { FiltersBar } from '@/features/filter-movies';
import { useDisclosure } from '@mantine/hooks';
import classes from './FiltersBar.module.scss';

export const CollapsedFiltersBar = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Flex
      align='flex-end'
      direction='column'
      className={classes.filtersCollapse}
    >
      <Burger
        opened={opened}
        onClick={toggle}
        aria-label='Toggle filters'
        classNames={{
          root: classes.burgerRoot,
          burger: classes.burger,
        }}
      />
      <Collapse in={opened}>
        <FiltersBar />
      </Collapse>
    </Flex>
  );
};
