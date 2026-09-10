function OpportunitiesTable({
  opportunities,
  onEdit,
  onDelete,
  stage,
  search,
}) {
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      opportunity.opportunityName.toLowerCase().includes(searchText) ||
      opportunity.customer.toLowerCase().includes(searchText) ||
      opportunity.service.toLowerCase().includes(searchText) ||
      opportunity.value.toLowerCase().includes(searchText);

    const matchesStage = stage === "" || opportunity.stage === stage;

    return matchesSearch && matchesStage;
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-225">
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
                Value
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Stage
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Probability
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Close Date
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                Assigned To
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
                <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
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

                  {/* Value */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    ₹{opportunity.value}
                  </td>

                  {/* Stage */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    {opportunity.stage}
                  </td>

                  {/* Probability */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    {opportunity.probability}%
                  </td>

                  {/* Expected Close Date */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    {opportunity.expectedCloseDate}
                  </td>

                  {/* Assigned To */}
                  <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                    {opportunity.assignedTo}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 sm:px-6">
                    <button
                      onClick={() => onEdit(opportunity)}
                      className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(opportunity)}
                      className="ml-3 cursor-pointer text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
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
