import { NextRequest, NextResponse } from 'next/server';
import { serverMoviesRepository } from '@/app/api/MovieRepository';
import { paramsValidator } from '@/lib/urlParamsValidator';
import { IGenre } from '@/app/api/movie-list/route';
import { movieDetailsValidator } from '@/lib/validators';

interface IProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface IVideos {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface IMovieDetails {
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  budget: number;
  revenue: number;
  genres: IGenre[];
  overview: string;
  production_companies: IProductionCompanies[];
  videos: {
    results: IVideos[]
  }
}

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { searchParams } = new URL(request.url);

  const result = paramsValidator(Object.fromEntries(searchParams), movieDetailsValidator);

  if(result.success) {
    const validatedSearchParams = new URLSearchParams({
      ...result.data,
      append_to_response: 'videos',
    });

    try {
      const response = await serverMoviesRepository.getMovies(`/movie/${params.id}?${validatedSearchParams}`);

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
