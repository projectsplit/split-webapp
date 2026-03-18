import React from 'react';
import { StyledShimmer } from './Shimmer.styled';

interface ShimmerProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const Shimmer: React.FC<ShimmerProps> = ({
  width,
  height,
  borderRadius,
}) => {
  return (
    <StyledShimmer
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
    />
  );
};
