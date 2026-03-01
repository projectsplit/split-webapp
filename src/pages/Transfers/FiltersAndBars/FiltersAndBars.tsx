import Spinner from "@/components/Spinner/Spinner";
import { StyledFiltersAndBars } from "./FiltersAndBars.styled"
import { renderTransferFilterPills } from "@/helpers/renderTransferFilterPills";
import BarsWithLegends from "@/components/BarsWithLegends/BarsWithLegends";
import { Signal } from "@preact/signals-react";
import { TransferParsedFilters, Group, TruncatedMember, UserInfo, Mode } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { useTransferTotals } from "../hooks/useTransferTotals";

interface FiltersAndBarsInterface {
  transferParsedFilters: Signal<TransferParsedFilters>
  allParticipants: TruncatedMember[]
  group: Group
  queryClient: QueryClient
  menu: Signal<string | null>
  currency: string,
  collapsed: boolean;
  totalsAreFetching: boolean;
  shouldOpenMultiCurrencyTable: boolean;
  userConvertedTotalReceived: number | undefined;
  userConvertedTotalSent: number | undefined;
}

export const FiltersAndBars = ({
  transferParsedFilters,
  allParticipants,
  group,
  queryClient,
  menu,
  currency,
  collapsed,
  totalsAreFetching,
  shouldOpenMultiCurrencyTable,
  userConvertedTotalReceived,
  userConvertedTotalSent,
}: FiltersAndBarsInterface) => {


  return (
    <StyledFiltersAndBars $collapsed={collapsed}>
      {totalsAreFetching ? (
        <div className="spinnerTotals">
          <Spinner />
        </div>
      ) : (
        <div className="filtersAndBars">
          <div className="pills">
            {" "}
            {renderTransferFilterPills(
              transferParsedFilters,
              allParticipants,
              group,
              queryClient
            )}
          </div>
          <BarsWithLegends
            bar1Legend="Total Sent"
            bar2Legend="Total Received"
            bar1Total={userConvertedTotalSent || 0}
            bar2Total={userConvertedTotalReceived || 0}
            currency={currency}
            bar1Color="#0CA0A0"
            bar2Color="#D79244"
            onClick={() => {
              if (shouldOpenMultiCurrencyTable) {
                menu.value = "epensesByCurrency";
              }
            }}
          />
        </div>
      )}
    </StyledFiltersAndBars>
  )
}
