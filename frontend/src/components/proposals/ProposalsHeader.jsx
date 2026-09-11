function ProposalsHeader({ onAddProposal }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Proposals 
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your Proposals
        </p>
      </div>

      <button
        onClick={onAddProposal}
        className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
      >
        + Add Proposals
      </button>
    </div>
  );
}

export default ProposalsHeader;