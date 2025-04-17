import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import { PickerMember, UserInfo } from "../../types";
import AutoWidthInput from "../AutoWidthInput";
import { MemberPickerProps } from "../../interfaces";
import { useSignal } from "@preact/signals-react";
import { useOutletContext } from "react-router-dom";
import { getSymbolFromCurrency } from "../../helpers/currency-symbol-map";
import { StyledMemberPicker } from "./MemberPicker.styled";
import { FaCheck } from "react-icons/fa";
import Separator from "../Separator/Separator";
import { significantDigitsFromTicker } from "../../helpers/openExchangeRates";

const MemberPicker = ({
  memberAmounts,
  setMemberAmounts,
  totalAmount,
  description,
  error,
  group,
 
  selectedCurrency,
}: MemberPickerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectAllTick, setSelectAllTick] = useState<boolean>(false);
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

  useEffect(() => {
    if (allMembersAreSelected(memberAmounts)) {
      setSelectAllTick(true);
    } else {
      setSelectAllTick(false);
    }
  }, [memberAmounts]);

  useEffect(() => {
    setMemberAmounts(
      recalculateAmounts(
        memberAmounts.map((m) =>
          m.id === userMemberId ? { ...m, name: "You" } : m
        )
      )
    );

    if (totalAmount > 0) {
      if (
        description === "Participants" &&
        !memberAmounts.some((m) => m.selected)
      ) {
        const newFormMembers = memberAmounts.map((m) => ({
          ...m,
          selected: true,
          order: renderCounter.current,
        }));
        setMemberAmounts(recalculateAmounts(newFormMembers));
      }
      if (description === "Payers" && !memberAmounts.some((m) => m.selected)) {
        const newFormMembers = memberAmounts.map((m) => ({
          ...m,
          selected: m.id === userMemberId,
          order: renderCounter.current,
        }));
        setMemberAmounts(recalculateAmounts(newFormMembers));
      }
    }

    if (totalAmount === 0) {
      const newFormMembers = memberAmounts.map((m) => ({
        ...m,
        selected: false,
        amount: "",
        locked: false,
      }));
      setMemberAmounts(newFormMembers);
    }
    return () => {};
  }, [totalAmount]);

  useEffect(() => {
    isEquallySplit.value = isEquallySplitFn(
      memberAmounts,
      totalAmount,
      decimalDigits
    );
  }, [memberAmounts]);

  const recalculateAmounts = (formMembers: PickerMember[]): PickerMember[] => {
    const lockedSelectedMembers = formMembers.filter(
      (m) => m.selected && m.locked
    );
    const unlockedSelectedMembers = formMembers.filter(
      (m) => m.selected && !m.locked
    );
    const lockedAmount = lockedSelectedMembers
      .map((m) => Number(m.amount))
      .reduce((total, a) => total + a, 0);
    const splitArray = split(
      totalAmount - lockedAmount,
      unlockedSelectedMembers.length,
      decimalDigits
    );

    return formMembers.map((m) => {
      if (m.selected && !m.locked) {
        return {
          ...m,
          amount: splitArray.shift()?.toFixed(decimalDigits) || "",
        };
      } else {
        return m;
      }
    });
  };

  const selectMember = (selectedId: string): void => {
    const newFormMembers = memberAmounts.map((m) => {
      if (m.id === selectedId) {
        return { ...m, selected: true, order: renderCounter.current };
      }
      return m;
    });
    setMemberAmounts(recalculateAmounts(newFormMembers));
  };

  const deselectMember = (id: string): void => {
    const newFormMembers = memberAmounts.map((m) => {
      if (m.id === id) {
        return { ...m, selected: false, amount: "", locked: false };
      }
      return m;
    });
    setMemberAmounts(recalculateAmounts(newFormMembers));
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
    setMemberAmounts(recalculateAmounts(newFormMembers));
  };

  const selectAll = (_: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const newFormMembers = memberAmounts.map((m) => ({
      ...m,
      selected: true,
      order: renderCounter.current,
    }));
    setMemberAmounts(recalculateAmounts(newFormMembers));
  };

  const selectNone = (): void => {
    const newFormMembers = memberAmounts.map((m) => ({
      ...m,
      selected: false,
      amount: "",
      locked: false,
    }));
    setMemberAmounts(newFormMembers);
  };

  const changeAmount = (id: string, amount: string): void => {
    const updatedMembers = memberAmounts.map((m) => {
      if (m.id === id) {
        return { ...m, amount, locked: true };
      }
      return m;
    });
    setMemberAmounts(recalculateAmounts(updatedMembers));
  };

  const handleInputBlur = (id: string) => {
    const updatedMembers = memberAmounts.map((m) => {
      if (m.id === id) {
        const isZero = Number(m.amount) === 0;
        return {
          ...m,
          amount: isZero ? "0.00" : m.amount,
          locked: isZero ? false : m.locked,
        };
      }
      return m;
    });
    setMemberAmounts(recalculateAmounts(updatedMembers));
  };

  const selectedCount = memberAmounts.filter((m) => m.selected).length;

  const handleMainClick = () => {
    setMemberAmounts(recalculateAmounts(memberAmounts));
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
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleMainClick();
        }
      }}
    >
      <div className="main" onClick={handleMainClick} ref={mainRef}>
        <div className="text">
          {description === "Participants"
            ? selectedCount === 0
              ? "Select participants"
              : selectedCount === 1
              ? `Billed to ${
                  sortedMemberAmounts.find((m) => m.amount != "")?.name
                }`
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
              ? `Paid by ${
                  sortedMemberAmounts.find((m) => m.amount != "")?.name
                }`
              : selectedCount === 2 && isEquallySplit.value
              ? `Paid equally by ${selectedCount} `
              : selectedCount === 2 && !isEquallySplit.value
              ? `Paid unequally by ${selectedCount} `
              : selectedCount > 2 && isEquallySplit.value
              ? `Paid equally by ${selectedCount} `
              : `Paid unequally by ${selectedCount} `
            : null}
        </div>
        <FiChevronDown className="icon" />
      </div>
      {isMenuOpen && (
        <div className="dropdown" ref={dropdownRef}>
          <div className="selectAll">
            <div
              className="tick-cube"
              onClick={() => {
                setSelectAllTick((prev) => {
                  const newValue = !prev;
                  if (newValue) {
                    selectAll(
                      {} as React.MouseEvent<HTMLDivElement, MouseEvent>
                    );
                  } else {
                    selectNone();
                  }
                  return newValue;
                });
              }}
            >
              {selectAllTick ? <FaCheck className="checkmark" /> : ""}
            </div>
            <div className={`${selectAllTick ? "" : "available"}`}>
              Select all
            </div>
          </div>
          <div className="separator">
            <Separator />
          </div>
          <div className="member-list">
            {sortedMemberAmounts
              .filter((m) => m.selected)
              .map((m) => (
                <div
                  key={m.id}
                  className="selected option"
                  onClick={() => deselectMember(m.id)}
                >
                  <div className="textAndCheck">
                    <div className="tick-cube">
                      <FaCheck className="checkmark" />
                    </div>
                    {m.name}
                  </div>
                  <div className="right">
                    <div>
                      {getSymbolFromCurrency(selectedCurrency)}
                      <AutoWidthInput
                        className="amount-input"
                        inputMode="decimal"
                        value={(m.amount)}
                        onBlur={(_) => handleInputBlur(m.id)}
                        onChange={(e) => changeAmount(m.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div onClick={(e) => toggleLock(e, m.id)}>
                      {m.locked ? (
                        <HiLockClosed className="locked-icon" />
                      ) : (
                        <HiLockOpen className="unlocked-icon" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {sortedMemberAmounts
              .filter((m) => !m.selected)
              .map((m) => (
                <div
                  key={m.id}
                  className="available option"
                  onClick={(_) => selectMember(m.id)}
                >
                  <div className="textAndCheck">
                    <div className="tick-cube" />
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

// const split = (amount: number, denominator: number): string[] =>
//   currency(amount)
//     .distribute(denominator)
//     .map((c) => c.value.toFixed(2).toString());

const isEquallySplitFn = (
  memberAmounts: PickerMember[],
  totalAmount: number,
  decimalDigits: number
): boolean => {
  const pickedMembersCount = memberAmounts.filter(
    (m) => m.amount !== ""
  ).length;

  if (pickedMembersCount === 0) {
    return true;
  }

  const equallySplitAmount = split(
    totalAmount,
    pickedMembersCount,
    decimalDigits
  )[0].toFixed(decimalDigits);
  const equallySplitAmountLowerEnd = split(
    totalAmount,
    pickedMembersCount,
    decimalDigits
  )[pickedMembersCount - 1].toFixed(decimalDigits);
  return memberAmounts
    .filter((m) => m.amount !== "")
    .every(
      (m) =>
        m.amount === equallySplitAmount ||
        m.amount === equallySplitAmountLowerEnd
    );
};

const allMembersAreSelected = (memberAmounts: PickerMember[]): boolean => {
  const numberofAllMembers = memberAmounts.length;
  const numberofSelectedMembers = memberAmounts.filter(
    (m) => m.selected
  ).length;

  return numberofAllMembers === numberofSelectedMembers;
};

const split = (
  total: number,
  splits: number,
  maxDecimals: number
): number[] => {
  if (
    splits <= 0 ||
    !Number.isInteger(splits) ||
    maxDecimals < 0 ||
    !Number.isInteger(maxDecimals)
  )
    return [];

  const multiplier = Math.pow(10, maxDecimals);
  const totalCents = Math.round(total * multiplier);
  const baseCents = Math.floor(totalCents / splits);
  const remainderCents = totalCents - baseCents * splits;

  const result = Array(splits).fill(baseCents);
  for (let i = 0; i < remainderCents; i++) {
    result[i]++;
  }

  return result
    .map((val) => Number((val / multiplier).toFixed(maxDecimals)))
    .sort((a, b) => a - b);
};
