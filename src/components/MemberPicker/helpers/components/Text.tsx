import { StyledText } from "./Text.styled";
import { memo } from "react";

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

    return (
      <StyledText $error={error}>
        {description === "Participants" ? (
          selectedCount === 0 ? (
            ""
          ) : selectedCount === 1 ? (
            <>
              Billed to <div className="button">{firstSelectedName} </div> and
            </>
          ) : selectedCount === 2 && isEquallySplit ? (
            <>
              Split <div className="button">equally </div> between{" "}
              {selectedCount} and
            </>
          ) : selectedCount === 2 && !isEquallySplit ? (
            <>
              Split <div className="button">unequally </div> between{" "}
              {selectedCount} and
            </>
          ) : selectedCount > 2 && isEquallySplit ? (
            <>
              Split <div className="button">equally </div> among {selectedCount}{" "}
              and
            </>
          ) : (
            <>
              Split <div className="button">unequally </div> among{" "}
              {selectedCount} and
            </>
          )
        ) : description === "Payers" ? (
          selectedCount === 0 ? (
            ""
          ) : selectedCount === 1 ? (
            <>
              paid by <div className="button">{firstSelectedName} </div>
            </>
          ) : selectedCount === 2 && isEquallySplit ? (
            <>
              paid <div className="button">equally </div> by {selectedCount}
            </>
          ) : selectedCount === 2 && !isEquallySplit ? (
            <>
              paid <div className="button">unequally </div> by {selectedCount}
            </>
          ) : selectedCount > 2 && isEquallySplit ? (
            <>
              paid <div className="button">equally </div> by {selectedCount}
            </>
          ) : (
            <>
              paid <div className="button">unequally </div> by {selectedCount}
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
      prevProps.error === nextProps.error&&
      prevProps.selectedMembers[0]?.name === nextProps.selectedMembers[0]?.name
    );
  }
);

export default Text;
