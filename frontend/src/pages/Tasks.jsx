import TasksHeader from "../components/tasks/TasksHeader";

function Tasks() {
  return (
    <div className="p-6">
      <TasksHeader  onAddTask = {()=> console.log("add task")}/>
    </div>
  );
}

export default Tasks;
