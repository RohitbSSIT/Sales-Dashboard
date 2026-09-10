import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import Customers from "../pages/Customers";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/customers" element={<Customers />} />
    </Routes>
  );
}

export default AppRoutes;
