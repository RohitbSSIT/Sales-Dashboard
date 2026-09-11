import { useEffect, useState } from "react";

function ProposalModal({ proposal, onClose, onProposalAdded }) {
  const [formData, setFormData] = useState({
    proposalName: "",
    customer: "",
    opportunity: "",
    service: "",
    amount: "",
    proposalDate: "",
    validUntil: "",
    status: "Draft",
    assignedTo: "",
    notes: "",
  });

  // If editing, fill the form with existing proposal data
  useEffect(() => {
    if (proposal) {
      setFormData({
        proposalName: proposal.proposalName || "",
        customer: proposal.customer || "",
        opportunity: proposal.opportunity || "",
        service: proposal.service || "",
        amount: proposal.amount || "",
        proposalDate: proposal.proposalDate || "",
        validUntil: proposal.validUntil || "",
        status: proposal.status || "Draft",
        assignedTo: proposal.assignedTo || "",
        notes: proposal.notes || "",
      });
    }
  }, [proposal]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const proposalData = {
        ...formData,
        amount: Number(formData.amount),
      };

      let response;

      // Edit existing proposal
      if (proposal) {
        response = await fetch(
          `http://127.0.0.1:8000/proposals/${proposal._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(proposalData),
          },
        );
      }

      // Add new proposal
      else {
        response = await fetch("http://127.0.0.1:8000/proposals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(proposalData),
        });
      }

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert("Something went wrong");
        return;
      }

      if (proposal) {
        alert("Proposal updated successfully");
      } else {
        alert("Proposal saved successfully");
      }

      // Refresh proposal table
      onProposalAdded();

      // Close modal
      onClose();
    } catch (error) {
      console.error("Error saving proposal:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {proposal ? "Edit Proposal" : "Add Proposal"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-2xl text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Proposal Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Proposal Name
              </label>

              <input
                type="text"
                name="proposalName"
                value={formData.proposalName}
                onChange={handleChange}
                placeholder="Enter proposal name"
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
                placeholder="Enter customer"
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
                placeholder="Enter opportunity"
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

            {/* Amount */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
                min="0"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Proposal Date */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Proposal Date
              </label>

              <input
                type="date"
                name="proposalDate"
                value={formData.proposalDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Valid Until */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Valid Until
              </label>

              <input
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleChange}
                required
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
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              >
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Viewed">Viewed</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Expired">Expired</option>
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
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter notes"
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
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
              className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
              {proposal ? "Update Proposal" : "Save Proposal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProposalModal;
