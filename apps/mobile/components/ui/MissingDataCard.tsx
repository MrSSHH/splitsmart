import { theme } from "@/constants/colors";
import LottieView, { AnimationObject } from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  animation: AnimationObject;
  title: string;
  messageToDisplay: string;
};

export default function MissingDataCard({
  animation,
  title,
  messageToDisplay,
}: Props) {
  return (
    <View style={styles.container}>
      <LottieView source={animation} autoPlay loop style={styles.animation} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{messageToDisplay}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  animation: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },

  title: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },

  message: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 280,
  },
});
