import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="pt-16">
          {children}
        </main>
      </div>

    </div>
  );
}

export default DashboardLayout;