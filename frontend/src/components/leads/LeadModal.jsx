import { useEffect, useState } from "react";

function LeadModal({ lead, onClose, onLeadAdded }) {
  const [formData, setFormData] = useState({
    leadName: "",
    contactPerson: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    leadSource: "",
    status: "New",
    assignedTo: "",
    nextFollowUp: "",
    notes: "",
  });

  // When editing, load existing lead data into the form
  useEffect(() => {
    if (lead) {
      setFormData({
        leadName: lead.leadName || "",
        contactPerson: lead.contactPerson || "",
        email: lead.email || "",
        phone: lead.phone || "",
        company: lead.company || "",
        service: lead.service || "",
        budget: lead.budget || "",
        leadSource: lead.leadSource || "",
        status: lead.status || "New",
        assignedTo: lead.assignedTo || "",
        nextFollowUp: lead.nextFollowUp || "",
        notes: lead.notes || "",
      });
    } else {
      // Reset form when adding a new lead
      setFormData({
        leadName: "",
        contactPerson: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        leadSource: "",
        status: "New",
        assignedTo: "",
        nextFollowUp: "",
        notes: "",
      });
    }
  }, [lead]);

  // Handle all input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Add / Edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = lead
        ? `http://127.0.0.1:8000/leads/${lead._id}`
        : "http://127.0.0.1:8000/leads";

      const method = lead ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save lead");
      }

      const data = await response.json();

      console.log(data);

      alert(lead ? "Lead updated successfully!" : "Lead saved successfully!");

      onLeadAdded();
      onClose();
    } catch (error) {
      console.error("Error saving lead:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {lead ? "Edit Lead" : "Add New Lead"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-xl text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Lead Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Lead Name
            </label>

            <input
              type="text"
              name="leadName"
              value={formData.leadName}
              onChange={handleChange}
              placeholder="Enter lead name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
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
              placeholder="Enter email address"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Company */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Company
            </label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
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
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="">Select service</option>
              <option value="E-commerce Website">E-commerce Website</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Software Development">Software Development</option>
              <option value="Cloud Services">Cloud Services</option>
              <option value="Maintenance & Support">
                Maintenance & Support
              </option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Budget
            </label>

            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter budget"
              min="0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Lead Source */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Lead Source
            </label>

            <select
              name="leadSource"
              value={formData.leadSource}
              onChange={handleChange}
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="">Select source</option>
              <option value="Google">Google</option>
              <option value="Referral">Referral</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Website">Website</option>
            </select>
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
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal">Proposal</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Next Follow-up */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Next Follow-up
            </label>

            <input
              type="datetime-local"
              name="nextFollowUp"
              value={formData.nextFollowUp}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Notes */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter requirements and conversation notes"
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {lead ? "Update Lead" : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadModal;
