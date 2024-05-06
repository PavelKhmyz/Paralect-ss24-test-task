import { NextRequest, NextResponse } from 'next/server';
import { serverMoviesRepository } from '@/app/api/MovieRepository';
import { urlParamsValidator } from '@/lib/urlParamsValidator';
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
  try {
    const validatedSearchParams = await urlParamsValidator(request.url, movieDetailsValidator);

    const searchParams = new URLSearchParams({
      ...validatedSearchParams,
      append_to_response: 'videos',
    });

    const response = await serverMoviesRepository.getMovieById(`/movie/${params.id}?${searchParams}`);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error }, {
      status: 400,
    });
  }
};
