import { NextRequest, NextResponse } from 'next/server';
import { IMovieDetails } from '@/shared/types';
import {
  serverMoviesRepository,
  paramsValidator,
  movieDetailsValidator,
} from '@/shared/lib';

interface IGetMovieDetails {
  language: string;
}

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { searchParams } = new URL(request.url);

  const validationResult = paramsValidator<IGetMovieDetails>(Object.fromEntries(searchParams), movieDetailsValidator);

  if(validationResult.success) {
    const validatedSearchParams = new URLSearchParams({
      ...validationResult.data,
      append_to_response: 'videos',
    });

    try {
      const response = await serverMoviesRepository.GET<IMovieDetails>(`/movie/${params.id}?${validatedSearchParams}`);

      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json( 'Fetch TMDB is failed' , {status: 502});
    }
  }

  return NextResponse.json('Validation is fail', {
    status: 400,
  });
};
