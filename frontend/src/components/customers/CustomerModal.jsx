import { useEffect, useState } from "react";

function CustomerModal({ customer, onClose, onCustomerAdded }) {
  const [formData, setFormData] = useState({
    customerName: "",
    contactPerson: "",
    email: "",
    phone: "",
    service: "",
    totalValue: "",
    status: "active",
    assignedTo: "",
    notes: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        customerName: customer.customerName,
        contactPerson: customer.contactPerson,
        email: customer.email,
        phone: customer.phone,
        service: customer.service,
        totalValue: customer.totalValue,
        status: customer.status,
        assignedTo: "",
        notes: "",
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = customer
        ? `http://127.0.0.1:8000/customers/${customer._id}`
        : "http://127.0.0.1:8000/customers";

      const method = customer ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        console.error("Customer save/update failed");
        return;
      }

      console.log(
        customer
          ? "Customer updated successfully"
          : "Customer saved successfully",
      );

      onCustomerAdded();
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {customer ? "Edit Customer" : "Add Customer"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Customer Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Customer Name
            </label>

            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Contact Person
            </label>

            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Enter contact person"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="">Select service</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Software Development">Software Development</option>
            </select>
          </div>

          {/* Total Value */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Total Value
            </label>

            <input
              type="number"
              name="totalValue"
              value={formData.totalValue}
              onChange={handleChange}
              placeholder="Enter total value"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Assigned To */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Assigned To
            </label>

            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              placeholder="Enter salesperson"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Notes */}
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter notes"
              rows="3"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerModal;
