import { theme } from "@/constants/colors";
import { groupIcons } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetTextInput,
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
  const [query, setQuery] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [addingMembers, setAddingMembers] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const snapPoints = useMemo(() => ["90%"], []);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(0);
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
        pressBehavior="close"
      />
    ),
    [],
  );

  const onChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      onChange={onChange}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      keyboardBehavior="extend"
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color={theme.colors.textPrimary} />
          </Pressable>
          <Text style={styles.title}>Create a group</Text>
          <Text style={styles.subtitle}>
            Create a group and start splitting expenses
          </Text>
        </View>

        {/* Group Image Section */}
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

        {/* Group Name Input */}
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

        {/* Group Description Input */}
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
          numberOfLines={4}
          value={groupDescription}
          onChangeText={setGroupDescription}
        />

        {/* Add Members Segment */}
        <View style={styles.memberSectionContainer}>
          <Text style={styles.label}>Add members</Text>
          <Pressable
            style={[
              styles.memberAddButton,
              addingMembers && {
                borderColor: theme.colors.tabActive,
                backgroundColor: `${theme.colors.tabActive}20`,
              },
            ]}
            onPress={() => setAddingMembers(!addingMembers)}
          >
            <Ionicons
              name={addingMembers ? "close" : "person-add"}
              size={20}
              color={
                addingMembers
                  ? theme.colors.tabActive
                  : theme.colors.textSecondary
              }
            />
          </Pressable>

          {/* High-Fidelity Custom Search Bar Overlay */}
          {addingMembers && (
            <View style={styles.searchBarContainer}>
              <Ionicons
                name="search-outline"
                size={18}
                color={theme.colors.textSecondary}
                style={styles.searchIcon}
              />
              <BottomSheetTextInput
                placeholder="Search friends by name or email..."
                placeholderTextColor={theme.colors.textSecondary}
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
                autoFocus={true}
              />
              {query.length > 0 && (
                <Pressable
                  onPress={() => setQuery("")}
                  style={styles.clearButton}
                >
                  <Ionicons
                    name="close-circle"
                    size={16}
                    color={theme.colors.textSecondary}
                  />
                </Pressable>
              )}
            </View>
          )}
        </View>

        {/* Main Action Button */}
        <Animated.View style={[styles.ctaWrapper, { transform: [{ scale }] }]}>
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
    width: 48,
    height: 5,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.3,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    left: 0,
    top: -4,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 6,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  optionText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
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
  iconSelectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  groupIcon: {
    borderRadius: 16,
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 24,
  },
  textArea: {
    height: 100,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  memberSectionContainer: {
    marginTop: 8,
    marginBottom: 32,
    gap: 12,
  },
  memberAddButton: {
    borderRadius: 30,
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  // Custom High-End Search Bar Styling
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 14,
    marginTop: 4,
    width: "100%",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    color: theme.colors.textPrimary,
    fontSize: 15,
  },
  clearButton: {
    padding: 4,
  },

  ctaWrapper: {
    marginTop: 8,
  },
  createButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: theme.colors.tabActive,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
