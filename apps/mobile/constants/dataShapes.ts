import { DebtStatus } from "./mocks/home";

export type Group = {
  groupIcon: string;
  groupName: string;
  groupMembersAmt: number;
  debtStatus: DebtStatus;
};
