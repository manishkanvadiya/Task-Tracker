import React from "react";

const AddTask = ({ newItem, setNewItem, handleSumit }) => {
  return (
    <form className="addForm flex gap-3 mb-5" onSubmit={handleSumit}>
      {/* <label htmlFor="addItem">Add New Task</label> */}
      <input
        type="text"
        autoFocus
        id="addItem"
        placeholder="Add task"
        required
        className="bg-[#00000070] block bg-white w-full p-3 rounded-sm"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button type="submit" className="bg-themeGreen p-3 rounded-sm border-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default AddTask;
