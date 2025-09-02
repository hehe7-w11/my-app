import { useState, useEffect } from "react";
import axios from "axios";

// 创建axios实例
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证token
    config.headers.Authorization = "Bearer fake-token";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const TestTodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchTodos() {
    try {
      setLoading(true);
      const { data } = await api.get("/todos");
      setTodos(data);
    } catch (error) {
      setError("获取数据失败，请稍后重试");
      console.error("请求错误:", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};
export default api;
