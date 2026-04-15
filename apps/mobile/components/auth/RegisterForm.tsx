import { theme } from "@/constants/colors";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Button from "../ui/Button";
import CustomInput from "../ui/CustomInput";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();
  return (
    <View>
      <View style={styles.LoginFormContainer}>
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          Create an account
        </Text>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: 14,
            marginBottom: 14,
          }}
        >
          Fill in your details to get started.
        </Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>First name</Text>
            <CustomInput
              inputValue={firstName}
              inputSetValue={setFirstName}
              placeholder="Jane"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>Last name</Text>
            <CustomInput
              inputValue={lastName}
              inputSetValue={setLastName}
              placeholder="Doe"
            />
          </View>
        </View>
        <Text style={styles.inputLabel}>Email</Text>
        <CustomInput
          inputValue={email}
          keyboardType="email-address"
          inputSetValue={setEmail}
          placeholder="you@example.com"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <CustomInput
          inputValue={password}
          inputSetValue={setPassword}
          placeholder="••••••••"
          keyboardType="email-address"
          censorInput={true}
        />
        <Text style={styles.inputLabel}>Confirm password</Text>
        <CustomInput
          inputValue={confirmPassword}
          inputSetValue={setConfirmPassword}
          placeholder="••••••••"
          censorInput={true}
        />

        <Button
          DesiredTheme="primary"
          label="Register"
          onPress={() => console.log("Pressed !")}
        />
      </View>

      <Text style={styles.labelSecondary}>
        Have an account already?{" "}
        <Text
          style={{ color: theme.colors.primary, fontWeight: "bold" }}
          onPress={() => router.push("/login")}
        >
          Sign in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    color: theme.colors.textSecondary,
    paddingBottom: 4,
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: 4,
    fontWeight: "700",
    letterSpacing: 1,
  },
  labelSecondary: {
    color: theme.colors.textSecondary,
    paddingTop: 20,
    textAlign: "center",
  },
  LoginFormContainer: {
    justifyContent: "center",
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
