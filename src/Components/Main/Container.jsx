import { useEffect, useState } from "react";
import "../Main/main.css";
import { IoMdAdd } from "react-icons/io";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { MdUploadFile } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { Nav, Tab } from "react-bootstrap";
import AllTasks from "./AllTasks";

function Container() {
  const [newTodo, setNewTodo] = useState("");
  // const [todos, setTodos] = useState([]);

  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [activeTab, setActiveTab] = useState("pending");

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  console.log(todos, "toosdasldfkj");

  const [editngTodo, setEditingTodo] = useState(null);

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
  };

  const handleSelectAll = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !selectAll,
    }));

    setTodos(updatedTodos);
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
    setSelectAll(false);
  };

  const handleTodoChange = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
    setSelectAll(updatedTodos.every((todo) => todo.completed));
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
      console.log(todos);
    }
  };
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setEditingTodo(null);
  };
  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit);
    setNewTodo(todoToEdit.text);
  };
  const updateTodo = () => {
    if (newTodo.trim() !== "") {
      const updatedTodos = todos.map((todo) =>
        todo.id === editngTodo.id ? { ...todo, text: newTodo } : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
      setNewTodo("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const cancelTodo = (id) => {
    setEditingTodo(null);
    setNewTodo("");
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
    console.log(todos);
  }, []);



  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleSelect = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      // Task is already selected, remove it from the selection
      setSelectedTasks((prevSelectedTasks) =>
        prevSelectedTasks.filter((id) => id !== taskId)
      );
    } else {
      // Task is not selected, add it to the selection
      setSelectedTasks((prevSelectedTasks) => [...prevSelectedTasks, taskId]);
    }
  };

  const deleteSelectedTasks = () => {
    handleDeleteSelected();
    setTodos((prevTodos) =>
      prevTodos.filter((task) => !selectedTasks.includes(task.id))
    );

    // Clear the selection after deletion
    setSelectedTasks([]);
  };

  const combinedToggle = (id) => {
    handleToggleComplete(id);
    toggleSelect(id);
    handleTodoChange(id);
  };

  console.log(selectedTasks, "selectedTask");

  const pendingTasks = todos.filter((todo) => !todo.completed);
  const doneTasks = todos.filter((done) => done.completed);

  const getFilteredTodos = () => {
    if (activeTab === "pending") {
      return todos.filter((todo) => !todo.completed);
    } else if (activeTab === "done") {
      return todos.filter((todo) => todo.completed);
    } else if (activeTab === 'all'){
      return todos;
    }
  };

  return (
    <div className="main">
      <div className="todo-title">
        <h3>Todo App</h3>
      </div>
      <div className="add-todo">
        <form
          onSubmit={handleSubmit}
          action=""
          style={{ display: "flex", gap: "5rem" }}
        >
          <input
            style={{
              border: "none",
              borderRadius: "10px",
              padding: "5px",
              boxShadow: "0px 3px 8px 0px rgba(0, 0, 0, 0.2)",
            }}
            className="input-feild"
            type="text"
            placeholder="Enter a new Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          {editngTodo ? (
            <Button
              onClick={updateTodo}
              as="input"
              type="submit"
              value="Update"
            />
          ) : (
            <Button
              onClick={addTodo}
              as="input"
              type="submit"
              value="Add Task"
            />
          )}
        </form>
      </div>
      <hr />
      <div className="delete-all">
        <div>
          {selectedTasks.length >= 0 && (
            // delete all selected todos
            <Button
              variant="danger"
              onClick={deleteSelectedTasks}
              style={{ gap: "3px" }}
              className={`${editngTodo ? "" : ""}`}
            >
              <div className="select-delete">
                <div>Delete Selected</div>
                <div>
                  <FaListCheck />
                </div>
              </div>
            </Button>
          )}
        </div>
        <div>
          {/* selectall todos button */}

          <Button
            variant="info"
            onClick={handleSelectAll}
            style={{ gap: "3px" }}
            className={`${activeTab === 'all'? '':'disabled'}`}
          >
            select All
          </Button>
        </div>
      </div>
      <hr />

      <Nav fill variant="tabs" defaultActiveKey="all">
        <Nav.Item>
          <Nav.Link
            eventKey="all"
            active={activeTab === "all"}
            onClick={() => handleSelectTab("all")}
          >
            All Todos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="pending"
            active={activeTab === "pending"}
            onClick={() => handleSelectTab("pending")}
          >
            Pending Todos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="done"
            active={activeTab === "done"}
            onClick={() => handleSelectTab("done")}
          >
            Done Todos
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {todos.length === 0? (<div style={{display:'flex',alignItems:'center',justifyContent:'center', padding:"3rem"}}>
        sorry there are no Todos</div>):(<></>)}

      {/* <Tab.Content>
        <Tab.Pane eventKey="pending">
          <h1>Pending Todos</h1>
          {getFilteredTodos().map((todo) => (
            <div key={todo.id}>
              <span>{todo.text}</span>
            </div>
          ))}
        </Tab.Pane>
        <Tab.Pane eventKey="done">
          <h1>Done Todos</h1>
          {getFilteredTodos().map((todo) => (
            <div key={todo.id}>
              <span>{todo.text}</span>
            </div>
          ))}
        </Tab.Pane>
      </Tab.Content> */}

      {getFilteredTodos()
        .sort((a, b) =>
          a.completed === b.completed ? 0 : a.completed ? 1 : -1
        )
        .map((todo) => (
          <div className="todos-list">
            <div className="todo-items" key={todo.id}>
            
              <div className="check">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  // onChange={() => handleToggleComplete(todo.id)}
                  // onChange={()=>toggleSelect(todo.id)}
                  onChange={() => combinedToggle(todo.id)}
                />
              </div>
              <div className={` ${todo.completed ? "completed" : ""}`}>
                {todo.text}
              </div>
            </div>
            <div className="todo-buttons">
              {editngTodo ? (
                <div className="confirm">
                  <div>
                    {/* <Button variant="success" onClick={updateTodo}>
                      <MdUploadFile />
                    </Button> */}
                  </div>
                  <div>
                    {editngTodo.id === todo.id ? (
                      <Button
                        variant="danger"
                        onClick={() => cancelTodo(todo.id)}
                      >
                        <MdOutlineCancel />
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        className="disabled"
                        onClick={() => cancelTodo(todo.id)}
                      >
                        <MdOutlineCancel />
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="buttons">
                  <div>
                    <Button
                      onClick={() => deleteTodo(todo.id)}
                      variant="danger"
                    >
                      <RiDeleteBin5Line />
                    </Button>
                  </div>
                  <div>
                    <Button onClick={() => editTodo(todo.id)} variant="warning">
                      <FaEdit />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      <hr />
      <div className="task-details">
        <div className="done-task shadow">
          <div>Done task</div>
          <div>{doneTasks.length}</div>
        </div>
        <div className="pending-task shadow">
          <div>Pending Task</div>
          <div>{pendingTasks.length}</div>
        </div>
        <div className="totel-task shadow">
          <div>Totel task</div>
          <div>{todos.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Container;
