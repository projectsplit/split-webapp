import { Signal } from "@preact/signals-react";
import { useEffect } from "react";
import { PickerMember } from "../../../types";
import { CategoryMap } from "../formStore/formStoreTypes";

export const useSetBySharesAmountsToZero = (
  payersCategory: Signal<string>,
  prevPayersByCategory: React.MutableRefObject<{
    "Amounts": PickerMember[];
    "Shares": PickerMember[];
    "Percentages": PickerMember[];
  }>,
  payersByCategory: {
    "Amounts": PickerMember[];
    "Shares": PickerMember[];
    "Percentages": PickerMember[];
  },
  participantsCategory: Signal<string>,
  prevParticipantsByCategory: React.MutableRefObject<{
    "Amounts": PickerMember[];
    "Shares": PickerMember[];
    "Percentages": PickerMember[];
  }>,
  participantsByCategory: {
    "Amounts": PickerMember[];
    "Shares": PickerMember[];
    "Percentages": PickerMember[];
  },
  setParticipantsByCategory:(updater: (prev: CategoryMap<PickerMember[]>) => CategoryMap<PickerMember[]>) => void,
  setPayersByCategory: (updater: (prev: CategoryMap<PickerMember[]>) => CategoryMap<PickerMember[]>) => void
) => {
  useEffect(() => {
    // Handle "Shares" for payers
    if (payersCategory.value === "Shares") {
      const prevPayers = prevPayersByCategory.current["Shares"];
      const currentPayers = payersByCategory["Shares"];
      const hasSelectedChange = currentPayers.some((member, index) => {
        const prevMember = prevPayers[index];
        return prevMember && !prevMember.selected && member.selected;
      });


      if (hasSelectedChange) {
        setPayersByCategory((prev) => ({
          ...prev,
          "Shares": prev["Shares"].map((member) => ({
            ...member,
            actualAmount:
              member.selected &&
              !prevPayers.find((p) => p.id === member.id && p.selected)
                ? ""
                : member.actualAmount,
            screenQuantity:
              member.selected &&
              !prevPayers.find((p) => p.id === member.id && p.selected)
                ? ''//'0'
                : member.screenQuantity,
            locked: member.selected ? false : member.locked,
          })),
        }));
      }
    }

    if (participantsCategory.value === "Shares") {
      const prevParticipants = prevParticipantsByCategory.current["Shares"];
      const currentParticipants = participantsByCategory["Shares"];
      const hasSelectedChange = currentParticipants.some((member, index) => {
        const prevMember = prevParticipants[index];
        return prevMember && !prevMember.selected && member.selected;
      });

      if (hasSelectedChange) {
        setParticipantsByCategory((prev) => ({
          ...prev,
          "Shares": prev["Shares"].map((member) => ({
            ...member,
            actualAmount:
              member.selected &&
              !prevParticipants.find((p) => p.id === member.id && p.selected)
                ? ""
                : member.actualAmount,
            screenQuantity:
              member.selected &&
              !prevParticipants.find((p) => p.id === member.id && p.selected)
                ? ''//'0'
                : member.screenQuantity,
            locked: member.selected ? false : member.locked,
          })),
        }));
      }
    }
    prevPayersByCategory.current = payersByCategory;
    prevParticipantsByCategory.current = participantsByCategory;
  }, [
    payersByCategory,
    payersCategory.value,
    participantsByCategory,
    participantsCategory.value,
  ]);
};
