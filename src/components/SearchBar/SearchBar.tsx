'use client';

import { Fieldset, Flex, NumberInput, rem, Select, UnstyledButton } from '@mantine/core';
import { IconChevronDown, IconSelector } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { DateValue, YearPickerInput } from '@mantine/dates';
import { clientMoviesRepository } from '@/app/api/MovieRepository';
import { IGenre } from '@/app/api/movie-list/route';
import { useAppSelector } from '@/lib/hooks';

const fetchGenres = async (language?: string) => {
  const searchParams = new URLSearchParams({
    language: language ? language : 'en',
  });

  const { genres } = await clientMoviesRepository.getGenres(`/movie-list?${searchParams}`);

  return genres;
};

interface IRatings {
  from: number | string;
  to: number | string;
}

const sortParams = [
  {value: 'original_title.asc', label: 'Original title Asc'},
  {value: 'original_title.desc', label: 'Original title Desc'},
  {value: 'popularity.asc', label: 'Popularity Asc'},
  {value: 'popularity.desc', label: 'Popularity Desc'},
  {value: 'revenue.asc', label: 'Revenue Asc'},
  {value: 'revenue.desc', label: 'Revenue Desc'},
  {value: 'primary_release_date.asc', label: 'Primary release date Asc'},
  {value: 'primary_release_date.desc', label: 'Primary release date Desc'},
  {value: 'title.asc', label: 'Title Asc'},
  {value: 'title.desc', label: 'Title Desc'},
  {value: 'vote_average.asc', label: 'Vote average Asc'},
  {value: 'vote_average.desc', label: 'Vote average Desc'},
  {value: 'vote_count.asc', label: 'Vote count Asc'},
  {value: 'vote_count.desc', label: 'Vote count Desc'},
];

export const SearchBar = () => {
  const { page } = useAppSelector(state => state.movies);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [genreValue, setGenreValue] = useState<string | null>(null);
  const [releaseYearValue, setReleaseYearValue] = useState<DateValue>(null);
  const [sortValue, setSortValue] = useState<string | null>(null);
  const [ratingValue, setRatingValue] = useState<IRatings>({
    from: '',
    to: '',
  });

  useEffect(() => {
    (async () => setGenres(await fetchGenres()))();
  }, []);

  const handleChangeGenres = (value: string | null) => {
    setGenreValue(value);
  };

  const handleChangeReleaseYear = (value: DateValue) => {
    setReleaseYearValue(value);
  };

  const handleChangeSort = (value: string | null) => {
    setSortValue(value);
  };

  const handleChangeRatingFromValue = (value: string | number) => {
    setRatingValue(prev =>({ ...prev, from: value }));
  };

  const handleChangeRatingToValue = (value: string | number) => {
    setRatingValue(prev =>({ ...prev, to: value }));
  };

  const handleResetFilters = () => {
    setGenreValue(null);
    setReleaseYearValue(null);
    setSortValue(null);
    setRatingValue({
      from: '',
      to: '',
    });
  };

  return (
    <Flex>
      <Select
        label='Genres'
        placeholder='Select genre'
        rightSection={<IconChevronDown style={{ width: rem(16), height: rem(16) }} />}
        data={ genres.map(genre => genre.name) }
        value={genreValue}
        onChange={handleChangeGenres}
      />
      <YearPickerInput
        label='Release year'
        placeholder='Select release year'
        rightSection={<IconChevronDown style={{ width: rem(16), height: rem(16) }} />}
        value={releaseYearValue}
        onChange={handleChangeReleaseYear}
      />
      <Fieldset legend='Ratings' variant='unstyled'>
        <NumberInput
          placeholder='From'
          min={0}
          max={10}
          rightSection={<IconSelector style={{ width: rem(16), height: rem(16) }} />}
          value={ratingValue.from}
          onChange={handleChangeRatingFromValue}
        />
        <NumberInput
          placeholder='To'
          min={Number(ratingValue.from)}
          max={10}
          rightSection={<IconSelector style={{ width: rem(16), height: rem(16) }} />}
          value={ratingValue.to}
          onChange={handleChangeRatingToValue}
        />
      </Fieldset>
      <Select
        label='Sort by'
        rightSection={<IconChevronDown style={{ width: rem(16), height: rem(16) }} />}
        data={sortParams}
        value={sortValue}
        onChange={handleChangeSort}
      />
      <UnstyledButton onClick={handleResetFilters}>Reset filters</UnstyledButton>
    </Flex>
  );
};
