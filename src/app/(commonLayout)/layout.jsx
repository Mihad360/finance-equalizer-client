import React from "react";
import Navbar from "../components/home/Navbar";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-slate-">{children}</div>
    </div>
  );
};

export default layout;
