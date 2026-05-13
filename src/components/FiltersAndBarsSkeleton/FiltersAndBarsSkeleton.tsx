import { Shimmer } from '@/components/Animations/Shimmer/Shimmer';
import { StyledFiltersAndBarsSkeleton } from './FiltersAndBarsSkeleton.styled';
import { Mode } from '@/types';

interface FiltersAndBarsSkeletonProps {
  mode: Mode;
}

export const FiltersAndBarsSkeleton = ({
  mode,
}: FiltersAndBarsSkeletonProps) => {
  const showGroupBars = mode !== Mode.Personal;

  return (
    <StyledFiltersAndBarsSkeleton>


      <div className="barsShimmer">
        {showGroupBars && (
          <div className="legendsShimmer">
            <div className="groupingShimmer">
              <Shimmer width="1rem" height="1rem" borderRadius="5px" />
              <Shimmer width="70px" height="14px" borderRadius="4px" />
            </div>
            <div className="groupingShimmer">
              <Shimmer width="1rem" height="1rem" borderRadius="5px" />
              <Shimmer width="60px" height="14px" borderRadius="4px" />
            </div>
          </div>
        )}

        {showGroupBars && (
          <div className="barRowShimmer">
            <Shimmer width="60%" height="0.5rem" borderRadius="10px" />
            <Shimmer width="60px" height="14px" borderRadius="4px" />
          </div>
        )}

        <div className="barRowShimmer">
          <Shimmer width="40%" height="0.5rem" borderRadius="10px" />
          <Shimmer width="50px" height="14px" borderRadius="4px" />
        </div>
      </div>
    </StyledFiltersAndBarsSkeleton>
  );
};
