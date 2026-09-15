import { useEffect, useState } from "react";

function SaleModal({ sale, onClose, onSaleAdded }) {
  const [formData, setFormData] = useState({
    saleName: "",
    customer: "",
    opportunity: "",
    proposal: "",
    service: "",
    saleAmount: "",
    amountPaid: "",
    remainingAmount: "",
    saleDate: "",
    paymentStatus: "Pending",
    paymentMethod: "Bank Transfer",
    assignedTo: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // Load existing sale when editing
  useEffect(() => {
    if (sale) {
      setFormData({
        saleName: sale.saleName || "",
        customer: sale.customer || "",
        opportunity: sale.opportunity || "",
        proposal: sale.proposal || "",
        service: sale.service || "",
        saleAmount: sale.saleAmount || "",
        amountPaid: sale.amountPaid || "",
        remainingAmount: sale.remainingAmount || "",
        saleDate: sale.saleDate || "",
        paymentStatus: sale.paymentStatus || "Pending",
        paymentMethod: sale.paymentMethod || "Bank Transfer",
        assignedTo: sale.assignedTo || "",
        notes: sale.notes || "",
      });
    }
  }, [sale]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate remaining amount
  const remainingAmount = Math.max(
    0,
    Number(formData.saleAmount || 0) - Number(formData.amountPaid || 0),
  );

  // Calculate payment status automatically
  const getPaymentStatus = () => {
    const saleAmount = Number(formData.saleAmount || 0);
    const amountPaid = Number(formData.amountPaid || 0);

    if (amountPaid === 0) {
      return "Pending";
    }

    if (amountPaid >= saleAmount && saleAmount > 0) {
      return "Paid";
    }

    return "Partial";
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const url = sale
        ? `http://127.0.0.1:8000/sales/${sale._id}`
        : "http://127.0.0.1:8000/sales";

      const method = sale ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,

          // Convert Sale Amount to number
          saleAmount: Number(formData.saleAmount),

          // Convert Amount Paid to number
          amountPaid: Number(formData.amountPaid),

          // Save calculated Remaining Amount
          remainingAmount: remainingAmount,

          // Save automatically calculated Payment Status
          paymentStatus: getPaymentStatus(),
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert("Failed to save sale");
        return;
      }

      alert(sale ? "Sale updated successfully" : "Sale added successfully");

      onSaleAdded();
      onClose();
    } catch (error) {
      console.error("Error saving sale:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {sale ? "Edit Sale" : "Add Sale"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {sale ? "Update sale information" : "Add a new sale"}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Sale Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sale Name
              </label>

              <input
                type="text"
                name="saleName"
                value={formData.saleName}
                onChange={handleChange}
                placeholder="Website Development Project"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Customer */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Customer
              </label>

              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                placeholder="ABC Technologies"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Opportunity */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Opportunity
              </label>

              <input
                type="text"
                name="opportunity"
                value={formData.opportunity}
                onChange={handleChange}
                placeholder="E-commerce Website"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Proposal */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Proposal
              </label>

              <input
                type="text"
                name="proposal"
                value={formData.proposal}
                onChange={handleChange}
                placeholder="PRO-001"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Service */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Service
              </label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              >
                <option value="">Select Service</option>
                <option value="Website Development">Website Development</option>
                <option value="E-commerce Website">E-commerce Website</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Cloud Services">Cloud Services</option>
                <option value="Maintenance & Support">
                  Maintenance & Support
                </option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            {/* Sale Amount */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sale Amount
              </label>

              <input
                type="number"
                name="saleAmount"
                value={formData.saleAmount}
                onChange={handleChange}
                placeholder="400000"
                min="0"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Amount Paid */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Amount Paid
              </label>

              <input
                type="number"
                name="amountPaid"
                value={formData.amountPaid}
                onChange={handleChange}
                placeholder="150000"
                min="0"
                max={formData.saleAmount || undefined}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Remaining Amount */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Remaining Amount
              </label>

              <input
                type="number"
                value={remainingAmount}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 outline-none"
              />

              <p className="mt-1 text-xs text-gray-500">
                Sale Amount - Amount Paid
              </p>
            </div>

            {/* Sale Date */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sale Date
              </label>

              <input
                type="date"
                name="saleDate"
                value={formData.saleDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Payment Status */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Payment Status
              </label>

              <input
                type="text"
                value={getPaymentStatus()}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 outline-none"
              />

              <p className="mt-1 text-xs text-gray-500">
                Automatically calculated from payment amount.
              </p>
            </div>

            {/* Payment Method */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            {/* Assigned To */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Assigned To
              </label>

              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              >
                <option value="">Select Salesperson</option>
                <option value="Amit">Amit</option>
                <option value="Rahul">Rahul</option>
                <option value="Priya">Priya</option>
              </select>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Notes
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes..."
                rows="4"
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer rounded-lg bg-gray-100 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : sale ? "Update Sale" : "Add Sale"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SaleModal;
