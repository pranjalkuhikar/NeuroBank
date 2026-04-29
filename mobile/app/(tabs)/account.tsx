import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import {
  ShieldCheck,
  Zap,
  Loader2,
  Sparkles,
  ArrowRight,
  Wallet,
  Globe,
  TrendingUp,
  Fingerprint,
  Lock,
} from "lucide-react-native";
import { useProfileQuery } from "../../services/auth.api.js";
import {
  useGetAccountQuery,
  useCreateAccountMutation,
} from "../../services/account.api.js";

const account = () => {
  const { colorScheme } = useColorScheme();
  const { data: profile } = useProfileQuery({});
  const { data, isLoading, error } = useGetAccountQuery({});
  const [createAccount, { isLoading: isCreating }] = useCreateAccountMutation();

  const handleCreateAccount = async () => {
    try {
      await createAccount({}).unwrap();
    } catch (err) {
      console.error("Failed to create account:", err);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-[#0c0f1a]">
        <Loader2 size={40} color="#3b82f6" />
      </View>
    );
  }

  // State 1: No Account Found (404)
  if ((error as any)?.status === 404 || !data?.account) {
    return (
      <ScrollView
        className="flex-1 bg-gray-50 dark:bg-[#0c0f1a]"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View className="items-center text-center">
          <View className="mb-8">
            <View className="w-24 h-24 bg-blue-600 rounded-[2rem] items-center justify-center shadow-lg shadow-blue-500/40">
              <Sparkles size={40} color="#ffffff" />
            </View>
          </View>

          <Text className="text-4xl font-black text-gray-900 dark:text-white mb-4 text-center tracking-tight">
            Elevate Your{" "}
            <Text className="text-blue-600 dark:text-blue-500">Finance</Text>
          </Text>

          <Text className="text-gray-500 dark:text-gray-400 text-center mb-10 leading-relaxed font-medium">
            Join the elite circle of NeuroBank users and unlock a new dimension
            of digital banking.
          </Text>

          <View className="w-full gap-4 mb-12">
            <View className="p-6 rounded-[2.5rem] bg-white dark:bg-[#0f1221] border border-gray-100 dark:border-white/5 items-center gap-4 shadow-sm">
              <View className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 items-center justify-center">
                <ShieldCheck size={24} color="#10b981" />
              </View>
              <View className="items-center">
                <Text className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                  Elite Security
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Military-grade protection for your wealth.
                </Text>
              </View>
            </View>

            <View className="p-6 rounded-[2.5rem] bg-white dark:bg-[#0f1221] border border-gray-100 dark:border-white/5 items-center gap-4 shadow-sm">
              <View className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 items-center justify-center">
                <Zap size={24} color="#3b82f6" />
              </View>
              <View className="items-center">
                <Text className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                  Instant Scale
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Deploy capital globally in milliseconds.
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={handleCreateAccount}
            disabled={isCreating}
            className={`flex-row items-center justify-center gap-3 w-full py-5 rounded-[2rem] shadow-md ${
              isCreating ? "bg-gray-400" : "bg-gray-900 dark:bg-white"
            }`}
          >
            {isCreating ? (
              <Loader2
                size={24}
                color={colorScheme === "dark" ? "#000000" : "#ffffff"}
              />
            ) : (
              <>
                <Text className="text-white dark:text-black font-black text-base">
                  Generate Portfolio
                </Text>
                <ArrowRight
                  size={20}
                  color={colorScheme === "dark" ? "#000000" : "#ffffff"}
                />
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // State 2: Account Exists
  const account = data.account;

  return (
    <ScrollView
      className="flex-1 bg-gray-50 dark:bg-[#0c0f1a]"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View className="p-5 md:p-8 lg:p-12 mt-5">
        {/* Header Section */}
        <View className="flex-row items-center justify-between mb-8">
          <View>
            <Text className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Main Vault
            </Text>
            <Text className="text-sm text-gray-500 font-medium mt-1">
              Manage your primary assets and liquidity
            </Text>
          </View>
          <View className="flex-row items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <View className="w-1.5 h-1.5 rounded-full bg-emerald-500"></View>
            <Text className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.2em]">
              {account.status}
            </Text>
          </View>
        </View>

        {/* Onyx Reserve Account Card */}
        <View className="bg-[#05070a] rounded-[2.5rem] p-6 shadow-2xl mb-8 overflow-hidden">
          <View className="flex-row justify-between items-start mb-10">
            <View className="flex-row items-center gap-4">
              <View className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 items-center justify-center">
                <Sparkles size={24} color="#60a5fa" />
              </View>
              <View>
                <Text className="text-[9px] text-white/50 font-black uppercase tracking-[0.4em] mb-1">
                  NeuroBank
                </Text>
                <Text className="text-xl font-black text-white tracking-tight">
                  Onyx Reserve
                </Text>
              </View>
            </View>
            <View className="px-2 py-1 rounded-lg bg-blue-500/20 border border-blue-500/30">
              <Text className="text-[8px] font-black text-blue-400 uppercase tracking-widest">
                Elite
              </Text>
            </View>
          </View>

          <View className="space-y-6 mb-8">
            <View>
              <Text className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em] mb-1.5">
                Cardholder
              </Text>
              <Text className="text-base font-bold text-white tracking-wide uppercase">
                {profile?.user?.fullName?.firstName}{" "}
                {profile?.user?.fullName?.lastName}
              </Text>
            </View>

            <View>
              <Text className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em] mb-2">
                Available Liquidity
              </Text>
              <View className="flex-row items-baseline gap-2">
                <Text className="text-xl text-white/30 font-black tracking-tighter">
                  {account.currency === "INR" ? "₹" : "$"}
                </Text>
                <Text className="text-4xl font-black tracking-tighter text-white">
                  {account.balance.toLocaleString("en-IN")}
                  <Text className="text-xl text-white/50">.00</Text>
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white/5 border border-white/10 rounded-2xl p-4 self-start">
            <Text className="text-[8px] text-white/40 uppercase font-black tracking-widest mb-1.5">
              Vault Identifier
            </Text>
            <Text className="text-sm font-mono font-black text-white tracking-[0.2em]">
              {account.accountNumber.match(/.{1,4}/g)?.join(" ") ||
                account.accountNumber}
            </Text>
          </View>
        </View>

        {/* Balance & Stats Overview */}
        <View className="bg-[#0a0c14] rounded-[2rem] border border-gray-800 p-6 shadow-md mb-8">
          <View className="flex-row items-center justify-between gap-4">
            <View>
              <Text className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2">
                Available Balance
              </Text>
              <View className="flex-row items-baseline gap-2">
                <Text className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                  {account.currency}
                </Text>
                <Text className="text-3xl font-black text-white tracking-tighter">
                  {account.balance.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => router.push("/(tabs)/transfer")}
              className="bg-[#1a1d2d] px-5 py-3 rounded-xl border border-white/10"
            >
              <Text className="text-white font-bold text-xs">Send Money</Text>
            </Pressable>
          </View>
        </View>

        {/* Account Details / Stats Grid */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-8 overflow-visible"
        >
          <View className="flex-row gap-4">
            <View className="bg-white dark:bg-[#0f1221] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm w-36">
              <View className="w-10 h-10 rounded-xl bg-emerald-500/10 items-center justify-center mb-4">
                <TrendingUp size={20} color="#10b981" />
              </View>
              <Text className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">
                Nominal Rate
              </Text>
              <Text className="text-lg font-black text-gray-900 dark:text-white uppercase">
                4.25%
              </Text>
            </View>

            <View className="bg-white dark:bg-[#0f1221] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm w-36">
              <View className="w-10 h-10 rounded-xl bg-blue-500/10 items-center justify-center mb-4">
                <Globe size={20} color="#3b82f6" />
              </View>
              <Text className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">
                Liquidity
              </Text>
              <Text className="text-lg font-black text-gray-900 dark:text-white uppercase">
                Liquid
              </Text>
            </View>

            <View className="bg-white dark:bg-[#0f1221] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm w-36 mr-4">
              <View className="w-10 h-10 rounded-xl bg-amber-500/10 items-center justify-center mb-4">
                <Wallet size={20} color="#f59e0b" />
              </View>
              <Text className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">
                Reserve Limit
              </Text>
              <Text className="text-lg font-black text-gray-900 dark:text-white uppercase">
                ∞
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Security Matrix */}
        <View className="bg-white dark:bg-[#0f1221] rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-6 shadow-sm mb-8">
          <Text className="text-xs font-black text-gray-900 dark:text-white mb-6 uppercase tracking-[0.3em]">
            Security Matrix
          </Text>
          <View className="gap-3">
            {[
              {
                label: "Biometric Key",
                icon: Fingerprint,
                colorClass: "bg-blue-500/10",
                colorCode: "#3b82f6",
                active: true,
              },
              {
                label: "Geo-Lock",
                icon: Globe,
                colorClass: "bg-emerald-500/10",
                colorCode: "#10b981",
                active: true,
              },
              {
                label: "Freeze Assets",
                icon: Lock,
                colorClass: "bg-red-500/10",
                colorCode: "#ef4444",
                active: false,
              },
            ].map((tool, i) => (
              <View
                key={i}
                className="flex-row items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03]"
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`w-10 h-10 rounded-xl ${tool.colorClass} items-center justify-center`}
                  >
                    <tool.icon size={20} color={tool.colorCode} />
                  </View>
                  <Text className="text-sm font-black tracking-tight text-gray-700 dark:text-gray-300">
                    {tool.label}
                  </Text>
                </View>
                <View
                  className={`w-10 h-5 rounded-full p-1 justify-center ${tool.active ? "bg-emerald-500" : "bg-gray-300 dark:bg-white/10"}`}
                >
                  <View
                    className={`w-3 h-3 bg-white rounded-full ${tool.active ? "self-end" : "self-start"}`}
                  ></View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Alpha Prime Upgrade */}
        <View className="bg-blue-700 rounded-[2.5rem] p-6 shadow-md overflow-hidden relative">
          <View className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></View>
          <Sparkles size={24} color="#ffffff" className="mb-4 opacity-40" />
          <Text className="text-xl font-black mb-2 text-white">
            Upgrade to{"\n"}Alpha Prime
          </Text>
          <Text className="text-white/70 text-xs mb-6 font-medium">
            Join our exclusive tier for institutional-grade features and zero
            fees.
          </Text>
          <Pressable className="w-full py-4 rounded-xl bg-white items-center justify-center">
            <Text className="text-blue-700 font-black text-[10px] uppercase tracking-widest">
              Claim Invitation
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default account;
