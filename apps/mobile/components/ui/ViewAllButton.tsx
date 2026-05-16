import { theme } from "@/constants/colors";
import { useRef } from "react";
import { Animated, Pressable, Text, StyleSheet } from "react-native";

type Props = {
  eventFunc: () => void;
};

export default function ViewAllButton({ eventFunc }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const animateOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  const animateIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}> 
        <Pressable
      onPress={eventFunc}
      onPressIn={animateIn}
      onPressOut={animateOut}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Text
        style={{
          color: theme.colors.blueTile,
          fontSize: 14,
          fontWeight: "400",
        }}
      >
        View all
      </Text>
    </Pressable>

    
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
});
