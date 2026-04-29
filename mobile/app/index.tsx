// app/index.tsx
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";

export default function SplashScreen() {
  useEffect(() => {
    // Wait for 2.5 seconds, then navigate to the Login screen
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-blue-600 items-center justify-center">
      <Sparkles color="white" size={60} />
      <Text className="text-4xl font-bold text-white mt-4 tracking-tight">
        NeuroBank
      </Text>
    </View>
  );
}
