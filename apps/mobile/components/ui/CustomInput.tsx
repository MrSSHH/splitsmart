import { theme } from "@/constants/colors";
import { TextInput, StyleSheet, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";
type Props = {
  placeholder: string;
  censorInput?: boolean;
  ionIcon?: ComponentProps<typeof Ionicons>["name"];
};
export default function CustomInput({
  placeholder,
  censorInput = false,
  ionIcon = undefined,
}: Props) {
  const [hideContent, setHideContent] = useState<boolean>(true);
  const [hideContentIcon, setHideContentIcon] =
    useState<ComponentProps<typeof Ionicons>["name"]>("eye-outline");
  const [onFocus, setOnFocus] = useState<boolean>(false);

  if (censorInput) {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={hideContent}
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, !ionIcon && { paddingLeft: 5 }]}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          importantForAutofill="yes"
          autoCorrect={false}
          keyboardAppearance="dark"
        />

        <Ionicons
          size={18}
          onPress={() => {
            if (hideContent) {
              setHideContent(false);
              setHideContentIcon("eye-off-outline");
            } else {
              setHideContent(true);
              setHideContentIcon("eye-outline");
            }
          }}
          name={hideContentIcon}
          color="gray"
          style={[styles.icon, !hideContent && { color: theme.colors.primary }]}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, !ionIcon && { paddingLeft: 5 }]}
        importantForAutofill="yes"
        autoCorrect={false}
        keyboardAppearance="dark"
      />

      {ionIcon && <Ionicons name={ionIcon} color="gray" style={styles.icon} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.border, // #1F2933
    borderRadius: 12,
    padding: Platform.OS === "ios" ? 18 : 12,

    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBackground,
    paddingHorizontal: 10, // Padding inside the box
  },
  icon: {
    marginRight: 10,
  },
  input: {
    backgroundColor: theme.colors.inputBackground, // #090D11
    color: theme.colors.textPrimary, // #E6EDF3
    borderRadius: 12,
    alignItems: "center", // Vertically centers the icon
    paddingHorizontal: 15, // Padding for the whole box
    flex: 1,
    fontSize: 16,

    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0, // We will trigger this on focus if desired
    shadowRadius: 4,
  },
});
