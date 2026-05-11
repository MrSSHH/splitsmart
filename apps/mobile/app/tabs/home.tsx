import { theme } from "@/constants/colors";
import { getAccessToken } from "@/src/api/auth";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet} from "react-native";

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
        <View style={styles.screen}>
            
        </View>           
    );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center", // centers everything vertically when keyboard is closed
    padding: 16,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    color: theme.colors.textPrimary,
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
  },
});
