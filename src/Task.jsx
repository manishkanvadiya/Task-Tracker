import React from "react";
import TaskItem from "./TaskItem";

const Task = ({ items, headleCheck, handleDelete }) => {
  return (
    <div>
      {items.length ? (
        <TaskItem
          items={items}
          headleCheck={headleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <div className="p-2 mb-2 flex justify-center items-center bg-[#00000070] text-themeGrey text-center">
          No Task Found
        </div>
      )}
    </div>
  );
};

export default Task;
