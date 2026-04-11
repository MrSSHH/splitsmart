import { View, StyleSheet } from "react-native";
import Button from "@/components/ui/Button";
import { theme } from "@/src/constants/colors";
import LoginForm from "@/components/auth/LoginForm";
export default function Login() {
  return (
    <View style={styles.loginContainer}>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    flex: 1,
  },
});
