import { View, Text, Pressable } from "react-native";
import {
  Sparkles,
  ShieldCheck,
  Loader2,
  ArrowRight,
  Zap,
} from "lucide-react-native";
import { useProfileQuery } from "../../services/auth.api.js";
import {
  useGetAccountQuery,
  useCreateAccountMutation,
} from "../../services/account.api.js";

const Account = () => {
  const { data: profile } = useProfileQuery({});
  const { data, isLoading, error } = useGetAccountQuery({});
  const [createAccount, { isLoading: isCreating }] = useCreateAccountMutation();

  const handleCreateAccount = () => {};

  if (error?.status === 404 || !data?.account) {
    return (
      <View className="flex-1 justify-center items-center">
        <View className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2rem] flex items-center justify-center relative z-10 rotate-3 group-hover:rotate-6 transition-transform shadow-2xl shadow-blue-500/40">
          <Sparkles className="w-10 h-10 text-white" />
        </View>
        <View>
          <Text>Elevate Your Finance</Text>
          <Text>
            Join the elite circle of NeuroBank users and unlock a new dimension
            of digital banking.
          </Text>
        </View>
        <View className="flex-1">
          <View className="p-8 rounded-[2.5rem] bg-white dark:bg-[#0f1221] border border-gray-100 dark:border-white/5 flex flex-col items-center gap-4 hover:border-blue-500/30 transition-all shadow-sm">
            <View className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </View>
            <View className="text-center">
              <Text className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                Elite Security
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                Military-grade protection for your wealth.
              </Text>
            </View>
          </View>
          <View className="p-8 rounded-[2.5rem] bg-white dark:bg-[#0f1221] border border-gray-100 dark:border-white/5 flex flex-col items-center gap-4 hover:border-blue-500/30 transition-all shadow-sm">
            <View className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </View>
            <View className="text-center">
              <Text className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                Instant Scale
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                Deploy capital globally in milliseconds.
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Pressable
            onPress={handleCreateAccount}
            disabled={isCreating}
            className="group relative flex items-center gap-3 px-14 py-5 rounded-[2rem] bg-gray-900 dark:bg-white text-white dark:text-black font-black text-lg overflow-hidden transition-all transform hover:scale-[1.03] active:scale-95 disabled:opacity-50"
          >
            <View className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></View>
            {isCreating ? (
              <Loader2 className="w-6 h-6 animate-spin relative z-10" />
            ) : (
              <>
                <Text className="relative z-10 group-hover:text-white transition-colors">
                  Generate Portfolio
                </Text>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 relative z-10 group-hover:text-white transition-all" />
              </>
            )}
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text>Account</Text>
      <Text>Profile: {profile?.email}</Text>
      <Text>Account: {data?.accountNumber}</Text>
    </View>
  );
};

export default Account;
