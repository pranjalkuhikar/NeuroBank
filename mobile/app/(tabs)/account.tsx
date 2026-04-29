import {
  View,
  Text,
  Pressable,
  ScrollView,
  useColorScheme,
} from "react-native";
import {
  Sparkles,
  ShieldCheck,
  Loader2,
  ArrowRight,
  Zap,
  TrendingUp,
  Globe,
  Wallet,
  Fingerprint,
  Lock,
} from "lucide-react-native";
import { useProfileQuery } from "../../services/auth.api.js";
import { router } from "expo-router";
import {
  useGetAccountQuery,
  useCreateAccountMutation,
} from "../../services/account.api.js";

const Account = () => {
  const { data: profile } = useProfileQuery({});
  const { data, error } = useGetAccountQuery({});
  const [createAccount, { isLoading: isCreating }] = useCreateAccountMutation();
  const colorScheme = useColorScheme();

  const handleCreateAccount = async () => {
    try {
      await createAccount({}).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  // Step-1
  if ((error && "status" in error && error.status === 404) || !data?.account) {
    return (
      <View className="flex flex-col justify-center mt-20 gap-5 items-center">
        <View className="bg-blue-600 p-4 rounded-3xl shadow-lg shadow-blue-500/30">
          <Sparkles color="white" size={40} />
        </View>
        <View className="flex items-center gap-4 p-4 justify-center">
          <Text className="font-bold text-3xl text-gray-900 dark:text-white">
            Elevate Your <Text className="text-blue-600">Finance</Text>
          </Text>
          <Text className="text-center font-medium text-xl text-gray-600 dark:text-gray-300">
            Join the elite circle of NeuroBank users and unlock a new dimension
            of digital banking.
          </Text>
        </View>
        <View className="flex gap-4">
          <View className="p-6 justify-center rounded-[2.5rem] bg-white dark:bg-[#0f1221] border border-gray-100 dark:border-white/5 flex flex-col items-center gap-4 hover:border-blue-500/30 transition-all shadow-sm">
            <View className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <ShieldCheck color="#059669" size={20} />
            </View>
            <View className="text-center">
              <Text className="text-center font-semibold text-xl text-gray-900 dark:text-white mb-1">
                Elite Security
              </Text>
              <Text className="text-lg text-gray-500 dark:text-gray-400">
                Military-grade protection for your wealth.
              </Text>
            </View>
          </View>
          <View className="p-6 justify-center rounded-[2.5rem] bg-white dark:bg-[#0f1221] border border-gray-100 dark:border-white/5 flex flex-col items-center gap-4 hover:border-blue-500/30 transition-all shadow-sm">
            <View className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Zap color="#3b82f6" size={20} />
            </View>
            <View className="text-center">
              <Text className="font-semibold text-center text-xl text-gray-900 dark:text-white mb-1">
                Instant Scale
              </Text>
              <Text className="text-lg text-gray-500 dark:text-gray-400">
                Deploy capital globally in milliseconds.
              </Text>
            </View>
          </View>
        </View>
        <View className="flex items-center justify-center mt-5">
          <Pressable
            onPress={handleCreateAccount}
            disabled={isCreating}
            className="flex-row items-center justify-center gap-3 px-14 py-5 rounded-[2rem] bg-gray-900 dark:bg-white overflow-hidden transition-all transform hover:scale-[1.03] active:scale-95 disabled:opacity-50"
          >
            <View className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            {isCreating ? (
              <Loader2
                className="w-6 h-6 animate-spin z-10"
                color={colorScheme === "dark" ? "#000" : "#fff"}
              />
            ) : (
              <>
                <Text className="z-10 text-center font-bold text-white dark:text-black text-xl transition-colors">
                  Generate Portfolio
                </Text>
                <ArrowRight
                  color={colorScheme === "dark" ? "#000" : "#fff"}
                  size={20}
                />
              </>
            )}
          </Pressable>
        </View>
      </View>
    );
  }

  // /Step-2
  const account = data.account;
  return (
    <ScrollView className="py-10 px-5">
      <View className="px-10 py-5">
        <Text className="text-4xl text-center font-bold text-gray-900 dark:text-white tracking-tight">
          Main Vault
        </Text>
        <Text className=" text-gray-400 text-center dark:text-gray-200">
          Manage your primary assets and liquidity
        </Text>
      </View>

      {/* Account Overview Card */}
      <View className="bg-[#0f1221] dark:bg-[#0a0c16] rounded-[2.5rem] p-6 w-full mb-6 shadow-xl border border-gray-800 dark:border-white/5">
        {/* Header */}
        <View className="flex-row justify-between items-start mb-8">
          <View className="flex-row items-center gap-4">
            <View className="w-14 h-14 rounded-2xl border border-blue-500/30 flex items-center justify-center bg-blue-500/10">
              <Sparkles color="#3b82f6" size={24} />
            </View>
            <View>
              <Text className="text-gray-500 font-black text-[10px] tracking-widest uppercase mb-1">
                Neurobank
              </Text>
              <Text className="text-white font-black text-xl tracking-tight">
                Onyx Reserve
              </Text>
            </View>
          </View>
          <View className="border border-blue-500/30 px-3 py-1.5 rounded-full bg-blue-500/10">
            <Text className="text-blue-500 font-black text-[10px] tracking-widest uppercase">
              Priority Elite
            </Text>
          </View>
        </View>

        {/* Cardholder */}
        <View className="mb-6">
          <Text className="text-gray-500 font-black text-xs tracking-[0.15em] uppercase mb-1">
            Cardholder
          </Text>
          <Text className="text-white font-black text-lg uppercase tracking-wider">
            {profile?.name || profile?.email?.split("@")[0] || "TEST TEST"}
          </Text>
        </View>

        {/* Liquidity */}
        <View className="mb-8">
          <Text className="text-gray-500 font-black text-xs tracking-[0.15em] uppercase mb-1">
            Available Liquidity
          </Text>
          <View className="flex-row items-baseline">
            <Text className="text-gray-600 font-black text-xl mr-2">INR</Text>
            <Text className="text-white font-black text-4xl tracking-tight">
              {account?.balance ? Number(account.balance).toFixed(2) : "0.00"}
            </Text>
          </View>
        </View>

        {/* Vault Identifier */}
        <View className="bg-[#1a1d2e] dark:bg-white/5 rounded-[1.5rem] p-5 border border-gray-800 dark:border-white/5">
          <Text className="text-gray-500 font-black text-[10px] tracking-widest uppercase mb-2">
            Vault Identifier
          </Text>
          <Text className="text-white font-black text-xl tracking-[0.2em]">
            {data?.accountNumber
              ? data.accountNumber
                  .toString()
                  .replace(/(.{4})/g, "$1 ")
                  .trim()
              : "9876 6548 8712"}
          </Text>
        </View>
      </View>
      {/* Available Balance Card */}
      <View className="bg-gray-900 dark:bg-[#0a0c16] rounded-[2.5rem] p-8 w-full mb-6 shadow-xl">
        <Text className="text-gray-400 font-bold text-xs uppercase tracking-[0.15em] mb-3">
          Available Balance
        </Text>

        <View className="flex-row items-baseline mb-8">
          <Text className="text-gray-500 font-black text-lg mr-3">INR</Text>
          <Text className="text-white font-black text-[3.5rem] leading-tight tracking-tight">
            {account?.balance ? Number(account.balance).toFixed(2) : "0.00"}
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/transfer")}
          className="bg-gray-800 dark:bg-[#1e2238] active:bg-gray-700 dark:active:bg-[#2a2f4c] py-4 rounded-2xl w-full border border-gray-700 dark:border-white/5 transition-colors"
        >
          <Text className="text-white text-center font-bold text-lg">
            Send Money
          </Text>
        </Pressable>
      </View>

      {/* Three rate */}
      <View className="flex-row items-center flex-wrap justify-center gap-4 w-full">
        {[
          {
            label: "Nominal Rate",
            value: "4.25%",
            icon: TrendingUp,
            iconColor: "#10b981", // emerald-500
            bg: "bg-emerald-500/10",
          },
          {
            label: "Reserve Limit",
            value: "∞",
            icon: Wallet,
            iconColor: "#f59e0b", // amber-500
            bg: "bg-amber-500/10",
          },
          {
            label: "Global Liquidity",
            value: "Liquid",
            icon: Globe,
            iconColor: "#3b82f6", // blue-500
            bg: "bg-blue-500/10",
          },
        ].map((stat, i) => (
          <View
            key={i}
            className="bg-white flex items-center justify-center dark:bg-[#0f1221] p-6 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm transition-all w-[46%] min-w-[150px]"
          >
            <View
              className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-6`}
            >
              <stat.icon size={20} color={stat.iconColor} />
            </View>
            <Text className="text-base text-center text-gray-400 uppercase font-black tracking-widest mb-1">
              {stat.label}
            </Text>
            <Text className="text-xl text-center font-black text-gray-900 dark:text-white uppercase">
              {stat.value}
            </Text>
          </View>
        ))}
      </View>
      {/* three security options */}
      <View className="bg-white flex items-center justify-center dark:bg-[#0f1221] p-6 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm transition-all w-full mt-6 mb-10">
        <Text className="text-2xl text-center text-gray-900 dark:text-white uppercase font-black tracking-widest mb-6 mt-2">
          Security Matrix
        </Text>

        <View className="w-full flex-col gap-4">
          {[
            {
              label: "Biometric Key",
              icon: Fingerprint,
              iconColor: "#3b82f6", // blue-500
              bg: "bg-blue-500/10",
              active: true,
            },
            {
              label: "Geo-Lock",
              icon: Globe,
              iconColor: "#10b981", // emerald-500
              bg: "bg-emerald-500/10",
              active: true,
            },
            {
              label: "Freeze Assets",
              icon: Lock,
              iconColor: "#ef4444", // red-500
              bg: "bg-red-500/10",
              active: false,
            },
          ].map((setting, i) => (
            <View
              key={i}
              className="flex-row items-center justify-between p-3 pl-4 rounded-[2rem] bg-gray-50 dark:bg-white/5 w-full border border-gray-100 dark:border-white/5 shadow-sm"
            >
              <View className="flex-row gap-4 items-center">
                <View
                  className={`w-12 h-12 flex items-center justify-center rounded-full ${setting.bg}`}
                >
                  <setting.icon color={setting.iconColor} size={24} />
                </View>
                <Text className="text-gray-900 dark:text-gray-100 font-bold text-lg tracking-tight">
                  {setting.label}
                </Text>
              </View>
              <Pressable
                className={`w-[3.25rem] h-8 rounded-full relative p-1 transition-colors mr-1 flex-row items-center ${
                  setting.active
                    ? "bg-emerald-500"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                <View
                  className={`w-6 h-6 bg-white rounded-full shadow-sm transition-all ${
                    setting.active ? "ml-auto" : "mr-auto"
                  }`}
                />
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      {/* Alpha Prime Upgrade Card */}
      <View className="bg-blue-600 rounded-[2.5rem] p-8 w-full mb-10 shadow-lg shadow-blue-600/30">
        <Sparkles color="rgba(255, 255, 255, 0.6)" size={32} />

        <View className="mt-6 mb-4">
          <Text className="text-white text-3xl font-black tracking-tight">
            Upgrade to
          </Text>
          <Text className="text-white text-3xl font-black tracking-tight">
            Alpha Prime
          </Text>
        </View>

        <Text className="text-blue-100 text-base font-medium mb-8 leading-6 pr-4">
          Join our exclusive tier for institutional-grade features and zero
          fees.
        </Text>

        <Pressable className="bg-white rounded-2xl py-4 w-full flex-row items-center justify-center active:scale-95 transition-transform shadow-sm">
          <Text className="text-blue-600 font-black text-sm tracking-widest uppercase">
            Claim Invitation
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Account;
