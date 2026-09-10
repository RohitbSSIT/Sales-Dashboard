function CustomersFilters({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

      </div>
    </div>
  );
}

export default CustomersFilters;