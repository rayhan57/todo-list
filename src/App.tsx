import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ClearAll from "./components/ClearAll";
import ContentMenu from "./components/ContentMenu";
import InputTask from "./components/InputTask";
import TabMenu from "./components/TabMenu";
import { addTask, clearAllTasks, getTasks } from "./utils/dataStorage";

type Task = {
  id: string;
  name: string;
  status: string;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(getTasks());
  const [inputValue, setInputValue] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("All");

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputValue) return;

    const newTask = {
      id: uuidv4(),
      name: inputValue,
      status: "pending",
    };
    addTask(newTask);
    setInputValue("");
    setTasks([...tasks, newTask]);
  };

  const handleClearAll = () => {
    clearAllTasks();
    setTasks([]);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-tl from-blue-500 to-blue-400">
      <div className="rounded-md bg-white py-5 shadow-md">
        <InputTask
          value={inputValue}
          setInputValue={setInputValue}
          addTask={handleAddTask}
        />

        <div className="mt-3 flex items-center justify-between gap-10 border-b px-5 pb-3">
          <TabMenu
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tasks={tasks}
          />
          <ClearAll handleClearAll={handleClearAll} />
        </div>

        <ContentMenu tasks={tasks} setTask={setTasks} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default App;
