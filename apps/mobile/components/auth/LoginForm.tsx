import { theme } from "@/src/constants/colors";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "../ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../ui/CustomInput";

export default function LoginForm() {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
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
          <CustomInput placeholder="Email" />
          <CustomInput placeholder="Password" censorInput={true} />
          <Button
            DesiredTheme="primary"
            label="Login"
            onPress={() => console.log("Pressed !")}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  LoginFormContainer: {
    backgroundColor: theme.colors.card, // #121821
    borderRadius: 24, // Soft, modern corners
    padding: 24, // Plenty of internal breathing room

    // --- BORDER ---
    borderWidth: 1,
    borderColor: theme.colors.border, // #1F2933 - defines the edge

    // --- SHADOW (Subtle Depth) ---
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10, // Essential for Android depth

    width: "100%",
    maxWidth: 400, // Keeps it from stretching too wide on tablets
    alignSelf: "center",
  },
});
