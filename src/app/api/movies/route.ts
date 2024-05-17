import { NextResponse } from 'next/server';
import { serverMoviesRepository } from '@/app/api/MovieRepository';
import { paramsValidator } from '@/lib/urlParamsValidator';
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

export const GET = async (request: Request, res: Response) => {
  const { searchParams } = new URL(request.url);

  const result = paramsValidator(Object.fromEntries(searchParams), moviesValidator);

  if(result.success) {
    const validatedSearchParams = new URLSearchParams(result.data);

    try {
      const response = await serverMoviesRepository.getMovies(`/discover/movie?${validatedSearchParams}`);

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
