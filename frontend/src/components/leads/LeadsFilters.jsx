
function LeadsFilters({
  search,
  setSearch,
  status,
  setStatus,
  source,
  setSource,
}) {
  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search leads..."
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
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>

        {/* Source */}
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="">All Sources</option>
          <option value="website">Website</option>
          <option value="google">Google</option>
          <option value="facebook">Facebook</option>
          <option value="linkedin">LinkedIn</option>
          <option value="referral">Referral</option>
        </select>
      </div>
    </div>
  );
}

export default LeadsFilters;
