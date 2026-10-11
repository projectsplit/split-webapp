import BackButton from '../BackButton/BackButton';
import { StyledTopBarWithBackButton } from './TopBarWithBackButton.styled';
import { TopBarWithBackButtonProps } from '../../interfaces';

export default function TopBarWithBackButton({
  onClick,
  header,
  badge,
}: TopBarWithBackButtonProps) {
  return (
    <StyledTopBarWithBackButton>
      <BackButton onClick={onClick} />
      <div className="descr">
        <span className="descrText">{header}</span>
        {badge}
      </div>
    </StyledTopBarWithBackButton>
  );
}
