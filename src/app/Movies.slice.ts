import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMovie } from '@/app/api/movies/route';
import { clientMoviesRepository } from '@/app/api/MovieRepository';

export interface IGetMovies {
  with_genres?: string;
  primary_release_year?: number;
  language?: string;
  page?: number;
  sort_by?: string;
  'vote_average.lte'?: number;
  'vote_average.gte'?: number;
}

export interface IMoviesState {
  page: number;
  movies: IMovie[];
  totalPages?: number;
  totalResults?: number;
  loading: boolean;
  error?: string;
}

export const moviesInitialState: IMoviesState = {
  page: 1,
  movies: [],
  loading: false,
};

export const getMovies = createAsyncThunk('movies', async (params: IGetMovies) => {
  const searchParams = new URLSearchParams({
    page: params.page ? params.page.toString() : '1',
  });

  return await clientMoviesRepository.getMovies(`/movies?${searchParams}`);
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: moviesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: undefined,
        };
      })

      .addCase(getMovies.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          movies: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.total_pages,
          totalResults: action.payload.total_results,
        };
      })

      .addCase(getMovies.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

export const {} = moviesSlice.actions;

export const moviesReducer = moviesSlice.reducer;
