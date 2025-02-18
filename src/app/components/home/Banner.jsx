import Link from "next/link";
import { MdTrendingUp } from "react-icons/md"; // Example icon for finance

const Banner = () => {

  return (
    <div className="px-4 text-center text-black relative z-40 overflow-hidden h-screen flex items-center justify-center">
      {/* Content Section */}
      <div className="relative z-50">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
          Take Control of Your Finances
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-8 animate-fade-in-up">
          Manage your money smarter. Track expenses, set budgets, and achieve
          your financial goals with ease.
        </p>
        <Link href="/dashboard/finance-stats"
          className="flex items-center gap-3 border-2 border-blue-600 text-white font-semibold px-4 py-3 bg-blue-600 rounded-md hover:bg-blue-400 hover:text-black ease-in-out transition-all duration-300 text-base cursor-pointer w-full md:w-80 justify-center mx-auto"
        >
          <MdTrendingUp className="text-2xl" /> Start Managing Finances
        </Link>
      </div>

      {/* Backdrop Designs */}
      {/* First Backdrop - Left-Top */}
      <div className="w-[590px] h-[400px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-50 blur-[100px] absolute -top-20 -left-40 z-30 md:block hidden"></div>
      <div className="w-[390px] h-[400px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-50 blur-[100px] absolute top-1/2 -left-40 z-30 md:block hidden"></div>

      {/* Middle Backdrop - Middle-Bottom */}
      <div className="w-[590px] h-[400px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-60 blur-[100px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"></div>

      {/* Last Backdrop - Right-Top */}
      <div className="w-[390px] h-[400px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-50 blur-[100px] absolute top-1/2 -right-40 z-30 md:block hidden"></div>
      <div className="w-[590px] h-[400px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-50 blur-[100px] absolute -top-20 -right-40 z-30 md:block hidden"></div>
    </div>
  );
};

export default Banner;