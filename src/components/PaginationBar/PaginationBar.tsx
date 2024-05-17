import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Pagination } from '@mantine/core';
import { changePage } from '@/components/FiltersBar/Filters.slice';

export const PaginationBar = () => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector(state => state.filters);
  const { totalPages } = useAppSelector(state => state.movies);

  const handleChangePage = (page: number) => {
    dispatch(changePage(page));
  };

  return (
    <Pagination value={page} onChange={handleChangePage} total={totalPages ? totalPages : 3} />
  );
};
