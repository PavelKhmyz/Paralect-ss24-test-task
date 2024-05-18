import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clientMoviesRepository } from '@/lib/MovieRepository';
import { IGenre, IGenres } from '@/app/api/movie-list/route';
import { DateValue } from '@mantine/dates';

interface IValidationErrors {
  genreError: string;
  yearError: string;
  sortError: string;
  ratingError: string;
}

export interface IFiltersState {
  genres: IGenre[];
  loading: boolean;
  with_genres: string[];
  primary_release_year: DateValue;
  page: number;
  sort_by?: string | null;
  'vote_average.gte': number | string;
  'vote_average.lte': number | string;
  validationErrors: IValidationErrors;
  error?: string;
}

export const filtersInitialState: IFiltersState = {
  genres: [],
  loading: false,
  with_genres: [],
  primary_release_year: null,
  page: 1,
  sort_by: 'popularity.desc',
  'vote_average.gte': '',
  'vote_average.lte': '',
  validationErrors: {
    genreError: '',
    yearError: '',
    sortError: '',
    ratingError: '',
  },
};

export const getGenres = createAsyncThunk('genres', async (language?:string) => {
  const searchParams = new URLSearchParams({
    language: language ? language : 'en',
  });

  return await clientMoviesRepository.GET<IGenres>(`/movie-list?${searchParams}`);
});

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    changeGenre(state, action: PayloadAction<string[]>) {
      state.with_genres = action.payload;
      state.page = 1;
    },

    changeYear(state, action: PayloadAction<DateValue>) {
      state.primary_release_year = action.payload;
      state.page = 1;
    },

    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    changeSort(state, action: PayloadAction<string | null>) {
      state.sort_by = action.payload;
      state.page = 1;
    },

    changeRatingGte(state, action: PayloadAction<number | string>) {
      state['vote_average.gte'] = action.payload;
      state.page = 1;
    },

    changeRatingLte(state, action: PayloadAction<number | string>) {
      state['vote_average.lte'] = action.payload;
      state.page = 1;
    },

    changeFiltersError(state, action: PayloadAction<IValidationErrors>) {
      state.validationErrors = action.payload;
    },

    resetFilters(state) {
      state.with_genres = [];
      state.primary_release_year = null;
      state.page = 1;
      state.sort_by = 'popularity.desc';
      state['vote_average.gte'] = '';
      state['vote_average.lte'] = '';

      state.validationErrors = {
        genreError: '',
        yearError: '',
        sortError: '',
        ratingError: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: undefined,
        };
      })

      .addCase(getGenres.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          genres: action.payload.genres,
        };
      })

      .addCase(getGenres.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

export const {
  changeFiltersError,
  changeGenre,
  changeYear,
  changePage,
  changeSort,
  changeRatingLte,
  changeRatingGte,
  resetFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
