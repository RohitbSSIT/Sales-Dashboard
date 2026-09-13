import { useEffect, useState } from "react";

function SaleModal({ sale, onClose, onSaleAdded }) {
  const [formData, setFormData] = useState({
    saleName: "",
    customer: "",
    opportunity: "",
    proposal: "",
    service: "",
    saleAmount: "",
    saleDate: "",
    paymentStatus: "Pending",
    paymentMethod: "Bank Transfer",
    assignedTo: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // Fill form when editing
  useEffect(() => {
    if (sale) {
      setFormData({
        saleName: sale.saleName || "",
        customer: sale.customer || "",
        opportunity: sale.opportunity || "",
        proposal: sale.proposal || "",
        service: sale.service || "",
        saleAmount: sale.saleAmount || "",
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
          saleAmount: Number(formData.saleAmount),
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert("Failed to save sale");
        return;
      }

      alert(sale ? "Sale updated successfully" : "Sale added successfully");

      // Refresh table
      onSaleAdded();

      // Close modal
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
          <h2 className="text-xl font-semibold text-gray-800">
            {sale ? "Edit Sale" : "Add Sale"}
          </h2>

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
                placeholder="ABC Website Project"
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
                placeholder="ABC E-commerce Opportunity"
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
                placeholder="ABC Website Proposal"
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

              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              >
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
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
                placeholder="Add sale notes..."
                rows="4"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg bg-gray-100 px-5 py-2 font-medium text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
