import { theme } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, router, Stack, useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardProvider>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: theme.colors.background }, // This fills the "void" during transitions
            }}
          >
            <Stack.Screen
              name="login"
              options={{
                title: "Login",
                headerShown: false,
                animation: "slide_from_left",
              }}
            />
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen
              name="register"
              options={{
                title: "Sign up",
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerTitleStyle: { color: theme.colors.textPrimary },
                animation: "slide_from_right",
                headerLeft: () => {
                  const router = useRouter();
                  return (
                    <Pressable onPress={() => router.push("/login")}>
                      <Ionicons
                        name={"arrow-back-outline"}
                        color={"white"}
                        size={25}
                        style={{ marginLeft: 10 }}
                      />
                    </Pressable>
                  );
                },
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </KeyboardProvider>
    </View>
  );
}
