'use client';

import { Grid, UnstyledButton } from '@mantine/core';
import { DateValue } from '@mantine/dates';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import {
  changeFiltersError,
  changeGenre, changeRatingGte, changeRatingLte,
  changeSort,
  changeYear, getGenres,
  resetFilters,
} from '@/features/filter-movies/lib/Filters.slice';
import { useCallback, useEffect, useState } from 'react';
import { filterSortParams } from '@/features/filter-movies/lib/FiltersBar.constants';
import { MultiSelect, SelectInput, YearInput, NumberInput } from '@/shared/ui';
import { moviesValidator, paramsValidator } from '@/shared/lib';
import { getMovies, IGetMovies } from '@/features/filter-movies/lib/Movies.slice';
import './FiltersBar.style.scss';

export const FiltersBar = () => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState<boolean>(true);
  const {
    genres,
    validationErrors,
    with_genres,
    primary_release_year,
    page,
    sort_by,
    'vote_average.gte': voteGte,
    'vote_average.lte': voteLte,
  } = useAppSelector(state => state.filters);

  const handleChangeGenres = (value: string[]) => {
    dispatch(changeGenre(value));
  };

  const handleChangeReleaseYear = (value: DateValue) => {
    dispatch(changeYear(value));
  };

  const handleChangeSort = (value: string | null) => {
    dispatch(changeSort(value));
  };

  const handleChangeRatingFromValue = (value: string | number) => {
    dispatch(changeRatingGte(value));
  };

  const handleChangeRatingToValue = (value: string | number) => {
    dispatch(changeRatingLte(value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const validateSearchParams = useCallback(() => {
    const data = {
      with_genres,
      primary_release_year: primary_release_year ? primary_release_year.getFullYear() : null,
      page,
      sort_by,
      'vote_average.gte': voteGte,
      'vote_average.lte': voteLte,
    };

    const result = paramsValidator<IGetMovies>(data, moviesValidator);

    const validationErrors = {
      genreError: result.errors?.with_genres ? result.errors.with_genres : '',
      yearError: result.errors?.primary_release_year ? result.errors.primary_release_year : '',
      sortError: result.errors?.sort_by ? result.errors.sort_by : '',
      ratingError: result.errors?.['vote_average.gte']
        ? result.errors?.['vote_average.gte']
        : result.errors?.['vote_average.lte']
          ? result.errors?.['vote_average.lte']
          : '',
    };

    dispatch(changeFiltersError(validationErrors));

    if(result.success) {
      return result.data;
    }
  }, [dispatch, page, primary_release_year, sort_by, voteGte, voteLte, with_genres]);

  useEffect(() => {
    const validatedParams = validateSearchParams();

    if(validatedParams) {
      dispatch(getMovies(validatedParams));
    }
  }, [dispatch, validateSearchParams]);

  const handleDisableButton = useCallback(() => {
    if(with_genres.length > 0
      || primary_release_year
      || voteGte
      || voteLte
      || sort_by !== 'popularity.desc'
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [with_genres.length, primary_release_year, voteGte, voteLte, sort_by]);

  useEffect(() => {
    handleDisableButton();
  }, [handleDisableButton]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <>
      <Grid align='flex-end'>
        <Grid.Col span={3.6}>
          <MultiSelect
            label='Genres'
            placeholder='Select genre'
            data={genres}
            value={with_genres}
            error={validationErrors.genreError}
            onChange={handleChangeGenres}
          />
        </Grid.Col>
        <Grid.Col span={3.6}>
          <YearInput
            label='Release year'
            placeholder='Select release year'
            value={primary_release_year}
            error={validationErrors.yearError}
            onChange={handleChangeReleaseYear}
          />
        </Grid.Col>
        <Grid.Col span={1.8}>
          <NumberInput
            label='Rating'
            placeholder='From'
            minValue={0}
            maxValue={10}
            value={voteGte}
            error={validationErrors.ratingError}
            onChange={handleChangeRatingFromValue}
          />
        </Grid.Col>
        <Grid.Col span={1.8}>
          <NumberInput
            placeholder='To'
            minValue={Number(voteGte)}
            maxValue={10}
            value={voteLte}
            error={validationErrors.ratingError}
            onChange={handleChangeRatingToValue}
          />
        </Grid.Col>
        <Grid.Col span={1.2}>
          <UnstyledButton
            className='reset-button'
            onClick={handleResetFilters}
            disabled={disabled}
          >
          Reset filters
          </UnstyledButton>
        </Grid.Col>
      </Grid>
      <Grid justify='flex-end'>
        <Grid.Col span={3.6}>
          <SelectInput
            label='Sort by'
            data={filterSortParams}
            value={sort_by}
            error={validationErrors.sortError}
            onChange={handleChangeSort}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};
