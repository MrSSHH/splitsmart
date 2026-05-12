import { theme } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  icon: ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle: string;
};

export default function ActivityCard({ icon, title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons
        name={icon as any}
        size={30}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardDark ?? theme.colors.card,
    alignItems: "center",
    borderRadius: 24,

    borderWidth: 1,
    borderColor: theme.colors.border,

    minHeight: 100,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,

    justifyContent: "center",
  },

  title: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },

  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },

  icon: {
    fontSize: 30,
  },
});
