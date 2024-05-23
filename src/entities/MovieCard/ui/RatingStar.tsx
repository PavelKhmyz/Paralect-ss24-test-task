import { IconStarFilled } from '@tabler/icons-react';
import { voteParser } from '@/entities/MovieCard';
import colors from '@/shared/styles/variable.module.scss';

interface IRatingStar {
  voteAverage?: number;
  voteCount?: number;
  className?: string;
}

export const RatingStar = ({ voteAverage = 0, voteCount = 0, className }: IRatingStar) => {
  return (
    <p className={className}>
      <IconStarFilled fill={colors.yellowMain}/>
      <span>{voteAverage}</span>
      <span>{voteParser(voteCount)}</span>
    </p>
  );
};
