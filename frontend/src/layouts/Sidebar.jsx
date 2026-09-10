import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 overflow-y-auto bg-gray-900 p-5 text-white">
      
      {/* Company Name */}
      <div className="mb-8">
        <h1 className="text-xl font-bold">
          IT Sales
        </h1>
        <p className="text-sm text-gray-400">
          Management System
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        <Link
          to="/dashboard"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Dashboard
        </Link>

        <Link
          to="/leads"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Leads
        </Link>

        <Link
          to="/customers"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Customers
        </Link>

        <Link
          to="/opportunities"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Opportunities
        </Link>

        <Link
          to="/proposals"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Proposals
        </Link>

        <Link
          to="/sales"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Sales
        </Link>

        <Link
          to="/tasks"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Tasks
        </Link>

        <Link
          to="/reports"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Reports
        </Link>

      </nav>

      {/* Bottom Menu */}
      <div className="mt-10 border-t border-gray-700 pt-5">

        <Link
          to="/settings"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Settings
        </Link>

        <button className="w-full text-left rounded-lg px-4 py-3 hover:bg-gray-800">
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;