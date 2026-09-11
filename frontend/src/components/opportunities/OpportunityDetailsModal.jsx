
function OpportunityDetailsModal({ opportunity, onClose }) {
  if (!opportunity) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Opportunity Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View complete opportunity information
            </p>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-full p-2 text-2xl leading-none text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            ×
          </button>

        </div>

        {/* Content */}
        <div className="space-y-6 p-6">

          {/* Basic Information */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <p className="text-sm text-gray-500">
                  Opportunity
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {opportunity.opportunityName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Customer
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {opportunity.customer}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Service
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {opportunity.service}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Assigned To
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {opportunity.assignedTo}
                </p>
              </div>

            </div>
          </div>

          {/* Sales Information */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Sales Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Estimated Value
                </p>

                <p className="mt-2 text-lg font-semibold text-gray-900">
                  ₹{Number(opportunity.value).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Probability
                </p>

                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {opportunity.probability}%
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Expected Revenue
                </p>

                <p className="mt-2 text-lg font-semibold text-gray-900">
                  ₹
                  {Number(opportunity.expectedRevenue).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Stage
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {opportunity.stage}
                </p>
              </div>

            </div>
          </div>

          {/* Closing Information */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Closing Information
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <p className="text-sm text-gray-500">
                  Expected Closing Date
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {opportunity.expectedCloseDate}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Salesperson
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {opportunity.assignedTo}
                </p>
              </div>

            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Notes
            </h3>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {opportunity.notes || "No notes available"}
              </p>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4">

          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

export default OpportunityDetailsModal;

