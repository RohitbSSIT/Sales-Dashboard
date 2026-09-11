function OpportunitiesTable({
  opportunities,
  onEdit,
  onDelete,
  onView,
  stage,
  search,
}) {
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      opportunity.opportunityName.toLowerCase().includes(searchText) ||
      opportunity.customer.toLowerCase().includes(searchText) ||
      opportunity.service.toLowerCase().includes(searchText) ||
      String(opportunity.value).includes(searchText);

    const matchesStage = stage === "" || opportunity.stage === stage;

    return matchesSearch && matchesStage;
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-300">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Opportunity
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Customer
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Service
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Estimated Value
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Probability
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Expected Revenue
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Closing Date
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Stage
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Salesperson
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {filteredOpportunities.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No opportunities found
                </td>
              </tr>
            ) : (
              filteredOpportunities.map((opportunity) => (
                <tr key={opportunity._id}>
                  {/* Opportunity */}
                  <td className="px-4 py-4 text-sm font-medium text-gray-800 sm:px-6">
                    {opportunity.opportunityName}
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    {opportunity.customer}
                  </td>

                  {/* Service */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    {opportunity.service}
                  </td>

                  {/* Estimated Value */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    ₹{Number(opportunity.value).toLocaleString("en-IN")}
                  </td>

                  {/* Probability */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    {opportunity.probability}%
                  </td>

                  {/* Expected Revenue */}
                  <td className="px-4 py-4 text-sm font-medium text-gray-800 sm:px-6">
                    ₹
                    {Number(opportunity.expectedRevenue).toLocaleString(
                      "en-IN",
                    )}
                  </td>

                  {/* Closing Date */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    {opportunity.expectedCloseDate}
                  </td>

                  {/* Stage */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    {opportunity.stage}
                  </td>

                  {/* Salesperson */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    {opportunity.assignedTo}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView(opportunity)}
                        className="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600 hover:bg-blue-200"
                      >
                        View
                      </button>

                      <button
                        onClick={() => onEdit(opportunity)}
                        className="rounded-lg bg-yellow-100 px-3 py-1 text-sm text-yellow-600 hover:bg-yellow-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(opportunity)}
                        className="rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OpportunitiesTable;
