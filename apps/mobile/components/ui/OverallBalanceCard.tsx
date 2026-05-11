import { theme } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Image } from "react-native";
const WalletImage = require("@/assets/images/ui_icons/darkwallet.png");
type Props = {
  youOwe: number;
  youAreOwed: number;
  currency: string;
};

export default function OverallBalanceCard({
  youOwe,
  youAreOwed,
  currency,
}: Props) {
  return (
    
    <View style={styles.container}>
        <Image source={WalletImage} style={styles.walletImage} resizeMode="contain" />

      <Text style={styles.label}>Overall balance</Text>

      <Text style={styles.positiveLabel}>You are owed</Text>
        <View style={{ flexDirection: "row", alignItems: "baseline"}}  > 
            <Text style={styles.currency}>
                {currency}
            </Text>
            <Text style={styles.mainAmount}>
                {youAreOwed.toFixed(2)}
            </Text>
        </View>

      <View style={styles.pill}>
        <Text style={styles.pillText}>Net across 3 groups</Text>{" "}
        <Ionicons name={icons.trends} color={theme.colors.primary} size={14} style={{ marginLeft: 6 }} />
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View style={styles.bottomBlock}>
          <Text style={styles.bottomLabel}>People owe you</Text>
          <Text style={styles.greenAmount}>
            {currency}
            {youAreOwed}
          </Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.bottomBlock}>
          <Text style={styles.bottomLabel}>You owe</Text>
          <Text style={styles.redAmount}>
            {currency}
            {youOwe}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardDark ?? theme.colors.card,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: theme.colors.border,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
  currency: {
    color: theme.colors.successBright ?? theme.colors.success,
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: -1,

  },

    walletImage: {
        position: "absolute",
        top: 42,
        right: -8,
        width: 175,
        height: 175,
        opacity: 0.95,
    },

  label: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 22,
  },

  positiveLabel: {
    color: theme.colors.successBright ?? theme.colors.success,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  mainAmount: {
    color: theme.colors.successBright ?? theme.colors.success,
    fontSize: 46,
    fontWeight: "800",
    letterSpacing: -1,
  },

  pill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginTop: 12,
    backgroundColor: theme.colors.pillBackground ?? "#1A2230",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
  },

  pillText: {
    color: theme.colors.pillText ?? theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.divider ?? theme.colors.border,
    marginVertical: 24,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    
  },

  bottomBlock: {
    flex: 1,
  },

  bottomLabel: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  greenAmount: {
    color: theme.colors.successBright ?? theme.colors.success,
    fontSize: 20,
    fontWeight: "800",
  },

  redAmount: {
    color: theme.colors.dangerBright ?? theme.colors.danger,
    fontSize: 20,
    fontWeight: "800",
  },

  verticalDivider: {
    width: 1,
    height: 58,
    backgroundColor: theme.colors.divider ?? theme.colors.border,
    marginHorizontal: 20,
  },
});