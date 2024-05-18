import { NextRequest, NextResponse } from 'next/server';
import { serverMoviesRepository } from '@/lib/MovieRepository';
import { paramsValidator } from '@/lib/paramsValidator';
import { genresValidator } from '@/lib/validators';
import { removeFalsyElement } from '@/lib/removeFalsyElements';

interface IGetGenres {
  language: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IGenres {
  genres: IGenre[];
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const validationResult = paramsValidator<IGetGenres>(Object.fromEntries(searchParams), genresValidator);

  if(validationResult.success && validationResult.data) {
    const validatedSearchParams = new URLSearchParams(removeFalsyElement(validationResult.data));

    try {
      const response = await serverMoviesRepository.GET<IGenres>(`/genre/movie/list?${validatedSearchParams}`);

      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json( 'Fetch TMDB is failed' , {status: 502});
    }
  }

  return NextResponse.json('Validation is fail', {
    status: 400,
  });
};
