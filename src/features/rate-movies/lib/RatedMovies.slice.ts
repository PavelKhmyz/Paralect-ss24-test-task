import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageRepository } from '@/shared/lib';
import { IMovie } from '@/shared/types';

const MOVIES_ON_PAGE = 4;

interface IUserRating {
  id: string;
  rating: number;
  movie: IMovie;
}

interface IRatedMoviesState {
  userRating: {
    [key: string]: number;
  }
  ratedMovies: {
    [key: string]: IMovie;
  };
  searchedMovies: IMovie[];
  page: number;
  totalPages: number;
}

const ratedMoviesInitialState: IRatedMoviesState = {
  userRating: {},
  ratedMovies: {},
  searchedMovies: [],
  page: 1,
  totalPages: 1,
};

const ratedMoviesSlice = createSlice({
  name: 'rated-movies',
  initialState: ratedMoviesInitialState,
  reducers: {
    setRating(state, action: PayloadAction<IUserRating>) {
      state.userRating = { ...state.userRating, [action.payload.id]: action.payload.rating };
      state.ratedMovies = { ...state.ratedMovies, [action.payload.id]: action.payload.movie };
      state.totalPages = Math.ceil(Object.values(state.ratedMovies).length / MOVIES_ON_PAGE);

      const head = state.page * MOVIES_ON_PAGE;
      const tail = head - MOVIES_ON_PAGE;

      state.searchedMovies = Object.values(state.ratedMovies).filter((movie, index) => tail <= index && index < head);

      localStorageRepository.setOne('userRating', state.userRating);
      localStorageRepository.setOne('ratedMovies', state.ratedMovies);
    },

    removeRating(state, action: PayloadAction<string>) {
      const newUserRating = { ...state.userRating };

      delete newUserRating[action.payload];

      const newRatedMovies = { ...state.ratedMovies };

      delete newRatedMovies[action.payload];

      state.userRating = newUserRating;
      state.ratedMovies = newRatedMovies;
      state.totalPages = Math.ceil(Object.values(state.ratedMovies).length / MOVIES_ON_PAGE);
      state.page = state.page > state.totalPages ? state.totalPages : state.page;

      const head = state.page * MOVIES_ON_PAGE;
      const tail = head - MOVIES_ON_PAGE;

      state.searchedMovies = Object.values(state.ratedMovies).filter((movie, index) => tail <= index && index < head);

      localStorageRepository.setOne('userRating', newUserRating);
      localStorageRepository.setOne('ratedMovies', newRatedMovies);
    },

    getAllRatedMovies(state) {
      state.userRating = localStorageRepository.getOne('userRating');
      state.ratedMovies = localStorageRepository.getOne('ratedMovies');
      state.totalPages = Math.ceil(Object.values(state.ratedMovies).length / MOVIES_ON_PAGE);
      state.page = 1;
      state.searchedMovies = Object.values(state.ratedMovies).filter((movie, index) => index < MOVIES_ON_PAGE);
    },

    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;

      const head = action.payload * MOVIES_ON_PAGE;
      const tail = head - MOVIES_ON_PAGE;

      state.searchedMovies = Object.values(state.ratedMovies).filter((movie, index) => tail <= index && index < head);
    },

    searchMovie(state, action: PayloadAction<string>) {
      if(!action.payload) {
        state.totalPages = Math.ceil(Object.values(state.ratedMovies).length / MOVIES_ON_PAGE);
        state.page = 1;
        state.searchedMovies = Object.values(state.ratedMovies).filter((movie, index) => index < MOVIES_ON_PAGE);
      } else {
        const searchRegexp = new RegExp(action.payload.toLowerCase());

        state.searchedMovies = Object.values(state.ratedMovies).filter(
          movie => searchRegexp.test(movie.title.toLowerCase())
        );
        state.page = 1;
      }
    },
  },
});

export const {
  removeRating ,
  setRating,
  getAllRatedMovies,
  searchMovie,
  changePage,
} = ratedMoviesSlice.actions;

export const ratedMoviesReducer = ratedMoviesSlice.reducer;
