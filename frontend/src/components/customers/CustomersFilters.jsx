function CustomersFilters({ search, setSearch, status, setStatus }) {
  // Clear all filters
  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-3 shadow-sm sm:p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Clear Filters */}
        <button
          type="button"
          onClick={handleClearFilters}
          className="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default CustomersFilters;
