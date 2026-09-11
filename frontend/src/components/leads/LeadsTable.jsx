import { useEffect, useState } from "react";

function LeadsTable({
  refresh,
  onEdit,
  onDelete,
  onView,
  search,
  status,
  source,
}) {
  const [leads, setLeads] = useState([]);

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/leads");

      const data = await response.json();

      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  // Fetch when component loads or refresh changes
  useEffect(() => {
    fetchLeads();
  }, [refresh]);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      lead.leadName?.toLowerCase().includes(searchText) ||
      lead.contactPerson?.toLowerCase().includes(searchText) ||
      lead.company?.toLowerCase().includes(searchText) ||
      lead.service?.toLowerCase().includes(searchText) ||
      lead.email?.toLowerCase().includes(searchText) ||
      lead.phone?.toLowerCase().includes(searchText);

    const matchesStatus = status === "" || lead.status === status;

    const matchesSource = source === "" || lead.leadSource === source;

    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      {/* Table Wrapper */}
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Lead
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Contact Person
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Company
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Service
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Follow-up
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead._id} className="transition hover:bg-gray-50">
                  {/* Lead */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {lead.leadName}
                  </td>

                  {/* Contact Person */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lead.contactPerson}
                  </td>

                  {/* Company */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lead.company}
                  </td>

                  {/* Service */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lead.service}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        lead.status === "New"
                          ? "bg-blue-100 text-blue-700"
                          : lead.status === "Contacted"
                            ? "bg-yellow-100 text-yellow-700"
                            : lead.status === "Qualified"
                              ? "bg-purple-100 text-purple-700"
                              : lead.status === "Proposal"
                                ? "bg-orange-100 text-orange-700"
                                : lead.status === "Won"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  {/* Follow-up */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {lead.nextFollowUp || "Not scheduled"}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => onView(lead)}
                        className="cursor-pointer rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600 transition hover:bg-blue-200"
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(lead)}
                        className="cursor-pointer rounded-lg bg-yellow-100 px-3 py-1 text-sm text-yellow-600 transition hover:bg-yellow-200"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(lead)}
                        className="cursor-pointer rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 transition hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadsTable;
