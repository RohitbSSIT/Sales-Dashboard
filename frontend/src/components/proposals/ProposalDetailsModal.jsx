function ProposalDetailsModal({ proposal, onClose }) {
  if (!proposal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Proposal Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-2xl text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        {/* Proposal Information */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Proposal Name */}
          <div>
            <p className="text-sm text-gray-500">Proposal Name</p>

            <p className="mt-1 font-medium text-gray-800">
              {proposal.proposalName}
            </p>
          </div>

          {/* Customer */}
          <div>
            <p className="text-sm text-gray-500">Customer</p>

            <p className="mt-1 font-medium text-gray-800">
              {proposal.customer}
            </p>
          </div>

          {/* Opportunity */}
          <div>
            <p className="text-sm text-gray-500">Opportunity</p>

            <p className="mt-1 font-medium text-gray-800">
              {proposal.opportunity}
            </p>
          </div>

          {/* Service */}
          <div>
            <p className="text-sm text-gray-500">Service</p>

            <p className="mt-1 font-medium text-gray-800">{proposal.service}</p>
          </div>

          {/* Amount */}
          <div>
            <p className="text-sm text-gray-500">Amount</p>

            <p className="mt-1 font-medium text-gray-800">
              ₹{Number(proposal.amount || 0).toLocaleString("en-IN")}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-sm text-gray-500">Status</p>

            <span
              className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
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
          </div>

          {/* Proposal Date */}
          <div>
            <p className="text-sm text-gray-500">Proposal Date</p>

            <p className="mt-1 font-medium text-gray-800">
              {proposal.proposalDate}
            </p>
          </div>

          {/* Valid Until */}
          <div>
            <p className="text-sm text-gray-500">Valid Until</p>

            <p className="mt-1 font-medium text-gray-800">
              {proposal.validUntil}
            </p>
          </div>

          {/* Assigned To */}
          <div>
            <p className="text-sm text-gray-500">Assigned To</p>

            <p className="mt-1 font-medium text-gray-800">
              {proposal.assignedTo}
            </p>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">Notes</p>

          <div className="mt-2 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
            {proposal.notes || "No notes available."}
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-gray-100 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProposalDetailsModal;
