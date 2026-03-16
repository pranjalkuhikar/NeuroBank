import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0c0f1a] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

      <div className="w-full max-w-md text-center z-10 relative">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-3xl bg-blue-100 dark:bg-[#1a1d2d] flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-200 dark:border-blue-500/20">
            <AlertCircle className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <h1 className="text-8xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter drop-shadow-sm">
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          The page you are looking for doesn't exist, has been removed, or is
          temporarily unavailable.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 py-3 px-8 border border-transparent rounded-xl shadow-md dark:shadow-lg dark:shadow-blue-500/25 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all group"
        >
          <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
