import { ProportionBarProps } from '../../interfaces';
import { proportion } from '../../helpers/proportion';
import {
  StyledStackedBar,
  StyledOverlayBar,
  StyledRailBar,
  StyledSplitBar,
} from './ProportionBar.styled';

export default function ProportionBar({
  variant,
  part,
  whole,
  partColor,
  wholeColor,
}: ProportionBarProps) {
  const sharePercent = proportion(part, whole) * 100;
  const share = `${sharePercent}%`;

  if (variant === 'stacked') {
    return (
      <StyledStackedBar>
        <div className="track">
          <div
            className="fill"
            style={{
              width: share,
              minWidth: sharePercent > 0 ? '5px' : 0,
              backgroundColor: partColor,
            }}
          />
        </div>
        <div className="whole" style={{ backgroundColor: wholeColor }} />
      </StyledStackedBar>
    );
  }

  if (variant === 'split') {
    return (
      <StyledSplitBar>
        <div
          className="lead"
          style={{
            width: share,
            minWidth: sharePercent > 0 ? '5px' : 0,
            backgroundColor: partColor,
          }}
        />
        <div
          className="trail"
          style={{
            width: `${100 - sharePercent}%`,
            minWidth: sharePercent < 100 ? '5px' : 0,
            backgroundColor: wholeColor,
          }}
        />
      </StyledSplitBar>
    );
  }

  if (variant === 'overlay') {
    return (
      <StyledOverlayBar style={{ backgroundColor: wholeColor }}>
        <div
          className="lead"
          style={{ width: share, backgroundColor: partColor }}
        />
      </StyledOverlayBar>
    );
  }

  return (
    <StyledRailBar style={{ backgroundColor: wholeColor }}>
      <span
        className="railFill"
        style={{ height: share, backgroundColor: partColor }}
      />
    </StyledRailBar>
  );
}
