import { AspectRatio, Flex} from '@mantine/core';
import { IProductionCompanies, IVideos } from '@/shared/types';
import { ImageComponent } from '@/shared/ui';
import classes from './MovieDetails.module.scss';

interface IMovieDetails {
  trailer?: IVideos[];
  description?: string;
  production?: IProductionCompanies[];
}

export const MovieDetails = ({ trailer, description, production }: IMovieDetails) => {
  if(!trailer?.length && !description && !production?.length) {
    return null;
  }

  return (
    <Flex
      className={classes.movieDetailsWrapper}
      direction='column'
      gap='20'
    >
      {!!trailer?.length &&
        <div className={classes.movieDetailsComponentContainer}>
          <h3>Trailer</h3>
          <AspectRatio ratio={16 / 9} className={classes.aspectRatio}>
            <iframe
              src={process.env.NEXT_PUBLIC_YOUTUBE_BASE_URL && process.env.NEXT_PUBLIC_YOUTUBE_BASE_URL + trailer[0].key}
              title='YouTube video player'
              style={{ border: 0 }}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </AspectRatio>
        </div>
      }
      {description &&
        <div className={classes.movieDetailsComponentContainer}>
          <h3>Description</h3>
          <p>
            {description}
          </p>
        </div>
      }
      {!!production?.length &&
        <div className={classes.movieDetailsComponentContainer}>
          <h3>Production</h3>
          {production.map(el => (
            <Flex
              className={classes.productionElement}
              key={el.id}
              direction='row'
              align='center'
            >
              <ImageComponent posterPath={el.logo_path} className={classes.productionImage} width={40} height={40}/>
              <h4>{el.name}</h4>
            </Flex>
          ))}
        </div>
      }
    </Flex>
  );
};
