import { theme } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, useRef } from "react";
import { View, StyleSheet, Pressable, Text, Animated } from "react-native";
import { DebtStatus } from "@/constants/mocks/home";
import { Group } from "@/constants/dataShapes";
import { icons } from "@/constants/icons";

type Props = {
  group: Group;
};

export default function GroupRow({ group }: Props) {
  const renderDebtStatus = () => {
    switch (group.debtStatus) {
      case DebtStatus.OWED_TO_YOU:
        return (
          <>
            <Text style={styles.youAreOwedLabel}>You are owed</Text>
            <Text
              style={{
                color: theme.colors.greenTile,
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              {group.groupDebt.toFixed(2)}
              {group.currency}
            </Text>
          </>
        );

      case DebtStatus.YOU_OWE:
        return (
          <>
            <Text style={styles.youOweLabel}>You owe</Text>
            <Text
              style={{
                color: theme.colors.dangerBright,
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              {group.groupDebt.toFixed(2)}
              {group.currency}
            </Text>
          </>
        );
      case DebtStatus.SETTLED:
        return (
          <>
            <Text style={styles.settledLabel}>Settled up</Text>
            <Text
              style={{
                color: theme.colors.textMuted,
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              {group.groupDebt.toFixed(2)}
              {group.currency}
            </Text>
          </>
        );
      default:
        return null;
    }
  };
  const iconName = String(group.groupIcon) as ComponentProps<
    typeof Ionicons
  >["name"];
  const scale = useRef(new Animated.Value(1)).current;
  const animateOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true });
  const animateIn = () =>
    Animated.spring(scale, { toValue: 0.9, useNativeDriver: true });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons size={25} name={iconName} color={"#000"} />
      </View>
      <View style={styles.groupInfoContainer}>
        <Text style={styles.groupName}>{group.groupName}</Text>
        <Text style={styles.groupMembers}>{group.groupMembersAmt} members</Text>
      </View>

      <View style={styles.oweContainer}>
        <View style={styles.debtTextContainer}>{renderDebtStatus()}</View>
        <Pressable
          onPress={() => console.log(`Group row ${group.groupName}`)}
          onPressIn={animateIn}
          onPressOut={animateOut}
          style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        >
          <Ionicons
            name={icons.enterChevron}
            size={20}
            color={theme.colors.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
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
  },
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
  oweContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  debtTextContainer: {
    alignItems: "flex-end",
  },
  youAreOwedLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.greenTile,
  },

  youOweLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.dangerBright,
  },
  settledLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.textMuted,
  },
  youOweAmount: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.textPrimary,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.9 }],
  },
});
