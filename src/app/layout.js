import "./globals.css";
import Navbar from "./components/home/Navbar";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Personal Finance Visualizer",
  description: "A finance visualizer management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-slate-100 font antialiased`}>
        <ToastContainer/>
        {children}
      </body>
    </html>
  );
}
