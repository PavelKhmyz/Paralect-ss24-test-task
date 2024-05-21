interface IMoviesRepository {
  GET<MovieResponse>(url: string, config?: NextFetchRequestConfig): Promise<MovieResponse>;
}

class MoviesRepository implements IMoviesRepository {
  private readonly baseUrl: string;
  private readonly config?: RequestInit;

  constructor(url?: string, config?: RequestInit) {
    this.baseUrl = url ? url : '';
    this.config = config;
  }

  public async GET<MovieResponse>(url: string, config?: NextFetchRequestConfig): Promise<MovieResponse> {
    const response = await fetch(this.baseUrl + url, {
      ...this.config,
      method: 'GET',
      next: config,
    });

    if(response.ok) {
      return await response.json();
    }

    throw new Error(await response.json());
  }
}

export const serverMoviesRepository = new MoviesRepository(process.env.TMDB_API_URL, {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});

export const clientMoviesRepository = new MoviesRepository('/api');
