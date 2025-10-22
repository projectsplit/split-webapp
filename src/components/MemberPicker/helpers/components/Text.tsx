import { Signal } from "@preact/signals-react";
import { PickerMember } from "../../../../types";
import { StyledText } from "./Text.styled";

interface TextProps {
  description: string;
  selectedCount: number;
  sortedMemberAmounts: PickerMember[];
  isEquallySplit: Signal<boolean>;
  category: Signal<string>;
}
const Text = ({
  description,
  selectedCount,
  sortedMemberAmounts,
  isEquallySplit,
}: TextProps) => {
 
  return (
    <StyledText>
      {description === "Participants" ? (
        selectedCount === 0 ? (
          ""
        ) : selectedCount === 1 ? (
          <>
            Billed to{" "}
            <div className="button">
              {sortedMemberAmounts.find((m) => m.selected === true)?.name}{" "}
            </div>{" "}
            and
          </>
        ) : selectedCount === 2 && isEquallySplit.value ? (
          <>
            Split <div className="button">equally </div>{" "}
            between {selectedCount} and
          </>
        ) : selectedCount === 2 && !isEquallySplit.value ? (
          <>
            Split <div className="button">unequally </div>{" "}
            between {selectedCount} and
          </>
        ) : selectedCount > 2 && isEquallySplit.value ? (
          <>
            Split <div className="button">equally </div>{" "} among {selectedCount}{" "}
            and
          </>
        ) : (
          <>
            Split <div className="button">unequally </div>{" "} among {selectedCount}{" "}
            and
          </>
        )
      ) : description === "Payers" ? (
        selectedCount === 0 ? (
          ""
        ) : selectedCount === 1 ? (
          <>
            paid by{" "}
            <div className="button">
              {sortedMemberAmounts.find((m) => m.selected === true)?.name}{" "}
            </div>
          </>
        ) : selectedCount === 2 && isEquallySplit.value ? (
          <>
            paid <div className="button">equally </div>{" "} by {selectedCount}
          </>
        ) : selectedCount === 2 && !isEquallySplit.value ? (
          <>
            paid <div className="button">unequally </div>{" "} by {selectedCount}
          </>
        ) : selectedCount > 2 && isEquallySplit.value ? (
          <>
            paid <div className="button">equally </div>{" "} by {selectedCount}
          </>
        ) : (
          <>
            paid <div className="button">unequally </div>{" "} by {selectedCount}
          </>
        )
      ) : null}
    </StyledText>
  );
};

export default Text;
