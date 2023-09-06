import { Transaction } from "@/@types/types";
import { isWithinInterval, subDays, subMonths, subYears } from "date-fns";

export const today = new Date();
export const last24Hours = subDays(today, 1);
export const last7Days = subDays(today, 7);
export const last30Days = subMonths(today, 1);
export const lastYear = subYears(today, 1);

export const filterTransactionsByPeriod = (startDate: Date, endDate: Date, transactions :  Transaction[]) => {
  return transactions.filter((transaction) =>
    isWithinInterval(new Date(transaction.expentAt), { start: startDate, end: endDate })
  );
};