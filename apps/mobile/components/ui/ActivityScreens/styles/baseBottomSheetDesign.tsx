import { theme } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 32, // Smoother top boundary corners
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  handleIndicator: {
    width: 40,
    height: 4.5,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.25,
    borderRadius: 3,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 48, // Generous baseline breathing room
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
    position: "relative",
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    left: 0,
    top: -2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 4,
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: -0.1,
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
    paddingHorizontal: 6,
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
  groupIconSelected: {
    borderColor: theme.colors.tabActive,
    backgroundColor: `${theme.colors.tabActive}15`, // Premium low opacity tint
    borderWidth: 2,
  },
  input: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    color: theme.colors.textPrimary,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 24,
  },
  /* ==========================================================================
     Standard Form Input Components (Perfectly aligned with Sheet Layouts)
     ========================================================================== */
  inputContainer: {
    width: "100%",
    marginBottom: 24,
    position: "relative",
  },
  inputFloatingLabel: {
    backgroundColor: theme.colors.card, // Blends seamlessly over the card container boundary
    marginBottom: 5,
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.textSecondary,
  },
  formInputBox: {
    height: 54, // Matches dropdown and main layout inputs perfectly
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    color: theme.colors.textPrimary,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  datePickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Pushes text left and calendar icon cleanly to the right boundary
    height: 54, // Perfectly unified structure height profile
    borderRadius: 16,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    width: "100%",
  },
  datePickerText: {
    fontSize: 15,
    fontWeight: "500",
    color: theme.colors.textPrimary, // Clean contrast emphasis on chosen selection configurations
    letterSpacing: -0.1,
  },
  datePickerIcon: {
    marginLeft: 8,
    opacity: 0.85, // Keeps secondary control targets soft and clean
  },
  formAmountInputBox: {
    height: 54, // Matches dropdown and main layout inputs perfectly
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    color: theme.colors.textPrimary,
    paddingHorizontal: 16,
    textAlign: "center",
    fontSize: 15,
  },
  textArea: {
    height: 96,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  memberSectionContainer: {
    marginTop: 4,
    marginBottom: 28,
    gap: 12,
  },
  animatedListContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.02)", // Seamless background overlay tray
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    width: "100%",
  },
  friendsListWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  friendItemContainer: {
    alignItems: "center",
    gap: 6,
    minWidth: 50, // Prevents layout text clamping on small dimensions
  },
  friendAvatarSize: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  friendAvatarSelected: {
    borderWidth: 2.5,
    borderColor: theme.colors.tabActive,
  },
  friendName: {
    fontSize: 11,
    fontWeight: "500",
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 14,
    width: "100%",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    color: theme.colors.textPrimary,
    fontSize: 14,
  },
  clearButton: {
    padding: 4,
  },
  ctaWrapper: {
    marginTop: 12,
  },
  createButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: theme.colors.tabActive,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.tabActive,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2, // Soft native elevation button boost
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  /* ==========================================================================
     Dropdown UI Library Components (Perfectly synced to form input design)
     ========================================================================== */
  dropdownMainContainer: {
    width: "100%",
    marginBottom: 24,
  },
  dropdownInputBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 54, // Matches input height exactly
    borderRadius: 16, // Matches standard input rounding
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
  dropdownLeftIcon: {
    marginRight: 8,
  },
  dropdownFloatingLabel: {
    position: "absolute",
    backgroundColor: theme.colors.card,
    left: 12,
    top: -9,
    zIndex: 999,
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.textSecondary,
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: theme.colors.textSecondary,
  },
  dropdownSelectedText: {
    fontSize: 15,
    color: theme.colors.textPrimary,
  },
  dropdownRightArrowIcon: {
    width: 18,
    height: 18,
    tintColor: theme.colors.textSecondary,
  },
  dropdownMenuContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4, // Clean dropdown floating popup container menu depth
  },
  dropdownItemRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownItemText: {
    fontSize: 15,
    color: theme.colors.textPrimary,
  },
  dropdownInputSearchField: {
    height: 44,
    borderRadius: 12,
    color: theme.colors.textPrimary,
    fontSize: 14,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 4,
  },
});
