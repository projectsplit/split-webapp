import React from "react";
import { StyledSpendingCycleInfo } from "./SpendingCycleInfo.styled";
import { SpendingCycleInfoProps } from "../../../interfaces";
import IonIcon from "@reacticons/ionicons";

export default function SpendingCycleInfo({ menu }: SpendingCycleInfoProps) {
  return (
    <StyledSpendingCycleInfo>
      <div className="header">
        <div className="info">
          <IonIcon name="information-circle-outline" className="infoLogo" />
          <strong>Spending Cycle</strong>
        </div>
        <div className="closeButton" onClick={() => (menu.value = null)}>
          <IonIcon name="close-outline" className="close" />
        </div>
      </div>
      <div className="text">
        <span className="firstP">
          Choose the day of the week or month when your budget cycle will begin.
          Your budget cycle will run from midnight on the chosen day and end at
          midnight on the same day in the following week or month.
        </span>
        <span className="secondP">
          For example, if you choose <strong>Monday</strong> as the day your
          budget commences, your budget will run from midnight{" "}
          <strong>00:00:00</strong> on a <strong>Monday</strong> until{" "}
          <strong>23:59:59</strong> on the following <strong>Sunday</strong>,{" "}
          effectively covering <strong>7</strong> days.
        </span>

        <span className="thirdP">
          If you choose the{" "}
          <strong>
            5<sup>th</sup>
          </strong>{" "}
          of the month as your starting day, your budget for the month will run
          from midnight <strong>00:00:00</strong> on the{" "}
          <strong>
            5<sup>th</sup>
          </strong>{" "}
          of one month until <strong>23:59:59</strong> on the{" "}
          <strong>
            4<sup>th</sup>
          </strong>{" "}
          of the next month.
        </span>
      </div>
    </StyledSpendingCycleInfo>
  );
}
