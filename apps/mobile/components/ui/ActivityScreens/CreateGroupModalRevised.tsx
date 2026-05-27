import { theme } from "@/constants/colors";
import { groupIcons } from "@/constants/icons";
import { homeMock } from "@/constants/mocks/home";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ComponentProps,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  Fragment,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { Animated, Pressable, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  createGroupSchema,
  CreateGroupFormData,
} from "./../../../schemas/authSchemas"; // Import schema path
import { styles } from "./styles/baseBottomSheetDesign";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CreateGroupModalRevised({ visible, onClose }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [query, setQuery] = useState("");
  const [addingMembers] = useState(true);
  const scale = useRef(new Animated.Value(1)).current;
  const snapPoints = useMemo(() => ["90%"], []);

  // Initialize React Hook Form using the Zod validation configuration
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGroupFormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      groupName: "",
      groupDescription: "",
      selectedIcon: "",
      friendsInGroup: [],
    },
  });

  // Animation layout hooks for opening the members segment
  const memberAnimation = useRef(new Animated.Value(0)).current;
  const [showSelectorRender, setShowSelectorRender] = useState(false);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
      reset(); // Resets form values cleanly when closing modal layouts
    }
  }, [visible, reset]);

  useEffect(() => {
    if (addingMembers) {
      setShowSelectorRender(true);
      Animated.spring(memberAnimation, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(memberAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowSelectorRender(false);
      });
    }
  }, [addingMembers]);

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
    []
  );

  const onChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  // Submit Handler triggered only if validation passes successfully
  const onFormSubmit = (data: CreateGroupFormData) => {
    console.log("Validation Successful! Data Package payload:", data);
    onClose();
  };

  const animatedListStyles = {
    opacity: memberAnimation,
    transform: [
      {
        translateY: memberAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        }),
      },
    ],
  };

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
      keyboardBehavior="interactive"
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
          <Text style={styles.title}>Create a group</Text>
          <Text style={styles.subtitle}>
            Create a group and start splitting expenses
          </Text>
        </View>

        {/* Group Image Section */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>Group image</Text>
          {errors.selectedIcon && (
            <Text style={{ color: "red", fontSize: 11 }}>
              {errors.selectedIcon.message}
            </Text>
          )}
        </View>

        <Controller
          control={control}
          name="selectedIcon"
          render={({ field: { onChange: setIcon, value: activeIcon } }) => (
            <View style={styles.iconSelectionRow}>
              {groupIcons.map((icon) => {
                const isSelected = activeIcon === icon;
                return (
                  <Pressable
                    style={[
                      styles.groupIcon,
                      isSelected && styles.groupIconSelected,
                    ]}
                    key={icon}
                    onPress={() => setIcon(icon)}
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
          )}
        />

        {/* Group Name Input */}
        <Controller
          control={control}
          name="groupName"
          render={({
            field: { onChange: setFormName, value: currentName },
          }) => (
            <View>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Group name</Text>
                {errors.groupName ? (
                  <Text style={{ color: "red", fontSize: 11 }}>
                    {errors.groupName.message}
                  </Text>
                ) : (
                  <Text style={styles.characterCount}>
                    {currentName.length}/30
                  </Text>
                )}
              </View>
              <BottomSheetTextInput
                placeholder="e.g. Trip to Eilat"
                placeholderTextColor={theme.colors.textSecondary}
                style={styles.input}
                maxLength={30}
                value={currentName}
                onChangeText={setFormName}
              />
            </View>
          )}
        />

        {/* Group Description Input */}
        <Controller
          control={control}
          name="groupDescription"
          render={({
            field: { onChange: setDescription, value: currentDescription = "" },
          }) => (
            <View>
              <View style={styles.labelRow}>
                <View style={styles.leftLabelGroup}>
                  <Text style={styles.label}>Group description</Text>
                  <Text style={styles.optionText}>(optional)</Text>
                </View>
                {errors.groupDescription ? (
                  <Text style={{ color: "red", fontSize: 11 }}>
                    {errors.groupDescription.message}
                  </Text>
                ) : (
                  <Text style={styles.characterCount}>
                    {currentDescription.length}/100
                  </Text>
                )}
              </View>
              <BottomSheetTextInput
                placeholder="What's this group for?"
                placeholderTextColor={theme.colors.textSecondary}
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={4}
                value={currentDescription}
                onChangeText={setDescription}
              />
            </View>
          )}
        />

        {/* Members Management System */}
        <View style={styles.memberSectionContainer}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Add members</Text>
            {errors.friendsInGroup && (
              <Text style={{ color: "red", fontSize: 11 }}>
                {errors.friendsInGroup.message}
              </Text>
            )}
          </View>

          <Controller
            control={control}
            name="friendsInGroup"
            render={({
              field: { onChange: setGroupMembers, value: activeGroupList },
            }) => {
              if (!showSelectorRender) return <></>;

              return (
                <Animated.View
                  style={[styles.animatedListContainer, animatedListStyles]}
                >
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.friendsListWrapper}
                  >
                    {homeMock.friendsList.map((friend) => {
                      const isFriendSelected = activeGroupList.includes(
                        friend.id
                      );
                      return (
                        <Fragment key={friend.id}>
                          <Pressable
                            style={styles.friendItemContainer}
                            onPress={() => {
                              const userIndex = activeGroupList.indexOf(
                                friend.id
                              );
                              if (userIndex === -1) {
                                setGroupMembers([
                                  ...activeGroupList,
                                  friend.id,
                                ]);
                              } else {
                                setGroupMembers(
                                  activeGroupList.toSpliced(userIndex, 1)
                                );
                              }
                            }}
                          >
                            <Image
                              style={[
                                styles.friendAvatarSize,
                                isFriendSelected && styles.friendAvatarSelected,
                              ]}
                              source={{ uri: friend.image }}
                            />
                            <Text style={styles.friendName}>{friend.name}</Text>
                          </Pressable>
                        </Fragment>
                      );
                    })}
                  </ScrollView>
                </Animated.View>
              );
            }}
          />
          {/* Search Bar */}
          {showSelectorRender && (
            <Animated.View
              style={[styles.searchBarContainer, animatedListStyles]}
            >
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
            </Animated.View>
          )}
        </View>
        {/* Main Action Button */}
        <Animated.View style={[styles.ctaWrapper, { transform: [{ scale }] }]}>
          <Pressable
            onPressIn={animateIn}
            onPressOut={animateOut}
            style={styles.createButton}
            onPress={handleSubmit(onFormSubmit)} // Validation Interceptor
          >
            <Text style={styles.createButtonText}>Create group</Text>
          </Pressable>
        </Animated.View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
