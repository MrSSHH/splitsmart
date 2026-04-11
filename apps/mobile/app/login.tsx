import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  Platform,
} from "react-native";
import { theme } from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginForm from "@/components/auth/LoginForm";
export default function Login() {
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>SplitSmart</Text>
              <Text style={styles.subtitle}>
                Manage shared expenses effortlessly
              </Text>
            </View>
            <LoginForm />
          </View>
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
  loginContainer: {
    flex: 1,
  },
  header: {
    alignItems: "center",
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
