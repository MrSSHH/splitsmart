import { theme } from "@/constants/colors";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "../ui/Button";
import CustomInput from "../ui/CustomInput";
import { useState } from "react";

export default function LoginForm() {
  const [isPasswordVisble, setIsPasswordVisble] = useState(false);
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.LoginFormContainer}>
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Secure Login
        </Text>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: 14,
            marginBottom: 24,
          }}
        >
          Enter your credentials to access your account.
        </Text>
        <Text style={styles.inputLabel}>Email</Text>
        <CustomInput placeholder="you@example.com" />
        <Text style={styles.inputLabel}>Password</Text>

        <CustomInput placeholder="••••••••" censorInput={true} />
        <Button
          DesiredTheme="primary"
          label="Login"
          onPress={() => console.log("Pressed !")}
        />

        <Text style={styles.labelSecondary}>
          Don&apos;t have an account?{" "}
          <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
            Sign up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  screen: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },

  inputLabel: {
    color: theme.colors.textSecondary,
    paddingBottom: 10,
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: 4,
    fontWeight: 700,
    letterSpacing: 1,
  },
  labelSecondary: {
    color: theme.colors.textSecondary,
    paddingTop: 20,
    textAlign: "center",
  },
  LoginFormContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: 24,
    paddingBottom: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
});
