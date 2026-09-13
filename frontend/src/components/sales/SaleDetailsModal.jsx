function SaleDetailsModal({ sale, onClose }) {
  if (!sale) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Sale Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View complete sale information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-2xl text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Sale Information */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Sale Information
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Sale Name */}
              <div>
                <p className="text-sm text-gray-500">Sale Name</p>

                <p className="mt-1 font-medium text-gray-800">
                  {sale.saleName || "-"}
                </p>
              </div>

              {/* Customer */}
              <div>
                <p className="text-sm text-gray-500">Customer</p>

                <p className="mt-1 font-medium text-gray-800">
                  {sale.customer || "-"}
                </p>
              </div>

              {/* Opportunity */}
              <div>
                <p className="text-sm text-gray-500">Opportunity</p>

                <p className="mt-1 font-medium text-gray-800">
                  {sale.opportunity || "-"}
                </p>
              </div>

              {/* Proposal */}
              <div>
                <p className="text-sm text-gray-500">Proposal</p>

                <p className="mt-1 font-medium text-gray-800">
                  {sale.proposal || "-"}
                </p>
              </div>

              {/* Service */}
              <div>
                <p className="text-sm text-gray-500">Service</p>

                <p className="mt-1 font-medium text-gray-800">
                  {sale.service || "-"}
                </p>
              </div>

              {/* Sale Amount */}
              <div>
                <p className="text-sm text-gray-500">Sale Amount</p>

                <p className="mt-1 text-lg font-semibold text-green-600">
                  ₹{Number(sale.saleAmount || 0).toLocaleString("en-IN")}
                </p>
              </div>

              {/* Sale Date */}
              <div>
                <p className="text-sm text-gray-500">Sale Date</p>

                <p className="mt-1 font-medium text-gray-800">
                  {sale.saleDate || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-6 border-t pt-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Payment Information
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Payment Status */}
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>

                <div className="mt-2">
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
                    {sale.paymentStatus || "-"}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>

                <p className="mt-1 font-medium text-gray-800">
                  {sale.paymentMethod || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Salesperson Information */}
          <div className="mb-6 border-t pt-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Salesperson Information
            </h3>

            <div>
              <p className="text-sm text-gray-500">Assigned To</p>

              <p className="mt-1 font-medium text-gray-800">
                {sale.assignedTo || "-"}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="border-t pt-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Notes</h3>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-sm text-gray-700">
                {sale.notes || "No notes available."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-gray-100 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaleDetailsModal;
