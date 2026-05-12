import ActivityCard from "@/components/ui/ActivityCard";
import OverallBalanceCard from "@/components/ui/OverallBalanceCard";
import { theme } from "@/constants/colors";
import { homeMock } from "@/constants/mocks/home";
import { getAccessToken } from "@/src/api/auth";
import { getTimeOfDay } from "@/src/api/utils";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getAccessToken();
      if (!storedToken) {
        console.log("No token found, redirecting to login.");
        return router.replace("/auth/login"); // TODO: UNCOMMENT THIS
      }
    };
    fetchToken();
  }, []);
  return (
    <ScrollView style={styles.screen}>
      <SafeAreaView edges={["top", "left", "right", "bottom"]}>
        <View style={{ paddingLeft: 10, paddingBottom: 5 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: theme.colors.textMuted,
              fontSize: 19,
            }}
          >
            Good {getTimeOfDay()},
          </Text>
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: 29,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            {homeMock.user.firstName} 👋
          </Text>
        </View>
        <View style={styles.overAllBalance}>
          <OverallBalanceCard
            youOwe={homeMock.balance.youOwe.amount}
            youAreOwed={55}
            currency={homeMock.currency}
          />
        </View>
        <View style={styles.activityRow}>
          <View style={styles.activityBtn}>
            <ActivityCard
              icon={icons.addExpense}
              title="Add expense"
              subtitle="Split with others"
            />
          </View>
          <View style={styles.activityBtn}>
            <ActivityCard
              icon={icons.settleUp}
              title="Settle up"
              subtitle="Pay or get paid"
            />{" "}
          </View>
          <View style={styles.activityBtn}>
            <ActivityCard
              icon={icons.group}
              title="New group"
              subtitle="Create a group"
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 10,
  },
  overAllBalance: {
    marginBottom: 10,
  },
  activityRow: {
    flexDirection: "row",
    gap: 10,
  },
  activityBtn: {
    flex: 1,
  },
});
