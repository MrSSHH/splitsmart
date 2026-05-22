import React, { useRef, useMemo } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Animated, Text, StyleSheet } from "react-native";
import { theme } from "@/constants/colors";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AddExpenseModal({ visible, onClose }: Props) {
  const SplitModal = () => {
    const bottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => ["90%"], []);

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={visible ? 0 : -1}
        snapPoints={snapPoints}
        style={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.sheetBackground}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        onChange={(index) => index === -1 && onClose()} // Close callback when sheet is closed
      >
        {/* 3. BottomSheetView handles layout & tracks child scrolling automatically */}
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Split Expense Modal Content
            </Text>
            <Text style={{ marginTop: 8 }}>
              Test content for the Add Expense modal.
            </Text>
          </Animated.View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  };
  return <SplitModal />;
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
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.4,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60, // Safe padding spacer block so keyboard doesn't mask buttons
  },
});
