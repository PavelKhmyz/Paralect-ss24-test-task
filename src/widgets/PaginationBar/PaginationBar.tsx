import { Button, Flex } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import classes from './Pagination.module.scss';

interface IPaginationBar {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  justify?: string;
}

const pageParser = (page: number, totalPages: number) => {
  const pages = [];

  if (page === totalPages) {
    page - 2 > 0 ? pages.push(page - 2) : undefined;
    page - 1 > 0 ? pages.push(page - 1) : undefined;
    pages.push(page);

    return pages;
  }

  if (page === 1){
    pages.push(page);
    page + 1 <= totalPages ? pages.push(page + 1) : undefined;
    page + 2 <= totalPages ? pages.push(page + 2) : undefined;

    return pages;
  }

  page - 1 > 0 ? pages.push(page - 1) : undefined;
  pages.push(page);
  page + 1 <= totalPages ? pages.push(page + 1) : undefined;

  return pages;
};

export const PaginationBar = ({ page, totalPages, onChange, justify='center' }: IPaginationBar) => {
  const pages = pageParser(page, totalPages);

  const handleChangePage = (page: number) => {
    onChange(page);
  };

  const handleBack = () => {
    onChange(page - 1);
  };

  const handleNext = () => {
    onChange(page + 1);
  };

  return (
    totalPages > 1 &&

      <Flex
        direction='row'
        align='center'
        justify={justify}
        className={classes.paginationWrapper}
      >
        <Button
          variant='default'
          onClick={handleBack}
          className={classes.paginationControl}
          disabled={page === 1}
        >
          <IconChevronLeft/>
        </Button>
        {pages.map(el =>
          <Button
            key={el}
            variant={el === page ? 'filled' : 'default'}
            onClick={() => handleChangePage(el)}
            className={classes.paginationControl}
          >
            {el}
          </Button>)
        }
        <Button
          variant='default'
          onClick={handleNext}
          className={classes.paginationControl}
          disabled={page === totalPages || page === 500}
        >
          <IconChevronRight />
        </Button>
      </Flex>
  );
};
