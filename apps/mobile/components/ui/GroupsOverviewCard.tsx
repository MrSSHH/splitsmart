import { theme } from "@/constants/colors";
import { View, Text, StyleSheet } from "react-native";

export default function GroupsOverviewCard() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardDark ?? theme.colors.card,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
});
