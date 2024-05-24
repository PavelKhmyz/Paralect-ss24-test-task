import { Loader as Load, LoadingOverlay } from '@mantine/core';
import colors from '@/shared/styles/variable.module.scss';

interface ILoader {
  loading: boolean;
}

export const Loader = ({ loading }: ILoader) => {
  return (
    <LoadingOverlay
      visible={loading}
      loaderProps={{
        children: <Load color={colors.purple400} type='bars' />,
      }}
    />
  );
};
