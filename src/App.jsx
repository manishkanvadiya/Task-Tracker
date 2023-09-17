import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import Task from "./Task";
import Footer from "./Footer";
import AddTask from "./AddTask";
import SearchItem from "./SearchItem";
import apiReq from "./apiReq";
const App = () => {
  const APP_URL = "http://localhost:3100/items";
  const [items, setItems] = useState([]);

  const [completedTasks, setCompletedTasks] = useState(0);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = await apiReq(APP_URL, postOptions);
    if (result) setFetchError(result);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(APP_URL);
        if (!res.ok) throw Error("Unable to fetch the data");
        const listItems = await res.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);

        // Calculate the initial count of completed tasks
        const initialCompletedTasks = listItems.filter(
          (item) => item.checked
        ).length;
        setCompletedTasks(initialCompletedTasks);
      } catch (err) {
        // console.log(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    // setTimeout(() => {
    //   fetchItems();
    // }, 2000);
    fetchItems();
  }, []);

  const complatedCount = (listItems) => {
    const count = listItems.filter((item) => item.checked).length;
    setCompletedTasks(count);
  };
  const headleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${APP_URL}/${id}`;
    const result = await apiReq(reqUrl, updateOptions);
    if (result) setFetchError(result);

    complatedCount(listItems);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${APP_URL}/${id}`;
    const result = await apiReq(reqUrl, deleteOptions);
    if (result) setFetchError(result);

    complatedCount(listItems);
  };

  const handleSumit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="flex flex-row md:flex-column min-h-screen">
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
        {fetchError && (
          <p
            style={{ color: "red " }}
            className="text-red text-lg font-semibold text-center p-3"
          >{`Error: ${fetchError}`}</p>
        )}
        {isLoading && (
          <p className="text-center text-themeGreen p-3">Loading Items...</p>
        )}
        {!fetchError && !isLoading && (
          <Task
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            headleCheck={headleCheck}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default App;
