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
        {showGroupBars ? (
          <>
            <div className="rowShimmer">
              <Shimmer width="6px" height="6px" borderRadius="2px" />
              <Shimmer width="64px" height="10px" borderRadius="3px" />
              <Shimmer width="112px" height="16px" borderRadius="4px" />
            </div>

            <div className="bandShimmer">
              <Shimmer height="5px" borderRadius="999px" />
            </div>

            <div className="rowShimmer below">
              <Shimmer width="6px" height="6px" borderRadius="2px" />
              <Shimmer width="72px" height="10px" borderRadius="3px" />
              <Shimmer width="96px" height="14px" borderRadius="4px" />
            </div>
          </>
        ) : (
          <div className="rowShimmer">
            <Shimmer width="6px" height="6px" borderRadius="2px" />
            <Shimmer width="44px" height="10px" borderRadius="3px" />
            <Shimmer width="88px" height="16px" borderRadius="4px" />
          </div>
        )}
      </div>
    </StyledFiltersAndBarsSkeleton>
  );
};
