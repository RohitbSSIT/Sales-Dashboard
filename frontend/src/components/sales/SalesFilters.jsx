function SalesFilters({
  search,
  setSearch,
  paymentStatus,
  setPaymentStatus,
  paymentMethod,
  setPaymentMethod,
  assignedTo,
  setAssignedTo,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {
  const handleClearFilters = () => {
    setSearch("");
    setPaymentStatus("");
    setPaymentMethod("");
    setAssignedTo("");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-3 shadow-sm sm:p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search sales..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />

        {/* Payment Status */}
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Partial">Partial</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>

        {/* Payment Method */}
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="">All Payment Methods</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Cheque">Cheque</option>
        </select>

        {/* Assigned To */}
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="">All Salespeople</option>
          <option value="Amit">Amit</option>
          <option value="Rahul">Rahul</option>
          <option value="Priya">Priya</option>
        </select>

        {/* From Date */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />

        {/* To Date */}
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      {/* Clear Filters */}
      <div className="mt-3 flex justify-end">
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

export default SalesFilters;
