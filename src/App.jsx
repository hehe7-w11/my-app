import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <TodoList></TodoList>
      </div>
    </>
  );
}

export default App;
