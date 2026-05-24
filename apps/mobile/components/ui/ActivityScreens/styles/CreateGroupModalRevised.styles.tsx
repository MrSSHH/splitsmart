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
});
