import { create } from "zustand";
import todoItems from "../todoItems.json";

export const todoListStore = create((set, get) => ({
  todos: todoItems,
  isFilter: false,
  setIsFilter: () => set((state) => ({ isFilter: !state.isFilter })),
  handleItemToggle: (item) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  getFilteredItems: () => {
    const { isFilter, todos } = get();
    if (!Array.isArray(todos)) return [];
    return isFilter ? todos.filter((item) => !item.completed) : todos;
  },
  getTotalCount: () => {
    const { todos } = get();
    return todos.length;
  },
  getPackedCount: () => {
    const { todos } = get();
    return todos.filter((item) => item.completed).length;
  },
  getUnpackedCount: () => {
    const { todos } = get();
    return todos.length - todos.filter((item) => item.completed).length;
  },
}));
