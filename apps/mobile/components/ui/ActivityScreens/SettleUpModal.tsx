import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Ionicons, FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { theme } from "@/constants/colors";
import { Dropdown } from "react-native-element-dropdown";
import { styles as baseStyles } from "./styles/baseBottomSheetDesign";

type Props = {
  visible: boolean;
  onClose: () => void;
  groupName?: string;
  defaultPayer?: string;
  defaultReceiver?: string;
};

const GROUP_DATA = [
  { label: "הוצאות של דייטים", value: "1" },
  { label: "אילת עם חברים !", value: "2" },
];

export default function SettleUpModal({
  visible,
  onClose,
  groupName = "Trip to Eilat",
  defaultPayer = "You",
  defaultReceiver = "Alex Smith",
}: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // 1. ADD SCROLLVIEW REFERENCE HOOK
  const scrollViewRef = useRef<any>(null);

  const snapPoints = useMemo(() => ["90%"], []);

  // Form State
  const [isDropdownFocused, setIsDropdownFocused] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Sync open/close state
  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) onClose();
    },
    [onClose]
  );

  // 2. EXPLICIT AUTOSCROLL COMMAND FOR MULTILINE FIELDS
  const handleNotesFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150); // Small 150ms delay accommodates standard system keyboard expand animations safely
  };

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
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      backgroundStyle={baseStyles.sheetBackground}
      handleIndicatorStyle={baseStyles.handleIndicator}
      keyboardBehavior="fillParent"
      android_keyboardInputMode="adjustResize"
    >
      <BottomSheetScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          baseStyles.scrollContent,
          styles.scrollContainer,
          { paddingBottom: Platform.OS === "ios" ? 160 : 100 }, // Extended structural breathing padding
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Container */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={20} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settle up</Text>
        </View>

        {/* Transaction Flow Visualizer */}
        <View style={styles.flowContainer}>
          <View style={styles.avatarNode}>
            <Text style={styles.avatarText}>
              {defaultPayer[0].toUpperCase()}
            </Text>
            <Text style={styles.nodeLabel}>{defaultPayer}</Text>
          </View>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrowSubtext}>pays</Text>
            <Ionicons name="arrow-forward" size={20} color="#5B82F6" />
          </View>

          <View style={styles.avatarNode}>
            <View style={[styles.avatarNodeBox, styles.receiverAvatar]}>
              <Text style={styles.avatarText}>
                {defaultReceiver[0].toUpperCase()}
              </Text>
            </View>
            <Text style={styles.nodeLabel} numberOfLines={1}>
              {defaultReceiver}
            </Text>
          </View>
        </View>

        {/* Group Dropdown Section */}
        <View
          style={[
            baseStyles.dropdownMainContainer,
            { flex: 1.5, marginBottom: 0 },
          ]}
        >
          <Text style={baseStyles.inputFloatingLabel}>Group</Text>
          <Dropdown
            style={[
              baseStyles.dropdownInputBox,
              isDropdownFocused && {
                borderColor: theme.colors.tabActive,
                borderWidth: 2,
              },
            ]}
            activeColor={theme.colors.backgroundDeep}
            placeholderStyle={baseStyles.dropdownPlaceholder}
            selectedTextStyle={baseStyles.dropdownSelectedText}
            containerStyle={baseStyles.dropdownMenuContainer}
            data={GROUP_DATA}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isDropdownFocused ? "Select group" : "..."}
            value={selectedGroup}
            itemTextStyle={{ color: theme.colors.textPrimary }}
            onFocus={() => setIsDropdownFocused(true)}
            onBlur={() => setIsDropdownFocused(false)}
            onChange={(item) => {
              setSelectedGroup(item.value);
              setIsDropdownFocused(false);
            }}
            renderLeftIcon={() => (
              <FontAwesome
                style={baseStyles.dropdownLeftIcon}
                color={
                  isDropdownFocused
                    ? theme.colors.tabActive
                    : theme.colors.textSecondary
                }
                name="group"
                size={20}
              />
            )}
          />
        </View>

        {/* Amount Input */}
        <View style={styles.labelHeaderRow}>
          <Text style={styles.inputLabel}>Amount paid</Text>
          <Text style={styles.characterCounter}>USD</Text>
        </View>
        <BottomSheetTextInput
          style={styles.textInput}
          placeholder="$ 0.00"
          placeholderTextColor="#4A5568"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Payment Method Segment */}
        <Text style={styles.inputLabel}>Payment method</Text>
        <View style={styles.methodRow}>
          <TouchableOpacity
            style={[
              styles.methodBox,
              paymentMethod === "cash" && styles.methodBoxSelected,
            ]}
            onPress={() => setPaymentMethod("cash")}
          >
            <FontAwesome6
              name="money-bill-wave"
              size={16}
              color={paymentMethod === "cash" ? "#5B82F6" : "#A0AEC0"}
            />
            <Text
              style={[
                styles.methodText,
                paymentMethod === "cash" && styles.methodTextSelected,
              ]}
            >
              Cash
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodBox,
              paymentMethod === "digital" && styles.methodBoxSelected,
            ]}
            onPress={() => setPaymentMethod("digital")}
          >
            <FontAwesome6
              name="credit-card"
              size={16}
              color={paymentMethod === "digital" ? "#5B82F6" : "#A0AEC0"}
            />
            <Text
              style={[
                styles.methodText,
                paymentMethod === "digital" && styles.methodTextSelected,
              ]}
            >
              Digital
            </Text>
          </TouchableOpacity>
        </View>

        {/* Optional Notes */}
        <View style={styles.labelHeaderRow}>
          <Text style={styles.inputLabel}>
            Notes <Text style={styles.optionalText}>(optional)</Text>
          </Text>
          <Text style={styles.characterCounter}>{notes.length}/100</Text>
        </View>
        <BottomSheetTextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Add a memo or message..."
          placeholderTextColor="#4A5568"
          multiline
          maxLength={100}
          value={notes}
          onChangeText={setNotes}
          onFocus={handleNotesFocus}
        />

        {/* Action Button */}
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>Save settlement</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: "#161B22",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: "#21262D",
  },
  handleIndicator: {
    width: 48,
    height: 4,
    backgroundColor: "#30363D",
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  formCard: {
    gap: 24,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  closeButton: {
    position: "absolute",
    left: 24,
    top: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#21262D",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 4,
  },
  flowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D1117",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#21262D",
    marginTop: 8,
    marginBottom: 8,
  },
  avatarNode: {
    alignItems: "center",
    width: 80,
  },
  avatarNodeBox: {},
  avatarText: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#21262D",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 48,
    fontSize: 18,
    fontWeight: "600",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#30363D",
  },
  receiverAvatar: {
    borderColor: "rgba(91, 130, 246, 0.4)",
  },
  nodeLabel: {
    color: "#F0F6FC",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
  arrowContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  arrowSubtext: {
    color: "#8B949E",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  labelHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F0F6FC",
    marginTop: 20,
    marginBottom: 8,
  },
  optionalText: {
    color: "#8B949E",
    fontWeight: "400",
    fontSize: 12,
  },
  characterCounter: {
    fontSize: 12,
    color: "#8B949E",
  },
  textInput: {
    backgroundColor: "#0D1117",
    color: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#21262D",
  },
  textArea: {
    height: 80,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  methodRow: {
    flexDirection: "row",
    gap: 12,
  },
  methodBox: {
    flex: 1,
    flexDirection: "row",
    height: 48,
    borderRadius: 12,
    backgroundColor: "#21262D",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  methodBoxSelected: {
    backgroundColor: "rgba(91, 130, 246, 0.15)",
    borderColor: "#5B82F6",
  },
  methodText: {
    color: "#A0AEC0",
    fontSize: 14,
    fontWeight: "600",
  },
  methodTextSelected: {
    color: "#FFFFFF",
  },
  primaryButton: {
    backgroundColor: "#5B82F6",
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
