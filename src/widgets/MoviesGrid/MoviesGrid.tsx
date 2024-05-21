import { RatingButton, RatingModal } from '@/features/rate-movies';
import { Grid, Loader, LoadingOverlay } from '@mantine/core';
import { MovieCard } from '@/entities/MovieCard';
import { IMovie } from '@/shared/types';
import { MoviesNotFound } from '@/shared/ui';
import React from 'react';
import { useAppSelector } from '@/shared/lib';

interface IMovieGrid {
  movies: IMovie[]
}

export const MoviesGrid = ({ movies }: IMovieGrid) => {
  const { loading } = useAppSelector(state => state.movies);

  const movieCol = movies.map(movie => (
    <Grid.Col span={6} key={movie.id}>
      <MovieCard movie={movie}>
        <RatingButton movie={movie} modal={RatingModal}/>
      </MovieCard>
    </Grid.Col>
  ));

  return (
    <>
      <LoadingOverlay visible={loading} loaderProps={{children: <Loader color="grape" type="bars" />}} />
      {movies.length ? <Grid>{movieCol}</Grid> : <MoviesNotFound/>}
    </>
  );
};
