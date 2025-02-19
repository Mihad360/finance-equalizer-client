"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { name: "Finance Overview", href: "/dashboard/finance-stats" },
    { name: "Category Overview", href: "/dashboard/categories-stats" },
    { name: "Add Finance Transaction", href: "/dashboard/add-finance" },
    { name: "Manage Transactions", href: "/dashboard/manage-transactions" },
    // { name: "Reports", href: "/reports" },
  ];
  // console.log(pathname);

  return (
    <div className="min-h-screen w-68 bg-white  py-4 px-5">
      <h1 className="text-2xl text-center font-bold text-blue-700 mb-8">
        <Image
          className="mx-auto pb-3"
          src="https://i.ibb.co.com/WWTvQb3s/business-finance-professional-logo-template-vector-29032870-removebg-preview.png"
          alt="logo"
          width={50}
          height={50}
        />
        Finance Visualizer
      </h1>
      <nav className="space-y-2 pb-2 border-b-2 border-lime-600">
        {navLinks?.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-gray-700 font-semibold text-lg relative group px-4 py-2 block hover:text-blue-600 ${
              pathname === link.href ? "text-red-700" : ""
            }`}
          >
            <span
              className={`${pathname === link.href ? "text-blue-700" : ""}`}
            >
              {link.name}
            </span>
            <span
              className={`absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full ${
                pathname === link.href ? "w-full" : ""
              }`}
            ></span>
          </Link>
        ))}
      </nav>
      <nav className="pt-2 ">
        <Link
          href="/"
          className="text-gray-700 font-semibold text-lg relative group px-4 py-2 block hover:text-blue-600"
        >
          Home
          <span
            className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"
          ></span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
