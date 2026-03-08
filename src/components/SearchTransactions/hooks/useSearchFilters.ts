import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import {
  CreateExpenseFilterRequest,
  CreateTransferFilterRequest,
  FetchedLabel,
  FilteredPeople,
  GetLabelsResponse,
  Group,
  User,
} from "../../../types";
import {
  getFilterStorageKey,
  localStorageStringParser,
} from "../helpers/localStorageStringParser";
import { initializeFilterState } from "../helpers/initializeFilterState";

export const useSearchFilters = (
  group: Group | null,
  allUsers: User[],
  suggestedLabels: GetLabelsResponse | undefined,
  isPersonal?: boolean
) => {
  const location = useLocation();
  const params = useParams();
  const path = location.pathname.split("/").pop() || "";
  const category = useSignal<string>("expenses");

  const submitButtonIsActive = useSignal<boolean>(false);
  const cancelled = useSignal<boolean>(false);
  const searchKeyword = useSignal<string>("");

  const expenseFilterState = useSignal<CreateExpenseFilterRequest>({
    groupId: group?.id || "",
    participantsIds: [],
    payersIds: [],
    freeText: "",
    before: [],
    during: [],
    after: [],
    labels: [],
  });

  const transferFilterState = useSignal<CreateTransferFilterRequest>({
    groupId: group?.id || "",
    receiversIds: [],
    sendersIds: [],
    freeText: "",
    before: [],
    during: [],
    after: [],
  });

  const filteredPeople = useSignal<FilteredPeople>({
    payers: [],
    participants: [],
    senders: [],
    receivers: [],
  });

  const filteredLabels = useSignal<FetchedLabel[]>([]);

  useEffect(() => {
    if (isPersonal) {
      category.value = "expenses";
    } else if (path === "debts") {
      category.value = "expenses";
    } else {
      category.value = path;
    }
  }, [path, category, isPersonal]);

  const { expenseFilter, transferFilter } = useMemo(() => {
    return localStorageStringParser(
      localStorage.getItem(getFilterStorageKey("expense", group?.id, isPersonal)),
      localStorage.getItem(getFilterStorageKey("transfer", group?.id))
    );
  }, [group?.id]);

  useEffect(() => {
    initializeFilterState(
      expenseFilter,
      transferFilter,
      params,
      expenseFilterState,
      transferFilterState,
      filteredPeople,
      filteredLabels,
      group,
      suggestedLabels,
      allUsers
    );
  }, [
    expenseFilter,
    transferFilter,
    params.groupid,
    cancelled.value,
    allUsers,
    expenseFilterState,
    transferFilterState,
    filteredPeople,
    filteredLabels,
    group,
    params
  ]);

  return {
    category,
    expenseFilterState,
    transferFilterState,
    filteredPeople,
    filteredLabels,
    submitButtonIsActive,
    cancelled,
    searchKeyword,
    path,
  };
};
