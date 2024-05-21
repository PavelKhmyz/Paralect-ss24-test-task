import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Flex, Grid } from '@mantine/core';
import { SearchInput } from '@/shared/ui';
import { changePage, getAllRatedMovies, searchMovie } from '@/features/rate-movies';
import { EmptyState } from '@/shared/ui';
import { MoviesGrid, PaginationBar } from '@/widgets';
import { getGenres } from '@/features/filter-movies';
import './RatedMovies.style.scss';

export const RatedMovies = () => {
  const dispatch = useAppDispatch();
  const {
    ratedMovies,
    searchedMovies,
    page,
    totalPages ,
  } = useAppSelector(state => state.rated);

  useEffect(() => {
    dispatch(getAllRatedMovies());
    dispatch(getGenres());
  }, [dispatch]);

  const handleSearch = (value: string) => {
    dispatch(searchMovie(value));
  };

  const handleChangePage = (page: number) => {
    dispatch(changePage(page));
  };

  return (
    Object.keys(ratedMovies).length
      ? <Flex className='rated-movies-wrapper' direction='column'>
        <Grid align='center'>
          <Grid.Col span={6}><h1>Rated movies</h1></Grid.Col>
          <Grid.Col span={6}>
            <SearchInput
              placeholder='Search movie title'
              onSubmit={handleSearch}
            />
          </Grid.Col>
        </Grid>
        <MoviesGrid movies={searchedMovies} />
        <PaginationBar page={page} totalPages={totalPages} onChange={handleChangePage} />
      </Flex>
      : <EmptyState />
  );
};
