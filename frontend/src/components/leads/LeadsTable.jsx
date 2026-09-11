import { useEffect, useState } from "react";

function LeadsTable({ refresh, onEdit, onDelete, search, status, source }) {
  const [leads, setLeads] = useState([]);

  // Fetch leads from FastAPI
  useEffect(() => {
    fetch("http://127.0.0.1:8000/leads")
      .then((response) => response.json())
      .then((data) => {
        setLeads(data);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, [refresh]);

  // Search + filters
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.leadName.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.leadSource.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "" || lead.status === status;

    const matchesSource = source === "" || lead.leadSource === source;

    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
      <table className="min-w-350 w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Lead Name
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Contact Person
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Email
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Phone
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Company
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Service
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Budget
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Lead Source
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Status
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Assigned To
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Next Follow-up
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Notes
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead) => (
              <tr key={lead._id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {lead.leadName}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {lead.contactPerson}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {lead.email}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {lead.phone}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {lead.company}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {lead.service}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  ₹{lead.budget}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {lead.leadSource}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {lead.status}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {lead.assignedTo}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {lead.nextFollowUp}
                </td>

                <td className="max-w-xs px-6 py-4 text-sm text-gray-600">
                  {lead.notes}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    type="button"
                    onClick={() => onEdit(lead)}
                    className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(lead)}
                    className="ml-3 cursor-pointer text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="13"
                className="px-6 py-10 text-center text-sm text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;
