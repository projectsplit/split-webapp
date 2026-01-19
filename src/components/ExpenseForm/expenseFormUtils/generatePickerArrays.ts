import { FormExpense, Guest, Member, User, UserInfo } from "../../../types";
import { createParticipantPickerArray } from "./createParticipantPickerArray";
import { createPayerPickerArray } from "./createPayerPickerArray";

export const generatePickerArrays = (
  groupMembers: (Member | Guest)[],
  nonGroupUsers: User[],
  expense: FormExpense | null,
  isCreateExpense: boolean,
  userInfo: UserInfo,
  userMemberId: string | undefined,
  isnonGroupExpense?: boolean,
  currentAmount?: string
) => {
  const participantsByCategory = {
    Amounts: createParticipantPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Amounts",
      isCreateExpense,
      isnonGroupExpense
    ),
    Shares: createParticipantPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Shares",
      isCreateExpense,
      isnonGroupExpense
    ),
    Percentages: createParticipantPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Percentages",
      isCreateExpense,
      isnonGroupExpense
    ),
  };

  const payersByCategory = {
    Amounts: createPayerPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Amounts",
      isCreateExpense,
      userInfo.userId,
      userMemberId,
      isnonGroupExpense,
      currentAmount
    ),
    Shares: createPayerPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Shares",
      isCreateExpense,
      userInfo.userId,
      userMemberId,
      isnonGroupExpense,
      currentAmount
    ),
    Percentages: createPayerPickerArray(
      groupMembers,
      nonGroupUsers,
      expense,
      "Percentages",
      isCreateExpense,
      userInfo.userId,
      userMemberId,
      isnonGroupExpense,
      currentAmount
    ),
  };

  return { participantsByCategory, payersByCategory };
};
