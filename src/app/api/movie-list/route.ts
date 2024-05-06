import { NextRequest, NextResponse } from 'next/server';
import { serverMoviesRepository } from '@/app/api/MovieRepository';
import { urlParamsValidator } from '@/lib/urlParamsValidator';
import { genresValidator } from '@/lib/validators';

export interface IGenre {
  id: string;
  name: string;
}

export interface IGenres {
  genres: IGenre[];
}

export const GET = async (request: NextRequest) => {
  try {
    const validatedSearchParams = await urlParamsValidator(request.url, genresValidator);

    const searchParams = new URLSearchParams(validatedSearchParams);

    const response = await serverMoviesRepository.getGenres(`/genre/movie/list?${searchParams}`);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error }, {
      status: 400,
    });
  }
};