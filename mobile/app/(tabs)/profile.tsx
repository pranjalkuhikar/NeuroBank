import { ScrollView, View, Text, Image, Pressable } from "react-native";
import {
  User,
  Shield,
  Bell,
  Moon,
  Key,
  LogOut,
  CheckCircle,
  ChevronRight,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useProfileQuery } from "../../services/auth.api.js";

const Profile = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { data: user } = useProfileQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const userStats = [
    {
      label: "Member Since",
      value: user?.user?.createdAt
        ? new Date(user.user.createdAt).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "...",
    },
    { label: "Account Level", value: "Platinum Pro" },
    { label: "Safety Score", value: "98/100" },
  ];

  return (
    <ScrollView className="bg-gray-50 dark:bg-[#050714] py-10 px-4">
      <Text className="text-3xl text-center my-3 font-semibold dark:text-white">
        Profile Settings
      </Text>
      {/* Profile */}
      <View className="bg-white flex flex-col items-center gap-4 dark:bg-[#0f1221] rounded-[32px] border border-gray-200 dark:border-white/5 p-8 mb-8 relative overflow-hidden shadow-sm">
        <Image
          source={{ uri: "https://i.pravatar.cc/250?img=10" }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
          className="border-4 border-blue-500/20 dark:border-white/5 p-1"
        />
        <View className="flex-row items-center justify-center gap-2">
          <Text className="text-2xl font-semibold dark:text-white">
            {user?.user?.fullName?.firstName} {user?.user?.fullName?.lastName}
          </Text>
          <CheckCircle color="#3b82f6" size={20} />
        </View>
        <Text className="text-gray-500 dark:text-gray-400 mb-3 font-semibold">
          Verified Platinum Account
        </Text>
        <View className="flex-row justify-between gap-2 items-center">
          {userStats.map((stat, i) => (
            <View key={i} className="flex flex-col items-center gap-1 w-[33%]">
              <Text className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">
                {stat.label}
              </Text>
              <Text className="text-sm font-bold text-gray-900 dark:text-white">
                {stat.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {/* Personal Information */}
      <View className="bg-white flex flex-col items-start gap-4 dark:bg-[#0f1221] rounded-[32px] border border-gray-200 dark:border-white/5 p-8 mb-8 relative overflow-hidden shadow-sm">
        <View className="flex-row items-center justify-center gap-2">
          <User color="#3b82f6" size={20} />
          <Text className="text-2xl font-semibold dark:text-white">
            Personal Information{" "}
          </Text>
        </View>
        <Text className="text-gray-500 pl-8 dark:text-gray-400 font-semibold">
          Email Address
        </Text>
        <View className=" flex-1 flex-row items-center justify-between pl-8  p-3 hover:focus:to-blue-400 rounded-full bg-gray-100 dark:bg-white/5 w-full">
          <Text className="text-gray-900 dark:text-gray-300 font-semibold">
            {user?.user?.email}
          </Text>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </View>
      </View>
      {/* Security & Privacy */}
      <View className="bg-white flex flex-col items-start gap-4 dark:bg-[#0f1221] rounded-[32px] border border-gray-200 dark:border-white/5 p-8 mb-8 relative overflow-hidden shadow-sm">
        <View className="flex-row items-center justify-center gap-2">
          <Shield color="#3b82f6" size={20} />
          <Text className="text-2xl font-semibold dark:text-white">
            Security & Privacy
          </Text>
        </View>

        <View className=" flex-1 flex-row items-center justify-between pl-8  p-3 hover:focus:to-blue-400 rounded-full bg-gray-100 dark:bg-white/5 w-full">
          <View className="flex-row gap-2 items-center justify-center">
            <View className="w-8 h-8 p-1 flex-row items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600">
              <Key color="#059669" size={20} />
            </View>
            <Text className="text-gray-900 dark:text-gray-300 font-semibold">
              Change Password
            </Text>
          </View>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </View>
      </View>
      {/* App Preference */}
      <View className="bg-white flex flex-col items-start gap-4 dark:bg-[#0f1221] rounded-[32px] border border-gray-200 dark:border-white/5 p-8 mb-8 relative overflow-hidden shadow-sm">
        <View className="flex-row items-center justify-center gap-2">
          <Bell color="#F59E0B" size={20} />
          <Text className="text-2xl font-semibold dark:text-white">
            App Preference
          </Text>
        </View>

        <View className=" flex-1 flex-row items-center justify-between pl-8  p-3 hover:focus:to-blue-400 rounded-full bg-gray-100 dark:bg-white/5 w-full">
          <View className="flex-row gap-2 items-center justify-center">
            <View className="w-8 h-8 p-1 flex-row items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-500/10 text-gray-600">
              <Moon color="#718096" size={20} />
            </View>
            <Text className="text-gray-900 dark:text-gray-300 font-semibold">
              Dark Mode
            </Text>
          </View>
          <Pressable
            onPress={() =>
              setColorScheme(colorScheme === "dark" ? "light" : "dark")
            }
            className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${colorScheme === "dark" ? "bg-indigo-600" : "bg-gray-200"}`}
          >
            <View
              className={`w-4 h-4 bg-white rounded-full transition-all ${colorScheme === "dark" ? "ml-auto" : ""}`}
            ></View>
          </Pressable>
        </View>
      </View>
      {/* Danger Zone */}
      <View className="bg-white flex flex-col items-start gap-4 dark:bg-[#0f1221] rounded-[32px] border border-gray-200 dark:border-white/5 p-8 mb-10 relative overflow-hidden shadow-sm">
        <View className="flex-row items-center justify-center gap-2">
          <Text className="text-2xl font-semibold text-red-600 uppercase tracking-wider">
            Danger Zone
          </Text>
        </View>

        <View className=" hover:focus:to-blue-400 rounded-full w-full">
          <Text className="text-sm text-red-500/70 mb-6 leading-relaxed">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </Text>
          <Pressable
            onPress={() => {
              // Delete account logic
            }}
            className="w-full flex-row items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/20"
          >
            <LogOut color="#ffffff" size={20} />
            <Text className="text-white font-bold">Delete Account</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
