import { theme } from "@/constants/colors";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Button from "../ui/Button";
import CustomInput from "../ui/CustomInput";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { signUpSchema } from "../../schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function registerForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onRegister = (data: any) => {
    console.log("Success! Sending to server:", data);

    //  API call or navigation
  };
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
            <Controller
              name="firstName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  placeholder="Jane"
                  inputOnBlur={onBlur}
                  inputSetValue={onChange}
                  inputValue={value}
                />
              )}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>Last name</Text>
            <Controller
              name="lastName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  placeholder="Doe"
                  inputOnBlur={onBlur}
                  inputSetValue={onChange}
                  inputValue={value}
                />
              )}
            />
          </View>
        </View>
        <Text style={styles.inputLabel}>Email</Text>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="you@example.com"
              inputOnBlur={onBlur}
              inputSetValue={onChange}
              keyboardType="email-address"
              inputValue={value}
            />
          )}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="••••••••"
              inputOnBlur={onBlur}
              inputSetValue={onChange}
              censorInput={true}
              inputValue={value}
            />
          )}
        />

        <Text style={styles.inputLabel}>Confirm password</Text>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="••••••••"
              inputOnBlur={onBlur}
              inputSetValue={onChange}
              censorInput={true}
              inputValue={value}
            />
          )}
        />

        <Button
          DesiredTheme="primary"
          label="Register"
          onPress={handleSubmit(onRegister)}
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
