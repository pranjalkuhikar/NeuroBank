import React from "react";
import { View, Text, ScrollView, Pressable, RefreshControl } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import {
  Bell,
  Send,
  Download,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Activity,
  Loader2,
} from "lucide-react-native";
import { useProfileQuery } from "../../services/auth.api.js";
import {
  useGetAccountQuery,
  useCreateAccountMutation,
} from "../../services/account.api.js";
import { useGetHistoryQuery } from "../../services/transition.api.js";

const Dashboard = () => {
  const { colorScheme } = useColorScheme();
  const { data: profile, refetch: refetchProfile } = useProfileQuery({});
  const {
    data: accountData,
    isLoading: isAccountLoading,
    error: accountError,
    refetch: refetchAccount,
  } = useGetAccountQuery({});
  const [createAccount, { isLoading: isCreating }] = useCreateAccountMutation();

  const accountId = accountData?.account?._id;
  const {
    data: historyData,
    isLoading: isHistoryLoading,
    refetch: refetchHistory,
  } = useGetHistoryQuery(accountId, {
    skip: !accountId,
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refetchProfile(),
      refetchAccount(),
      accountId ? refetchHistory() : Promise.resolve(),
    ]);
    setRefreshing(false);
  }, [accountId]);

  const handleCreateAccount = async () => {
    try {
      await createAccount({}).unwrap();
    } catch (err) {
      console.error("Failed to create account:", err);
    }
  };

  if (isAccountLoading || isHistoryLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#f8fafc] dark:bg-[#050714]">
        <Loader2 size={40} color="#3b82f6" />
      </View>
    );
  }

  // State 1: No Account Found (404)
  if ((accountError as any)?.status === 404 || !accountData?.account) {
    return (
      <View className="flex-1 items-center justify-center bg-[#f8fafc] dark:bg-[#050714] p-6">
        <View className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mb-8">
          <Activity size={48} color="#3b82f6" />
        </View>
        <Text className="text-3xl font-black text-gray-900 dark:text-white text-center mb-3 tracking-tight">
          Welcome to NeuroBank
        </Text>
        <Text className="text-base text-gray-500 dark:text-gray-400 text-center mb-10 px-4">
          Set up your core banking portfolio to unlock global liquidity and
          intelligent insights.
        </Text>
        <Pressable
          onPress={handleCreateAccount}
          disabled={isCreating}
          className={`w-full py-5 rounded-2xl flex-row items-center justify-center shadow-sm ${
            isCreating ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          {isCreating ? (
            <Loader2 size={24} color="#ffffff" />
          ) : (
            <Text className="text-white font-bold text-lg">
              Initialize Portfolio
            </Text>
          )}
        </Pressable>
      </View>
    );
  }

  // State 2: Account Exists
  const account = accountData.account;
  const recentTransactions = historyData?.transitions?.slice(0, 3) || [];
  const firstName = profile?.user?.fullName?.firstName || "User";

  return (
    <ScrollView
      className="flex-1 bg-[#f8fafc] dark:bg-[#050714]"
      contentContainerStyle={{ paddingBottom: 40 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-16 pb-6">
        <View className="flex-row items-center gap-4">
          <View className="w-12 h-12 rounded-full bg-blue-600 items-center justify-center shadow-sm">
            <Text className="text-white font-black text-xl">
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Good morning,
            </Text>
            <Text className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
              {firstName}
            </Text>
          </View>
        </View>
        <View className="relative w-10 h-10 bg-white dark:bg-white/5 rounded-full items-center justify-center border border-gray-100 dark:border-white/10 shadow-sm">
          <Bell
            size={20}
            color={colorScheme === "dark" ? "#9ca3af" : "#4b5563"}
          />
          <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#050714]"></View>
        </View>
      </View>

      {/* Balance Overview */}
      <View className="px-6 mb-8 mt-2">
        <View className="bg-white dark:bg-[#111424] rounded-[2rem] p-6 shadow-md border border-gray-100 dark:border-white/5">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Total Wealth
            </Text>
            <View className="flex-row items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">
              <ArrowUpRight size={12} color="#10b981" />
              <Text className="text-xs font-bold text-emerald-600">2.4%</Text>
            </View>
          </View>

          <View className="flex-row items-baseline mb-2">
            <Text className="text-2xl font-black text-gray-400 mr-1">
              {account.currency === "INR" ? "₹" : "$"}
            </Text>
            <Text className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
              {account.balance.toLocaleString("en-IN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
              <Text className="text-2xl text-gray-400 font-bold">
                .{(account.balance % 1).toFixed(2).substring(2) || "00"}
              </Text>
            </Text>
          </View>
          <Text className="text-xs font-medium text-gray-400">
            Across all asset classes
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="flex-row justify-between px-8 mb-10">
        {[
          {
            label: "Send",
            icon: Send,
            colorCode: "#3b82f6",
            route: "/(tabs)/transfer",
          },
          {
            label: "Receive",
            icon: Download,
            colorCode: "#10b981",
            route: null,
          },
          { label: "Top Up", icon: Plus, colorCode: "#a855f7", route: null },
          {
            label: "More",
            icon: MoreHorizontal,
            colorCode: "#6b7280",
            route: null,
          },
        ].map((action, i) => (
          <View key={i} className="items-center">
            <Pressable
              onPress={() => action.route && router.push(action.route as any)}
              className="w-14 h-14 rounded-2xl bg-white dark:bg-[#111424] border border-gray-100 dark:border-white/5 items-center justify-center shadow-sm mb-3"
            >
              <action.icon size={22} color={action.colorCode} />
            </Pressable>
            <Text className="text-xs font-bold text-gray-600 dark:text-gray-400">
              {action.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Recent Activity Snapshot */}
      <View className="px-6 mb-8">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-lg font-black text-gray-900 dark:text-white">
            Recent Activity
          </Text>
          <Pressable onPress={() => router.push("/(tabs)/history")}>
            <Text className="text-sm font-bold text-blue-600">See All</Text>
          </Pressable>
        </View>

        <View className="bg-white dark:bg-[#111424] rounded-[2rem] p-4 shadow-sm border border-gray-100 dark:border-white/5">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((tx: any, index: number) => {
              const isDebit =
                String(tx.fromAccount?._id || tx.fromAccount) ===
                String(accountId);
              return (
                <View
                  key={tx._id}
                  className={`flex-row justify-between items-center py-4 px-2 ${
                    index !== recentTransactions.length - 1
                      ? "border-b border-gray-50 dark:border-white/5"
                      : ""
                  }`}
                >
                  <View className="flex-row items-center gap-4">
                    <View
                      className={`w-10 h-10 rounded-full items-center justify-center ${
                        isDebit
                          ? "bg-gray-50 dark:bg-white/5"
                          : "bg-emerald-50 dark:bg-emerald-500/10"
                      }`}
                    >
                      {isDebit ? (
                        <ArrowUpRight size={18} color="#6b7280" />
                      ) : (
                        <ArrowDownLeft size={18} color="#10b981" />
                      )}
                    </View>
                    <View>
                      <Text className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">
                        {isDebit
                          ? tx.toAccount?.accountNumber
                            ? `To ${tx.toAccount.accountNumber.slice(-4)}`
                            : "Outbound Transfer"
                          : "Inbound Transfer"}
                      </Text>
                      <Text className="text-xs font-medium text-gray-400">
                        {new Date(tx.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </Text>
                    </View>
                  </View>
                  <Text
                    className={`text-base font-black tracking-tight ${
                      isDebit
                        ? "text-gray-900 dark:text-white"
                        : "text-emerald-500"
                    }`}
                  >
                    {isDebit ? "-" : "+"}
                    {tx.amount.toLocaleString("en-IN")}
                  </Text>
                </View>
              );
            })
          ) : (
            <View className="py-8 items-center justify-center">
              <Activity size={32} color="#9ca3af" className="mb-3 opacity-50" />
              <Text className="text-sm font-bold text-gray-500 dark:text-gray-400">
                No recent activity
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Cashflow Insights Visual */}
      <View className="px-6 mb-6">
        <View className="bg-indigo-600 rounded-[2rem] p-6 shadow-md overflow-hidden relative">
          <View className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></View>
          <View className="absolute bottom-[-20px] right-10 w-16 h-16 bg-black/10 rounded-full"></View>

          <View className="flex-row justify-between items-start mb-6">
            <View>
              <Text className="text-indigo-200 font-bold text-xs uppercase tracking-widest mb-1">
                Cashflow
              </Text>
              <Text className="text-white font-black text-xl">Healthy</Text>
            </View>
            <Activity size={24} color="#c7d2fe" />
          </View>

          {/* Simple Mock Chart */}
          <View className="flex-row gap-2 h-12 items-end mt-4">
            {[40, 70, 45, 90, 60, 80, 50].map((height, idx) => (
              <View
                key={idx}
                className="flex-1 bg-white/20 rounded-t-md"
                style={{ height: `${height}%` }}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
