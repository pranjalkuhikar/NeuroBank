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
    <ScrollView>
      <View>
        <Text>Main Vault</Text>
        <Text>Manage your primary assets and liquidity</Text>
      </View>
    </ScrollView>
  );
};

export default Account;
