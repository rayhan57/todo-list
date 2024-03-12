import React from "react";
import { AiOutlineClear } from "react-icons/ai";

interface ClearAllProps {
  handleClearAll: () => void;
}

const ClearAll: React.FC<ClearAllProps> = ({ handleClearAll }) => {
  return (
    <div>
      <button
        className="flex items-center gap-1 rounded-md bg-gradient-to-tl from-blue-500 to-blue-400 p-1.5 text-sm text-white hover:bg-gradient-to-br active:scale-95"
        onClick={handleClearAll}
      >
        <AiOutlineClear size={18} /> Clear All
      </button>
    </div>
  );
};

export default ClearAll;
