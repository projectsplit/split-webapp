import React, { useState } from "react";
import { StyledCreateGroup } from "./CreateGroup.styled";
import { IoClose } from "react-icons/io5";
import { CreateGroupProps } from "../../../interfaces";
import { Currency, UserInfo } from "../../../types";
import { FaAngleDown } from "react-icons/fa";
import MenuAnimationBackground from "../../../components/Animations/MenuAnimationBackground";
import { useSignal } from "@preact/signals-react";
import { currencyData } from "../../../helpers/openExchangeRates";
import { useNavigate, useOutletContext } from "react-router-dom";
import CurrencyOptionsAnimation from "../../../components/Animations/CurrencyOptionsAnimation";
import MyButton from "../../../components/MyButton/MyButton";
import FormInput from "../../../components/FormInput/FormInput";
import { useCreateGroup } from "@/api/auth/CommandHooks/useCreateGroup";
//TODO invite people when creating group. When create group is hit then multiple invitations should be sent

export default function CreateGroup({
  menu,
  currencyMenu,
  nodeRef,
}: CreateGroupProps) {
  const [groupName, setGroupName] = useState<string>("");
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();
  const navigate = useNavigate();

  const userCurrency = userInfo?.currency;
  const [currencySymbol, setCurrencySymbol] = useState<string>(userCurrency);
  const allCurrencies = useSignal<Currency[]>(currencyData);

  const selectedCurrency = allCurrencies.value.find(
    (c) => c.symbol === currencySymbol
  );
  const { mutate: createGroup, isPending } = useCreateGroup();

  const onClickHandler = () => {
    createGroup(
      { name: groupName, currency: currencySymbol },
      {
        onSuccess: (data) => {
          menu.value = null;
          navigate(`/shared/${data.groupId}/expenses`, { state: { groupName } });
        },
      }
    );
  };

  const handldeCurrencyOptionsClick = (curr: string) => {
    setCurrencySymbol(curr);
    currencyMenu.value = null;
  };

  return (
    <StyledCreateGroup ref={nodeRef}>
      <div className="header">
        <div className="gap"></div>
        <div className="title">Create New Group</div>

        <div
          className="closeButtonContainer"
          onClick={() => (menu.value = null)}
        >
          <IoClose className="closeButton" />
        </div>
      </div>
      <div className="inputAndCurrWrapper">
        <div className="input">
          <FormInput
            placeholder="Group Name"
            value={groupName}
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
        <MyButton
          disabled={groupName.trim() === "" ? true : false}
          onClick={onClickHandler}
          isLoading={isPending}
          fontSize="16"
        >
          Create Group
        </MyButton>
      </div>

      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={currencySymbol}
      />
    </StyledCreateGroup>
  );
}
