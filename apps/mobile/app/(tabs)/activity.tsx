import { theme } from "@/constants/colors";
import { View, Text, StyleSheet} from "react-native";

export default function Activity() {
    return (
        <View style={styles.screen}>
            <Text>Activity</Text>
        </View>
    );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

});
