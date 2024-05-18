'use client';

import React, { useCallback, useEffect } from 'react';
import { FiltersBar } from '@/components/FiltersBar/FiltersBar';
import { Flex, Grid } from '@mantine/core';
import { MovieCard } from '@/components/MovieCard/MovieCard';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getMovies, IGetMovies } from '@/app/(movies)/Movies.slice';
import { PaginationBar } from '@/components/PaginationBar/PaginationBar';
import { changeFiltersError, getGenres } from '@/components/FiltersBar/Filters.slice';
import { paramsValidator } from '@/lib/paramsValidator';
import { moviesValidator } from '@/lib/validators';
import { getAllRatedMovies } from '@/app/(movies)/rated-movies/RatedMovies.slice';
import NextImage from 'next/image';
import MoviesNotFound from 'public/MoviesNotFound.svg';
import './Movies.style.scss';


const Movies = () => {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector(state => state.movies);
  const {
    with_genres,
    primary_release_year,
    sort_by,
    page,
    'vote_average.gte': voteGte,
    'vote_average.lte': voteLte,
  } = useAppSelector(state => state.filters);

  const validateSearchParams = useCallback(() => {
    const data = {
      with_genres,
      primary_release_year: primary_release_year ? primary_release_year.getFullYear() : null,
      page,
      sort_by,
      'vote_average.gte': voteGte,
      'vote_average.lte': voteLte,
    };

    const result = paramsValidator<IGetMovies>(data, moviesValidator);

    const validationErrors = {
      genreError: result.errors?.with_genres ? result.errors.with_genres : '',
      yearError: result.errors?.primary_release_year ? result.errors.primary_release_year : '',
      sortError: result.errors?.sort_by ? result.errors.sort_by : '',
      ratingError: result.errors?.['vote_average.gte']
        ? result.errors?.['vote_average.gte']
        : result.errors?.['vote_average.lte']
          ? result.errors?.['vote_average.lte']
          : '',
    };

    dispatch(changeFiltersError(validationErrors));

    if(result.success) {
      return result.data;
    }
  }, [dispatch, page, primary_release_year, sort_by, voteGte, voteLte, with_genres]);


  // useEffect(() => {
  //   const data = {
  //     with_genres,
  //     primary_release_year: primary_release_year ? primary_release_year.getFullYear() : null,
  //     page,
  //     sort_by,
  //     'vote_average.gte': voteGte,
  //     'vote_average.lte': voteLte,
  //   };
  //
  //   dispatch(getMovies(removeFalsyElement(data)));
  // }, [dispatch, page, primary_release_year, sort_by, voteGte, voteLte, with_genres]);


  useEffect(() => {
    const validatedParams = validateSearchParams();

    if(validatedParams) {
      dispatch(getMovies(validatedParams));
    }
  }, [dispatch, validateSearchParams]);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getAllRatedMovies());
  }, [dispatch]);

  return (
    <Flex
      className='movies-wrapper'
      direction='column'
    >
      <h1>Movies</h1>
      <FiltersBar />
      {movies.length > 0
        ? (<>
          <Grid>
            {movies.map(movie => <Grid.Col span={6} key={movie.id}><MovieCard key={movie.id} movie={movie}/></Grid.Col>)}
          </Grid>
          {movies.length > 0 && <PaginationBar />}
        </>
        )
        : (
          <Flex
            direction='column'
            align='center'
            justify='center'
          >
            <NextImage src={MoviesNotFound} alt='Movies not found' />
            <h3>We don`t have such movies, look for another one</h3>
          </Flex>
        )
      }
    </Flex>
  );
};

export default Movies;
