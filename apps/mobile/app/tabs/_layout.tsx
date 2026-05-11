import { theme } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: theme.colors.tabActive,

        tabBarInactiveTintColor: theme.colors.tabInactive,

        tabBarStyle: {
          position: "absolute",
          overflow: "hidden",

          backgroundColor: theme.colors.tabBackground,

          borderTopWidth: 0,

          height: 88,
          paddingTop: 10,
          paddingBottom: 12,

          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        },
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? icons.homeFilled : icons.home;

            return <Ionicons name={iconName} size={28} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? icons.groupsFilled : icons.groups;

            return <Ionicons name={iconName} size={28} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? icons.activityFilled : icons.activity;

            return <Ionicons name={iconName} size={28} color={color} />;
          },
        }}
      />

        <Tabs.Screen name="profile" options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? icons.profileFilled : icons.profile;

            return <Ionicons name={iconName} size={28} color={color} />;
          }
        }} />
    </Tabs>
  );
}
