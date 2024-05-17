import { NextRequest, NextResponse } from 'next/server';
import { serverMoviesRepository } from '@/app/api/MovieRepository';
import { paramsValidator } from '@/lib/urlParamsValidator';
import { genresValidator } from '@/lib/validators';

export interface IGenre {
  id: number;
  name: string;
}

export interface IGenres {
  genres: IGenre[];
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const result = paramsValidator(Object.fromEntries(searchParams), genresValidator);

  if(result.success) {
    const validatedSearchParams = new URLSearchParams(result.data);

    try {
      const response = await serverMoviesRepository.getGenres(`/genre/movie/list?${validatedSearchParams}`);

      return NextResponse.json(response);
    } catch (error) {
      return new NextResponse( 'Fetch TMDB is failed' , {status: 502});
    }
  } else {
    return NextResponse.json({ error: result.errors }, {
      status: 400,
    });
  }
};
