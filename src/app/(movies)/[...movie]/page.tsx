'use client';

import { notFound } from 'next/navigation';
import { clientMoviesRepository } from '@/lib/MovieRepository';
import { paramsValidator } from '@/lib/paramsValidator';
import { movieDetailsValidator } from '@/lib/validators';
import { useEffect, useState } from 'react';
import { IGetMovieDetails, IMovieDetails } from '@/app/api/movie-details/[id]/route';
import { MovieCardExtended } from '@/components/MovieCard/MovieCardExtended';
import { Breadcrumbs, Flex } from '@mantine/core';
import { MovieDetails } from '@/components/MovieDetails/MovieDetails';
import Link from 'next/link';
import { removeFalsyElement } from '@/lib/removeFalsyElements';
import './Movie.style.scss';

const navigateRegex = /(movie|rated-movie)/;

const fetchMovie = async (id: string) => {
  const validationResult = paramsValidator<IGetMovieDetails>({}, movieDetailsValidator);

  if(validationResult.success && validationResult.data) {
    const searchParams = new URLSearchParams(removeFalsyElement(validationResult.data));

    return await clientMoviesRepository.GET<IMovieDetails>(`/movie-details/${id}?${searchParams}`);
  }
};

const Movie = ({ params }: { params: { movie: string } }) => {
  if(!params.movie[0].match(navigateRegex)) {
    notFound();
  }

  const [movie, setMovie] = useState<IMovieDetails>();

  const wordCapitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const breadCrumbsData = [
    { title: wordCapitalize(params.movie[0]), href: params.movie[0] === 'movies' ? '/' : `/${params.movie[0]}` },
    { title: movie?.title, href: `/${params.movie[0]}/${params.movie[1]}` },
  ].map(el => <Link className='breadcrumb-link' key={el.title} href={el.href}>{el.title}</Link>);

  useEffect(() => {
    (async () => {
      const result = await fetchMovie(params.movie[1]);
      setMovie(result);
    }
    )();
  }, [params.movie]);

  return (
    <Flex
      direction='column'
      className='movie-wrapper'
    >
      <Breadcrumbs>{breadCrumbsData}</Breadcrumbs>
      {movie && <MovieCardExtended movie={movie}/>}
      <MovieDetails trailer={movie?.videos.results.filter(el => el.type === 'Trailer')} description={movie?.overview} production={movie?.production_companies}/>
    </Flex>
  );
};

export default Movie;
