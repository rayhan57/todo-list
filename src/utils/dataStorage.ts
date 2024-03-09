type Task = {
  id: string;
  name: string;
  status: string;
};

export const getTasks = () => JSON.parse(localStorage.getItem("tasks") || "[]");

export const addTask = (task: Task) =>
  localStorage.setItem("tasks", JSON.stringify([...getTasks(), task]));

export const toggleTaskCompletion = (taskId: string) => {
  const updatedTasks = getTasks().map((task: Task) =>
    task.id === taskId
      ? {
          ...task,
          status: task.status === "completed" ? "pending" : "completed",
        }
      : task,
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};

export const editTask = (taskId: string, name: string) => {
  const updatedTasks = getTasks().map((task: Task) =>
    task.id === taskId ? { ...task, name } : task,
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};

export const deleteTask = (taskId: string) => {
  const updatedTasks = getTasks().filter((task: Task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};

export const clearAllTasks = () => localStorage.removeItem("tasks");
