"use client";
import Loading from "@/components/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFinanceData } from "@/utils/getFinanceData";
import useAxiosPublic from "@/utils/useAxiosPublic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";

const Page = () => {
  const [finances, setFinances] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const getData = async () => {
    setLoading(true)
    const editFinance = await getFinanceData();
    setFinances(editFinance);
    setLoading(false)
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this Transaction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#224dfc",
      cancelButtonColor: "#f90f00",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/finance/${id}`);
        console.log(res);
        if (res?.data?.deletedCount > 0) {
          toast("✔️ Transaction deleted", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
        getData();
      }
    });
  };

  if(loading){
    return <Loading></Loading>
  }

  if (finances?.length === 0) {
    return <div className="text-center py-72 text-lg text-rose-500 font-medium">No transactions available.</div>;
  }

  return (
    <div className="p-4 h-full">
      <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
        Finance Data
      </h1>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <Table className="min-w-full">
          <TableHeader className="bg-blue-50">
            <TableRow>
              <TableHead className="px-6 py-4 text-sm font-semibold text-blue-700 uppercase">
                Title
              </TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-blue-700 uppercase">
                Amount
              </TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-blue-700 uppercase">
                Date
              </TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-blue-700 uppercase">
                Category
              </TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-blue-700 uppercase">
                Type
              </TableHead>
              <TableHead className="px-6 py-4 text-sm font-semibold text-blue-700 uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {[...finances].reverse()?.map((finance) => (
              <TableRow
                key={finance._id}
                className="hover:bg-gray-50 transition-colors font-medium"
              >
                <TableCell className="px-6 py-4 text-base text-gray-700">
                  {finance.title}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm font-semibold text-gray-700">
                  ${finance.amount}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-700">
                  {finance.date}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-700">
                  {finance.category}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-700">
                  {finance.type}
                </TableCell>
                <TableCell className="px-6 py-3">
                  <div className="flex items-center gap-6 font-semibold text-xl">
                    <Link
                      href={`/dashboard/manage-transactions/edit-transaction/${finance._id}`}
                      className="text-blue-600 hover:text-blue-900 relative group transition-colors"
                    >
                      Edit
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <button
                      onClick={() => handleDelete(finance._id)}
                      className="text-rose-600 hover:text-rose-900 transition-colors relative group"
                    >
                      Delete
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-rose-600 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
