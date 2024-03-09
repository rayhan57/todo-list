import React from "react";

interface ClearAllProps {
  handleClearAll: () => void;
}

const ClearAll: React.FC<ClearAllProps> = ({ handleClearAll }) => {
  return (
    <div>
      <button
        className="rounded-md bg-gradient-to-tl from-blue-500 to-blue-400 p-1.5 text-sm text-white hover:bg-gradient-to-br active:scale-95"
        onClick={handleClearAll}
      >
        Clear All
      </button>
    </div>
  );
};

export default ClearAll;
