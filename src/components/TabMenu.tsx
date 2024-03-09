import React from "react";

type Task = {
  id: string;
  name: string;
  status: string;
};

interface TabMenuProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  tasks: Task[];
}

const TabMenu: React.FC<TabMenuProps> = ({
  activeTab,
  setActiveTab,
  tasks,
}) => {
  const menu: string[] = ["All", "Pending", "Completed"];

  const tasksCount = (menu: string): number =>
    menu === "All"
      ? tasks.length
      : menu === "Pending"
        ? tasks.filter((task) => task.status === "pending").length
        : tasks.filter((task) => task.status === "completed").length;

  return (
    <div>
      <ul className="flex gap-4">
        {menu.map((item, index) => (
          <li
            key={index}
            className={`${activeTab === item && "border-b-2 border-blue-500 font-medium text-blue-500"}`}
          >
            <button onClick={() => setActiveTab(item)}>
              {item}{" "}
              <span
                className={`${activeTab === item ? "bg-blue-200 text-blue-500" : "bg-gray-200"} rounded-full px-2.5 text-sm`}
              >
                {tasksCount(item)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabMenu;
