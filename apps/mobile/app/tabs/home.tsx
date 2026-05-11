import OverallBalanceCard from "@/components/ui/OverallBalanceCard";
import { theme } from "@/constants/colors";
import { homeMock } from "@/constants/mocks/home";
import { getAccessToken } from "@/src/api/auth";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <SafeAreaView style={styles.screen} edges={["top","left", "right", "bottom"]}>
            <OverallBalanceCard youOwe={homeMock.balance.youOwe.amount} youAreOwed={55} currency={homeMock.currency} />
        </SafeAreaView>           
    );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 10,
  },

});
