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
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search leads..."
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
          
          <option value="">All Status</option> <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal">Proposal</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
        {/* Lead Source */}
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        >
          
          <option value="">All Sources</option>
          <option value="Google">Google</option>
          <option value="Referral">Referral</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Website">Website</option>
        </select>
      </div>
    </div>
  );
}


export default LeadsFilters;