import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Flex } from '@mantine/core';
import { clientMoviesRepository } from '@/shared/lib';
import { Loader } from '@/shared/ui';
import { IMovieDetails } from '@/shared/types';
import { MovieDetails } from '@/entities/MovieDetails';
import { MovieCard } from '@/entities/MovieCard';
import { RatingButton, RatingModal } from '@/features/rate-movies';
import { BreadCrumbs } from '@/widgets';
import classes from './Movie.module.scss';

const navigateRegex = /(movie|rated-movie)/;

const fetchMovie = async (id: string, language?:string) => {
  const searchParams = new URLSearchParams({
    language: language ? language : 'en-US',
  });

  return await clientMoviesRepository.GET<IMovieDetails>(`/movie-details/${id}?${searchParams}`);
};

interface IMovie {
  params: {
    movie: string
  };
}

export const Movie = ({ params }: IMovie) => {
  if(!params.movie[0].match(navigateRegex)) {
    notFound();
  }

  const [movie, setMovie] = useState<IMovieDetails>();
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [loading , setLoading] = useState(false);

  const breadCrumbsData = [
    { title: params.movie[0], href: params.movie[0] === 'movies' ? '/' : `/${params.movie[0]}` },
    { title: movie?.title ? movie?.title : '', href: `/${params.movie[0]}/${params.movie[1]}` },
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const result = await fetchMovie(params.movie[1]);

        setMovie(result);
      } catch {
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    }
    )();
  }, [params.movie]);

  useEffect(() => {
    if(fetchError) {
      notFound();
    }
  }, [fetchError]);

  return (
    <Flex
      direction='column'
      className={classes.movieWrapper}
    >
      <Loader loading={loading}/>
      <BreadCrumbs
        data={breadCrumbsData}
        className={{
          wrapper: classes.breadcrumbsWrapper,
          link: classes.breadcrumbLink,
        }}
      />
      {movie &&
        <>
          <MovieCard movie={movie} extended={true}>
            <RatingButton movie={movie} modal={RatingModal}/>
          </MovieCard>
          <MovieDetails
            trailer={movie?.videos.results.filter(el => el.type === 'Trailer')}
            description={movie?.overview}
            production={movie?.production_companies}
          />
        </>
      }
    </Flex>
  );
};
