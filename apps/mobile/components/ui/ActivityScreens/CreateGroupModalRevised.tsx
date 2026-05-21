import { theme } from "@/constants/colors";
import { groupIcons } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView, // Handles fluid scrolling over inputs
  BottomSheetTextInput, // Keeps input fields smooth with soft keyboards
} from "@gorhom/bottom-sheet";
import {
  ComponentProps,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CreateGroupModalRevised({ visible, onClose }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const scale = useRef(new Animated.Value(1)).current;

  // Index 0 represents 90% view height
  const snapPoints = useMemo(() => ["90%"], []);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(0); // Safely slides up to the 90% parking spot
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const animateOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  const animateIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.55}
        pressBehavior="collapse" // Tapping the backdrop will close the sheet
      />
    ),
    [],
  );

  const onChange = useCallback(
    (index: number) => {
      console.log("Sheet index changed to", index);
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1} // Keeps it underground safely by default
      snapPoints={snapPoints}
      onChange={onChange}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      keyboardBehavior="extend"
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
          </Pressable>
          <Text style={styles.title}>Create a group</Text>
          <Text style={styles.subtitle}>
            Create a group and start splitting expenses
          </Text>
        </View>

        <View style={styles.labelRow}>
          <Text style={styles.label}>Group image</Text>
        </View>

        <View style={styles.iconSelectionRow}>
          {groupIcons.map((icon) => {
            const isSelected = selectedIcon === icon;
            return (
              <Pressable
                style={[
                  styles.groupIcon,
                  isSelected && {
                    borderColor: theme.colors.tabActive,
                    backgroundColor: `${theme.colors.tabActive}20`,
                  },
                ]}
                key={icon}
                onPress={() => setSelectedIcon(icon)}
              >
                <Ionicons
                  name={icon as ComponentProps<typeof Ionicons>["name"]}
                  size={20}
                  color={
                    isSelected
                      ? theme.colors.tabActive
                      : theme.colors.textSecondary
                  }
                />
              </Pressable>
            );
          })}
        </View>

        <View style={styles.labelRow}>
          <Text style={styles.label}>Group name</Text>
          <Text style={styles.characterCount}>{groupName.length}/30</Text>
        </View>

        <BottomSheetTextInput
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

        <BottomSheetTextInput
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
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  handleIndicator: {
    width: 52,
    height: 5,
    borderRadius: 999,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.4,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60, // Safe padding spacer block so keyboard doesn't mask buttons
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  closeButton: {
    position: "absolute",
    left: 0,
    top: -5,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSelectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 4,
  },
  groupIcon: {
    borderRadius: 16,
    padding: 8,
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
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
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
  optionText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },
  characterCount: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  leftLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
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
