import { Shimmer } from '@/components/Animations/Shimmer/Shimmer';
import { StyledHomeSkeleton } from './HomeSkeleton.styled';

export const HomeSkeleton = () => {
  return (
    <StyledHomeSkeleton>
      <div className="section">
        <Shimmer width="91px" height="14px" borderRadius="4px" />
        <Shimmer width="100%" height="70px" borderRadius="14px" />
      </div>

      <div className="section">
        <Shimmer width="40px" height="14px" borderRadius="4px" />
        <div className="rows">
          <Shimmer width="100%" height="69px" borderRadius="14px" />
          <Shimmer width="100%" height="69px" borderRadius="14px" />
          <Shimmer width="100%" height="50px" borderRadius="14px" />
          <Shimmer width="100%" height="50px" borderRadius="14px" />
          <Shimmer width="100%" height="50px" borderRadius="14px" />
        </div>
      </div>

      <div className="fabShimmer" />
    </StyledHomeSkeleton>
  );
};
