import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { UserInfo } from "../../types";
import { MemberPickerProps } from "../../interfaces";
import { useSignal } from "@preact/signals-react";
import { useOutletContext } from "react-router-dom";
import { StyledMemberPicker } from "./MemberPicker.styled";
import { significantDigitsFromTicker } from "../../helpers/openExchangeRates";
import { CategorySelector } from "../CategorySelector/CategorySelector";
import Right from "./helpers/components/Right";
import Text from "./helpers/components/Text";
import NameAndAmounts from "./helpers/components/NameAndAmounts";
import { isEquallySplitFn } from "./helpers/isEquallySplitFn";
import { recalculateAmounts } from "./helpers/recalculateAmounts";
import { useRecalculateAmounts } from "./helpers/hooks/useRecalculateAmounts";

const MemberPicker = ({
  memberAmounts,
  setMemberAmounts,
  totalAmount,
  description,
  error,
  group,
  category,
  selectedCurrency,
}: MemberPickerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const renderCounter = useRef<number>(0);
  const isEquallySplit = useSignal<boolean>(true);

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();

  const [decimalDigits, setDecimalDigits] = useState<number>(2);

  const members = group?.members;
  const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;

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
      recalculateAmounts(newFormMembers, totalAmount, decimalDigits, category)
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
      recalculateAmounts(newFormMembers, totalAmount, decimalDigits, category)
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
      recalculateAmounts(newFormMembers, totalAmount, decimalDigits, category)
    );
  };

  const changeAmount = (id: string, screenQuantity: string): void => {
    const updatedMembers = memberAmounts.map((m) => {
      if (m.id === id) {
        return { ...m, screenQuantity, locked: true };
      }
      return m;
    });
    setMemberAmounts(
      recalculateAmounts(updatedMembers, totalAmount, decimalDigits, category)
    );
  };

  // const handleInputBlur = (id: string) => {
  //   const updatedMembers = memberAmounts.map((m) => {
  //     if (m.id === id) {

  //       switch (category.value) {
  //         case "Amounts":
  //           const isZero = Number(m.screenQuantity) === 0;
  //           return {
  //             ...m,
  //             screenQuantity: isZero ? "0.00" : m.screenQuantity,
  //             locked: isZero ? false : m.locked,
  //           };
  //         case "Shares":
  //           const isShareZero = Number(m.screenQuantity) === 0;
  //           return {
  //             ...m,
  //             screenQuantity: isShareZero ? "" : m.screenQuantity, //"0"
  //             locked: isShareZero ? false : m.locked,
  //           };
  //         case "Percentages":
  //           const isPercentageZero = Number(m.screenQuantity) === 0;
  //           return {
  //             ...m,
  //             screenQuantity: isPercentageZero ? "0.00" : m.screenQuantity,
  //             locked: isPercentageZero ? false : m.locked,
  //           };
  //         default:
  //           return m;
  //       }
  //     }

  //     return m;
  //   });
  //   setMemberAmounts(
  //     recalculateAmounts(updatedMembers, totalAmount, decimalDigits, category)
  //   );
  // };

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
    recalculateAmounts(updatedMembers, totalAmount, decimalDigits, category)
  );
};

  const selectedCount = memberAmounts.filter((m) => m.selected).length;

  const handleMainClick = () => {
    setMemberAmounts(
      recalculateAmounts(memberAmounts, totalAmount, decimalDigits, category)
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
