import { AspectRatio, Flex, Image } from '@mantine/core';
import './MovieDetails.style.scss';
import { IProductionCompanies, IVideos } from '@/app/api/movie-details/[id]/route';

const yotubeUrl = 'https://www.youtube.com/embed/';
const imageUrl = 'https://image.tmdb.org/t/p/';

interface IMovieDetails {
  trailer?: IVideos[];
  description?: string;
  production?: IProductionCompanies[];
}

export const MovieDetails = ({ trailer, description, production }: IMovieDetails) => {
  return (
    <Flex
      className='movie-details-wrapper'
      direction='column'
      gap='20'
    >
      <div className='movie-details-component-container'>
        <h3>Trailer</h3>
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={yotubeUrl + trailer?.[0].key}
            title="YouTube video player"
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      </div>
      <div className='movie-details-component-container'>
        <h3>Description</h3>
        <p>
          {description}
        </p>
      </div>
      <div className='movie-details-component-container'>
        <h3>Production</h3>
        {production && production.map(el => (
          <Flex
            className='production-element'
            key={el.id}
            direction='row'
            align='center'
          >
            <Image src={`${imageUrl}w200${el.logo_path}`} alt='poster'/>
            <h4>{el.name}</h4>
          </Flex>
        ))}
      </div>
    </Flex>
  );
};
