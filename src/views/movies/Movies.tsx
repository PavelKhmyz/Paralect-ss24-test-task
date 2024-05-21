import React, { useEffect } from 'react';
import { FiltersBar } from '@/features/filter-movies/ui/FiltersBar';
import { Flex } from '@mantine/core';
import { getAllRatedMovies } from '@/features/rate-movies';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { MoviesGrid, PaginationBar } from '@/widgets';
import { changePage } from '@/features/filter-movies';
import './Movies.style.scss';

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
      className='movies-wrapper'
      direction='column'
    >
      <h1>Movies</h1>
      <FiltersBar />
      <MoviesGrid movies={movies} />
      <PaginationBar page={page} totalPages={totalPages} onChange={handleChangePage} />
    </Flex>
  );
};
