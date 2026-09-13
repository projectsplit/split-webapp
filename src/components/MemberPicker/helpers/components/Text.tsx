import { StyledText } from './Text.styled';
import { memo } from 'react';

interface TextProps {
  description: string;
  selectedCount: number;
  selectedMembers: { id: string; name: string }[];
  isEquallySplit: boolean;
  error: string | undefined;
}
const Text = memo(
  function Text({
    description,
    selectedCount,
    selectedMembers,
    isEquallySplit,
    error,
  }: TextProps) {
    const firstSelectedName = selectedMembers[0]?.name;

    const splitLabel = isEquallySplit ? 'Equally' : 'Unequally';

    const conjunction = selectedCount === 2 ? 'between' : 'among';

    const displayName = (name?: string) => (name === 'you' ? 'You' : (name ?? ''));

    const value =
      description === 'Participants'
        ? selectedCount === 0
          ? 'None'
          : selectedCount === 1
            ? `All to ${displayName(firstSelectedName)}`
            : `${splitLabel} ${conjunction} ${selectedCount}`
        : description === 'Payers'
          ? selectedCount === 0
            ? 'None'
            : selectedCount === 1
              ? displayName(firstSelectedName)
              : `${splitLabel} by ${selectedCount}`
          : '';

    return <StyledText $error={error}>{value}</StyledText>;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.description === nextProps.description &&
      prevProps.selectedCount === nextProps.selectedCount &&
      prevProps.isEquallySplit === nextProps.isEquallySplit &&
      prevProps.error === nextProps.error &&
      prevProps.selectedMembers[0]?.name === nextProps.selectedMembers[0]?.name
    );
  }
);

export default Text;
