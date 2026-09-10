import CustomersFilters from "../components/customers/CustomersFilters";
import CustomersHeader from "../components/customers/CustomersHeader";
import { useState } from "react";
import CustomersTable from "../components/customers/CustomersTable";
import CustomerModal from "../components/customers/CustomerModal";
import ConfirmDialog from "../components/common/ConfirmDialog";

function Customers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [deleteCustomer, setDeleteCustomer] = useState(null);
  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <CustomersHeader onAddCustomer={handleAddCustomer} />

      <CustomersFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
      <CustomersTable
        search={search}
        status={status}
        refresh={refresh}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          setIsModalOpen(true);
        }}
        onDelete={(customer) => {
          setDeleteCustomer(customer);
        }}
      />

      {isModalOpen && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCustomer(null);
          }}
          onCustomerAdded={() => setRefresh(!refresh)}
        />
      )}
      {deleteCustomer && (
  <ConfirmDialog
    onCancel={() => setDeleteCustomer(null)}
    onConfirm={async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/customers/${deleteCustomer._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log(data);

      setDeleteCustomer(null);
      setRefresh(!refresh);
    }}
  />
)}
    </div>
  );
}

export default Customers;
