import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  deleteTask,
  editTask,
  toggleTaskCompletion,
} from "../utils/dataStorage";

type Task = {
  id: string;
  name: string;
  status: string;
};

interface ContentMenuProps {
  tasks: Task[];
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
  activeTab: string;
}

const ContentMenu: React.FC<ContentMenuProps> = ({
  tasks,
  setTask,
  activeTab,
}) => {
  const [visibleMoreMenu, setVisibleMoreMenu] = useState<number | null>(null);
  const [editedTaskId, setEditedTaskId] = useState<string | null>(null);
  const [editedTaskName, setEditedTaskName] = useState<string>("");

  const moreMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !(moreMenuRef.current as any).contains(e.target as Node)
      ) {
        setVisibleMoreMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleMoreMenu = (index: number) => {
    setVisibleMoreMenu(visibleMoreMenu === index ? null : index);
  };

  const filteredTasks = tasks.filter((task) =>
    activeTab === "All" ? task : task.status === activeTab.toLocaleLowerCase(),
  );

  const handleCheck = (id: string) => {
    toggleTaskCompletion(id);
    setTask(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task,
      ),
    );
  };

  const btnEditClick = (id: string) => {
    document.getElementById(id)?.focus();
    const taskName = tasks.find((task) => task.id === id)?.name;
    setEditedTaskId(id);
    setEditedTaskName(taskName || "");
    setVisibleMoreMenu(null);
  };

  const handleEdit = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, name: editedTaskName } : task,
    );
    setTask(updatedTasks);
    editTask(id, editedTaskName);
    setEditedTaskId(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    deleteTask(id);
    setTask(tasks.filter((task) => task.id !== id));
    setVisibleMoreMenu(null);
  };

  return (
    <div className="border-b px-5">
      <ul>
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className="relative flex items-center justify-between gap-3 border-b py-3 last:border-b-0"
          >
            <input
              type="checkbox"
              id="check"
              className="cursor-pointer"
              checked={task.status === "completed"}
              onChange={() => handleCheck(task.id)}
            />
            {editedTaskId === task.id ? (
              <input
                type="text"
                id={task.id}
                className="flex-1 rounded focus:outline-none focus:ring-1 focus:ring-black"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
                autoFocus
                onBlur={() => handleEdit(task.id)}
              />
            ) : (
              <p
                className={`flex-1 ${task.status === "completed" && "line-through"}`}
              >
                {task.name}
              </p>
            )}
            <button onClick={() => toggleMoreMenu(index)}>
              <BsThreeDots />
            </button>
            {visibleMoreMenu === index && (
              <div
                className="absolute -bottom-12 -right-20 z-20 w-24 rounded-md border bg-white p-1"
                ref={moreMenuRef}
              >
                <button
                  className="block w-full rounded bg-transparent p-1 text-left text-sm hover:bg-slate-200"
                  onClick={() => btnEditClick(task.id)}
                >
                  Edit
                </button>
                <button
                  className="block w-full rounded bg-transparent p-1 text-left text-sm hover:bg-slate-200"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentMenu;
