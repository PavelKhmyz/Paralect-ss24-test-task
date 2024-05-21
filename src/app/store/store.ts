import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from '@/features/filter-movies/lib/Movies.slice';
import { filtersReducer } from '@/features/filter-movies/lib/Filters.slice';
import { ratedMoviesReducer } from '@/features/rate-movies/lib/RatedMovies.slice';

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
