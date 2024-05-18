'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { MovieCard } from '@/components/MovieCard/MovieCard';
import { Button, Flex, Grid, Pagination } from '@mantine/core';
import React, { useEffect } from 'react';
import { SearchInput } from '@/components/SearchInput/SearchInput';
import { changePage, getAllRatedMovies, searchMovie } from '@/app/(movies)/rated-movies/RatedMovies.slice';
import NextImage from 'next/image';
import NotRated from 'public/NotRated.svg';
import Link from 'next/link';
import './RatedMovies.style.scss';

const RatedMovies = () => {
  const dispatch = useAppDispatch();
  const {
    ratedMovies,
    searchedMovies,
    page,
    totalPages ,
  } = useAppSelector(state => state.rated);

  useEffect(() => {
    dispatch(getAllRatedMovies());
  }, [dispatch]);

  const handleSearch = (value: string) => {
    dispatch(searchMovie(value));
  };

  const handleChangePage = (page: number) => {
    dispatch(changePage(page));
  };

  return (
    <Flex
      className='rated-movies-wrapper'
      direction='column'
    >
      {searchedMovies.length === 0
        ? (
          <Flex
            className='empty-rated-movies-wrapper'
            direction='column'
            justify='center'
            align='center'
          >
            <NextImage src={NotRated} alt='No Rated Movies' />
            <h3>You haven`t rated any films yet</h3>
            <Button component={Link} href='/'>Find movies</Button>
          </Flex>
        )
        : (
          <>
            <Grid align='center'>
              <Grid.Col span={6}><h1>Rated movies</h1></Grid.Col>
              <Grid.Col span={6}>
                <SearchInput
                  placeholder='Search movie title'
                  onSubmit={handleSearch}
                />
              </Grid.Col>
            </Grid>
            <Grid>
              {searchedMovies && searchedMovies.map(movie => <Grid.Col span={6} key={movie.id}><MovieCard movie={movie}/></Grid.Col>)}
            </Grid>
            {Object.values(ratedMovies).length > 4 && <Pagination value={page} onChange={handleChangePage} total={totalPages}/>}
          </>
        )
      }
    </Flex>
  );
};

export default RatedMovies;
