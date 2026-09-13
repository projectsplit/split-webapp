import { useTheme } from 'styled-components';
import { Mode } from '@/types';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import { percentLabel } from '../../../helpers/proportion';
import { BarsAndAmountsProps } from '../../../interfaces';
import ProportionBar from '../../ProportionBar/ProportionBar';
import { StyledBarsAndAmounts } from './BarsAndAmounts.styled';

export const BarsAndAmounts = ({
  onClick,
  currency,
  bar1Total,
  bar2Total,
  bar1Legend,
  bar2Legend,
  mode,
  relation = 'part-of',
}: BarsAndAmountsProps) => {
  const theme = useTheme();
  const isPartOf = relation === 'part-of';

  const partFill = isPartOf ? theme.accent.you.fill : theme.transfer.in;
  const partInk = isPartOf ? theme.accent.you.ink : theme.transfer.in;
  const wholeFill = isPartOf ? theme.accent.group.fill : theme.transfer.out;
  const wholeInk = isPartOf ? theme.accent.group.ink : theme.transfer.out;

  const partSide = (
    <div className="side">
      {bar2Legend ? (
        <div className="legend">
          <span className="swatch" style={{ backgroundColor: partFill }} />
          <span className="label">{bar2Legend}</span>
        </div>
      ) : null}
      <div className="figures">
        <span className="figure" style={{ color: partInk }}>
          {displayCurrencyAndAmount(bar2Total.toString(), currency)}
        </span>
        {isPartOf && mode !== Mode.Personal ? (
          <span className="percent">{percentLabel(bar2Total, bar1Total)}</span>
        ) : null}
      </div>
    </div>
  );

  if (mode === Mode.Personal) {
    return (
      <StyledBarsAndAmounts className="compact" onClick={onClick}>
        <div className="pair">{partSide}</div>
      </StyledBarsAndAmounts>
    );
  }

  const wholeSide = (
    <div className="side whole">
      {bar1Legend ? (
        <div className="legend">
          <span className="swatch" style={{ backgroundColor: wholeFill }} />
          <span className="label">{bar1Legend}</span>
        </div>
      ) : null}
      <div className="figures">
        <span className="figure" style={{ color: wholeInk }}>
          {displayCurrencyAndAmount(bar1Total.toString(), currency)}
        </span>
      </div>
    </div>
  );

  if (isPartOf) {
    return (
      <StyledBarsAndAmounts className="compact" onClick={onClick}>
        <div className="pair">{partSide}</div>
        <ProportionBar
          variant="stacked"
          part={bar2Total}
          whole={bar1Total}
          partColor={partFill}
          wholeColor={wholeFill}
        />
        <div className="pair below">{wholeSide}</div>
      </StyledBarsAndAmounts>
    );
  }

  return (
    <StyledBarsAndAmounts className="compact" onClick={onClick}>
      <div className="pair">{wholeSide}</div>
      <ProportionBar
        variant="split"
        part={bar1Total}
        whole={Math.abs(bar1Total) + Math.abs(bar2Total)}
        partColor={wholeFill}
        wholeColor={partFill}
      />
      <div className="pair below">{partSide}</div>
    </StyledBarsAndAmounts>
  );
};
