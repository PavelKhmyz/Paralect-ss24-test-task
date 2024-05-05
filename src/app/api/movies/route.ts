import { z } from 'zod';
import { NextResponse } from 'next/server';
import { serverMoviesRepository } from '@/app/api/MovieRepository';
import { urlParamsValidator } from '@/lib/urlParamsValidator';

enum SortBy {
  originalTitleAsc = 'original_title.asc',
  originalTitleDesc = 'original_title.desc',
  popularityAsc = 'popularity.asc',
  popularityDesc = 'popularity.desc',
  revenueAsc = 'revenue.asc',
  revenueDesc = 'revenue.desc',
  primaryReleaseDateAsc = 'primary_release_date.asc',
  primaryReleaseDateDesc = 'primary_release_date.desc',
  titleAsc = 'title.asc',
  titleDesc = 'title.desc',
  voteAverageAsc = 'vote_average.asc',
  voteAverageDesc = 'vote_average.desc',
  voteCountAsc = 'vote_count.asc',
  voteCountDesc = 'vote_count.desc',
}

enum Languages {
  en = 'en-US',
}

interface IMovie {
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

const moviesValidator = z.object({
  with_genres: z.string().optional(),
  primary_release_year: z.coerce.number().optional(),
  language: z.nativeEnum(Languages).default(Languages.en),
  page: z.coerce.number().default(1),
  sort_by: z.nativeEnum(SortBy).default(SortBy.popularityDesc),
  'vote_average.lte': z.coerce.number().optional(),
  'vote_average.gte': z.coerce.number().optional(),
});

export const GET = async (request: Request) => {
  try {
    const validatedSearchParams = await urlParamsValidator(request.url, moviesValidator);

    const searchParams = new URLSearchParams(validatedSearchParams);

    const response = await serverMoviesRepository.getMovies(`/discover/movie?${searchParams}`);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error }, {
      status: 400,
    });
  }
};
