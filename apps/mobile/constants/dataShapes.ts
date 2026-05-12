import { DebtStatus } from "./mocks/home";

export type Group = {
  id: number;
  groupIcon: string;
  groupName: string;
  groupMembersAmt: number;
  debtStatus: DebtStatus;
};
