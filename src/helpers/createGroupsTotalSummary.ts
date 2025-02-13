import { GroupsTotalAmountsResponse, GroupsTotalSummary } from "../types";

export function createGroupsTotalSummary(groupsTotalAmounts: GroupsTotalAmountsResponse | undefined): GroupsTotalSummary {
    if (!groupsTotalAmounts || !groupsTotalAmounts.groups) {
      return {
        numberOfGroups: 0,
        userIsOwedAmounts: {},
        userOwesAmounts: {},
      };
    }
  
    const userIsOwedAmounts: { [currency: string]: number } = {};
    const userOwesAmounts: { [currency: string]: number } = {};
  
    groupsTotalAmounts.groups.forEach(group => {
      Object.entries(group.details).forEach(([currency, amount]) => {
        if (amount > 0) {
          userIsOwedAmounts[currency] =  amount;
        } else if (amount < 0) {
          userOwesAmounts[currency] =  Math.abs(amount);
        }
      });
    });
  
    return {
      numberOfGroups: groupsTotalAmounts.groups.length,
      userIsOwedAmounts,
      userOwesAmounts,
    };
  }
  