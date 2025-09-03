import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <Routes>
       <Route index path="/todos" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
