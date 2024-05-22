import { Flex, Image } from '@mantine/core';
import NextImage from 'next/image';
import NoPoster from 'public/NoPoster.svg';
import colors from 'app/variable.module.scss';

interface IImageComponent {
  posterPath?: string;
  width?: number;
  height?: number | string;
  className?: string;
}

export const ImageComponent = ({ posterPath, width = 119, height='auto', className }: IImageComponent) => {
  return (
    posterPath
      ? <Image w={width} src={`${process.env.NEXT_PUBLIC_TMDB_IMG_BASE_URL}w200${posterPath}`} alt='poster' className={className}/>
      :
      <Flex
        align='center'
        justify='center'
        direction='column'
        w={width}
        h={height}
        className={className}
        style = {{
          backgroundColor: colors.grey200,
        }}
      >
        <NextImage src={NoPoster} alt='no-poster' width={width * 0.8} />
      </Flex>
  );
};
