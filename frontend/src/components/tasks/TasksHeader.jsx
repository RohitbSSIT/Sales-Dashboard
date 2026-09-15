function TasksHeader({ onAddTask }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>

        <p className="mt-1 text-sm text-gray-500">Manage your Tasks</p>
      </div>

      <button
        onClick={onAddTask}
        className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
      >
        + Add Task
      </button>
    </div>
  );
}

export default TasksHeader;