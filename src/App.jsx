import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import Task from "./Task";
import Footer from "./Footer";
import AddTask from "./AddTask";
import SearchItem from "./SearchItem";
import ForColor from "./ForColor";
import img from "./assets/6206973.jpg";
const App = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("tasklist")) || []
  );

  const [completedTasks, setCompletedTasks] = useState(0);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("tasklist", JSON.stringify(newItems));
  };

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  };

  useEffect(() => {
    const count = items.filter((item) => item.checked).length;
    setCompletedTasks(count);
  }, [items]);

  const headleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setAndSaveItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);
  };

  const handleSumit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="flex flex-row md:flex-column min-h-screen">
      <div className="basis-1/2 left-sec hidden xl:block">
      </div>
      <div className="grow bg-themeBlack p-5">
        <Header headerName="Your Task" />
        <div className="flex gap-3 mb-5">
          <Footer length={items.length} />
          <div className="complated-task bg-themeGreen p-4 rounded-sm font-bold capitalize">
            {completedTasks} Complated Tasks
          </div>
        </div>
        <AddTask
          newItem={newItem}
          setNewItem={setNewItem}
          handleSumit={handleSumit}
        />
        <SearchItem search={search} setSearch={setSearch} />
        <Task
          items={items.filter((item) =>
            item.item.toLowerCase().includes(search.toLowerCase())
          )}
          headleCheck={headleCheck}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
