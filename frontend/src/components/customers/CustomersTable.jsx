import { useEffect, useState } from "react";

function CustomersTable({ search, status, onEdit, onView, onDelete, refresh }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/customers");

      const data = await response.json();

      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch customers when page loads
  // and when refresh changes
  useEffect(() => {
    fetchCustomers();
  }, [refresh]);

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      customer.customerName?.toLowerCase().includes(searchText) ||
      customer.contactPerson?.toLowerCase().includes(searchText) ||
      customer.email?.toLowerCase().includes(searchText) ||
      customer.phone?.toLowerCase().includes(searchText) ||
      customer.service?.toLowerCase().includes(searchText);

    const matchesStatus = status === "" || customer.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      {/* Table Scroll */}
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Contact
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Service
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Total Value
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {/* Loading */}
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  Loading customers...
                </td>
              </tr>
            ) : filteredCustomers.length > 0 ? (
              /* Customers */
              filteredCustomers.map((customer) => (
                <tr key={customer._id} className="transition hover:bg-gray-50">
                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-800">
                      {customer.customerName}
                    </div>

                    <div className="text-sm text-gray-500">
                      {customer.email}
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>{customer.contactPerson}</div>

                    <div>{customer.phone}</div>
                  </td>

                  {/* Service */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.service}
                  </td>

                  {/* Total Value */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-700">
                    ₹{Number(customer.totalValue || 0).toLocaleString("en-IN")}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        customer.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => onView(customer)}
                        className="cursor-pointer rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600 transition hover:bg-blue-200"
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(customer)}
                        className="cursor-pointer rounded-lg bg-yellow-100 px-3 py-1 text-sm text-yellow-600 transition hover:bg-yellow-200"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(customer)}
                        className="cursor-pointer rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 transition hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              /* Empty State */
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center">
                  <p className="text-sm font-medium text-gray-700">
                    No customers found
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Try changing your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomersTable;
