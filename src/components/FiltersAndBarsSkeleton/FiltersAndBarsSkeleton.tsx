import { Shimmer } from '@/components/Animations/Shimmer/Shimmer';
import { StyledBarWithLegends } from '@/components/BarsWithLegends/BarsWithLegends.styled';
import { StyledBarsAndAmounts } from '@/components/BarsWithLegends/BarsAndAmounts/BarsAndAmounts.styled';
import {
  StyledSplitBar,
  StyledStackedBar,
} from '@/components/ProportionBar/ProportionBar.styled';
import { StyledFiltersAndBarsSkeleton } from './FiltersAndBarsSkeleton.styled';
import { Mode } from '@/types';

interface FiltersAndBarsSkeletonProps {
  mode: Mode;
  relation?: 'part-of' | 'independent';
}

const textShimmer = (width: string, height: string, className: string) => (
  <span className={className} style={{ width }}>
    &nbsp;
    <Shimmer height={height} borderRadius="3px" />
  </span>
);

const legendShimmer = (width: string) => (
  <div className="legend">
    <span className="swatch">
      <Shimmer width="100%" height="100%" borderRadius="2px" />
    </span>
    {textShimmer(width, '8px', 'label')}
  </div>
);

export const FiltersAndBarsSkeleton = ({
  mode,
  relation = 'part-of',
}: FiltersAndBarsSkeletonProps) => {
  const isPartOf = relation === 'part-of';
  const showGroupBars = mode !== Mode.Personal;

  const partSide = (figureHeight: string) => (
    <div className="side">
      {legendShimmer(showGroupBars ? '72px' : '44px')}
      <div className="figures">
        {textShimmer(showGroupBars ? '56px' : '72px', figureHeight, 'figure')}
        {isPartOf && showGroupBars
          ? textShimmer('20px', '8px', 'percent')
          : null}
      </div>
    </div>
  );

  const wholeSide = (figureHeight: string) => (
    <div className="side whole">
      {legendShimmer('62px')}
      <div className="figures">
        {textShimmer('72px', figureHeight, 'figure')}
      </div>
    </div>
  );

  return (
    <StyledFiltersAndBarsSkeleton>
      <div className="barsRow">
        <StyledBarWithLegends>
          <StyledBarsAndAmounts className="compact">
            {showGroupBars ? (
              <>
                <div className="pair">
                  {isPartOf ? partSide('12px') : wholeSide('12px')}
                </div>
                {isPartOf ? (
                  <StyledStackedBar>
                    <div className="track">
                      <Shimmer width="100%" height="100%" borderRadius="999px" />
                    </div>
                    <div className="whole">
                      <Shimmer width="100%" height="100%" borderRadius="999px" />
                    </div>
                  </StyledStackedBar>
                ) : (
                  <StyledSplitBar>
                    <div className="lead" style={{ width: '55%' }}>
                      <Shimmer width="100%" height="100%" borderRadius="999px" />
                    </div>
                    <div className="trail" style={{ width: '45%' }}>
                      <Shimmer width="100%" height="100%" borderRadius="999px" />
                    </div>
                  </StyledSplitBar>
                )}
                <div className="pair below">
                  {isPartOf ? wholeSide('10px') : partSide('10px')}
                </div>
              </>
            ) : (
              <div className="pair">{partSide('12px')}</div>
            )}
          </StyledBarsAndAmounts>
        </StyledBarWithLegends>
      </div>
    </StyledFiltersAndBarsSkeleton>
  );
};
