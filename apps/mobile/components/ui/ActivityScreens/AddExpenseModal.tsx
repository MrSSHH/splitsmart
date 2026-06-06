import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Pressable, Text, View } from "react-native";
import { theme } from "@/constants/colors";
import { styles } from "./styles/baseBottomSheetDesign";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { homeMock } from "@/constants/mocks/home";
import { date, number } from "zod";
import DateTimePicker from "@react-native-community/datetimepicker";
type Props = {
  visible: boolean;
  onClose: () => void;
};

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export default function AddExpenseModal({ visible, onClose }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const snapPoints = useMemo(() => ["90%"], []);

  // Sync bottom sheet visual state with visibility flag props
  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

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

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            styles.dropdownFloatingLabel,
            isFocus && { color: theme.colors.tabActive },
          ]}
        >
          Select group
        </Text>
      );
    }
    return null;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      keyboardBehavior="extend"
      keyboardBlurBehavior="none"
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
          <Text style={styles.title}>Split Expense</Text>
          <Text style={styles.subtitle}>
            Test content for the Add Expense modal.
          </Text>
        </View>
        {/* Dropdown Core Container */}
        <View style={styles.dropdownMainContainer}>
          {renderLabel()}

          <Dropdown
            style={[
              styles.dropdownInputBox,
              isFocus && {
                borderColor: theme.colors.tabActive,
                borderWidth: 2,
              },
            ]}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            inputSearchStyle={styles.dropdownInputSearchField}
            iconStyle={styles.dropdownRightArrowIcon}
            containerStyle={styles.dropdownMenuContainer}
            itemTextStyle={styles.dropdownItemText}
            activeColor={`${theme.colors.tabActive}10`}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select group" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <FontAwesome
                style={styles.dropdownLeftIcon}
                color={
                  isFocus ? theme.colors.tabActive : theme.colors.textSecondary
                }
                name="group"
                size={20}
              />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.inputFloatingLabel}>Expense name</Text>
            <Text style={styles.characterCount}>{expenseName.length}/25</Text>
          </View>
          <View>
            <BottomSheetTextInput
              placeholder="Enter item or service name..."
              placeholderTextColor={theme.colors.textSecondary}
              style={styles.formInputBox}
              onChangeText={setExpenseName}
              value={expenseName}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputFloatingLabel}>Total amount</Text>
          <View>
            <BottomSheetTextInput
              placeholder={`${homeMock.currency}0.00`}
              placeholderTextColor={theme.colors.textSecondary}
              style={styles.formAmountInputBox}
              value={expenseAmount}
              onChangeText={setExpenseAmount}
              keyboardType="decimal-pad"
            ></BottomSheetTextInput>
          </View>
        </View>

        <View style={styles.datePickerWrapper}>
          <Text style={styles.label}>Date</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
