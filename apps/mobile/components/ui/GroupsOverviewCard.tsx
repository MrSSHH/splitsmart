import { theme } from "@/constants/colors";
import { View, StyleSheet } from "react-native";
import GroupRow from "./GroupRow";
import { Group } from "@/constants/dataShapes";
import { Fragment } from "react";
import MissingDataCard from "./MissingDataCard";
type Props = {
  groups: Group[];
};

export default function GroupsOverviewCard({ groups }: Props) {
  const emptyGhost = require("@/assets/images/ui_icons/empty-ghost.json");
  return (
    <View style={styles.container}>
      {groups.length > 0 ? (
        groups.map((group, idx) => (
          <Fragment key={group.id ?? idx}>
            <GroupRow group={group} />
            {idx < groups.length - 1 && <View style={styles.divider} />}
          </Fragment>
        ))
      ) : (
        <MissingDataCard
          animation={emptyGhost}
          title="No groups yet"
          messageToDisplay="Create a group and start splitting expenses with friends, roommates, or trips."
        />
      )}
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
  },
});
