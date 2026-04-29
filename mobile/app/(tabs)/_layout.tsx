import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, Redirect } from "expo-router";
import { useColorScheme } from "nativewind";
import { useProfileQuery } from "../../services/auth.api.js";
import { View, Text } from "react-native";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  // Use RTK Query to check if the user has a valid session/profile
  const {
    data: user,
    isLoading,
    isError,
  } = useProfileQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#f8fafc] dark:bg-[#050714] items-center justify-center">
        <Text className="dark:text-white font-bold">Loading...</Text>
      </View>
    );
  }

  // If the request fails (e.g. 401 Unauthorized) or there is no user data, redirect!
  if (isError || !user) {
    return <Redirect href="/login" />;
  }

  const activeColor = colorScheme === "dark" ? "#ffffffff" : "#3b82f6";

  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: activeColor, headerShown: false }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="address-book" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: "Transfer",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="exchange" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="history" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
