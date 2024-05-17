import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageRepository } from '@/lib/LocalStorageRepository';
import { IMovie, IMovies } from '@/app/api/movies/route';

const MOVIES_ON_PAGE = 4;

interface IUserRating {
  id: string;
  rating: number;
  movie: IMovie;
}

export interface IRatedMoviesState {
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

export const ratedMoviesInitialState: IRatedMoviesState = {
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

    removeAllRating(state) {
      state.userRating = {};
      state.ratedMovies = {};
      state.searchedMovies = [];
      state.page = 1;
      state.totalPages = 1;

      localStorageRepository.removeAll();
    },

    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
      const head = action.payload * MOVIES_ON_PAGE;
      const tail = head - MOVIES_ON_PAGE;

      state.searchedMovies = Object.values(state.ratedMovies).filter((movie, index) => tail <= index && index < head);
    },

    // TODO: Conflict when changing page if we found more then 4 movies, maybe I no need pagination after search, resolve this issue after complete search logic

    searchMovie(state, action: PayloadAction<string>) {
      if(!action.payload) {
        state.totalPages = Math.ceil(Object.values(state.ratedMovies).length / MOVIES_ON_PAGE);
        state.page = 1;
        state.searchedMovies = Object.values(state.ratedMovies).filter((movie, index) => index < MOVIES_ON_PAGE);
      } else {
        const searched = Object.values(state.ratedMovies).filter(movie => movie.title === action.payload);

        if(searched.length > MOVIES_ON_PAGE) {
          state.totalPages = Math.ceil(Object.values(state.ratedMovies).length / MOVIES_ON_PAGE);
          state.page = 1;
          state.searchedMovies = searched.filter((movie, index) => index < MOVIES_ON_PAGE);
        } else {
          state.searchedMovies = searched;
        }
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
  removeAllRating,
} = ratedMoviesSlice.actions;

export const ratedMoviesReducer = ratedMoviesSlice.reducer;
