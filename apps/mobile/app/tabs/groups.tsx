import { theme } from "@/constants/colors";
import { View, Text, StyleSheet} from "react-native";

export default function Groups() {
    return (
        <View style={styles.screen}>
            <Text>Groups</Text>
        </View>
    );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

});
