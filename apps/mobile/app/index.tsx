import { getAccessToken } from "@/src/api/auth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {

  // Check if user is authenticated and navigate accordingly
  const [token, setToken] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    const checkAuth = async () => {
      const retrievedToken = await getAccessToken();
      console.log("Token on app load:", retrievedToken);
      setToken(retrievedToken);
    };
    checkAuth();
  }, []);

    // Still checking storage
  if (token === undefined) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if ( token === null) {
    console.log("No token found, redirecting to login.");
    return <Redirect href="/auth/login" />;
  }
  return ( <Redirect href="/tabs/home" /> );
}
