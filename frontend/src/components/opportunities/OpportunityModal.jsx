
import { useEffect, useState } from "react";

function OpportunityModal({
  opportunity,
  onClose,
  onOpportunityAdded,
}) {
  const [formData, setFormData] = useState({
    opportunityName: "",
    customer: "",
    service: "",
    value: "",
    stage: "Qualification",
    probability: "",
    expectedRevenue: "",
    expectedCloseDate: "",
    assignedTo: "",
    notes: "",
  });

  // When editing, put existing data into the form
  useEffect(() => {
    if (opportunity) {
      setFormData({
        opportunityName: opportunity.opportunityName || "",
        customer: opportunity.customer || "",
        service: opportunity.service || "",
        value: opportunity.value || "",
        stage: opportunity.stage || "Qualification",
        probability: opportunity.probability || "",
        expectedRevenue: opportunity.expectedRevenue || "",
        expectedCloseDate: opportunity.expectedCloseDate || "",
        assignedTo: opportunity.assignedTo || "",
        notes: opportunity.notes || "",
      });
    } else {
      setFormData({
        opportunityName: "",
        customer: "",
        service: "",
        value: "",
        stage: "Qualification",
        probability: "",
        expectedRevenue: "",
        expectedCloseDate: "",
        assignedTo: "",
        notes: "",
      });
    }
  }, [opportunity]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Calculate expected revenue
  const calculateExpectedRevenue = () => {
    const value = Number(formData.value);
    const probability = Number(formData.probability);

    if (!value || !probability) {
      return 0;
    }

    return (value * probability) / 100;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Calculate expected revenue
      const expectedRevenue = calculateExpectedRevenue();

      // Data that will be sent to FastAPI
      const opportunityData = {
        ...formData,
        value: Number(formData.value),
        probability: Number(formData.probability),
        expectedRevenue: expectedRevenue,
      };

      let response;

      // EDIT
      if (opportunity) {
        response = await fetch(
          `http://127.0.0.1:8000/opportunities/${opportunity._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(opportunityData),
          }
        );
      }

      // ADD
      else {
        response = await fetch(
          "http://127.0.0.1:8000/opportunities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(opportunityData),
          }
        );
      }

      if (!response.ok) {
        throw new Error("Failed to save opportunity");
      }

      const data = await response.json();

      console.log(data);

      // Success message
      alert(
        opportunity
          ? "Opportunity updated successfully!"
          : "Opportunity saved successfully!"
      );

      // Refresh table
      onOpportunityAdded();

      // Close modal
      onClose();
    } catch (error) {
      console.error("Error saving opportunity:", error);

      alert("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {opportunity
              ? "Edit Opportunity"
              : "Add Opportunity"}
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

          {/* Opportunity Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Opportunity Name
            </label>

            <input
              type="text"
              name="opportunityName"
              value={formData.opportunityName}
              onChange={handleChange}
              placeholder="Enter opportunity name"
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
              placeholder="Enter customer name"
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
              <option value="Website Development">
                Website Development
              </option>
              <option value="E-commerce Website">
                E-commerce Website
              </option>
              <option value="Mobile Development">
                Mobile Development
              </option>
              <option value="UI/UX Design">
                UI/UX Design
              </option>
              <option value="Software Development">
                Software Development
              </option>
              <option value="Cloud Services">
                Cloud Services
              </option>
              <option value="Maintenance & Support">
                Maintenance & Support
              </option>
              <option value="Digital Marketing">
                Digital Marketing
              </option>
            </select>
          </div>

          {/* Estimated Value */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Estimated Value
            </label>

            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="Enter estimated value"
              min="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Probability */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Probability (%)
            </label>

            <input
              type="number"
              name="probability"
              value={formData.probability}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Example: 70"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Expected Revenue */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Expected Revenue
            </label>

            <input
              type="text"
              value={
                calculateExpectedRevenue()
                  ? `₹${calculateExpectedRevenue().toLocaleString("en-IN")}`
                  : "₹0"
              }
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 outline-none"
            />
          </div>

          {/* Stage */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Stage
            </label>

            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="Qualification">
                Qualification
              </option>

              <option value="Proposal">
                Proposal
              </option>

              <option value="Negotiation">
                Negotiation
              </option>

              <option value="Won">
                Won
              </option>

              <option value="Lost">
                Lost
              </option>
            </select>
          </div>

          {/* Expected Close Date */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Expected Close Date
            </label>

            <input
              type="date"
              name="expectedCloseDate"
              value={formData.expectedCloseDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Assigned To */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Salesperson
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
          <div className="sm:col-span-2">
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
          <div className="mt-2 flex justify-end gap-3 sm:col-span-2">

            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {opportunity
                ? "Update Opportunity"
                : "Save Opportunity"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default OpportunityModal;

