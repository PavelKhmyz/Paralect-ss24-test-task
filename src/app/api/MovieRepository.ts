import { IMovies } from '@/app/api/movies/route';
import { IGenres } from '@/app/api/movie-list/route';
import { IMovieDetails } from '@/app/api/movie-details/[id]/route';

export interface IMoviesRepository<getMoviesResponse, getGenresResponse, getMovieByIdResponse> {
  getMovies(url: string, config?: NextFetchRequestConfig): Promise<getMoviesResponse>;
  getGenres(url: string, config?: NextFetchRequestConfig): Promise<getGenresResponse>;
  getMovieById(url: string, config?: NextFetchRequestConfig): Promise<getMovieByIdResponse>;
}

class MoviesRepository<
  getMoviesResponse,
  getGenresResponse,
  getMovieByIdResponse
> implements IMoviesRepository<getMoviesResponse, getGenresResponse, getMovieByIdResponse> {
  private readonly baseUrl: string;
  private readonly config?: RequestInit;

  constructor(url?: string, config?: RequestInit) {
    this.baseUrl = url ? url : '';
    this.config = config;
  }

  private pathConcatenation(url: string): string {
    return this.baseUrl + url;
  }

  public async getMovies(url: string, config?: NextFetchRequestConfig): Promise<getMoviesResponse> {
    const path = this.pathConcatenation(url);

    const response = await fetch(path, {
      ...this.config,
      method: 'GET',
      next: config,
    });

    return await response.json();
  }

  public async getGenres(url: string, config?: NextFetchRequestConfig): Promise<getGenresResponse> {
    const path = this.pathConcatenation(url);

    const response = await fetch(path, {
      ...this.config,
      method: 'GET',
      next: config,
    });

    return await response.json();
  }

  public async getMovieById(url: string, config?: NextFetchRequestConfig): Promise<getMovieByIdResponse> {
    const path = this.pathConcatenation(url);

    const response = await fetch(path, {
      ...this.config,
      method: 'GET',
      next: config,
    });

    return await response.json();
  }
}

export const serverMoviesRepository = new MoviesRepository<IMovies, IGenres, IMovieDetails>(process.env.TMDB_API_URL, {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});

export const clientMoviesRepository = new MoviesRepository<IMovies, IGenres, IMovieDetails>('/api');
