"use client";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="py-2 bg-transparent z-50 fixed w-full">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        {/* Logo & Name */}
        <div className="flex items-center gap-5">
          <Image
            src="https://i.ibb.co.com/WWTvQb3s/business-finance-professional-logo-template-vector-29032870-removebg-preview.png"
            alt="logo"
            width={50}
            height={50}
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Personal Finance Visualizer
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <Link
            href="/dashboard/finance-stats"
            className="text-blue-700 font-bold text-xl relative group px-4 py-2"
          >
            Dashboard
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <button
            id="menu-btn"
            className="text-gray-700 dark:text-white focus:outline-none"
          >
            ☰
          </button>
          <div
            id="menu"
            className="absolute right-4 mt-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg hidden"
          >
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
