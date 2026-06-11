import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

// --- Third-Party Imports ---
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

// --- Local Imports ---
import { theme } from "@/constants/colors";
import { styles as baseStyles } from "./styles/baseBottomSheetDesign";
import { homeMock } from "@/constants/mocks/home";
import {
  AddExpenseFormInput,
  AddExpenseFormOutput,
  addExpenseSchema,
} from "@/schemas/authSchemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// --- Types & Constants ---
type Props = {
  visible: boolean;
  onClose: () => void;
};

const GROUP_DATA = [
  { label: "הוצאות של דייטים", value: "1" },
  { label: "אילת עם חברים", value: "2" },
];

export default function AddExpenseModal({ visible, onClose }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState();
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [isDropdownFocused, setIsDropdownFocused] = useState(false);

  const snapPoints = useMemo(() => ["90%"], []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddExpenseFormInput, any, AddExpenseFormOutput>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      amountValue: "" as any, // Initialize as empty so placeholder shows
      expenseReason: "",
      groupId: "" as any, // Dropdown starts empty
      date: new Date(), // You don't need the expenseDate state variable anymore!
    },
  });
  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(0);
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
  const onFormSubmit = (data: AddExpenseFormInput) => {
    console.log("Amazing, we got a full working validated expense !\n" + data);
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
      keyboardBehavior="extend"
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          baseStyles.scrollContent,
          layoutStyles.scrollContainer,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* --- 1. Header Section --- */}
        <View style={baseStyles.header}>
          <Pressable style={baseStyles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color={theme.colors.textPrimary} />
          </Pressable>
          <Text style={baseStyles.title}>Add Expense</Text>
        </View>

        {/* --- 2. HERO AMOUNT SECTION (Moved to top) --- */}
        <Controller
          control={control}
          name="amountValue"
          render={({
            field: { onChange: setExpenseAmount, value: expenseAmount },
          }) => (
            <View
              style={{ alignItems: "center", width: "100%", marginVertical: 8 }}
            >
              {/* The Input Row Container */}
              <View
                style={[
                  layoutStyles.heroAmountContainer,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Text style={[layoutStyles.currencySymbol, { marginRight: 4 }]}>
                  {homeMock.currency}
                </Text>

                <BottomSheetTextInput
                  placeholder="0.00"
                  placeholderTextColor={theme.colors.textSecondary}
                  style={[
                    baseStyles.formAmountInputBox,
                    layoutStyles.heroInput,
                    errors.amountValue && { borderColor: "red" },
                  ]}
                  value={expenseAmount ? expenseAmount.toString() : ""}
                  onChangeText={setExpenseAmount}
                  keyboardType="decimal-pad"
                  maxLength={10}
                />
              </View>

              <View
                style={{ height: 18, marginTop: 4, justifyContent: "center" }}
              >
                {errors.amountValue ? (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {errors.amountValue.message}
                  </Text>
                ) : null}
              </View>
            </View>
          )}
        />

        <View style={layoutStyles.formCard}>
          {/* --- 3. Expense Name Input --- */}
          <View style={baseStyles.inputContainer}>
            <View style={layoutStyles.labelRow}>
              <Text style={baseStyles.inputFloatingLabel}>
                What was this for?
              </Text>
              <Text style={baseStyles.characterCount}>
                {expenseName.length}/25
              </Text>
            </View>
            <BottomSheetTextInput
              placeholder="e.g. Dinner, Uber, Groceries..."
              placeholderTextColor={theme.colors.textSecondary}
              style={baseStyles.formInputBox}
              onChangeText={setExpenseName}
              value={expenseName}
              maxLength={25}
            />
          </View>

          {/* --- 4. Side-by-Side: Group & Date --- */}
          <View style={layoutStyles.rowContainer}>
            {/* Group Dropdown (Takes up roughly 60% of row) */}
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

            {/* Date Picker (Takes up 40% of row) */}
            <View
              style={[
                baseStyles.datePickerWrapper,
                { flex: 1, alignItems: "flex-start" },
              ]}
            >
              <View style={layoutStyles.datePickerContainer}>
                <Text style={baseStyles.inputFloatingLabel}>Date</Text>

                <DateTimePicker
                  value={expenseDate}
                  mode="date"
                  display="default"
                  onChange={(_, selectedDate) =>
                    selectedDate && setExpenseDate(selectedDate)
                  }
                />
              </View>
            </View>
          </View>
        </View>

        {/* --- 5. Action Button --- */}
        <Pressable
          style={layoutStyles.submitButton}
          onPress={handleSubmit(onFormSubmit)}
        >
          <Text style={layoutStyles.submitButtonText}>Add Expense</Text>
        </Pressable>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const layoutStyles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    gap: 8,
  },
  currencySymbol: {
    fontSize: 40,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginBottom: 4, // Aligns baseline with input
  },
  heroInput: {
    fontSize: 48,
    fontWeight: "700",
    textAlign: "left",
    padding: 0,
    margin: 0,
    minWidth: 120, // Prevents layout jump when typing
  },
  formCard: {
    gap: 24, // Consistent spacing between form fields
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  datePickerContainer: {
    height: 50, // Matches standard input height
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: theme.colors.tabActive, // Or whatever your primary action color is
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 40,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
