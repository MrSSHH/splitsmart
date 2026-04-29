import { theme } from "@/constants/colors";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import Button from "../ui/Button";
import CustomInput from "../ui/CustomInput";
import { useRouter } from "expo-router";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchemas";
import { Controller, useForm } from "react-hook-form";
import { loginUser } from "@/src/api/auth";
import { userLoginRequest, userLoginResponse } from "@/constants/authShapes";
export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [hasLoginFailed, setHasLoginFailed] = useState<boolean>(false);
  const onSubmit = async (data: userLoginRequest) => {
    console.log(data);
    try {
      setHasLoginFailed(false);
      const userData: userLoginResponse = await loginUser(
        data.email,
        data.password
      );
      console.log(
        "Success",
        `Welcome back, accessToken: ${userData.access_token}!`
      );
    } catch (error) {
      setHasLoginFailed(true);
      console.log("Error", error.message);
    }
  };

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
          Secure Login
        </Text>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: 14,
            marginBottom: 14,
          }}
        >
          Enter your credentials to access your account.
        </Text>
        <View style={styles.fieldGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                placeholder="you@example.com"
                inputOnBlur={onBlur}
                capitalizeFirstLetter={false}
                inputSetValue={onChange}
                inputValue={value}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.inputLabel}>Password</Text>

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                placeholder="••••••••"
                inputOnBlur={onBlur}
                censorInput={true}
                inputSetValue={onChange}
                inputValue={value}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>
        {hasLoginFailed && (
          <Text style={[{ marginBottom: 10 }, styles.errorText]}>
            Invalid username or password.
          </Text>
        )}
        <Button
          DesiredTheme="primary"
          label="Login"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View style={[{ paddingTop: 10 }, styles.labelSecondary]}>
        <Text
          style={[styles.labelSecondary, { color: theme.colors.textPrimary }]}
        >
          Don&apos;t have an account?
        </Text>
        <Pressable onPress={() => router.push("/register")}>
          <Text
            style={[styles.labelSecondary, { color: theme.colors.primary }]}
          >
            {" "}
            Sign up
          </Text>
        </Pressable>
      </View>
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
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  fieldGroup: {
    marginBottom: 16,
  },
  errorText: {
    color: theme.colors.danger ?? "red",
    fontSize: 14,
    marginLeft: 4,
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
