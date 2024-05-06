import { NextResponse } from 'next/server';
import { serverMoviesRepository } from '@/app/api/MovieRepository';
import { urlParamsValidator } from '@/lib/urlParamsValidator';
import { moviesValidator } from '@/lib/validators';

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovies {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const GET = async (request: Request) => {
  try {
    const validatedSearchParams = await urlParamsValidator(request.url, moviesValidator);

    const searchParams = new URLSearchParams(validatedSearchParams);

    const response = await serverMoviesRepository.getMovies(`/discover/movie?${searchParams}`);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error }, {
      status: 400,
    });
  }
};
