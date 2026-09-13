import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import Customers from "../pages/Customers";
import Opportunities from "../pages/Opportunities";
import Proposals from "../pages/Proposals";
import Sales from "../pages/Sales";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/proposals" element={<Proposals />} />
      <Route path="/Sales" element={<Sales />} />
    </Routes>
  );
}

export default AppRoutes;
