import React, { useState } from "react";
import { StyledCreateGroup } from "./CreateGroup.styled";
import { IoClose } from "react-icons/io5";
import { CreateGroupProps } from "../../../interfaces";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import Input from "../../../components/Input/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroupFn } from "../../../api/services/api";
import { Currency, GroupRequest } from "../../../types";
import { FaAngleDown } from "react-icons/fa";
import MenuAnimationBackground from "../../../components/MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../../../components/MenuAnimations/CurrencyOptionsAnimation";
import { useSignal } from "@preact/signals-react";
import { currencyData } from "../../../helpers/openExchangeRates";

export default function CreateGroup({
  menu,
  currencyMenu,
  nodeRef,
}: CreateGroupProps) {
  const [groupName, setGroupName] = useState<string>("");
  const queryClient = useQueryClient();
  const currency = useSignal<string>(
    localStorage.getItem("currency") || "USD"
  );
  const allCurrencies = useSignal<Currency[]>(currencyData);

  const selectedCurrency = allCurrencies.value.find(
    (c) => c.symbol === currency.value
  );

  const createGroup = useMutation<any, any, GroupRequest>({
    mutationFn: (groupData) => createGroupFn(groupData),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["groups", "active"] });
      queryClient.refetchQueries({ queryKey: ["home"] });
    },
  });

  const onClickHandler = () => {
    queryClient.invalidateQueries({ queryKey: ["groups", "active"] });
    queryClient.invalidateQueries({ queryKey: ["home"] });
    createGroup.mutate({ name: groupName, currency: currency.value });
    menu.value = null;
  };

  const handldeCurrencyOptionsClick = (curr: string) => {
    //setCurrency(currency);
    currency.value = curr;
    localStorage.setItem("currency", curr);
    // queryClient.invalidateQueries(["spending", budgettype, curr]);
    // queryClient.getQueryData(["spending", budgettype, curr]);
    currencyMenu.value = null;
  };

  return (
    <StyledCreateGroup ref={nodeRef}>
      <div className="header">
        <div
          className="closeButtonContainer"
          onClick={() => (menu.value = null)}
        >
          <IoClose className="closeButton" />
        </div>
        <div className="title">Create New Group</div>
        <div className="gap"></div>
      </div>
      <div className="inputAndCurrWrapper">
        <div className="input">
          <Input
            placeholder="Group Name"
            backgroundcolor="#2d2d2d"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGroupName(e.target.value)
            }
          />
        </div>
        <div className="currencySelectorWrapper">
          <div
            className="currencySelector"
            onClick={() => (currencyMenu.value = "currencyOptions")}
          >
            <div className={selectedCurrency?.flagClass} />
            <div>{selectedCurrency?.symbol}</div>
            <FaAngleDown className="angleDown" />
          </div>
        </div>
      </div>
      <div className="submitButton">
        <SubmitButton
          disabled={groupName.trim() === "" ? false : true}
          onClick={onClickHandler}
        >
          Create Group
        </SubmitButton>
      </div>

      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
      />
    </StyledCreateGroup>
  );
}
