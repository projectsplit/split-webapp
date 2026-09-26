import { StyledFiltersAndBars } from '@/components/FiltersAndBars/FiltersAndBars.styled';
import { FiltersAndBarsSkeleton } from '@/components/FiltersAndBarsSkeleton/FiltersAndBarsSkeleton';
import { renderTransferFilterPills } from '@/helpers/renderTransferFilterPills';
import BarsWithLegends from '@/components/BarsWithLegends/BarsWithLegends';
import { Signal } from '@preact/signals-react';
import { TransferParsedFilters, Group, Mode, TruncatedMember } from '@/types';
import { QueryClient } from '@tanstack/react-query';

interface FiltersAndBarsInterface {
  transferParsedFilters: Signal<TransferParsedFilters>;
  allParticipants: TruncatedMember[];
  group: Group;
  queryClient: QueryClient;
  menu: Signal<string | null>;
  currency: string;
  totalsAreFetching: boolean;
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
  totalsAreFetching,
  userConvertedTotalReceived,
  userConvertedTotalSent,
}: FiltersAndBarsInterface) => {
  const pills = renderTransferFilterPills(
    transferParsedFilters,
    allParticipants,
    group,
    queryClient
  );

  return (
    <StyledFiltersAndBars>
      {totalsAreFetching ? (
        <FiltersAndBarsSkeleton mode={Mode.Group} relation="independent" />
      ) : (
        <div className="filtersAndBars">
          <div className="barsRow">
            <BarsWithLegends
              bar1Legend="Total Sent"
              bar2Legend="Total Received"
              bar1Total={userConvertedTotalSent || 0}
              bar2Total={userConvertedTotalReceived || 0}
              currency={currency}
              relation="independent"
              onClick={() => {
                menu.value = 'epensesByCurrency';
              }}
            />
          </div>
          {pills.length > 0 ? (
            <div className="pills" onTouchStart={(e) => e.stopPropagation()}>
              {pills}
            </div>
          ) : null}
        </div>
      )}
    </StyledFiltersAndBars>
  );
};
