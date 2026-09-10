import { useState, useEffect } from "react";

function CustomersTable({ search, status, onEdit, onDelete, refresh }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      });
  }, [refresh]);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.customerName.toLowerCase().includes(search.toLowerCase()) ||
      customer.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "" || customer.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Customer
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Contact
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Service
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Total Value
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Status
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {filteredCustomers.map((customer) => (
            <tr key={customer._id}>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-800">
                  {customer.customerName}
                </div>

                <div className="text-sm text-gray-500">{customer.email}</div>
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                <div>{customer.contactPerson}</div>
                <div>{customer.phone}</div>
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {customer.service}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                ₹{customer.totalValue}
              </td>

              <td className="px-6 py-4 text-sm">{customer.status}</td>

              <td className="px-6 py-4">
                <button
                  onClick={() => onEdit(customer)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(customer)}
                  className="ml-3 text-sm font-medium text-red-600 hover:text-red-800 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersTable;
