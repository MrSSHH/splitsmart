import { theme } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";

type Props = {
  icon: ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle: string;
  onPress: () => void;
};

export default function ActivityCard({
  icon,
  title,
  subtitle,
  onPress,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const animateIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
        style={[
          {
            transform: [{ scale }],
          },
          styles.container,
        ]}
      >

      <Pressable
        onPress={onPress}
        onPressIn={animateIn}
        onPressOut={animateOut}
        style={({ pressed }) => [ pressed && styles.pressed, { alignItems: "center", justifyContent: "center" }]}
      >
          <Ionicons
            name={icon}
            size={30}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.subtitle}>{subtitle}</Text>
      </Pressable>
    </Animated.View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.cardDark ?? theme.colors.card,
    alignItems: "center",
    borderRadius: 24,

    borderWidth: 1,
    borderColor: theme.colors.border,

    minHeight: 100,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,

    justifyContent: "center",
  },

  title: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },

  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },

  icon: {
    fontSize: 30,
    marginBottom: 8,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
});
