
import { useEffect, useState } from "react";

function SalesTable({
  search,
  paymentStatus,
  paymentMethod,
  assignedTo,
  fromDate,
  toDate,
  refresh,
  onView,
  onEdit,
  onDelete,
}) {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sales from backend
  const fetchSales = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/sales"
      );

      const data = await response.json();

      setSales(data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sales when component loads
  // or refresh changes
  useEffect(() => {
    fetchSales();
  }, [refresh]);

  // Apply filters
  const filteredSales = sales.filter((sale) => {
    const searchText = search.toLowerCase();

    // Search filter
    const matchesSearch =
      sale.saleName
        ?.toLowerCase()
        .includes(searchText) ||
      sale.customer
        ?.toLowerCase()
        .includes(searchText) ||
      sale.opportunity
        ?.toLowerCase()
        .includes(searchText) ||
      sale.proposal
        ?.toLowerCase()
        .includes(searchText) ||
      sale.service
        ?.toLowerCase()
        .includes(searchText);

    // Payment status filter
    const matchesPaymentStatus =
      paymentStatus === "" ||
      sale.paymentStatus === paymentStatus;

    // Payment method filter
    const matchesPaymentMethod =
      paymentMethod === "" ||
      sale.paymentMethod === paymentMethod;

    // Assigned salesperson filter
    const matchesAssignedTo =
      assignedTo === "" ||
      sale.assignedTo === assignedTo;

    // From date filter
    const matchesFromDate =
      fromDate === "" ||
      sale.saleDate >= fromDate;

    // To date filter
    const matchesToDate =
      toDate === "" ||
      sale.saleDate <= toDate;

    return (
      matchesSearch &&
      matchesPaymentStatus &&
      matchesPaymentMethod &&
      matchesAssignedTo &&
      matchesFromDate &&
      matchesToDate
    );
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="w-full overflow-x-auto">

        <table className="w-full">

          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Sale
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Service
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Sale Amount
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Sale Date
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Payment
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Assigned To
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>

            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">

            {/* Loading */}
            {loading ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  Loading sales...
                </td>
              </tr>
            ) : filteredSales.length > 0 ? (

              /* Sales List */
              filteredSales.map((sale) => (
                <tr
                  key={sale._id}
                  className="transition hover:bg-gray-50"
                >

                  {/* Sale */}
                  <td className="px-6 py-4">
                    <div className="mb-2 text-sm font-medium text-gray-800">
                      {sale.saleName}
                    </div>

                    <div className="text-sm text-gray-500">
                      {sale.proposal}
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      {sale.customer}
                    </div>

                    <div className="text-sm text-gray-500">
                      {sale.opportunity}
                    </div>
                  </td>

                  {/* Service */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sale.service}
                  </td>

                  {/* Sale Amount */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-700">
                    ₹
                    {Number(
                      sale.saleAmount || 0
                    ).toLocaleString("en-IN")}
                  </td>

                  {/* Sale Date */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {sale.saleDate}
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">

                    <div className="text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          sale.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : sale.paymentStatus === "Partial"
                              ? "bg-yellow-100 text-yellow-700"
                              : sale.paymentStatus === "Overdue"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {sale.paymentStatus}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-gray-500">
                      {sale.paymentMethod}
                    </div>

                  </td>

                  {/* Assigned To */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sale.assignedTo}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      {/* View */}
                      <button
                        type="button"
                        onClick={() => onView(sale)}
                        className="cursor-pointer rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600 transition hover:bg-blue-200"
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(sale)}
                        className="cursor-pointer rounded-lg bg-yellow-100 px-3 py-1 text-sm text-yellow-600 transition hover:bg-yellow-200"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(sale)}
                        className="cursor-pointer rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 transition hover:bg-red-200"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))

            ) : (

              /* No Data */
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-10 text-center"
                >
                  <p className="text-sm font-medium text-gray-700">
                    No sales found
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

export default SalesTable;

