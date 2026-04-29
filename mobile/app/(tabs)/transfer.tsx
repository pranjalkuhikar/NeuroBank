import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  ArrowRight,
  Search,
  CreditCard,
  Building2,
  CheckCircle2,
  Loader2,
  AlertCircle,
  History,
  User,
} from "lucide-react-native";
import { useGetAccountQuery, accountApi } from "../../services/account.api.js";
import {
  useCreateTransitionMutation,
  useGetHistoryQuery,
} from "../../services/transition.api.js";
import { useDispatch } from "react-redux";

const Transfer = () => {
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    recipientName: "",
    accountNumber: "",
    bankName: "",
    amount: "",
    note: "",
  });

  const dispatch = useDispatch();
  const { data: accountData, isLoading: isAccountLoading } = useGetAccountQuery(
    {},
  );
  const accountId = accountData?.account?._id;

  const { data: historyData } = useGetHistoryQuery(accountId, {
    skip: !accountId,
  });

  const [
    createTransition,
    { isLoading: isTransitioning, data: transitionResponse },
  ] = useCreateTransitionMutation();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => {
    setErrorMsg("");
    setStep(step - 1);
  };

  const handleConfirmTransfer = async () => {
    if (accountData?.account?.balance < Number(formData.amount)) {
      setErrorMsg("Insufficient balance for this transfer.");
      return;
    }

    setErrorMsg("");
    if (!accountId) {
      setErrorMsg("Your account details are not loaded. Please refresh.");
      return;
    }

    try {
      const idempotencyKey =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      const result = await createTransition({
        fromAccount: accountId,
        toAccount: formData.accountNumber,
        amount: Number(formData.amount),
        idempotencyKey: idempotencyKey,
      }).unwrap();

      if (result) {
        // Invalidate account cache to refetch balance in real-time
        dispatch(accountApi.util.invalidateTags(["Account"]));
        setStep(3);
      }
    } catch (err: any) {
      setErrorMsg(
        err?.data?.message || "Something went wrong. Please try again.",
      );
    }
  };

  // Derive recent payees from history (accounts we sent money TO)
  const recentPayees =
    historyData?.transitions
      ?.filter(
        (t: any) =>
          String(t.fromAccount?._id || t.fromAccount) === String(accountId),
      )
      ?.reduce((acc: any[], current: any) => {
        const exists = acc.find(
          (p) => p.accountNumber === current.toAccount?.accountNumber,
        );
        if (!exists && current.toAccount) {
          acc.push({
            id: current._id,
            accountNumber: current.toAccount.accountNumber,
            label: `Account ...${current.toAccount.accountNumber.slice(-4)}`,
          });
        }
        return acc;
      }, [])
      ?.slice(0, 5) || [];

  const renderStepIcon = (stepNum: number) => {
    if (step > stepNum) return <CheckCircle2 size={20} color="#10b981" />;
    return (
      <View
        className={`w-5 h-5 rounded-full border-2 items-center justify-center
        ${step === stepNum ? "border-blue-500" : "border-gray-400"}`}
      >
        <Text
          className={`text-[10px] font-bold ${step === stepNum ? "text-blue-500" : "text-gray-400"}`}
        >
          {stepNum}
        </Text>
      </View>
    );
  };

  if (isAccountLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-[#0c0f1a]">
        <Loader2 size={32} color="#3b82f6" />
      </View>
    );
  }

  const account = accountData?.account;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white dark:bg-[#0a0c14]"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Main Content */}
        <View className="p-5 md:p-8 lg:p-12">
          {/* Header Section */}
          <View className="mb-8 mt-5">
            <View className="flex-row items-center gap-4 mb-2">
              <View className="px-3 py-1 rounded-full bg-blue-500/10">
                <Text className="text-blue-500 text-[10px] font-bold uppercase tracking-wider">
                  Transfer Money
                </Text>
              </View>
            </View>
            <Text className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Bank Transfer
            </Text>

            <View className="flex-row items-center justify-between gap-3 bg-gray-50 dark:bg-white/5 p-3 rounded-2xl border border-gray-100 dark:border-white/5 mt-6">
              {[1, 2, 3].map((s) => (
                <View key={s} className="flex-row items-center gap-2">
                  {renderStepIcon(s)}
                  <Text
                    className={`text-xs font-bold ${step >= s ? "text-gray-900 dark:text-white" : "text-gray-400"}`}
                  >
                    {s === 1 ? "Details" : s === 2 ? "Review" : "Done"}
                  </Text>
                  {s < 3 && <ArrowRight size={12} color="#d1d5db" />}
                </View>
              ))}
            </View>
          </View>

          {/* Transfer Logic */}
          {step === 1 && (
            <View className="space-y-8">
              {/* Recent Payees */}
              <View className="mb-8">
                <View className="flex-row items-center gap-2 mb-4">
                  <View className="p-2 rounded-xl bg-blue-500/10">
                    <History size={20} color="#3b82f6" />
                  </View>
                  <Text className="text-lg font-bold text-gray-900 dark:text-white">
                    Recent Payees
                  </Text>
                </View>

                {recentPayees.length > 0 ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="overflow-visible"
                  >
                    {recentPayees.map((payee: any) => (
                      <Pressable
                        key={payee.id}
                        onPress={() =>
                          setFormData({
                            ...formData,
                            recipientName: "Recent Recipient",
                            accountNumber: payee.accountNumber,
                          })
                        }
                        className="items-center mr-4 w-24"
                      >
                        <View className="w-14 h-14 rounded-full bg-blue-600 items-center justify-center mb-2 shadow-sm">
                          <User size={24} color="#ffffff" />
                        </View>
                        <Text
                          className="text-xs font-bold text-gray-900 dark:text-white text-center"
                          numberOfLines={1}
                        >
                          {payee.label}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                ) : (
                  <View className="items-center py-6 px-4 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                    <View className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full items-center justify-center mb-2">
                      <Search size={24} color="#9ca3af" />
                    </View>
                    <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      No recent users yet
                    </Text>
                  </View>
                )}
              </View>

              {/* Source Account Card */}
              <View className="bg-blue-600 rounded-[2.5rem] p-6 shadow-sm mb-6">
                <View className="flex-row items-center justify-between mb-6">
                  <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">
                    Source Account
                  </Text>
                  <CreditCard size={20} color="#bfdbfe" />
                </View>

                <View className="mb-6">
                  <Text className="text-2xl font-black text-white">
                    {account?.accountType === "saving" ? "Savings" : "Current"}{" "}
                    Account
                  </Text>
                  <Text className="text-sm font-medium text-blue-200">
                    {account?.accountNumber
                      ? `**** ${account.accountNumber.slice(-4)}`
                      : "Loading..."}
                  </Text>
                </View>

                <View className="pt-6 border-t border-blue-500/50">
                  <Text className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">
                    Available Funds
                  </Text>
                  <View className="flex-row items-baseline gap-2">
                    <Text className="text-3xl font-black text-white">
                      {account?.currency === "INR" ? "₹" : "$"}
                      {account?.balance?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                    <Text className="text-xs font-bold text-blue-200 uppercase tracking-widest">
                      {account?.currency}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Recipient Input */}
              <View className="bg-white dark:bg-[#0c0f1a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-6 shadow-sm mb-6">
                <View className="flex-row items-center gap-3 mb-6">
                  <View className="p-2 rounded-xl bg-indigo-500/10">
                    <User size={20} color="#6366f1" />
                  </View>
                  <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">
                    Recipient Information
                  </Text>
                </View>

                <View className="space-y-4">
                  <View className="mb-4">
                    <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                      Recipient Name
                    </Text>
                    <TextInput
                      placeholder="Full name"
                      placeholderTextColor="#9ca3af"
                      className="w-full bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white"
                      value={formData.recipientName}
                      onChangeText={(text) =>
                        setFormData({ ...formData, recipientName: text })
                      }
                    />
                  </View>
                  <View>
                    <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                      Account Number
                    </Text>
                    <View className="relative justify-center">
                      <View className="absolute left-5 z-10">
                        <Building2 size={16} color="#9ca3af" />
                      </View>
                      <TextInput
                        placeholder="Enter account number"
                        placeholderTextColor="#9ca3af"
                        className="w-full bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold font-mono text-gray-900 dark:text-white"
                        value={formData.accountNumber}
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          setFormData({ ...formData, accountNumber: text })
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Amount Selection */}
              <View className="bg-white dark:bg-[#0c0f1a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-6 shadow-sm mb-6">
                <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-4">
                  Transfer Amount
                </Text>

                <View className="flex-row items-center border-b-2 border-gray-100 dark:border-white/5 mb-6 pb-2">
                  <Text className="text-4xl font-black text-gray-300 dark:text-gray-600 mr-2">
                    {account?.currency === "INR" ? "₹" : "$"}
                  </Text>
                  <TextInput
                    placeholder="0.00"
                    placeholderTextColor="#d1d5db"
                    className="flex-1 text-4xl font-black text-gray-900 dark:text-white p-0 m-0 leading-none"
                    value={formData.amount}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setFormData({ ...formData, amount: text })
                    }
                  />
                </View>

                <View className="flex-row flex-wrap gap-3 mb-6">
                  {[100, 500, 1000, 5000].map((val) => (
                    <Pressable
                      key={val}
                      onPress={() =>
                        setFormData({ ...formData, amount: val.toString() })
                      }
                      className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/5"
                    >
                      <Text className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                        +{val}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <View>
                  <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                    Note / Reference
                  </Text>
                  <TextInput
                    multiline
                    numberOfLines={3}
                    placeholder="What's this for?"
                    placeholderTextColor="#9ca3af"
                    className="w-full bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white h-24"
                    style={{ textAlignVertical: "top" }}
                    value={formData.note}
                    onChangeText={(text) =>
                      setFormData({ ...formData, note: text })
                    }
                  />
                </View>
              </View>

              <View className="flex-row justify-end mt-4">
                <Pressable
                  disabled={!formData.amount || !formData.accountNumber}
                  onPress={handleNext}
                  className={`flex-row items-center gap-4 pl-8 pr-4 py-4 rounded-[2rem] shadow-sm ${
                    !formData.amount || !formData.accountNumber
                      ? "bg-gray-300 dark:bg-gray-800"
                      : "bg-gray-900 dark:bg-white"
                  }`}
                >
                  <Text
                    className={`text-xs font-black uppercase tracking-[0.2em] ${
                      !formData.amount || !formData.accountNumber
                        ? "text-gray-500"
                        : "text-white dark:text-black"
                    }`}
                  >
                    Review
                  </Text>
                  <View className="w-10 h-10 rounded-2xl bg-white/10 dark:bg-black/5 items-center justify-center">
                    <ArrowRight
                      size={20}
                      color={
                        !formData.amount || !formData.accountNumber
                          ? "#9ca3af"
                          : "#3b82f6"
                      }
                    />
                  </View>
                </Pressable>
              </View>
            </View>
          )}

          {step === 2 && (
            <View className="space-y-8">
              <View className="bg-white dark:bg-[#0c0f1a] rounded-[3rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
                <View className="p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-white/5">
                  <Text className="text-center text-xl font-black text-gray-900 dark:text-white">
                    Review Transaction
                  </Text>
                  <Text className="text-center text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">
                    Verify the recipient details
                  </Text>
                </View>

                <View className="p-8">
                  {errorMsg ? (
                    <View className="p-4 mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex-row items-center gap-3">
                      <AlertCircle size={20} color="#ef4444" />
                      <Text className="font-bold text-red-500 flex-1 text-sm">
                        {errorMsg}
                      </Text>
                    </View>
                  ) : null}

                  <View className="items-center mb-8">
                    <Text className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">
                      You are sending
                    </Text>
                    <Text className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                      {account?.currency === "INR" ? "₹" : "$"}
                      {Number(formData.amount).toLocaleString()}
                    </Text>
                  </View>

                  <View className="space-y-4 mb-8">
                    <View className="p-5 rounded-3xl bg-gray-50/50 dark:bg-white/5 flex-row justify-between items-center mb-3">
                      <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Recipient
                      </Text>
                      <Text className="text-sm font-black text-gray-900 dark:text-white">
                        {formData.recipientName || "Unknown"}
                      </Text>
                    </View>
                    <View className="p-5 rounded-3xl bg-gray-50/50 dark:bg-white/5 flex-row justify-between items-center mb-3">
                      <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Account No.
                      </Text>
                      <Text className="text-sm font-black text-gray-900 dark:text-white font-mono">
                        {formData.accountNumber}
                      </Text>
                    </View>
                    {formData.note ? (
                      <View className="p-5 rounded-3xl bg-gray-50/50 dark:bg-white/5 flex-row justify-between items-center">
                        <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Reference
                        </Text>
                        <Text className="text-sm font-bold text-gray-500 dark:text-gray-400 italic">
                          "{formData.note}"
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  <View className="flex-row gap-4 pt-4">
                    <Pressable
                      onPress={handleBack}
                      disabled={isTransitioning}
                      className="flex-1 py-5 rounded-2xl border-2 border-gray-100 dark:border-white/5 items-center justify-center"
                    >
                      <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Cancel
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={handleConfirmTransfer}
                      disabled={isTransitioning}
                      className={`flex-[2] py-5 rounded-2xl items-center justify-center flex-row gap-2 ${
                        isTransitioning ? "bg-blue-400" : "bg-blue-600"
                      }`}
                    >
                      {isTransitioning ? (
                        <Loader2 size={20} color="#ffffff" />
                      ) : (
                        <>
                          <Text className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                            Confirm
                          </Text>
                          <CheckCircle2 size={16} color="#ffffff" />
                        </>
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          )}

          {step === 3 && (
            <View className="py-10 items-center">
              <View className="w-24 h-24 bg-emerald-500 rounded-full items-center justify-center mb-8 shadow-md">
                <CheckCircle2 size={48} color="#ffffff" />
              </View>

              <Text className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter">
                Complete
              </Text>
              <Text className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-10 px-4 leading-relaxed">
                Payment of{" "}
                <Text className="font-black text-gray-900 dark:text-white">
                  {account?.currency === "INR" ? "₹" : "$"}
                  {Number(formData.amount).toLocaleString()}
                </Text>{" "}
                sent to{" "}
                <Text className="font-black text-gray-900 dark:text-white">
                  {formData.recipientName}
                </Text>
                .
              </Text>

              <View className="w-full bg-white dark:bg-[#0c0f1a] rounded-[2.5rem] border-2 border-dashed border-gray-100 dark:border-white/10 p-6 mb-10">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    Reference
                  </Text>
                  <Text
                    className="text-xs font-black text-blue-500 font-mono"
                    numberOfLines={1}
                  >
                    #{transitionResponse?.transition?._id?.slice(-8)}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    Processing Time
                  </Text>
                  <Text className="text-xs font-black text-emerald-500">
                    INSTANT
                  </Text>
                </View>
              </View>

              <View className="w-full gap-4">
                <Pressable
                  onPress={() => {
                    setStep(1);
                    setFormData({
                      recipientName: "",
                      accountNumber: "",
                      bankName: "",
                      amount: "",
                      note: "",
                    });
                  }}
                  className="w-full py-5 rounded-2xl bg-gray-900 dark:bg-white items-center justify-center shadow-sm"
                >
                  <Text className="text-white dark:text-black text-[10px] font-black uppercase tracking-[0.2em]">
                    New Transfer
                  </Text>
                </Pressable>
                <Pressable className="w-full py-5 rounded-2xl border-2 border-gray-100 dark:border-white/5 items-center justify-center mt-3">
                  <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    Get Receipt
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Transfer;
