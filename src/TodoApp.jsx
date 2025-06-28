import useTodo from "./useTodo";
import "./TodoApp.css";
import { useState } from "react";

export default function TodoApp() {
  const [theme] = useState("business");
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    tasks,
    filteredTasks,
    title,
    details,
    filter,
    sort,
    activeMenuIndex,
    showForm,
    dateFrom,
    dateTo,
    handleAddTask,
    handleDelete,
    handleEdit,
    handleDone,
    setTitle,
    setDetails,
    setFilter,
    setSort,
    setActiveMenuIndex,
    setShowForm,
    setDateFrom,
    setDateTo,
  } = useTodo();

  return (
    <div className="todo-container">
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <h2>TodoApp</h2>
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All Tasks
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          In Progress
        </button>
        <button
          className={filter === "done" ? "active" : ""}
          onClick={() => setFilter("done")}
        >
          Completed
        </button>
      </div>

      <div className={`main ${theme}`}>
        <div className="main-header">
          <label className="hamburger">
            <input 
              type="checkbox" 
              checked={menuOpen} 
              onChange={() => setMenuOpen(!menuOpen)} 
            />
            <svg viewBox="0 0 32 32" >
              <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>

          <h3>
            TodoApp {`>`}{" "}
            {filter === "all"
              ? "All Tasks"
              : filter === "active"
              ? "In Progress"
              : "Completed"}
          </h3>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          Add Task ➕
        </button>

        <div className="task-stats">
          📋 Total: {tasks.length} | ✅ Completed:{" "}
          {tasks.filter((t) => t.done).length} | 🟡 In Progress:{" "}
          {tasks.filter((t) => !t.done).length}
        </div>

        <div className="date-filter">
          <label>
            From:
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </label>
        </div>

        {showForm && (
          <div className="input-section">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button
              onClick={() => {
                handleAddTask();
                setShowForm(false);
              }}
            >
              Save
            </button>
          </div>
        )}

        <div className="sort-controls">
          <button
            className={sort === "newest" ? "selected" : ""}
            onClick={() => setSort("newest")}
          >
            Newest
          </button>
          <button
            className={sort === "oldest" ? "selected" : ""}
            onClick={() => setSort("oldest")}
          >
            Oldest
          </button>
          <button
            className={sort === "activeFirst" ? "selected" : ""}
            onClick={() => setSort("activeFirst")}
          >
            Active First
          </button>
        </div>

        <div
          className={`tasks-container ${
            filter === "all" ? "three-columns" : "one-column"
          }`}
        >
          {filteredTasks.map((task) => {
            const realIndex = tasks.findIndex((t) => t.id === task.id);
            return (
              <div className="task-card" key={task.id}>
                <div className="task-header">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => handleDone(realIndex)}
                    />
                    <h4 className={`task-title ${task.done ? "done" : ""}`}>
                      <span
                        className={`status-dot ${
                          task.done ? "done" : "active"
                        }`}
                      ></span>
                      {task.title}
                    </h4>
                  </label>
                  <div
                    className="menu-icon"
                    onClick={() =>
                      setActiveMenuIndex(
                        activeMenuIndex === realIndex ? null : realIndex
                      )
                    }
                  >
                    ⋯
                  </div>
                  {activeMenuIndex === realIndex && (
                    <div className="task-menu">
                      <button
                        onClick={() => {
                          handleEdit(realIndex);
                          setActiveMenuIndex(null);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(realIndex);
                          setActiveMenuIndex(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className="task-details">{task.details}</div>
                <div className="task-date">
                  {new Date(task.createdAt).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
