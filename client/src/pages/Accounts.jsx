import React from "react";
import { 
  CreditCard, 
  Plus, 
  Menu,
  ShieldCheck,
  Zap,
  Lock,
  Loader2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useGetAccountQuery, useCreateAccountMutation } from "../services/account.api";

const Accounts = ({ onMenuClick }) => {
  const { data, isLoading, error, refetch } = useGetAccountQuery();
  const [createAccount, { isLoading: isCreating }] = useCreateAccountMutation();

  const handleCreateAccount = async () => {
    try {
      await createAccount({}).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to create account:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-[#0c0f1a]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  // State 1: No Account Found (404)
  if (error?.status === 404 || !data?.account) {
    return (
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-[#0c0f1a]">
        <div className="max-w-4xl mx-auto h-[80vh] flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center mb-8 animate-bounce">
            <Sparkles className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
            Welcome to <span className="text-blue-600">NeuroBank</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mb-10 leading-relaxed">
            Ready to elevate your financial life? Create your primary account in seconds and get access to premium features, AI insights, and global transfers.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 w-full max-w-2xl">
             <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1221] border border-gray-200 dark:border-white/5 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm">Secure by Design</h4>
                <p className="text-xs text-center text-gray-500">Military-grade encryption for all your assets.</p>
             </div>
             <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1221] border border-gray-200 dark:border-white/5 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm">Instant Access</h4>
                <p className="text-xs text-center text-gray-500">Virtual cards and instant global payments.</p>
             </div>
          </div>

          <button 
            onClick={handleCreateAccount}
            disabled={isCreating}
            className="group flex items-center gap-3 px-12 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-2xl shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isCreating ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Create Your Account
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // State 2: Account Exists
  const account = data.account;

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-[#0c0f1a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#151828] border border-gray-200 dark:border-[#232738] text-gray-600 dark:text-gray-300 shadow-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Account</h2>
          </div>
          <div className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
             {account.status}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Primary Account Card */}
            <div className="lg:col-span-2">
                <div className="p-8 rounded-[40px] bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl -ml-16 -mb-16"></div>
                    
                    <div className="flex justify-between items-start mb-20 relative z-10">
                        <div>
                            <p className="text-xs text-white/70 font-bold uppercase tracking-[0.2em] mb-2">Primary Account</p>
                            <h3 className="text-2xl font-bold">{account.accountType === 'saving' ? 'Platinum Savings' : 'Premium Checking'}</h3>
                        </div>
                        <CreditCard className="w-10 h-10 text-white/30" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <p className="text-xs text-white/50 mb-1 font-medium">Balance</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm text-white/70 font-mono">{account.currency}</span>
                                <span className="text-5xl font-black tracking-tight">{account.balance.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Account Number</p>
                            <p className="text-lg font-mono font-bold tracking-wider">{account.accountNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Account Details / Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white dark:bg-[#0f1221] p-6 rounded-3xl border border-gray-200 dark:border-white/5">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4">Currency</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white uppercase">{account.currency}</p>
                    </div>
                    <div className="bg-white dark:bg-[#0f1221] p-6 rounded-3xl border border-gray-200 dark:border-white/5">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4">Created At</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                           {new Date(account.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-[#0f1221] p-6 rounded-3xl border border-gray-200 dark:border-white/5">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4">Daily Limit</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">$25,000</p>
                    </div>
                </div>
            </div>

            {/* Side Tools */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-[#0f1221] rounded-[32px] border border-gray-200 dark:border-white/5 p-6 shadow-sm">
                   <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Quick Actions</h3>
                   <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-blue-500/20 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
                                <Lock className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold">Freeze Card</span>
                        </div>
                        <div className="w-10 h-5 bg-gray-200 dark:bg-white/10 rounded-full relative p-1 transition-colors group-hover:bg-blue-600/20">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold">Safe Guard</span>
                        </div>
                        <div className="w-10 h-5 bg-emerald-500 rounded-full relative p-1 transition-colors">
                            <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-amber-500/20 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 flex items-center justify-center">
                                <Zap className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold">Turbo Transfer</span>
                        </div>
                        <div className="w-10 h-5 bg-amber-500 rounded-full relative p-1 transition-colors">
                            <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="bg-white dark:bg-[#0f1221] rounded-[32px] border border-gray-200 dark:border-white/5 p-6 shadow-sm overflow-hidden relative">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-transparent"></div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider relative z-10">Add-ons</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6 relative z-10">
                        Unlock global investments and multi-currency support with NeuroBank Pro.
                    </p>
                    <button className="w-full py-3 rounded-xl bg-gray-900 dark:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest relative z-10 hover:bg-gray-800 dark:hover:bg-blue-500 transition-all">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
