import Pill from '../components/Pill/Pill';
import { tokens } from '../styles/tokens';

export const filterPill = (
  key: string,
  title: string,
  onClose: () => void
) => (
  <Pill
    key={key}
    title={title}
    color={tokens.ink.primary}
    closeButton={true}
    fontSize="14px"
    $textColor={tokens.ink.primary}
    $border={false}
    $closeButtonColor={tokens.ink.primary}
    onClose={onClose}
  />
);
