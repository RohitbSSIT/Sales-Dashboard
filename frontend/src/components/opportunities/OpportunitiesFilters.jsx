function OpportunitiesFilters({
  search,
  setSearch,
  stage,
  setStage,
}) {
  return (
    <div className="mb-6 rounded-lg bg-white p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search Opportunity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />

        {/* Stage Filter */}
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 sm:w-auto"
        >
          <option value="">All Stages</option>

          <option value="Qualification">
            Qualification
          </option>

          <option value="Proposal">
            Proposal
          </option>

          <option value="Negotiation">
            Negotiation
          </option>

          <option value="Won">
            Won
          </option>

          <option value="Lost">
            Lost
          </option>
        </select>

      </div>
    </div>
  );
}

export default OpportunitiesFilters;