import { AspectRatio, Flex, Image } from '@mantine/core';
import { IProductionCompanies, IVideos } from '@/shared/types';
import './MovieDetails.style.scss';

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
      className='movie-details-wrapper'
      direction='column'
      gap='20'
    >
      {!!trailer?.length &&
        <div className='movie-details-component-container'>
          <h3>Trailer</h3>
          <AspectRatio ratio={16 / 9}>
            <iframe
              src={process.env.NEXT_PUBLIC_YOUTUBE_BASE_URL && process.env.NEXT_PUBLIC_YOUTUBE_BASE_URL + trailer[0].key}
              title="YouTube video player"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
        </div>
      }
      {description &&
        <div className='movie-details-component-container'>
          <h3>Description</h3>
          <p>
            {description}
          </p>
        </div>
      }
      {!!production?.length &&
        <div className='movie-details-component-container'>
          <h3>Production</h3>
          {production.map(el => (
            <Flex
              className='production-element'
              key={el.id}
              direction='row'
              align='center'
            >
              {el.logo_path &&
                <Image src={`${process.env.NEXT_PUBLIC_TMDB_IMG_BASE_URL}w200${el.logo_path}`} alt='poster'/>
              }
              <h4>{el.name}</h4>
            </Flex>
          ))}
        </div>
      }
    </Flex>
  );
};
