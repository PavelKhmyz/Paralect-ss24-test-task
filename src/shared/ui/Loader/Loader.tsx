import { Loader as Load, LoadingOverlay } from '@mantine/core';
import React from 'react';
import colors from 'app/variable.module.scss';

interface ILoader {
  loading: boolean;
}

export const Loader = ({ loading }: ILoader) => {
  return (
    <LoadingOverlay visible={loading} loaderProps={{children: <Load color={colors.purple400} type='bars' />}} />
  );
};
