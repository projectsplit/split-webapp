import IonIcon from '@reacticons/ionicons';
import { useTheme } from 'styled-components';
import { BarsAndAmounts } from '../../../components/BarsWithLegends/BarsAndAmounts/BarsAndAmounts';
import { GroupTotalExpensesByCurrencyProps } from '../../../interfaces';
import { StyledGroupTotalsByCurrency } from './GroupTotalsByCurrency.styled';
import { Mode } from '@/types';

export const GroupTotalsByCurrency = ({
  menu,
  bar1Legend,
  bar2Legend,
  groupTotalsByCurrency,
  userTotalsByCurrency,
  mode,
  relation,
}: GroupTotalExpensesByCurrencyProps) => {
  const theme = useTheme();
  const isPartOf = relation !== 'independent';
  const bar1Color = isPartOf ? theme.accent.group.fill : theme.transfer.out;
  const bar2Color = isPartOf ? theme.accent.you.fill : theme.transfer.in;
  const allCurrencies = Array.from(
    new Set([
      ...Object.keys(groupTotalsByCurrency),
      ...Object.keys(userTotalsByCurrency),
    ])
  );

  return (
    <StyledGroupTotalsByCurrency>
      <div className="dialogHeader">
        <div className="dialogTitle">By currency</div>
        <div className="closeButton" onClick={() => (menu.value = null)}>
          <IonIcon name="close-outline" />
        </div>
      </div>

      <div className="legends">
        {mode !== Mode.Personal && (
          <div className="grouping">
            <div
              className="legendGroup"
              style={{ backgroundColor: bar1Color }}
            />
            <div className="descr">{bar1Legend}</div>
          </div>
        )}
        <div className="grouping">
          <div className="legendUser" style={{ backgroundColor: bar2Color }} />
          <div className="descr">{bar2Legend}</div>
        </div>
      </div>
      {allCurrencies.map((currency) => (
        <BarsAndAmounts
          key={currency}
          currency={currency}
          bar1Total={groupTotalsByCurrency[currency] || 0}
          bar2Total={userTotalsByCurrency[currency] || 0}
          mode={mode}
          relation={relation}
        />
      ))}
    </StyledGroupTotalsByCurrency>
  );
};
