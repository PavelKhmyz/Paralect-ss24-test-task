export interface IMovie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface IMovies {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
