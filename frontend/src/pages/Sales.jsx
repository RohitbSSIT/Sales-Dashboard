import { useState } from "react";

import SalesFilters from "../components/sales/SalesFilters";
import SalesHeader from "../components/sales/SalesHeader";
import SalesTable from "../components/sales/SalesTable";
import SaleDetailsModal from "../components/sales/SaleDetailsModal";
import SaleModal from "../components/sales/SaleModal";
import ConfirmDialog from "../components/common/ConfirmDialog";

function Sales() {
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [deleteSale, setDeleteSale] = useState(null);

  // Edit Sale
  const handleEditSale = (sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  // View Sale
  const handleViewSale = (sale) => {
    setSelectedSale(sale);
    setIsDetailsOpen(true);
  };

  // Add Sale
  const handleAddSale = () => {
    setSelectedSale(null);
    setIsModalOpen(true);
  };

  // Close Sale Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSale(null);
  };

  // Close Details Modal
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedSale(null);
  };

  // Delete proposal
  const handleDeleteSale = async () => {
    if (!deleteSale) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/sales/${deleteSale._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert("Failed to delete Sale");
        return;
      }

      alert("Sale deleted successfully");

      setDeleteSale(null);

      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting sale:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <SalesHeader onAddSale={handleAddSale} />

      {/* Filters */}
      <SalesFilters
        search={search}
        setSearch={setSearch}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        assignedTo={assignedTo}
        setAssignedTo={setAssignedTo}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      {/* Sales Table */}
      <SalesTable
        search={search}
        paymentStatus={paymentStatus}
        paymentMethod={paymentMethod}
        assignedTo={assignedTo}
        fromDate={fromDate}
        toDate={toDate}
        refresh={refresh}
        onView={handleViewSale}
        onEdit={handleEditSale}
        onDelete={(sale) => setDeleteSale(sale)}
      />

      {/* Add / Edit Sale Modal */}
      {isModalOpen && (
        <SaleModal
          sale={selectedSale}
          onClose={handleCloseModal}
          onSaleAdded={() => setRefresh(!refresh)}
        />
      )}

      {/* View Sale Modal */}
      {isDetailsOpen && (
        <SaleDetailsModal sale={selectedSale} onClose={handleCloseDetails} />
      )}

      {deleteSale && (
        <ConfirmDialog
          onCancel={() => setDeleteSale(null)}
          onConfirm={handleDeleteSale}
        />
      )}
    </div>
  );
}

export default Sales;
