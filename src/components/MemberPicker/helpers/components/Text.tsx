import { Signal } from "@preact/signals-react";
import { PickerMember } from "../../../../types";

interface TextProps {
    description: string;
    selectedCount: number;
    sortedMemberAmounts:  PickerMember[];
    isEquallySplit: Signal<boolean>
    category: Signal<string>
}
const Text = ({description, selectedCount, sortedMemberAmounts, isEquallySplit}:TextProps) => {
  return (
    <div className="text">
      {description === "Participants"
        ? selectedCount === 0
          ? "Select participants"
          : selectedCount === 1
          ? `Billed to ${sortedMemberAmounts.find((m) => m.selected ===true)?.name}`
          : selectedCount === 2 && isEquallySplit.value
          ? `Split equally between ${selectedCount} `
          : selectedCount === 2 && !isEquallySplit.value
          ? `Split unequally between ${selectedCount} `
          : selectedCount > 2 && isEquallySplit.value
          ? `Split equally among ${selectedCount} `
          : `Split unequally among ${selectedCount} `
        : description === "Payers"
        ? selectedCount === 0
          ? "Select payers"
          : selectedCount === 1
          ? `Paid by ${sortedMemberAmounts.find((m) => m.selected ===true)?.name}`
          : selectedCount === 2 && isEquallySplit.value
          ? `Paid equally by ${selectedCount} `
          : selectedCount === 2 && !isEquallySplit.value
          ? `Paid unequally by ${selectedCount} `
          : selectedCount > 2 && isEquallySplit.value
          ? `Paid equally by ${selectedCount} `
          : `Paid unequally by ${selectedCount} `
        : null}
    </div>
  );
};

export default Text;