import { theme } from "@/constants/colors";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Button from "../ui/Button";
import CustomInput from "../ui/CustomInput";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { signUpSchema } from "../../schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { clearAccessToken, registerUser, saveAccessToken } from "@/src/api/auth";
import { loginResponse } from "@/constants/authShapes";
import * as SecureStore from 'expo-secure-store';

export default function RegisterForm() {
  const [hasRegisterFailed, setHasRegisterFailed] = useState<boolean>(false);
  
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
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const onRegister = async (data: any) => {
    console.log("Registration data:", data);
        try {
          setHasRegisterFailed(false);
          const userData: loginResponse = await registerUser(
            data.email,
            data.firstName,
            data.lastName,
            data.password,
            data.confirmPassword
          );
          console.log(
            "Success",
            `accessToken: ${userData.access_token}!`
          );
          
      // Store the access token securely
      saveAccessToken(userData.access_token);
      console.log("Access token saved, navigating to home...\ntoken:", userData.access_token);
      router.replace("/tabs/home");

        } catch (error: any) {
          setHasRegisterFailed(true);
          console.log("Error", error.message);
        }
    setHasRegisterFailed(false);

  };

  return (
    <View>
      <View style={styles.LoginFormContainer}>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>
          Fill in your details to get started.
        </Text>

        <View style={styles.nameRow}>
          <View
            style={[
              styles.halfField,
              errors.firstName && {
                marginBottom: 16,
              },
            ]}
          >
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
            <View style={{ minHeight: 20 }}>
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName.message}</Text>
              )}
            </View>
          </View>

          <View
            style={[
              styles.halfField,
              errors.firstName && {
                marginBottom: 16,
              },
            ]}
          >
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
            <View style={{ minHeight: 20 }}>
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName.message}</Text>
              )}
            </View>
          </View>
        </View>

        <View
          style={
            errors.email && {
              marginBottom: 16,
            }
          }
        >
          <Text style={styles.inputLabel}>Email</Text>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                placeholder="you@example.com"
                capitalizeFirstLetter={false}
                inputOnBlur={onBlur}
                inputSetValue={onChange}
                keyboardType="email-address"
                inputValue={value}
              />
            )}
          />
          <View style={{ minHeight: 20 }}>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        </View>

        <View
          style={
            errors.password && {
              marginBottom: 16,
            }
          }
        >
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
          <View style={{ minHeight: 20 }}>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        </View>

        <View
          style={
            errors.confirmPassword && {
              marginBottom: 16,
            }
          }
        >
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
          <View style={{ minHeight: 20 }}>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
        </View>

        <Button
          DesiredTheme="primary"
          label="Register"
          onPress={handleSubmit(onRegister)}
        />
      </View>
      <View style={[{ paddingTop: 10 }, styles.labelSecondary]}>
        <Text
          style={[styles.labelSecondary, { color: theme.colors.textPrimary }]}
        >
          Have an account already?
        </Text>
        <Pressable onPress={() => router.push("/auth/login")}>
          <Text
            style={[styles.labelSecondary, { color: theme.colors.primary }]}
          >
            Sign in{" "}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: 14,
  },
  nameRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfField: {
    flex: 1,
  },

  inputLabel: {
    color: theme.colors.textSecondary,
    paddingBottom: 4,
    fontSize: 13,

    textTransform: "uppercase",
    marginLeft: 4,
    fontWeight: "700",
    letterSpacing: 1,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
  },
  labelSecondary: {
    flexDirection: "row",
    justifyContent: "center",
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  errorContainer: {
    minHeight: 18, // 👈 keeps layout stable
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
