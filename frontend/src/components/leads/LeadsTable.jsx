import { useEffect, useState } from "react";

function LeadsTable({ refresh, onEdit, onDelete, search, status, source }) {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/leads")
      .then((response) => response.json())
      .then((data) => {
        setLeads(data);
      });
  }, [refresh]);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.leadName.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    lead.source.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "" || lead.status === status;
    const matchesSource = source === "" || lead.source === source;

    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Name
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Company
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Service
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Status
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {filteredLeads.map((lead) => (
            <tr key={lead.id}>
              <td className="px-6 py-4 text-sm text-gray-800">
                {lead.leadName}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {lead.company}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {lead.service}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">{lead.status}</td>

              <td className="px-6 py-4 text-sm text-gray-600">{lead.source}</td>

              {/* <td className="px-6 py-4 text-sm text-gray-600">{lead.}</td> */}

              <td className="px-6 py-4">
                <button
                  onClick={() => onEdit(lead)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(lead)}
                  className="ml-3 text-sm font-medium text-red-600 hover:text-red-800 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;
