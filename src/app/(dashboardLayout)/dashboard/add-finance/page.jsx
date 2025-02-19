"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useAxiosPublic from "@/utils/useAxiosPublic";
import { Bounce, toast } from "react-toastify";

const AddFinance = () => {
  const [errors, setErrors] = useState({});
  const axiosPublic = useAxiosPublic();
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const email = e.target.email.value;
    const date = e.target.date.value;
    const amount = e.target.amount.value;
    const category = e.target.category.value;
    const type = e.target.type.value;
    const description = e.target.description.value;

    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!email) errors.title = "Email is required";
    if (!date) errors.date = "Date is required";
    if (!amount) errors.amount = "Amount is required";
    if (!category) errors.category = "Category is required";
    if (!type) errors.type = "Type is required";
    if (!description) errors.description = "Description is required";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const finance = {
      transaction_id: uuidv4(),
      title: title,
      email: email,
      date: date,
      amount: parseFloat(amount),
      category: category,
      type: type,
      description: description,
    };
    // console.log(finance);
    await axiosPublic.post("/finance", finance).then((res) => {
      if (res?.data?.insertedId) {
        toast("✔️ Transaction Added", {
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
        formRef.current.reset();
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl text-blue-600 text-center font-semibold py-4">
        Add Your Recent Finance
      </h1>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="max-w-5xl mx-auto space-y-6 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="flex gap-5">
          {/* Title Field */}
          <div className="w-full space-y-2">
            <Label htmlFor="title" className="text-lg font-semibold">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter title"
              className="p-3 border rounded-md border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          <div className="w-full space-y-2">
            <Label
              htmlFor="email"
              className="text-base text-rose-500 font-semibold"
            >
              Enter your email you used in budget
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="p-3 border rounded-md border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Date Field */}
          <div className="w-full space-y-2">
            <Label htmlFor="date" className="text-lg font-semibold">
              Date
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              className="p-3 border rounded-md border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row-reverse gap-5">
          {/* Amount Field */}
          <div className="w-full space-y-2">
            <Label htmlFor="amount" className="text-lg font-semibold">
              Amount
            </Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter amount"
              className="p-3 border rounded-md border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="w-full space-y-2">
            <Label htmlFor="category" className="text-lg font-semibold">
              Category
            </Label>
            <Select name="category" id="category">
              <SelectTrigger className="p-3 border rounded-md border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all">
                <SelectValue placeholder="Select category" />
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
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>
        </div>

        {/* Type Dropdown (Expense or Income) */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="type" className="text-lg font-semibold">
            Type
          </Label>
          <Select name="type" id="type">
            <SelectTrigger className="p-3 border rounded-md border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="income">Income</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
        </div>

        {/* Description Field */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="description" className="text-lg font-semibold">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter description"
            rows={5}
            className="p-3 border rounded-md border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-all"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddFinance;
