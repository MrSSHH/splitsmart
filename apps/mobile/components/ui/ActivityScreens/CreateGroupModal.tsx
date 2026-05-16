import { theme } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
    Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

type Props = {
  visible: boolean,
  onClose: () => void,
};

export default function CreateGroupModal({ visible, onClose }: Props) {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const scale = useRef(new Animated.Value(1)).current;
  const animateOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  const animateIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <KeyboardAwareScrollView
          style={styles.keyboardScroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable style={styles.backdropPressArea} onPress={onClose} />

          <View style={styles.sheet}>
            <View style={styles.handle} />

            <View style={styles.header}>
              <Pressable style={styles.closeButton} onPress={onClose}>
                <Ionicons
                  name="close"
                  size={24}
                  color={theme.colors.textPrimary}
                />
              </Pressable>
              <Text style={styles.title}>Create a group</Text>
              <Text style={styles.subtitle}>
                Create a group and start splitting expenses
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.label}>Group name</Text>
              <Text style={{ justifyContent: "flex-end", color: theme.colors.textSecondary, fontSize: 12 }}>{groupName.length}/30</Text>
            </View>

            <TextInput
              placeholder="e.g. Trip to Eilat"
              placeholderTextColor={theme.colors.textSecondary}
              style={styles.input}
              maxLength={30}
              value={groupName}
              onChangeText={setGroupName}
            />
            

            <View style={styles.labelRow}>
              <View style={styles.leftLabelGroup}>
                <Text style={styles.label}>Group description</Text>
                <Text style={styles.optionText}>(optional)</Text>
              </View>

              <Text style={styles.characterCount}>
                {groupDescription.length}/100
              </Text>
            </View>
            <TextInput
              placeholder="What's this group for?"
              placeholderTextColor={theme.colors.textSecondary}
              style={[styles.input, styles.textArea]}
              multiline
              value={groupDescription}
              onChangeText={setGroupDescription}
            />

        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            onPressIn={animateIn}
            onPressOut={animateOut}
            style={styles.createButton}
            onPress={onClose}
          >
            <Text style={styles.createButtonText}>Create group</Text>
          </Pressable>
        </Animated.View>       
        </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardScroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  characterCount: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  leftLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  backdropPressArea: {
    flex: 1,
  },

  sheet: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomStartRadius: 28,
    borderBottomEndRadius: 28,
    padding: 20,
    paddingBottom: 36,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  handle: {
    width: 52,
    height: 5,
    borderRadius: 999,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.5,
    alignSelf: "center",
    marginBottom: 18,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  closeButton: {
    position: "absolute",
    left: 0,
    top: -15,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
  },

  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 6,
  },

  label: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },

  optionText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginLeft: 4,
    marginBottom: 8,
  },

  input: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    color: theme.colors.textPrimary,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 18,
  },

  textArea: {
    height: 96,
    paddingTop: 14,
    textAlignVertical: "top",
  },

  createButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: theme.colors.tabActive,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
});
