import { RatingButton, RatingModal } from '@/features/rate-movies';
import { Grid } from '@mantine/core';
import { MovieCard } from '@/entities/MovieCard';
import { IMovie } from '@/shared/types';
import { Loader, MoviesNotFound } from '@/shared/ui';
import React from 'react';
import { useAppSelector } from '@/shared/lib';

interface IMovieGrid {
  movies: IMovie[]
}

export const MoviesGrid = ({ movies }: IMovieGrid) => {
  const { loading } = useAppSelector(state => state.movies);

  const movieCol = movies.map(movie => (
    <Grid.Col span={{ xl: 6 }} key={movie.id}>
      <MovieCard movie={movie}>
        <RatingButton movie={movie} modal={RatingModal}/>
      </MovieCard>
    </Grid.Col>
  ));

  return (
    <>
      <Loader loading={loading} />
      {movies.length ? <Grid>{movieCol}</Grid> : <MoviesNotFound/>}
    </>
  );
};
