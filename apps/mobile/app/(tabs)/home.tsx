import ActivityCard from "@/components/ui/ActivityCard";
import OverallBalanceCard from "@/components/ui/OverallBalanceCard";
import { theme } from "@/constants/colors";
import { homeMock } from "@/constants/mocks/home";
import { getAccessToken } from "@/src/api/auth";
import { getTimeOfDay } from "@/src/api/utils";
import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import GroupsOverviewCard from "@/components/ui/GroupsOverviewCard";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getAccessToken();
      if (!storedToken) {
        console.log("No token found, redirecting to login.");
        // return router.replace("/auth/login"); // TODO: UNCOMMENT THIS
      }
    };
    fetchToken();
  }, []);

  return (
    <ScrollView style={styles.screen}>
      <SafeAreaView edges={["top", "left", "right", "bottom"]}>
        <View style={{ paddingLeft: 5 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: theme.colors.textSecondary,
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
        <View style={{ padding: 10 }}>
          <View style={styles.overAllBalance}>
            <OverallBalanceCard
              youOwe={homeMock.balance.youOwe.amount}
              youAreOwed={55}
              currency={homeMock.currency}
            />
          </View>

          <View style={styles.activityRow}>
            <ActivityCard
              icon={icons.addExpense}
              title="Add expense"
              subtitle="Split with others"
              onPress={() => console.log("Pressed add expense")}
            />
            <ActivityCard
              icon={icons.settleUp}
              title="Settle up"
              subtitle="Pay or get paid"
              onPress={() => console.log("Pressed settle up ")}
            />

            <ActivityCard
              icon={icons.group}
              title="New group"
              subtitle="Create a group"
              onPress={() => console.log("Pressed new group")}
            />
          </View>

          <View style={styles.groupOverview}>
            <Text style={styles.groupsTitle}>Your groups</Text>
            <GroupsOverviewCard groups={homeMock.groups} />
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
  groupOverview: {
    marginTop: 10,
  },
  groupsTitle: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
});
