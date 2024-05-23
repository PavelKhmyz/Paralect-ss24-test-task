import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer, filtersReducer } from '@/features/filter-movies';
import { ratedMoviesReducer } from '@/features/rate-movies';

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
