import React, { useRef, useMemo } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Animated, Text } from "react-native";

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
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        onChange={(index) => index === -1 && onClose()} // Close callback when sheet is closed
      >
        {/* 3. BottomSheetView handles layout & tracks child scrolling automatically */}
        <BottomSheetView style={{ padding: 16 }}>
          <Animated.View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Split Expense Modal Content
            </Text>
            <Text style={{ marginTop: 8 }}>
              Test content for the Add Expense modal.
            </Text>
          </Animated.View>
        </BottomSheetView>
      </BottomSheet>
    );
  };
  return <SplitModal />;
}
