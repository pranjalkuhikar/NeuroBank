import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react-native";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Registering...");
    console.log("Name:", firstName, lastName);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f8fafc] dark:bg-[#050714]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            justifyContent: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View className="items-center justify-center mt-12 mb-10 flex-row gap-3">
            <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center shadow-sm">
              <Sparkles color="white" size={24} />
            </View>
            <Text className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              NeuroBank
            </Text>
          </View>

          {/* Form Card */}
          <View className="bg-white dark:bg-[#0f1221] rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-white/5">
            <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Create Account
            </Text>
            <Text className="text-gray-500 dark:text-gray-400 mb-8">
              Join the future of banking today
            </Text>

            {/* Name Fields Row */}
            <View className="flex-row gap-4 mb-5">
              <View className="flex-1">
                <Text className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                  First Name
                </Text>
                <View className="flex-row items-center border border-gray-200 dark:border-white/10 rounded-xl px-3 h-12 bg-white dark:bg-white/5 focus:border-blue-500 focus:bg-white dark:focus:bg-[#0f1221]">
                  <User color="#9ca3af" size={20} />
                  <TextInput
                    className="flex-1 ml-2 text-base text-slate-900 dark:text-white"
                    placeholder="George"
                    placeholderTextColor="#9ca3af"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </View>

              <View className="flex-1">
                <Text className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                  Last Name
                </Text>
                <View className="flex-row items-center border border-gray-200 dark:border-white/10 rounded-xl px-3 h-12 bg-white dark:bg-white/5 focus:border-blue-500 focus:bg-white dark:focus:bg-[#0f1221]">
                  <User color="#9ca3af" size={20} />
                  <TextInput
                    className="flex-1 ml-2 text-base text-slate-900 dark:text-white"
                    placeholder="Smith"
                    placeholderTextColor="#9ca3af"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>
            </View>

            {/* Email Field */}
            <View className="mb-5">
              <Text className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Email Address
              </Text>
              <View className="flex-row items-center border border-gray-200 dark:border-white/10 rounded-xl px-3 h-12 bg-white dark:bg-white/5 focus:border-blue-500 focus:bg-white dark:focus:bg-[#0f1221]">
                <Mail color="#9ca3af" size={20} />
                <TextInput
                  className="flex-1 ml-2 text-base text-slate-900 dark:text-white"
                  placeholder="you@example.com"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password Field */}
            <View className="mb-8">
              <Text className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Password
              </Text>
              <View className="flex-row items-center border border-gray-200 dark:border-white/10 rounded-xl px-3 h-12 bg-white dark:bg-white/5 focus:border-blue-500 focus:bg-white dark:focus:bg-[#0f1221]">
                <Lock color="#9ca3af" size={20} />
                <TextInput
                  className="flex-1 ml-2 text-base text-slate-900 dark:text-white"
                  placeholder="Create a strong password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            {/* Submit Button */}
            <Pressable
              className="bg-blue-600 active:bg-blue-700 h-14 rounded-xl flex-row items-center justify-center shadow-sm shadow-blue-600/30 mb-8"
              onPress={() => {
                // handle registration
              }}
            >
              <Text className="text-white font-semibold text-lg mr-2">
                Create Account
              </Text>
              <ArrowRight color="white" size={20} />
            </Pressable>

            {/* Login Link */}
            <View className="flex-row items-center justify-center">
              <Text className="text-gray-500 dark:text-gray-400 text-base">
                Already have an account?{" "}
              </Text>
              <Link href="/login" asChild>
                <Pressable>
                  <Text className="text-blue-600 dark:text-blue-400 font-medium text-base">
                    Sign in
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
