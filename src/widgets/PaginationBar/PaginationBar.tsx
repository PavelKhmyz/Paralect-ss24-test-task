import { Pagination } from '@mantine/core';

interface IPaginationBar {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const PaginationBar = ({ page, totalPages, onChange }: IPaginationBar) => {
  const handleChangePage = (page: number) => {
    onChange(page);
  };

  return (
    totalPages > 1 && <Pagination value={page} onChange={handleChangePage} total={totalPages} />
  );
};
