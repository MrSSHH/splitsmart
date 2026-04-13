import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  Platform,
  ScrollView,
} from "react-native";
import { theme } from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginForm from "@/components/auth/LoginForm";
export default function Login() {
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.header}>
                <Text style={styles.title}>SplitSmart</Text>
                <Text style={styles.subtitle}>
                  Manage shared expenses effortlessly
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <LoginForm />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center", // centers everything vertically when keyboard is closed
    padding: 16,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    color: theme.colors.textPrimary,
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
  },
});
