import { getAccessToken } from "@/src/api/auth";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function Home (){

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await getAccessToken();
            if (!storedToken) {
                console.log("No token found, redirecting to login.");
                return <Redirect href="/auth/login" />;
            }

        };
        fetchToken();
    }, []);
    return (
        <View>

            {typeof getAccessToken() === "string" ? (
                <Text>Logged in with token: {getAccessToken()}</Text>
            ) : (
                <Text>Not logged in</Text>
            )}
        </View>           
    );
}