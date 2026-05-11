import OverallBalanceCard from "@/components/ui/OverallBalanceCard";
import { theme } from "@/constants/colors";
import { homeMock } from "@/constants/mocks/home";
import { getAccessToken } from "@/src/api/auth";
import { getTimeOfDay } from "@/src/api/utils";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
        <ScrollView style={styles.screen} > 
            <SafeAreaView  edges={["top", "left", "right", "bottom"]}>
                <View style={{ paddingLeft: 10, paddingBottom:5 }} > 
                    <Text style={{fontWeight: "bold", color: theme.colors.textMuted, fontSize: 19}}>
                        Good {getTimeOfDay()},
                    </Text>
                    <Text style={{ color: theme.colors.textPrimary, fontSize: 29, fontWeight: "bold", marginBottom: 8 }}>
                        {homeMock.user.firstName} 👋
                    </Text>

                </View>
                <OverallBalanceCard youOwe={homeMock.balance.youOwe.amount} youAreOwed={55} currency={homeMock.currency} />
            </SafeAreaView>           
        </ScrollView>
    );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 10,
  },

});
