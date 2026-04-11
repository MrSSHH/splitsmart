import { theme } from "@/src/constants/colors";
import { StyleSheet, View } from "react-native";
import Button from "../ui/Button";

export default function LoginForm() {
  return (
    <View style={styles.LoginFormContainer}>
      <Button
        theme="primary"
        label="Login"
        onPress={() => console.log("Pressed !")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  LoginFormContainer: {
    backgroundColor: theme.colors.card,
  },
});
