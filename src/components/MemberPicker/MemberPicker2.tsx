import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MemberPickerProps } from "../../interfaces";
import { useSignal } from "@preact/signals-react";
import { StyledMemberPicker } from "./MemberPicker.styled";
import { significantDigitsFromTicker } from "../../helpers/openExchangeRates";
import { CategorySelector } from "../CategorySelector/CategorySelector";
import Right from "./helpers/components/Right";
import Text from "./helpers/components/Text";
import NameAndAmounts from "./helpers/components/NameAndAmounts";
import { isEquallySplitFn } from "./helpers/isEquallySplitFn";
import { recalculateAmounts } from "./helpers/recalculateAmounts";
import { useRecalculateAmounts } from "./helpers/hooks/useRecalculateAmounts";
import { removeCommas } from "../../helpers/removeCommas";
import { currencyMask } from "../../helpers/currencyMask";
import { BiArrowBack } from "react-icons/bi";
import MyButton from "../MyButton/MyButton";
import MenuAnimationBackground from "../Menus/MenuAnimations/MenuAnimationBackground";
import ParticipantsPayersAnimation from "../Menus/MenuAnimations/ParticipantsPayersAnimation";
import { handleDoneClick } from "./helpers/handleDoneClick";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";
import { errorSettingFn } from "./helpers/errorSettingFn";

const MemberPickerPreMemo2 = ({
  memberAmounts,
  setMemberAmounts,
  totalAmount,
  description,
  error,
  category,
  userMemberId,
  selectedCurrency,
  setError,
  isnonGroupExpense,
  userId,
  groupMembers,
  nonGroupUsers,
  isLoading,
  isCreateExpense,
}: MemberPickerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const renderCounter = useRef<number>(0);
  const isEquallySplit = useSignal<boolean>(true);
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const errorMenu = useSignal<string>("");
  const [decimalDigits, setDecimalDigits] = useState<number>(2);

  renderCounter.current++;
  const clickOutsideListener = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      mainRef.current &&
      !mainRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    setDecimalDigits(significantDigitsFromTicker(selectedCurrency));
  }, [selectedCurrency]);

  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideListener);
    return () => {
      document.removeEventListener("mousedown", clickOutsideListener);
    };
  }, []);

  useEffect(() => {
    if (isCreateExpense) return;
    errorSettingFn(
      description,
      memberAmounts,
      setError,
      errorMenu,
      selectedCurrency,
      totalAmount
    );
  }, [totalAmount]);

  useRecalculateAmounts(
    memberAmounts,
    setMemberAmounts,
    totalAmount,
    userMemberId,
    decimalDigits,
    description,
    renderCounter,
    category,
    selectedCurrency,
    userId,
    groupMembers,
    nonGroupUsers,
    isCreateExpense,
    isnonGroupExpense
  );

  useLayoutEffect(() => {
    if (isLoading) return;
    isEquallySplit.value = isEquallySplitFn(
      memberAmounts,
      totalAmount,
      decimalDigits
    );
  }, [memberAmounts, totalAmount]);

  const selectMember = (selectedId: string): void => {
    const newFormMembers = memberAmounts.map((m) => {
      if (m.id === selectedId) {
        return { ...m, selected: true, order: renderCounter.current };
      }
      return m;
    });

    setMemberAmounts(
      recalculateAmounts(
        newFormMembers,
        totalAmount,
        decimalDigits,
        category,
        selectedCurrency,
        isCreateExpense
      )
    );
  };

  const deselectMember = (id: string): void => {
    const newFormMembers = memberAmounts.map((m) => {
      if (
        isnonGroupExpense?.value &&
        m.id === userId &&
        description === "Participants"
      )
        return m;

      if (m.id === id) {
        return {
          ...m,
          selected: false,
          actualAmount: "",
          screenQuantity: "",
          locked: false,
        };
      }
      return m;
    });

    setMemberAmounts(
      recalculateAmounts(
        newFormMembers,
        totalAmount,
        decimalDigits,
        category,
        selectedCurrency,
        isCreateExpense
      )
    );
  };

  const toggleLock = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ): void => {
    e.stopPropagation();
    const newFormMembers = memberAmounts.map((m) => {
      if (m.id === id) {
        return { ...m, locked: !m.locked };
      }
      return m;
    });
    setMemberAmounts(
      recalculateAmounts(
        newFormMembers,
        totalAmount,
        decimalDigits,
        category,
        selectedCurrency,
        isCreateExpense
      )
    );
  };

  const changeAmount = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (category.value !== "Amounts") {
      let value = e.target.value.replace(/,/g, "."); // Replace comma with dot
      const updatedMembers = memberAmounts.map((m) =>
        m.id === id ? { ...m, screenQuantity: value, locked: true } : m
      );
      setMemberAmounts(
        recalculateAmounts(
          updatedMembers,
          totalAmount,
          decimalDigits,
          category,
          selectedCurrency,
          isCreateExpense
        )
      );
      return;
    }

    const oldMember = memberAmounts.find((m) => m.id === id);
    const oldDisplayed = oldMember ? oldMember.screenQuantity : "";
    const oldDisplayedLength = oldDisplayed.length;
    const rawLength = e.target.value.length;
    const isAddition = rawLength > oldDisplayedLength;
    const isDeletion = rawLength < oldDisplayedLength;
    let formattedValue = currencyMask(e, selectedCurrency, oldDisplayed, true)
      .target.value;
    const clean = removeCommas(formattedValue);
    let actualAmount = clean;

    if (isNaN(Number(clean))) {
      if (clean === "." || clean === "") {
        if (isDeletion || clean === "") {
          formattedValue = "";
          actualAmount = "";
        } else if (isAddition) {
          formattedValue = ".";
          actualAmount = "0.";
        }
      }
    } else {
      const numericValue = Number(clean);
      if (numericValue > 999999999999.99) {
        formattedValue = oldDisplayed;
        actualAmount = removeCommas(oldDisplayed);
      } else if (clean.startsWith(".")) {
        actualAmount = "0" + clean;
      }
    }

    const updatedMembers = memberAmounts.map((m) =>
      m.id === id
        ? { ...m, screenQuantity: formattedValue, actualAmount, locked: true }
        : m
    );
    setMemberAmounts(
      recalculateAmounts(
        updatedMembers,
        totalAmount,
        decimalDigits,
        category,
        selectedCurrency,
        isCreateExpense
      )
    );
  };

  const handleInputBlur = (id: string) => {
    const updatedMembers = memberAmounts.map((m) => {
      if (m.id === id) {
        const cleanedValue = m.screenQuantity;
        const numericValue = Number(m.actualAmount);
        const isZero = numericValue === 0 || isNaN(numericValue);

        switch (category.value) {
          case "Amounts":
            return {
              ...m,
              screenQuantity: isZero ? "0.00" : cleanedValue,
              locked: isZero ? false : m.locked,
            };
          case "Shares":
            return {
              ...m,
              screenQuantity: isZero ? "" : cleanedValue,
              locked: isZero ? false : m.locked,
            };
          case "Percentages":
            return {
              ...m,
              screenQuantity: isZero ? "0.00" : cleanedValue,
              locked: isZero ? false : m.locked,
            };
          default:
            return m;
        }
      }
      return m;
    });
    setMemberAmounts(
      recalculateAmounts(
        updatedMembers,
        totalAmount,
        decimalDigits,
        category,
        selectedCurrency,
        isCreateExpense
      )
    );
  };

  const handleMainClick = () => {
    setMemberAmounts(
      recalculateAmounts(
        memberAmounts,
        totalAmount,
        decimalDigits,
        category,
        selectedCurrency,
        isCreateExpense
      )
    );
    setIsMenuOpen(!isMenuOpen);
  };

  const memoizedHandleDoneClick = useCallback(() => {
    handleDoneClick(
      description,
      memberAmounts,
      setError,
      errorMenu,
      selectedCurrency,
      totalAmount,
      setIsMenuOpen
    );
  }, [
    description,
    memberAmounts,
    setError,
    errorMenu,
    category,
    selectedCurrency,
    totalAmount,
    setIsMenuOpen,
  ]);

  const sortedMemberAmounts = useMemo(() => {
    return [...memberAmounts].sort(
      (a, b) => Number(b.selected) - Number(a.selected)
    );
  }, [memberAmounts]); 

  const selectedCount = useMemo(
    () => memberAmounts.filter((m) => m.selected).length,
    [memberAmounts] 
  );

  const selectedMembersForText = useMemo(() => {
  return memberAmounts
    .filter(m => m.selected)
    .sort((a, b) => (b.order ?? 0) - (a.order ?? 0)) // stable order
    .map(m => ({ id: m.id, name: m.name }));
}, [memberAmounts]);

  const isEquallySplitValue = isEquallySplit.value; 

  return (
    <StyledMemberPicker
      $selectedCount={selectedCount}
      $isOpen={isMenuOpen}
      $hasError={!!error}
      tabIndex={0}
      $category={category.value}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleMainClick();
        }
      }}
    >
      <div className="main" onClick={handleMainClick} ref={mainRef}>
        <Text
          description={description}
          isEquallySplit={isEquallySplitValue}
          selectedCount={selectedCount}
          selectedMembers={selectedMembersForText}
          error={error}
        />
      </div>
      {isMenuOpen && (
        <div className="menu" ref={dropdownRef}>
          <div className="header">
            <div className="closeButtonContainer">
              {" "}
              <BiArrowBack
                className="backButton"
                onClick={memoizedHandleDoneClick}
              />
            </div>

            <div className="title">
              {description === "Participants"
                ? `Split ${displayCurrencyAndAmount(
                    totalAmount.toString(),
                    selectedCurrency
                  )} by`
                : `${displayCurrencyAndAmount(
                    totalAmount.toString(),
                    selectedCurrency
                  )} paid by`}
            </div>
            <div className="gap"></div>
          </div>

          <div className="categories">
            <CategorySelector
              activeCat={"Amounts"}
              categories={{
                cat1: "Amounts",
                cat2: "Shares",
                cat3: "Percentages",
              }}
              navLinkUse={false}
              activeCatAsState={category}
            />
          </div>
          <div className="member-list">
            {sortedMemberAmounts
              .filter((m) => m.selected)
              .map((m) => (
                <div key={m.id} className="selected option">
                  <NameAndAmounts
                    description={description}
                    isnonGroupExpense={isnonGroupExpense}
                    userId={userId}
                    category={category}
                    m={m}
                    onClick={() => deselectMember(m.id)}
                    currency={selectedCurrency}
                  />
                  <Right
                    screenQuantity={m.screenQuantity}
                    category={category}
                    changeAmount={changeAmount}
                    handleInputBlur={handleInputBlur}
                    id={m.id}
                    locked={m.locked}
                    selectedCurrency={selectedCurrency}
                    toggleLock={toggleLock}
                    memberAmounts={memberAmounts}
                    inputRef={(el: any) => {
                      if (el) {
                        inputRefs.current.set(m.id, el);
                      } else {
                        inputRefs.current.delete(m.id);
                      }
                    }}
                  />
                </div>
              ))}
            {sortedMemberAmounts
              .filter((m) => !m.selected)
              .map((m) => (
                <div key={m.id} className="available option">
                  <div className="textAndCheck">
                    <div
                      className="tick-cube"
                      onClick={(_) => selectMember(m.id)}
                    />
                    {m.name}
                  </div>
                </div>
              ))}
          </div>
          <div className="spacer"></div>
          <MyButton fontSize="16" onClick={memoizedHandleDoneClick}>
            Done
          </MyButton>
          <MenuAnimationBackground menu={errorMenu} />
          <ParticipantsPayersAnimation menu={errorMenu} error={error} />
        </div>
      )}
    </StyledMemberPicker>
  );
};

export const MemberPicker2 = memo(MemberPickerPreMemo2, (prev, next) => {
  return (
    prev.description === next.description &&
    prev.totalAmount === next.totalAmount &&
    prev.memberAmounts === next.memberAmounts &&
    prev.error === next.error &&
    prev.selectedCurrency === next.selectedCurrency &&
    prev.category.value === next.category.value &&
    prev.isLoading === next.isLoading &&
    prev.userMemberId === next.userMemberId &&
    prev.isnonGroupExpense?.value === next.isnonGroupExpense?.value &&
    prev.userId === next.userId &&
    prev.isCreateExpense === next.isCreateExpense
  );
});

export default MemberPicker2;
