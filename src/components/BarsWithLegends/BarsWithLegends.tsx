import { StyledBarWithLegends } from './BarsWithLegends.styled';
import { BarsWithLegendsProps } from '../../interfaces';
import { BarsAndAmounts } from './BarsAndAmounts/BarsAndAmounts';
import { Mode } from '@/types';

export default function BarsWithLegends({
  bar1Total,
  bar2Total,
  currency,
  bar1Legend,
  bar2Legend,
  onClick,
  mode,
  relation,
}: BarsWithLegendsProps) {
  return (
    <StyledBarWithLegends>
      <BarsAndAmounts
        mode={mode}
        relation={relation}
        onClick={onClick}
        currency={currency}
        bar1Total={bar1Total}
        bar2Total={bar2Total}
        bar1Legend={mode === Mode.Personal ? undefined : bar1Legend}
        bar2Legend={bar2Legend}
      />
    </StyledBarWithLegends>
  );
}
