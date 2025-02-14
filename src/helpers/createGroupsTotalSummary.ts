import { GroupsTotalAmountsResponse, GroupsTotalSummary } from "../types";
import currency from "currency.js";

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
      Object.entries(group.details).forEach(([curr, amount]) => {
        

        if (amount > 0) {
          userIsOwedAmounts[curr] = currency(userIsOwedAmounts[curr] || 0).add(amount).value;
        } else if (amount < 0) {
          amount = amount*(-1)
          userOwesAmounts[curr] =  currency(userOwesAmounts[curr] || 0).add(amount).value;
        }
      });
    });
  
    return {
      numberOfGroups: groupsTotalAmounts.groups.length,
      userIsOwedAmounts,
      userOwesAmounts,
    };
  }
  