import { useEffect } from 'react';
import { Flex, Grid } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { SearchInput, EmptyState } from '@/shared/ui';
import { changePage, getAllRatedMovies, searchMovie } from '@/features/rate-movies';
import { MoviesGrid, PaginationBar } from '@/widgets';
import { getGenres } from '@/features/filter-movies';
import classes from './RatedMovies.module.scss';

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
      ? <Flex className={classes.ratedMoviesWrapper} direction='column'>
        <Grid align='center'>
          <Grid.Col span={{ lg:6, md: 12 }}><h1>Rated movies</h1></Grid.Col>
          <Grid.Col span={{ lg:6, md: 12 }}>
            <SearchInput
              placeholder='Search movie title'
              onSubmit={handleSearch}
              classNames={{
                input: classes.searchInput,
                section: classes.searchSection,
                button: classes.searchButton,
                arrowIcon: classes.arrowIcon,
              }}
            />
          </Grid.Col>
        </Grid>
        <MoviesGrid movies={searchedMovies} />
        <PaginationBar page={page} totalPages={totalPages} onChange={handleChangePage}/>
      </Flex>
      : <EmptyState classNames={{ wrapper: classes.emptyRatedMoviesWrapper, button: classes.emptyStateButton }}/>
  );
};
