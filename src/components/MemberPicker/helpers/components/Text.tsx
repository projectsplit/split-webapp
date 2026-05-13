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

    const splitLabel = isEquallySplit ? 'equally' : 'unequally';

    const conjunction = selectedCount === 2 ? 'between' : 'among';

    return (
      <StyledText $error={error}>
        {description === 'Participants' ? (
          selectedCount === 0 ? (
            ''
          ) : selectedCount === 1 ? (
            <>
              Billed to <div className="button">{firstSelectedName} </div> and
            </>
          ) : (
            <>
              Split <div className="button">{splitLabel} </div> {conjunction}{' '}
              {selectedCount} and
            </>
          )
        ) : description === 'Payers' ? (
          selectedCount === 0 ? (
            ''
          ) : selectedCount === 1 ? (
            <>
              paid by <div className="button">{firstSelectedName} </div>
            </>
          ) : (
            <>
              paid <div className="button">{splitLabel} </div> by{' '}
              {selectedCount}
            </>
          )
        ) : null}
      </StyledText>
    );
  },
  // Dependency comparison function (optional, but safe)
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
