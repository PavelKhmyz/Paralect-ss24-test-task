import { IconStarFilled } from '@tabler/icons-react';
import { UnstyledButton } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { IRatingModal, removeRating, setRating } from '@/features/rate-movies';
import { useDisclosure } from '@mantine/hooks';
import { IMovieExtended } from '@/entities/MovieCard/ui/MovieCard';
import { IMovie } from '@/shared/types';
import classes from './RatingButton.module.scss';

interface IRatingButton {
  movie: IMovieExtended;
  modal: (props: IRatingModal) => JSX.Element;
}

export const RatingButton = ({ movie, modal }: IRatingButton) => {
  const dispatch = useAppDispatch();
  const { userRating } = useAppSelector(state => state.rated);
  const [opened, { open, close }] = useDisclosure(false);

  const handleChangeRating = (value: number) => {
    const movieData: IMovie = {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      genre_ids: movie.genre_ids
        ? movie.genre_ids
        : movie.genres
          ? movie.genres.map(genre => genre.id)
          : [],
    };

    dispatch(setRating({ id: String(movie.id), rating: value, movie: movieData }));
  };

  const handleResetRating = () => {
    dispatch(removeRating(String(movie.id)));
  };

  return (
    <>
      <UnstyledButton onClick={open} className={classes.movieCardRateButton}>
        <IconStarFilled fill={userRating?.[movie.id] ? '#9854F6' : '#D5D6DC'}/>
        {userRating?.[movie.id] > 0 && <span>{userRating[movie.id]}</span>}
      </UnstyledButton>
      {modal({
        opened,
        title: movie.title,
        rating: userRating?.[movie.id],
        onConfirm: handleChangeRating,
        onReset: handleResetRating,
        onClose: close,
      })}
    </>
  );
};
