import { ScrollView, View, Text, Image } from "react-native";
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
  Menu,
} from "lucide-react-native";

const Profile = () => {
  return (
    <ScrollView className="py-10 px-4">
      <Text className="text-3xl font-semibold dark:text-primary">
        Profile Settings
      </Text>
      <View>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=11" }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text>
          Test Test <CheckCircle className="w-5 h-5 text-blue-500" />
        </Text>
        <Text>Verified Platinum Account</Text>
        <View className="flex-row justify-center">
          <View className="flex-1">
            <Text className="text-base font-semibold dark:text-primary">
              Member Since
            </Text>
            <Text>Apr 2026</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold dark:text-primary">
              Account Level
            </Text>
            <Text>Platinum Pro</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold dark:text-primary">
              Safety Score
            </Text>
            <Text>98/100</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
