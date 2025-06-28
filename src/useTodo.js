import { useState, useEffect, useRef } from "react";

export default function useTodo() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const isFirstLoad = useRef(true);


useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return; // ❗Пропускаем первую перезапись
    }
    console.log("Tasks updated", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    if (title.trim() === "") return;
    const newTask = {
      id: Date.now().toString(),
      title,
      details,
      done: false,
      createdAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDetails("");
  }

  function handleDelete(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  function handleEdit(index) {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setDetails(taskToEdit.details);
    setShowForm(true);
    handleDelete(index); // удалить старую, новую добавим
  }

  function handleDone(index) {
    const updated = [...tasks];
    updated[index] = { ...updated[index], done: !updated[index].done };
    setTasks(updated);
  }

const filteredTasks = tasks.filter(task => {
  const matchesFilter =
    filter === 'all' ? true :
    filter === 'active' ? !task.done :
    filter === 'done' ? task.done : false;

  const taskDate = new Date(task.createdAt);
  const fromDate = dateFrom ? new Date(dateFrom) : null;
  const toDate = dateTo ? new Date(dateTo) : null;

  const matchesDate =
    (!fromDate || taskDate >= fromDate) &&
    (!toDate || taskDate <= toDate);

  return matchesFilter && matchesDate;
});


  filteredTasks.sort((a, b) => {
    if (sort === "newest") return b.createdAt - a.createdAt;
    if (sort === "oldest") return a.createdAt - b.createdAt;
    if (sort === "activeFirst") {
      if (a.done === b.done) return 0;
      return a.done ? 1 : -1;
    }
    return 0;
  });

  return {
    tasks,
    filteredTasks,
    title,
    dateFrom,
    dateTo,
    details,
    filter,
    sort,
    activeMenuIndex,
    showForm,
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
  };
}
