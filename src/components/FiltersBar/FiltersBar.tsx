'use client';

import { Grid, NumberInput, rem, Select, UnstyledButton } from '@mantine/core';
import { IconChevronDown, IconSelector } from '@tabler/icons-react';
import { DateValue, YearPickerInput } from '@mantine/dates';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  changeGenre, changeRatingGte, changeRatingLte,
  changeSort,
  changeYear,
  resetFilters,
} from '@/components/FiltersBar/Filters.slice';
import './FiltersBar.style.scss';
import { useCallback, useEffect, useState } from 'react';
import { CustomMultiSelect } from '@/components/CustomMultiSelect/CustomMultiSelect';

const sortParams = [
  {value: 'original_title.asc', label: 'Original Title Ascending'},
  {value: 'original_title.desc', label: 'Original Title Descending'},
  {value: 'popularity.asc', label: 'Least Popular'},
  {value: 'popularity.desc', label: 'Most Popular'},
  {value: 'revenue.asc', label: 'Least Revenued'},
  {value: 'revenue.desc', label: 'Most Revenued'},
  {value: 'primary_release_date.asc', label: 'Released Date Ascending'},
  {value: 'primary_release_date.desc', label: 'Released Date Descending'},
  {value: 'title.asc', label: 'Title Ascending'},
  {value: 'title.desc', label: 'Title Descending'},
  {value: 'vote_average.asc', label: 'Least Average Voted'},
  {value: 'vote_average.desc', label: 'Most Average Voted'},
  {value: 'vote_count.asc', label: 'Least Voted'},
  {value: 'vote_count.desc', label: 'Most Voted'},
];

export const FiltersBar = () => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState<boolean>(true);
  const {
    genres,
    validationErrors,
    with_genres,
    primary_release_year,
    sort_by,
    'vote_average.gte': voteGte,
    'vote_average.lte': voteLte,
  } = useAppSelector(state => state.filters);

  const [selectArrow, setSelectArrow] = useState(false);
  const [multiSelectArrow, setMultiSelectArrow] = useState(false);

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

  return (
    <>
      <Grid align='flex-end'>
        <Grid.Col span={3.6}>
          <CustomMultiSelect
            data={genres}
            label='Genres'
            placeholder='Select genre'
            value={with_genres}
            rightSection={<IconChevronDown style={{ width: rem(16), height: rem(16) }} transform={multiSelectArrow ? 'rotate(180)' : undefined} />}
            onChange={handleChangeGenres}
            onDropdownOpen={() => setMultiSelectArrow(true)}
            onDropdownClose={() => setMultiSelectArrow(false)}
          />
        </Grid.Col>
        <Grid.Col span={3.6}>
          <YearPickerInput
            label='Release year'
            placeholder='Select release year'
            rightSection={<IconChevronDown style={{ width: rem(16), height: rem(16) }} />}
            value={primary_release_year}
            error={validationErrors.yearError}
            onChange={handleChangeReleaseYear}
          />
        </Grid.Col>
        <Grid.Col span={1.8}>
          <NumberInput
            label='Rating'
            placeholder='From'
            min={0}
            max={10}
            rightSection={<IconSelector style={{ width: rem(16), height: rem(16) }} />}
            value={voteGte}
            error={validationErrors.ratingError}
            onChange={handleChangeRatingFromValue}
          />
        </Grid.Col>
        <Grid.Col span={1.8}>
          <NumberInput
            placeholder='To'
            min={Number(voteGte)}
            max={10}
            rightSection={<IconSelector style={{ width: rem(16), height: rem(16) }} />}
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
          <Select
            label='Sort by'
            withCheckIcon={false}
            rightSection={<IconChevronDown style={{ width: rem(16), height: rem(16) }} transform={selectArrow ? 'rotate(180)' : undefined} />}
            data={sortParams}
            value={sort_by}
            error={validationErrors.sortError}
            onChange={handleChangeSort}
            onDropdownOpen={() => setSelectArrow(true)}
            onDropdownClose={() => setSelectArrow(false)}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};
