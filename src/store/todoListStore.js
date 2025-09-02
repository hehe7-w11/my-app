import { create } from "zustand";
import Api from "../api";

export const todoListStore = create((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await Api.get("/todos");
      set({ todos: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
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
  newItemName: "",
  handleInputChange: (e) => {
    set({ newItemName: e.target.value });
  },
  handleAddItem: () => {
    const { newItemName } = get();
    if (newItemName.trim() === "") return;
    const newItem = {
      id: Date.now(),
      title: newItemName,
      completed: false,
    };
    set((state) => ({
      todos: [...state.todos, newItem],
      newItemName: "",
    }));
  },
  clearCompletedItems: () =>
    set((state) => ({
      // 过滤掉所有 completed 为 true 的项，只保留未完成项
      todos: state.todos.filter((item) => !item.completed),
    })),
}));
