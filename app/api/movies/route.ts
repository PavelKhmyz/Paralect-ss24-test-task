import { NextResponse } from 'next/server';
import { IGetMovies } from '@/features/filter-movies';
import { IMovies } from '@/shared/types';
import {
  serverMoviesRepository,
  paramsValidator,
  moviesValidator,
  removeFalsyElement,
} from '@/shared/lib';

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
