import { useEffect, useState } from "react";

function ProposalsTable({ search, status, onView, onEdit, onDelete, refresh }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch proposals from backend
  const fetchProposals = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/proposals");

      const data = await response.json();

      setProposals(data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when component loads
  // and whenever refresh changes
  useEffect(() => {
    fetchProposals();
  }, [refresh]);

  // Search + status filtering
  const filteredProposals = proposals.filter((proposal) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      proposal.proposalName?.toLowerCase().includes(searchText) ||
      proposal.customer?.toLowerCase().includes(searchText) ||
      proposal.opportunity?.toLowerCase().includes(searchText) ||
      proposal.service?.toLowerCase().includes(searchText) ||
      proposal.assignedTo?.toLowerCase().includes(searchText);

    const matchesStatus = status === "" || proposal.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Proposal
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Service
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Valid Until
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Assigned To
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {/* Loading */}
            {loading ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  Loading proposals...
                </td>
              </tr>
            ) : filteredProposals.length > 0 ? (
              /* Proposals */
              filteredProposals.map((proposal) => (
                <tr key={proposal._id} className="transition hover:bg-gray-50">
                  {/* Proposal */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-800">
                      {proposal.proposalName}
                    </div>

                    <div className="text-sm text-gray-500">
                      {proposal.opportunity}
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {proposal.customer}
                  </td>

                  {/* Service */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {proposal.service}
                  </td>

                  {/* Amount */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-700">
                    ₹{Number(proposal.amount || 0).toLocaleString("en-IN")}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        proposal.status === "Draft"
                          ? "bg-gray-100 text-gray-700"
                          : proposal.status === "Sent"
                            ? "bg-blue-100 text-blue-700"
                            : proposal.status === "Viewed"
                              ? "bg-purple-100 text-purple-700"
                              : proposal.status === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : proposal.status === "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {proposal.status}
                    </span>
                  </td>

                  {/* Valid Until */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {proposal.validUntil}
                  </td>

                  {/* Assigned To */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {proposal.assignedTo}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => onView(proposal)}
                        className="cursor-pointer rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600 transition hover:bg-blue-200"
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(proposal)}
                        className="cursor-pointer rounded-lg bg-yellow-100 px-3 py-1 text-sm text-yellow-600 transition hover:bg-yellow-200"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(proposal)}
                        className="cursor-pointer rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 transition hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              /* Empty State */
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center">
                  <p className="text-sm font-medium text-gray-700">
                    No proposals found
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Try changing your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProposalsTable;
