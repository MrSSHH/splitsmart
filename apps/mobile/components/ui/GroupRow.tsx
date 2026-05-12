import { theme } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { DebtStatus } from "@/constants/mocks/home";

type Props = {
  group: Group;
};

export default function GroupRow({ group }: Props) {
  const iconName = String(group.groupIcon) as ComponentProps<typeof Ionicons>["name"];

  return (<Pressable>
    <View style={styles.container}>
      
      <View style={styles.iconContainer}>
        <Ionicons size={25} name={iconName}  color={"#000"}  />
      </View>

      <View style={styles.groupInfoContainer}>
        <Text style={styles.groupName}>{group.groupName}</Text>
        <Text style={styles.groupMembers}>{group.groupMembersAmt} members</Text>
      </View>

      <View style={styles.youOweContainer}>
        {group.debtStatus === DebtStatus.OWED_TO_YOU ? (
          <Text style={styles.youAreOwedLabel}>You are owed</Text>
        ) : (
          <Text style={styles.youOweLabel}>You owe</Text>
        )}
      </View>
    </View>


  </Pressable>);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  iconContainer: {
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  }
  ,
  groupInfoContainer: {
    justifyContent: "center",
    flex: 1,
  },
  groupName: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.textPrimary,

  },
  groupMembers: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  youOweContainer: {
    alignItems: "flex-end",
  },
  youAreOwedLabel: {
    fontSize: 12,
    color: theme.colors.greenTile,
  },
  youOweAmount: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.textPrimary,
  }
});
