import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
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

const MemberPicker = ({
  memberAmounts,
  setMemberAmounts,
  totalAmount,
  description,
  error,
  category,
  userMemberId,
  selectedCurrency,
}: MemberPickerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const renderCounter = useRef<number>(0);
  const isEquallySplit = useSignal<boolean>(true);
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

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

  useRecalculateAmounts(
    memberAmounts,
    setMemberAmounts,
    totalAmount,
    userMemberId,
    decimalDigits,
    description,
    renderCounter,
    category
  );

  useEffect(() => {
    isEquallySplit.value = isEquallySplitFn(
      memberAmounts,
      totalAmount,
      decimalDigits
    );
  }, [memberAmounts]);

  const selectMember = (selectedId: string): void => {
    const newFormMembers = memberAmounts.map((m) => {
      if (m.id === selectedId) {
        return { ...m, selected: true, order: renderCounter.current };
      }
      return m;
    });

    setMemberAmounts(
      recalculateAmounts(newFormMembers, totalAmount, decimalDigits, category, selectedCurrency)
    );
  };

  const deselectMember = (id: string): void => {
    const newFormMembers = memberAmounts.map((m) => {
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
      recalculateAmounts(newFormMembers, totalAmount, decimalDigits, category, selectedCurrency)
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
      recalculateAmounts(newFormMembers, totalAmount, decimalDigits, category, selectedCurrency)
    );
  };

  const changeAmount = (id: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    
    if (category.value !== "Amounts") {
      const updatedMembers = memberAmounts.map((m) => {
        if (m.id === id) {
          return { ...m, screenQuantity: e.target.value, locked: true };
        }
        return m;
      });
      setMemberAmounts(
        recalculateAmounts(updatedMembers, totalAmount, decimalDigits, category, selectedCurrency)
      );
      return
    }

    const oldMember = memberAmounts.find((m) => m.id === id);
    const oldDisplayed = oldMember ? oldMember.screenQuantity : '';
    const originalValue = e.target.value;
    let formattedValue = currencyMask(
      e,
      selectedCurrency,
      oldDisplayed
    ).target.value ;
    let clean = removeCommas(formattedValue);
    let actualAmount: string = clean;
    const oldLength = oldDisplayed.length;
    const rawLength = originalValue.length;
    const isAddition = rawLength > oldLength;
    const isDeletion = rawLength < oldLength;
    if (isNaN(Number(clean))) {
      if (clean === '.' || clean === '') {
        if (isDeletion || clean === '') {
          formattedValue = '';
          actualAmount = '';
        } else if (isAddition) {
          formattedValue = '.';
          actualAmount = '0.';
        }
      }
    } else {
      if (clean.startsWith('.')) {
        actualAmount = '0' + clean;
      }
    }

    const updatedMembers = memberAmounts.map((m) => {
      if (m.id === id) {
        return { ...m, screenQuantity: formattedValue, actualAmount, locked: true };
      }
      return m;
    });
    setMemberAmounts(
      recalculateAmounts(updatedMembers, totalAmount, decimalDigits, category, selectedCurrency)
    );
  };


  const handleInputBlur = (id: string) => {
    const updatedMembers = memberAmounts.map((m) => {
      if (m.id === id) {
        const cleanedValue = m.screenQuantity
          .replace(/^0+(?=\d*\.?\d+)/, (match) => (match.includes(".") ? "0" : ""))
          .replace(/\.$/, ""); // Remove trailing decimal point
        const numericValue = Number(cleanedValue);
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
      recalculateAmounts(updatedMembers, totalAmount, decimalDigits, category, selectedCurrency)
    );
  };

  const selectedCount = memberAmounts.filter((m) => m.selected).length;

  const handleMainClick = () => {
    setMemberAmounts(
      recalculateAmounts(memberAmounts, totalAmount, decimalDigits, category, selectedCurrency)
    );
    setIsMenuOpen(!isMenuOpen);
  };

  const sortedMemberAmounts = [...memberAmounts].sort((a, b) => {
    if (a.id === userMemberId) return -1;
    if (b.id === userMemberId) return 1;
    return 0;
  });

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
          isEquallySplit={isEquallySplit}
          selectedCount={selectedCount}
          sortedMemberAmounts={sortedMemberAmounts}
          category={category}
        />
        <FiChevronDown className="icon" />
      </div>
      {isMenuOpen && (
        <div className="dropdown" ref={dropdownRef}>
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
        </div>
      )}
      <div className="meta">
        {description && <span className="description">{description}</span>}
        {<span className="error">{error}</span>}
      </div>
    </StyledMemberPicker>
  );
};

export default MemberPicker;



