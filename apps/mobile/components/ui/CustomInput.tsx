import { theme } from "@/constants/colors";
import { TextInput, StyleSheet, View } from "react-native";
type Props = {
  placeholder: string;
  censorInput?: boolean;
};
export default function CustomInput({
  placeholder,
  censorInput = false,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={censorInput}
        placeholderTextColor={theme.colors.textMuted}
        style={styles.input}
        importantForAutofill="yes"
        autoCorrect={false}
        keyboardAppearance="dark"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: theme.colors.inputBackground, // #090D11
    color: theme.colors.textPrimary, // #E6EDF3
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border, // #1F2933

    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0, // We will trigger this on focus if desired
    shadowRadius: 4,
  },
});
