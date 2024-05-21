import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clientMoviesRepository, removeFalsyElement } from '@/shared/lib';
import { IMovie, IMovies } from '@/shared/types';

export interface IGetMovies {
  with_genres?: string[];
  primary_release_year?: number;
  language?: string;
  page?: number;
  sort_by?: string;
  'vote_average.lte'?: number;
  'vote_average.gte'?: number;
}

interface IMoviesState {
  page: number;
  movies: IMovie[];
  loading: boolean;
  totalPages: number;
  totalResults: number;
  error?: string;
}

const moviesInitialState: IMoviesState = {
  page: 1,
  movies: [],
  totalPages: 1,
  totalResults: 0,
  loading: false,
};

export const getMovies = createAsyncThunk(
  'movies',
  async (params: IGetMovies
  ) => {
    const searchParams = new URLSearchParams(removeFalsyElement(params));

    return await clientMoviesRepository.GET<IMovies>(`/movies?${searchParams}`);
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

export const moviesReducer = moviesSlice.reducer;
