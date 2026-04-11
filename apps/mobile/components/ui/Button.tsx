import { theme } from "@/src/constants/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  DesiredTheme?: "primary";
  onPress: () => void;
};

export default function Button({ label, DesiredTheme, onPress }: Props) {
  if (DesiredTheme === "primary") {
    return (
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? theme.colors.primaryPressed
              : theme.colors.primary,
            opacity: pressed ? 0.8 : 1, // Dims slightly when pressed
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
}
