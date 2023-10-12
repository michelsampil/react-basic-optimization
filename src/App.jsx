import { useState } from "react";
import "./App.css";
import { useEffect, useMemo, useCallback } from "react";

// Components
import List from "./components/List";

const initialTodos = [
  { id: 1, task: "Go shopping" },
  { id: 2, task: "Pay the electricity bill" },
];

function App() {
  const [todoList, setTodoList] = useState(initialTodos);
  const [task, setTask] = useState("");
  const [term, setTerm] = useState("");

  const printTodoList = useCallback(() => {
    console.log("Changing todoList", todoList);
  }, [todoList]);

  useEffect(() => {
    console.log("Rendering <App />");
  });

  useEffect(() => {
    printTodoList();
  }, [todoList, printTodoList]);

  const handleCreate = () => {
    const newTodo = {
      id: Date.now(),
      task,
    };

    setTodoList([...todoList, newTodo]);
    setTask("");
  };

  const handleSearch = () => {
    setTerm(task);
  };

  const handleDelete = useCallback(
    (taskId) => {
      const newTodoList = todoList.filter((todo) => todo.id !== taskId);
      setTodoList(newTodoList);
    },
    [todoList]
  );

  // filter is a expensive operation because it need to check all the list
  // elements, so in order to get the filtered TODOS we can "save" the
  // function in memory and update it only when todoList is modified 👇
  const filteredTodoList = useMemo(
    () =>
      todoList.filter((todo) => {
        console.log("Filtering...");
        return todo.task.toLowerCase().includes(term.toLowerCase());
      }),
    [term, todoList]
  );

  return (
    <>
      <div className="card">
        <div>
          <div className="box">
            <h2>TASKS</h2>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div className="buttonGroup">
              <button onClick={handleCreate}>Create</button>
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>

          <List todoList={filteredTodoList} handleDelete={handleDelete} />
        </div>
      </div>
    </>
  );
}

export default App;
