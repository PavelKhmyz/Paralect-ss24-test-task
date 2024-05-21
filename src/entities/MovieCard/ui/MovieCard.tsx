'use client';

import { Flex } from '@mantine/core';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import Link from 'next/link';
import NoPoster from 'public/NoPoster.svg';
import { useEffect } from 'react';
import { getGenres } from '@/features/filter-movies/lib/Filters.slice';
import { usePathname } from 'next/navigation';
import { IGenre } from '@/shared/types';
import { currencyParses, dateParser, durationParser, voteParser } from '@/entities/MovieCard';
import { MovieTableElement } from './MovieTableElement';
import './MovieCard.style.scss';

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
      className='movie-card-wrapper'
      direction='row'
    >
      <Link href={pathName === '/' ? `movies/${movie.id}` : `${pathName}/${movie.id}`} className='movie-card-link'>
        {movie.poster_path
          ? <Image w={119} src={`${process.env.NEXT_PUBLIC_TMDB_IMG_BASE_URL}w200${movie['poster_path']}`} alt='poster'/>
          : <div className='movie-card-no-image'><NextImage src={NoPoster} alt='no-poster'/></div>
        }
        <Flex direction='column'>
          <h2 className='movie-card-title'>{movie.title}</h2>
          <span className='movie-card-year'>{releaseYear ? releaseYear : ''}</span>
          <p className='movie-card-rating'>
            <IconStarFilled fill={'#FAB005'}/>
            <span>{movie.vote_average || 0}</span>
            <span>{voteParser(movie.vote_count)}</span>
          </p>
          <table>
            <tbody>
              {extended && <MovieTableElement title='Duration' value={durationParser(movie.runtime)} />}
              {extended && <MovieTableElement title='Premiere' value={dateParser(movie.release_date)} />}
              {extended && <MovieTableElement title='Budget' value={currencyParses(movie.budget)} />}
              {extended && <MovieTableElement title='Gross worldwide' value={currencyParses(movie.revenue)} />}
              {movieGenre && <MovieTableElement title='Genres' value={movieGenre.map(el => el?.name).join(', ')}/>}
            </tbody>
          </table>
        </Flex>
      </Link>
      {children}
    </Flex>
  );
};
