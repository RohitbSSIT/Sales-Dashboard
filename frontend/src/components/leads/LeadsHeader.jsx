function LeadsHeader({ onAddLead }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Leads
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your sales leads
        </p>
      </div>

      <button onClick={onAddLead} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer">
        + Add Lead
      </button>

    </div>
  );
}

export default LeadsHeader;