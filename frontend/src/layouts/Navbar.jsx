function Navbar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-30 h-16 border-b border-gray-200 bg-white">
      
      <div className="flex h-full items-center justify-between px-6">

        {/* Left side */}
        <div className="flex items-center gap-4">
          <button className="text-2xl">
            ☰
          </button>

          <h2 className="text-xl font-semibold text-gray-800">
            Sales Dashboard
          </h2>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">

          <button className="text-xl">
            🔔
          </button>

          <div className="flex flex-col">
            <span className="font-medium text-gray-800">
              Rohit
            </span>

            <span className="text-sm text-gray-500">
              Salesperson
            </span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;