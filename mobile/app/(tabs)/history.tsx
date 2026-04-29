import { View, Text, ScrollView, Pressable } from "react-native";
import { useGetHistoryQuery } from "../../services/transition.api.js";
import { useGetAccountQuery } from "../../services/account.api.js";
import {
  Search,
  ShieldCheck,
  Loader2,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react-native";
const History = () => {
  const { data: accountData, isLoading: isAccountLoading } = useGetAccountQuery(
    {},
  );
  const accountId = accountData?.account?._id;

  const {
    data: historyData,
    isLoading: isHistoryLoading,
    refetch,
  } = useGetHistoryQuery(accountId, {
    skip: !accountId,
  });
  const transactions = historyData?.transitions || [];
  if (isAccountLoading || isHistoryLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-[#0c0f1a]">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin relative z-10" />
        </div>
      </div>
    );
  }
  return (
    <ScrollView className="py-10 px-5">
      <View className="px-10 py-5">
        <Text className="text-4xl text-center font-bold text-gray-900 dark:text-white tracking-tight">
          Transaction Archive
        </Text>
        <Text className=" text-gray-400 text-center dark:text-gray-200">
          Comprehensive record of all ledger movements
        </Text>
      </View>
      {/* History List Card */}
      <View className="bg-white dark:bg-[#0f1221] rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm mt-4 overflow-hidden w-full mb-8">
        {/* Table Header */}
        <View className="flex-row justify-between items-center px-6 py-5 border-b border-gray-100 dark:border-white/5">
          <Text className="text-gray-400 font-bold text-[10px] tracking-widest uppercase w-1/3">
            Transaction{"\n"}/ ID
          </Text>
          <Text className="text-gray-400 font-bold text-[10px] tracking-widest uppercase w-1/3 text-center">
            Amount
          </Text>
          <Text className="text-gray-400 font-bold text-[10px] tracking-widest uppercase w-1/3 text-right">
            Status
          </Text>
        </View>

        {/* Transactions List or Empty State */}
        {transactions.length > 0 ? (
          transactions.map((tx: any) => {
            const isDebit =
              String(tx.fromAccount?._id || tx.fromAccount) ===
              String(accountId);
            return (
              <View
                key={tx._id}
                className="flex-row justify-between items-center px-6 py-5 border-b border-gray-100 dark:border-white/5"
              >
                {/* Transaction / ID */}
                <View className="w-1/3 flex-row items-center gap-3">
                  <View
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                      isDebit
                        ? "bg-red-50 dark:bg-red-500/10"
                        : "bg-emerald-50 dark:bg-emerald-500/10"
                    }`}
                  >
                    {isDebit ? (
                      <ArrowUpRight color="#dc2626" size={18} />
                    ) : (
                      <ArrowDownLeft color="#059669" size={18} />
                    )}
                  </View>
                  <View>
                    <Text className="text-xs font-black text-gray-900 dark:text-white">
                      {isDebit ? "Outbound" : "Inbound"}
                    </Text>
                    <Text className="text-[9px] font-mono text-gray-400 uppercase tracking-tighter mt-0.5">
                      TXN-{tx._id.slice(-6).toUpperCase()}
                    </Text>
                  </View>
                </View>

                {/* Amount */}
                <View className="w-1/3 items-center">
                  <Text
                    className={`text-sm font-black tracking-tight ${
                      isDebit
                        ? "text-gray-900 dark:text-white"
                        : "text-emerald-500"
                    }`}
                  >
                    {isDebit ? "-" : "+"}
                    {tx.amount.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </Text>
                </View>

                {/* Status */}
                <View className="w-1/3 items-end">
                  <View
                    className={`inline-flex flex-row items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                      tx.status === "completed"
                        ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500/20"
                        : tx.status === "pending"
                          ? "bg-amber-50 dark:bg-amber-500/10 border-amber-500/20"
                          : "bg-red-50 dark:bg-red-500/10 border-red-500/20"
                    }`}
                  >
                    <View
                      className={`w-1.5 h-1.5 rounded-full ${
                        tx.status === "completed"
                          ? "bg-emerald-500"
                          : tx.status === "pending"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                    ></View>
                    <Text
                      className={
                        tx.status === "completed"
                          ? "text-emerald-600"
                          : tx.status === "pending"
                            ? "text-amber-600"
                            : "text-red-600"
                      }
                    >
                      {tx.status}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View className="py-20 px-6 flex items-center justify-center border-b border-gray-100 dark:border-white/5">
            <View className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-6">
              <Search color="#9ca3af" size={32} strokeWidth={1.5} />
            </View>
            <Text className="text-gray-500 dark:text-gray-300 text-lg font-bold mb-3">
              No ledger entries found
            </Text>
            <Text className="text-gray-400 text-center text-sm px-4 leading-relaxed">
              All future transactions will automatically appear here once
              initiated.
            </Text>
          </View>
        )}

        {/* Footer */}
        <View className="flex-row justify-between items-center px-6 py-5">
          <Text className="text-gray-400 font-bold text-[10px] tracking-widest uppercase w-1/3">
            Showing {transactions.length} of {transactions.length}
            {"\n"}entries
          </Text>
          <View className="flex-row gap-3 w-2/3 justify-end">
            <Pressable className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 opacity-50 bg-white dark:bg-transparent">
              <Text className="text-gray-400 font-bold text-sm">Previous</Text>
            </Pressable>
            <Pressable className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 opacity-50 bg-white dark:bg-transparent">
              <Text className="text-gray-400 font-bold text-sm">Next</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Security Footer */}
      <View className="flex items-center justify-center pb-10">
        <View className="flex-row items-center gap-2 mb-6">
          <ShieldCheck color="#9ca3af" size={16} />
          <Text className="text-gray-400 font-bold text-[11px] tracking-widest uppercase">
            Quant-level encryption active
          </Text>
        </View>
        <View className="flex-row gap-6">
          <Text className="text-gray-400 font-bold text-[11px] tracking-widest uppercase">
            Legal Disclosure
          </Text>
          <Text className="text-gray-400 font-bold text-[11px] tracking-widest uppercase">
            Download API Logs
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default History;
