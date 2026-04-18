import { theme } from "@/constants/colors";
import {
  TextInput,
  StyleSheet,
  View,
  Platform,
  KeyboardTypeOptions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";
type Props = {
  placeholder: string;
  censorInput?: boolean;
  ionIcon?: ComponentProps<typeof Ionicons>["name"];
  inputSetValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  inputOnBlur: () => void;
  keyboardType?: KeyboardTypeOptions;
};
export default function CustomInput({
  placeholder,
  censorInput = false,
  ionIcon = undefined,
  inputSetValue,
  inputValue,
  inputOnBlur,
  keyboardType = "default",
}: Props) {
  const [hideContent, setHideContent] = useState<boolean>(true);
  const [hideContentIcon, setHideContentIcon] =
    useState<ComponentProps<typeof Ionicons>["name"]>("eye-outline");

  if (censorInput) {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={hideContent}
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, !ionIcon && { paddingLeft: 5 }]}
          value={inputValue}
          onBlur={inputOnBlur}
          keyboardType={keyboardType}
          onChangeText={inputSetValue}
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
        value={inputValue}
        onChangeText={(text) => {
          inputSetValue(text);
        }}
        keyboardAppearance="dark"
      />

      {ionIcon && <Ionicons name={ionIcon} color="gray" style={styles.icon} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    // Use paddingVertical instead of general padding to avoid
    // pinching the sides twice (container + input)
    paddingVertical: Platform.OS === "ios" ? 18 : 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBackground,
    paddingHorizontal: 12,
    // Crucial: allow the container to grow if used in a flex row
    flex: 1,
  },
  input: {
    color: theme.colors.textPrimary,
    flex: 1, // Takes up all space between icons
    fontSize: 16,
    // Remove extra padding here if your container already has paddingHorizontal
    paddingHorizontal: 5,
  },
  icon: {
    // Keep icons from hugging the edges
    marginLeft: 5,
  },
});
