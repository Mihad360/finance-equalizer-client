"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getFinanceEditData } from "@/utils/getFinanceData";
import useAxiosPublic from "@/utils/useAxiosPublic";
import { useEffect, useState, use } from "react";

const Page = ({ params }) => {
  const { id } = use(params);
  const [finance, setFinance] = useState({});
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const getData = async () => {
      const editFinance = await getFinanceEditData(id);
      setFinance(editFinance);
    };
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const date = e.target.date.value;
    const category = e.target.category.value;
    const amount = e.target.amount.value;
    const type = e.target.type.value;
    const description = e.target.description.value;
    const financeInfo = {
      title: title || finance?.title,
      date: date || finance?.date,
      category: category || finance?.category,
      amount: parseFloat(amount) || parseFloat(finance?.amount),
      type: type || finance?.type,
      description: description || finance?.description,
    };
    console.log(financeInfo);
    await axiosPublic.patch(`/finance/${id}`, financeInfo).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        Edit Finance Entry
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-5">
          <div className="w-full">
            <Label
              htmlFor="title"
              className="block text-base font-semibold text-gray-700"
            >
              Title
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              defaultValue={finance.title}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="date"
              className="block text-base font-semibold text-gray-700"
            >
              Date
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={finance.date}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="w-full">
            <Label
              htmlFor="amount"
              className="block text-base font-semibold text-gray-700"
            >
              Amount
            </Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              defaultValue={finance.amount}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            />
          </div>

          <div className="w-full">
            <Label
              htmlFor="category"
              className="block text-base font-semibold text-gray-700"
            >
              Category:{" "}
              <span className="text-rose-500 font-medium pl-2">
                {finance?.category}
              </span>
            </Label>
            <Select
              name="category"
              id="category"
              //   defaultValue={finance?.category || ""}
            >
              <SelectTrigger className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label
            htmlFor="type"
            className="block text-base font-medium text-gray-700"
          >
            Type:{" "}
            <span className="text-rose-500 font-medium pl-2">
              {finance?.type}
            </span>
          </Label>
          <Select name="type" id="type" 
        //   defaultValue={finance?.type || ""}
          >
            <SelectTrigger className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label
            htmlFor="description"
            className="block text-base font-semibold text-gray-700"
          >
            Description
          </Label>
          <Textarea
            rows={4}
            id="description"
            name="description"
            defaultValue={finance.description}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
