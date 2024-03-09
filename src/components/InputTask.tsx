import React from "react";

interface InputTaskProps {
  value: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  addTask: (e: React.FormEvent) => void;
}

const InputTask: React.FC<InputTaskProps> = ({
  value,
  setInputValue,
  addTask,
}) => {
  return (
    <div className="px-5">
      <form
        onSubmit={addTask}
        className="flex items-center rounded-md border border-gray-400 p-2"
      >
        <input
          type="text"
          id="addTodo"
          placeholder="Add a new task"
          className="w-full focus:outline-none"
          autoComplete="off"
          value={value}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="rounded-md bg-gradient-to-tl from-blue-500 to-blue-400 p-1 text-sm text-white hover:bg-gradient-to-br">
          Add
        </button>
      </form>
    </div>
  );
};

export default InputTask;
