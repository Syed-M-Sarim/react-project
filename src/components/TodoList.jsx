
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const TodoList = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (currentUser) {
      const tasksCollectionRef = collection(db, "tasks", currentUser.uid, "userTasks");
      const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
        const taskData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskData);
      });

      return unsubscribe;
    }
  }, [currentUser]);

  const addTask = async () => {
    if (newTask.trim() === "") return;
    try {
      await addDoc(collection(db, "tasks", currentUser.uid, "userTasks"), {
        text: newTask,
      });
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", currentUser.uid, "userTasks", id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!currentUser) {
    return <p>Please log in to view your to-dos.</p>;
  }

  return (
    <div>
      <h2>My To-Do List</h2>
      <input
        type="text"
        placeholder="New task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text} <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
