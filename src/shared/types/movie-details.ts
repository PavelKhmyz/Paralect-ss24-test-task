import { IGenre } from './genres';

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
