import { theme } from "@/constants/colors";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={styles.screen} edges={["top","left", "right", "bottom"]}>
      <Text style={{ color: theme.colors.textPrimary }}>Profile</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
