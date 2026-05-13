import { Currency, DebtStatus } from "./mocks/home";

export type Group = {
  id: number;
  groupIcon: string;
  groupName: string;
  groupMembersAmt: number;
  groupDebt: number;
  currency: Currency.ILS;
  debtStatus: DebtStatus;
};
