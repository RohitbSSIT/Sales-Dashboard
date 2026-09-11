import { useState } from "react";

import CustomersHeader from "../components/customers/CustomersHeader";
import CustomersFilters from "../components/customers/CustomersFilters";
import CustomersTable from "../components/customers/CustomersTable";
import CustomerModal from "../components/customers/CustomerModal";
import CustomerDetailsModal from "../components/customers/CustomerDetailsModal";
import ConfirmDialog from "../components/common/ConfirmDialog";

function Customers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deleteCustomer, setDeleteCustomer] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Edit Customer
  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // View Customer
  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <CustomersHeader
        onAddCustomer={() => {
          setSelectedCustomer(null);
          setIsModalOpen(true);
        }}
      />

      {/* Filters */}
      <CustomersFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* Customer Table */}
      <CustomersTable
        refresh={refresh}
        onView={handleViewCustomer}
        onEdit={handleEditCustomer}
        onDelete={(customer) => setDeleteCustomer(customer)}
        search={search}
        status={status}
      />
      {/* Delete Confirmation */}
      {deleteCustomer && (
        <ConfirmDialog
          onCancel={() => setDeleteCustomer(null)}
          onConfirm={async () => {
            try {
              const response = await fetch(
                `http://127.0.0.1:8000/customers/${deleteCustomer._id}`,
                {
                  method: "DELETE",
                },
              );

              const data = await response.json();

              console.log(data);

              setDeleteCustomer(null);
              setRefresh(!refresh);
            } catch (error) {
              console.error("Error deleting customer:", error);
            }
          }}
        />
      )}

      {/* Add / Edit Customer Modal */}
      {isModalOpen && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCustomer(null);
          }}
          onCustomerAdded={() => {
            setRefresh(!refresh);
          }}
        />
      )}

      {/* View Customer Modal */}
      {isDetailsOpen && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
}

export default Customers;
