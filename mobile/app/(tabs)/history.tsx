import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { Search, ShieldCheck } from "lucide-react-native";

const History = () => {
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

        {/* Empty State Body */}
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

        {/* Footer */}
        <View className="flex-row justify-between items-center px-6 py-5">
          <Text className="text-gray-400 font-bold text-[10px] tracking-widest uppercase w-1/3">
            Showing 0 of 0{"\n"}entries
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
