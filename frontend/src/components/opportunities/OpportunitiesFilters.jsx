function OpportunitiesFilters({ search, setSearch, stage, setStage }) {
  // Clear all filters
  const handleClearFilters = () => {
    setSearch("");
    setStage("");
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-3 shadow-sm sm:p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search Opportunity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />

        {/* Stage Filter */}
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="">All Stages</option>
          <option value="Qualification">Qualification</option>
          <option value="Proposal">Proposal</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>

        {/* Clear Filters */}
        <button
          type="button"
          onClick={handleClearFilters}
          className="cursor-pointer rounded-lg bg-gray-100 font-medium text-gray-700 transition hover:bg-gray-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default OpportunitiesFilters;
