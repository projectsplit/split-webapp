import IonIcon from '@reacticons/ionicons';
import { BalanceMetaProps } from '../../interfaces';
import { joinAmounts } from '../../helpers/joinAmounts';
import { StyledBalanceMeta } from './BalanceMeta.styled';

export default function BalanceMeta({ details }: BalanceMetaProps) {
  const owed = Object.entries(details ?? {}).filter(([, a]) => a > 0);
  const owedToYou = Object.entries(details ?? {}).filter(([, a]) => a < 0);

  if (owed.length === 0 && owedToYou.length === 0) {
    return (
      <StyledBalanceMeta>
        <span className="settled">
          <IonIcon name="checkmark-sharp" className="checkmark" />
          <span>Settled</span>
        </span>
      </StyledBalanceMeta>
    );
  }

  return (
    <StyledBalanceMeta>
      {owed.length > 0 ? (
        <span className="owe">
          You owe <span className="amount">{joinAmounts(owed)}</span>
        </span>
      ) : null}
      {owed.length > 0 && owedToYou.length > 0 ? (
        <span className="dot">&middot;</span>
      ) : null}
      {owedToYou.length > 0 ? (
        <span className="owed">
          Owed to you <span className="amount">{joinAmounts(owedToYou)}</span>
        </span>
      ) : null}
    </StyledBalanceMeta>
  );
}
