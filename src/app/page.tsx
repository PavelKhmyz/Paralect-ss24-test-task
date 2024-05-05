'use client';

import { useEffect, useState } from 'react';
import { clientMoviesRepository } from '@/app/api/MovieRepository';
import { IGenre } from '@/app/api/movie-list/route';

const Home = () => {
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    (async () => {
      const response = await clientMoviesRepository.getGenres('/movie-list');

      setGenres(response.genres);
    })();
  }, []);

  return (
    <>
      {genres.map((genre) => (<h2 key={genre.id}>{genre.name}</h2>))}
    </>
  );
};

export default Home;
