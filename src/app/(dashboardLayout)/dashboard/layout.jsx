import Sidebar from "@/app/components/dashboardSidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="overflow-y-auto shadow-xl relative">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto bg-slate-200">{children}</div>
    </div>
  );
};

export default Layout;
