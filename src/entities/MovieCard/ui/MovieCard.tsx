'use client';

import { Flex } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import Link from 'next/link';
import { useEffect } from 'react';
import { getGenres } from '@/features/filter-movies/lib/Filters.slice';
import { usePathname } from 'next/navigation';
import { IGenre } from '@/shared/types';
import { currencyParses, dateParser, durationParser } from '@/entities/MovieCard';
import { MovieTableElement } from './MovieTableElement';
import { ImageComponent } from '@/shared/ui';
import { RatingStar } from '@/entities/MovieCard/ui/RatingStar';
import classes from './MovieCard.module.scss';

export interface IMovieExtended {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: IGenre[];
  runtime?: number;
  budget?: number;
  revenue?: number;
}

interface IMovieCard {
  movie: IMovieExtended;
  extended?: boolean;
  children: JSX.Element;
}

export const MovieCard = ({ movie, children, extended=false }: IMovieCard) => {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const { genres } = useAppSelector(state => state.filters);

  const releaseYear = new Date(movie.release_date).getFullYear();
  const movieGenre = movie.genre_ids
    ? movie.genre_ids.map((id) => genres.find(i => i.id === id))
    : movie.genres
      ? movie.genres
      : undefined;

  useEffect(() => {
    if(!genres) {
      dispatch(getGenres());
    }
  }, [dispatch, genres]);

  return (
    <Flex
      className={classes.movieCardWrapper}
      direction='row'
    >
      <Link href={pathName === '/' ? `movies/${movie.id}` : `${pathName}/${movie.id}`} className={classes.movieCardLink}>
        <ImageComponent posterPath={movie.poster_path} width={119}/>
        <Flex direction='column'>
          <h2 className={classes.movieCardTitle}>{movie.title}</h2>
          <span className={classes.movieCardYear}>{releaseYear ? releaseYear : ''}</span>
          <RatingStar voteAverage={movie.vote_average} voteCount={movie.vote_count} className={classes.movieCardRating}/>
          <table>
            <tbody>
              {extended && <MovieTableElement
                title='Duration'
                value={durationParser(movie.runtime)}
                className={classes.movieCardGenres}
              />}
              {extended && <MovieTableElement
                title='Premiere'
                value={dateParser(movie.release_date)}
                className={classes.movieCardGenres}
              />}
              {extended && <MovieTableElement
                title='Budget'
                value={currencyParses(movie.budget)}
                className={classes.movieCardGenres}
              />}
              {extended && <MovieTableElement
                title='Gross worldwide'
                value={currencyParses(movie.revenue)}
                className={classes.movieCardGenres}
              />}
              {movieGenre && <MovieTableElement
                title='Genres'
                value={movieGenre.map(el => el?.name).join(', ')}
                className={classes.movieCardGenres}
              />}
            </tbody>
          </table>
        </Flex>
      </Link>
      {children}
    </Flex>
  );
};
