import React from "react";
import ItemList from "./ItemList";

const TaskItem = ({ items, headleCheck, handleDelete }) => {
  return (
    <>
      <ul>
        {items.map((item) => (
          <ItemList
            key={item.id}
            item={item}
            headleCheck={headleCheck}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  );
};

export default TaskItem;
