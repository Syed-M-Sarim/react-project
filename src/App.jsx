import { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import { AuthProvider } from "./components/AuthContext";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <AuthProvider>
      <div className="App">
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
        <h1>Todo App with Firebase Auth</h1>
        <Signup />
        <Login />
        <TodoList />
      </div>
    </AuthProvider>
  );
}

export default App;
