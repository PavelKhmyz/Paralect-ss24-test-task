import { NextResponse } from 'next/server';
import { serverMoviesRepository } from '@/lib/MovieRepository';
import { paramsValidator } from '@/lib/paramsValidator';
import { moviesValidator } from '@/lib/validators';
import { IGetMovies } from '@/app/(movies)/Movies.slice';
import { removeFalsyElement } from '@/lib/removeFalsyElements';

export interface IMovie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface IMovies {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const searchParamsObject = Object.fromEntries(searchParams);

  const paramsToValidate = {
    ...searchParamsObject,
    with_genres: searchParamsObject.with_genres ? searchParamsObject.with_genres.split(',') : undefined,
  };

  const validationResult = paramsValidator<IGetMovies>(paramsToValidate, moviesValidator);

  if(validationResult.success && validationResult.data) {
    const validatedSearchParams = new URLSearchParams(removeFalsyElement(validationResult.data));

    try {
      const response = await serverMoviesRepository.GET<IMovies>(`/discover/movie?${validatedSearchParams}`);

      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json( 'Fetch TMDB is failed' , {status: 502});
    }
  }

  return NextResponse.json('Validation is fail', {
    status: 400,
  });
};
