import { ScrollView, View, Text, Image, Pressable } from "react-native";
import {
  User,
  Shield,
  Bell,
  Moon,
  Key,
  LogOut,
  Camera,
  CheckCircle,
  ChevronRight,
} from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";
const { theme, setTheme } = useTheme();

const Profile = () => {
  return (
    <ScrollView className="py-10 px-4">
      <Text className="text-3xl font-semibold">Profile Settings</Text>
      {/* Profile */}
      <View className="bg-white flex flex-col items-center gap-4 dark:bg-[#0f1221] rounded-[32px] border border-gray-200 dark:border-white/5 p-8 mb-8 relative overflow-hidden shadow-sm">
        <Image
          source={{ uri: "https://i.pravatar.cc/250?img=10" }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
          className="border-4 border-blue-500/20 dark:border-white/5 p-1"
        />
        <View className="flex-row items-center justify-center gap-2">
          <Text className="text-2xl font-semibold">Test Test </Text>
          <CheckCircle color="#3b82f6" size={20} />
        </View>
        <Text className="text-gray-500 dark:text-gray-400 mb-3 font-semibold">
          Verified Platinum Account
        </Text>
        <View className="flex-row justify-center gap-4">
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 dark:text-gray-400 mb-3 font-semibold">
              Member Since
            </Text>
            <Text className="text-base font-semibold">Apr 2026</Text>
          </View>
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 dark:text-gray-400 mb-3 font-semibold">
              Account Level
            </Text>
            <Text className="text-base font-semibold">Platinum Pro</Text>
          </View>
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 dark:text-gray-400 mb-3 font-semibold">
              Safety Score
            </Text>
            <Text className="text-base font-semibold">98/100</Text>
          </View>
        </View>
      </View>
      {/* Personal Information */}
      <View className="bg-white flex flex-col items-start gap-4 dark:bg-[#0f1221] rounded-[32px] border border-gray-200 dark:border-white/5 p-8 mb-8 relative overflow-hidden shadow-sm">
        <View className="flex-row items-center justify-center gap-2">
          <User color="#3b82f6" size={20} />
          <Text className="text-2xl font-semibold">Personal Information </Text>
        </View>
        <Text className="text-gray-500 pl-8 dark:text-gray-400 font-semibold">
          Email Address
        </Text>
        <View className=" flex-1 flex-row items-center justify-between pl-8  p-3 hover:focus:to-blue-400 rounded-full bg-gray-100 w-full">
          <Text className="text-gray-900 dark:text-gray-300 font-semibold">
            test@test.com
          </Text>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </View>
      </View>
      {/* Security & Privacy */}
      <View className="bg-white flex flex-col items-start gap-4 dark:bg-[#0f1221] rounded-[32px] border border-gray-200 dark:border-white/5 p-8 mb-8 relative overflow-hidden shadow-sm">
        <View className="flex-row items-center justify-center gap-2">
          <Shield color="#3b82f6" size={20} />
          <Text className="text-2xl font-semibold">Security & Privacy</Text>
        </View>

        <View className=" flex-1 flex-row items-center justify-between pl-8  p-3 hover:focus:to-blue-400 rounded-full bg-gray-100 w-full">
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
          <Text className="text-2xl font-semibold">App Preference</Text>
        </View>

        <View className=" flex-1 flex-row items-center justify-between pl-8  p-3 hover:focus:to-blue-400 rounded-full bg-gray-100 w-full">
          <View className="flex-row gap-2 items-center justify-center">
            <View className="w-8 h-8 p-1 flex-row items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-500/10 text-gray-600">
              <Moon color="#718096" size={20} />
            </View>
            <Text className="text-gray-900 dark:text-gray-300 font-semibold">
              Dark Mode
            </Text>
            <Pressable
              onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${theme === "dark" ? "bg-indigo-600" : "bg-gray-200"}`}
            >
              <View
                className={`w-4 h-4 bg-white rounded-full transition-all ${theme === "dark" ? "ml-auto" : ""}`}
              ></View>
            </Pressable>
          </View>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </View>
      </View>
      {/* Danger Zone */}
    </ScrollView>
  );
};

export default Profile;
