import { z } from 'zod';

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

enum GenresLanguages {
  en = 'en',
}

export const moviesValidator = z.object({
  with_genres: z.coerce.number({
    message: 'Invalid genres',
  }).array().optional(),

  primary_release_year: z.coerce.number({
    message: 'Invalid release year',
  }).optional(),

  language: z.nativeEnum(Languages, {
    message: 'Please select language',
  }).default(Languages.en),

  page: z.coerce.number({
    message: 'Please select page',
  }).default(1),

  sort_by: z.nativeEnum(SortBy, {
    message: 'Invalid sort params',
  }).default(SortBy.popularityDesc),

  'vote_average.lte': z.coerce.number()
    .gte(0, 'Minimal value is 0')
    .lte(10, 'Maximum value is 10')
    .optional(),

  'vote_average.gte': z.coerce.number()
    .gte(0, 'Minimal value is 0')
    .lte(10, 'Maximum value is 10')
    .optional(),
});

export const genresValidator = z.object({
  language: z.nativeEnum(GenresLanguages, {
    message: 'Please select language',
  }).default(GenresLanguages.en),
});

export const movieDetailsValidator = z.object({
  language: z.nativeEnum(Languages, {
    message: 'Please select language',
  }).default(Languages.en),
});
