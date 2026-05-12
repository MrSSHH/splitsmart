import { DebtStatus } from "@/constants/mocks/home";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  groupIcon: ComponentProps<typeof Ionicons>["name"];
  groupName: string;
  groupMembersAmt: number;
  debtStatus: DebtStatus;
};

export default function GroupRow({
  groupIcon,
  groupName,
  groupMembersAmt,
  debtStatus,
}: Props) {
  return <View></View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
