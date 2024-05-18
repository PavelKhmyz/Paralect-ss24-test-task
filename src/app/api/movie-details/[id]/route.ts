import { NextRequest, NextResponse } from 'next/server';
import { serverMoviesRepository } from '@/lib/MovieRepository';
import { paramsValidator } from '@/lib/paramsValidator';
import { IGenre } from '@/app/api/movie-list/route';
import { movieDetailsValidator } from '@/lib/validators';

export interface IGetMovieDetails {
  language: string;
}

export interface IProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IVideos {
  name: string;
  key: string;
  type: string;
  official: boolean;
  id: string;
}

export interface IMovieDetails {
  id: number;
  title: string;
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
    results: IVideos[];
  }
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
