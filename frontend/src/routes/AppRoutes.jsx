import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import Customers from "../pages/Customers";
import Opportunities from "../pages/Opportunities";
import Proposals from "../pages/Proposals";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/proposals" element={<Proposals />} />
    </Routes>
  );
}

export default AppRoutes;
