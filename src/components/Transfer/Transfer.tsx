import React from "react";
import { DateTime } from "luxon";
import { TransferProps } from "../../interfaces";
import { StyledTransfer } from "./Transfer.styled";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";

const Transfer: React.FC<TransferProps> = ({ transfer, timeZoneId }) => {
  const outlineColor =
    transfer.senderName === "You"
      ? "#0CA0A0"
      : transfer.receiverName === "You"
      ? "#D79244"
      : undefined;

      
  return (
    <StyledTransfer outlineColor={outlineColor}>
      <div className="main">
        <div className="mainMsg">
          {transfer.senderName === "You" ? (
            <>
              <div className="msg1">
                <div className="msg">
                  {" "}
                  You sent{" "}
                  {displayCurrencyAndAmount(
                    Math.abs(transfer.amount).toString(),
                    transfer.currency
                  )}
                </div>

                <div className="emoji">💸</div>
              </div>
              <div className="msg2">to {transfer.receiverName}</div>
            </>
          ) : transfer.receiverName === "You" ? (
            <>
              <div className="msg1">
                <div className="msg">
                  You received{" "}
                  {displayCurrencyAndAmount(
                    Math.abs(transfer.amount).toString(),
                    transfer.currency
                  )}
                </div>
                <div className="emoji">🤑</div>
              </div>
              <div className="msg2">from {transfer.senderName}</div>
            </>
          ) : (
            <>
              <div className="msg1" style={{ color: "#a3a3a3" }}>
                {transfer.senderName} sent{" "}
                {displayCurrencyAndAmount(
                  Math.abs(transfer.amount).toString(),
                  transfer.currency
                )}
              </div>
              <div className="msg2">to {transfer.receiverName}</div>
            </>
          )}
        </div>
        <div className="time">{TimeOnly(transfer.date, timeZoneId)}</div>
      </div>
      {transfer.description ? (
        <div className="descr">“ {transfer.description} ”</div>
      ) : null}
    </StyledTransfer>
  );
};

export default Transfer;

const TimeOnly = (eventTimeUtc: string, timeZone: string): string => {
  const eventDateTime = DateTime.fromISO(eventTimeUtc, { zone: "utc" }).setZone(
    timeZone
  );
  return eventDateTime.setZone(timeZone).toFormat("HH:mm");
};
