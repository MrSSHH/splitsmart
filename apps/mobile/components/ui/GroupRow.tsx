import { Group } from "@/constants/dataShapes";
import { DebtStatus } from "@/constants/mocks/home";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  Group: Group;
};

export default function GroupRow({ Group }: Props) {
  return <View></View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
