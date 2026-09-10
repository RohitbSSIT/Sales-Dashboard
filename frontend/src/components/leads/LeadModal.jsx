import { useEffect, useState } from "react";

function LeadModal({ lead, onClose, onLeadAdded }) {
  const [formData, setFormData] = useState({
    leadName: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    status: "new",
    source: "",
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        leadName: lead.leadName,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        budget: lead.budget,
        status: lead.status,
        source: lead.source,
      });
    }
  }, [lead]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const data = await response.json();

    console.log(data);

    onLeadAdded();
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Add New Lead</h2>

          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Lead Name
            </label>

            <input
              type="text"
              value={formData.leadName}
              onChange={(e) =>
                setFormData({ ...formData, leadName: e.target.value })
              }
              placeholder="Enter lead name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Company
            </label>

            <input
              type="text"
              value={formData.company}
              placeholder="Enter company name"
              onChange={(e) => {
                setFormData({ ...formData, company: e.target.value });
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>

            <input
              type="text"
              value={formData.phone}
              placeholder="Enter phone number"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  phone: e.target.value,
                });
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Service
            </label>

            <select
              value={formData.service}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  service: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="">Select service</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Software Development">Software Development</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Budget
            </label>

            <input
              type="number"
              value={formData.budget}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  budget: e.target.value,
                })
              }
              placeholder="Enter budget"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Source
            </label>

            <select
              value={formData.source}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  source: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="">Select source</option>
              <option value="website">Website</option>
              <option value="google">Google</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="referral">Referral</option>
            </select>
          </div>
          <div className="flex items-center justify-center ">
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
          <div className="flex items-center justify-center ">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
            >
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadModal;
