import { theme } from "@/constants/colors";
import { View, StyleSheet } from "react-native";
import GroupRow from "./GroupRow";
import { Group } from "@/constants/dataShapes";

type Props = {
  groups: Group[];
};

export default function GroupsOverviewCard({ groups }: Props) {
  return (
  <View style={styles.container}>
    {groups.map((group, idx) => (
      <>
        <GroupRow key={group.id ?? idx} group={group} />
        {idx < groups.length - 1 && <View style={styles.divider} />}
      </>

    ))}
  </View>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardDark ?? theme.colors.card,
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8,
  }
});
