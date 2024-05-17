import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from '@/app/(movies)/Movies.slice';
import { filtersReducer } from '@/components/FiltersBar/Filters.slice';
import { ratedMoviesReducer } from '@/app/(movies)/rated-movies/RatedMovies.slice';

export const makeStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    reducer: {
      movies: moviesReducer,
      filters: filtersReducer,
      rated: ratedMoviesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
