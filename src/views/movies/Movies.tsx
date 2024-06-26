import { useEffect } from 'react';
import { Box, Flex } from '@mantine/core';
import { FiltersBar, changePage, CollapsedFiltersBar } from '@/features/filter-movies';
import { getAllRatedMovies } from '@/features/rate-movies';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { MoviesGrid, PaginationBar } from '@/widgets';
import classes from './Movies.module.scss';

export const Movies = () => {
  const dispatch = useAppDispatch();
  const {
    movies,
    page,
    totalPages,
  } = useAppSelector(state => state.movies);

  const handleChangePage = (page: number) => {
    dispatch(changePage(page));
  };

  useEffect(() => {
    dispatch(getAllRatedMovies());
  }, [dispatch]);

  return (
    <Flex
      className={classes.moviesWrapper}
      direction='column'
    >
      <h1>Movies</h1>
      <CollapsedFiltersBar />
      <Box className={classes.filtersContainer}>
        <FiltersBar />
      </Box>
      <MoviesGrid movies={movies} />
      <PaginationBar
        page={page}
        totalPages={totalPages}
        onChange={handleChangePage}
        justify='flex-end'
      />
    </Flex>
  );
};
