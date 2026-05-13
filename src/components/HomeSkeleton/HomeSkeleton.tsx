import { StyledHomeSkeleton } from './HomeSkeleton.styled';

export const HomeSkeleton = () => {
  return (
    <StyledHomeSkeleton>
      <div className="welcomeShimmer">
        <div className="boneLine" style={{ width: 75, height: 15, borderRadius: 4 }} />
        <div className="boneLine" style={{ width: 90, height: 15, borderRadius: 4 }} />
      </div>
      <div className="menuShimmer">
        <div className="bone" />
        <div className="bone" />
        <div className="bone" />
        <div className="bone" />
      </div>
      <div className="fabShimmer" />
    </StyledHomeSkeleton>
  );
};
