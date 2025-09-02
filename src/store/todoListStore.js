import { create } from "zustand";
import Api from "../api";

export const todoListStore = create((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await Api.get("/api/v1/todos");
      set({ todos: data, loading: false });
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
  handleAddItem: async (e) => {
    e.preventDefault();
    const { newItemName } = get();
    if (newItemName.trim() === "") return;
    const newItem = {
      // id: Date.now(),
      title: newItemName,
      completed: false,
    };
    try {
      const data = await Api.post("/api/v1/todos", newItem);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
    set((state) => ({
      todos: [...state.todos, newItem],
      newItemName: "",
    }));
  },
 clearCompletedItems: async () => {
  const { todos } = get();
  const completedItems = todos.filter(item => item.completed);
  if (completedItems.length === 0) return; 
  try {
    set({ loading: true, error: null });
    for (const item of completedItems) {
      await Api.delete(`/api/v1/todos/${item.id}`);
    }
    set(state => ({
      todos: state.todos.filter(item => !item.completed),
      loading: false
    }));
  } catch (error) {
    set({
      error: error.message || "删除失败，请重试",
      loading: false
    });
  }
},

}));
