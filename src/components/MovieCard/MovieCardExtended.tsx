import { Flex, UnstyledButton } from '@mantine/core';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import NoPoster from 'public/NoPoster.svg';
import { useDisclosure } from '@mantine/hooks';
import { RatingModal } from '@/components/RatingModal/RatingModal';
import { removeRating, setRating } from '@/app/(movies)/rated-movies/RatedMovies.slice';
import { useEffect } from 'react';
import { getGenres } from '@/components/FiltersBar/Filters.slice';
import './MovieCard.style.scss';
import { IMovieDetails } from '@/app/api/movie-details/[id]/route';

const imageUrl = 'https://image.tmdb.org/t/p/';

interface ICardProps {
  movie: IMovieDetails;
}

export const MovieCardExtended = ({ movie }: ICardProps) => {
  const dispatch = useAppDispatch();
  const { userRating } = useAppSelector(state => state.rated);
  const { genres } = useAppSelector(state => state.filters);
  const [opened, { open, close }] = useDisclosure(false);
  const releaseYear = new Date(movie.release_date).getFullYear();
  const movieGenre = movie.genres.map(genre => genre.name);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleChangeRating = (value: number) => {
    dispatch(setRating({ id: String(movie.id), rating: value, movie }));
  };

  const handleResetRating = () => {
    dispatch(removeRating(String(movie.id)));
  };

  return (
    <>
      <Flex
        className='movie-card-wrapper'
        direction='row'
      >
        <Link href={`/movie/${movie.id}`} className='movie-card-link'>
          {movie.poster_path
            ? <Image w={250} src={`${imageUrl}w300${movie['poster_path']}`} alt='poster'/>
            : <div className='movie-card-no-image'><NextImage src={NoPoster} alt='no-poster'/></div>
          }
          <Flex direction='column'>
            <h2 className='movie-card-title'>{movie.title}</h2>
            <span className='movie-card-year'>{releaseYear ? releaseYear : ''}</span>
            <p className='movie-card-rating'>
              <IconStarFilled fill={'#FAB005'}/>
              <span>{movie.vote_average || '0'}</span>
              <span>{`(${movie.vote_count || 0})`}</span>
            </p>
            <p className='movie-card-genres'>
              <span>Duration</span>
              <span>{movie.runtime}</span>
            </p>
            <p className='movie-card-genres'>
              <span>Premiere</span>
              <span>{movie.release_date}</span>
            </p>
            <p className='movie-card-genres'>
              <span>Budget</span>
              <span>{movie.budget}</span>
            </p>
            <p className='movie-card-genres'>
              <span>Gross worldwide</span>
              <span>{movie.revenue}</span>
            </p>
            <p className='movie-card-genres'>
              <span>Genres</span>
              <span>{movieGenre.map(el => el).join(', ')}</span>
            </p>
          </Flex>
        </Link>
        <UnstyledButton onClick={open} className='movie-card-rate-button'>
          <IconStarFilled fill={userRating?.[movie.id] ? '#9854F6' : '#D5D6DC'}/>
          {userRating?.[movie.id] > 0 && <span>{userRating[movie.id]}</span>}
        </UnstyledButton>
      </Flex>
      <RatingModal
        rating={userRating?.[movie.id]}
        title={movie.title}
        opened={opened}
        onClose={close}
        onConfirm={handleChangeRating}
        onReset={handleResetRating}
      />
    </>
  );
};
