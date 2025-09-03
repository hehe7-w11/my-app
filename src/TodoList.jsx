import { todoListStore } from "./store/todoListStore.js";
import styles from "./TodoList.module.css";
import { useEffect, useRef } from "react";
import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router";

function TodoItem({ title, completed, onToggle }) {
  const itemClassName = `${styles.item} ${completed ? styles.checked : ""}`;
  // 处理添加按钮点击

  return (
    <li className={itemClassName}>
      <label>
        <input type="checkbox" checked={completed} onChange={onToggle} />
        {title} {completed && "✅"}
      </label>
    </li>
  );
}

export default function TodoList() {
  const {
    todo,
    getFilteredItems,
    isFilter,
    handleItemToggle,
    setIsFilter,
    totalElements,
    totalPages,
    getPackedCount,
    getUnpackedCount,
    handleInputChange,
    newItemName,
    handleAddItem,
    clearCompletedItems,
    fetchTodos,
    setPage,
    page: currentPage,
  } = todoListStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const isFirstLoad = useRef(true);

  const handlePageChange = (event, newPage) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages || 1));
    if (validPage === currentPage) return;
    searchParams.set("page", validPage);
    setSearchParams(searchParams);
    setPage(validPage);
    fetchTodos(validPage);
  };

  useEffect(() => {
    if (totalPages === 0) return;
    if (isFirstLoad.current) {
      fetchTodos(pageParam); // 初始请求第1页数据
      isFirstLoad.current = false; // 标记为“非首次”，后续不再执行
      return;
    }
    if (pageParam !== currentPage) {
      setPage(pageParam);
      fetchTodos(pageParam);
    }
  }, [pageParam, totalPages, setPage, fetchTodos]);

  return (
    <section>
      <h1>Sally Ride 的 行李打包 清单</h1>
      <h1>(Zustand版本)</h1>
      <div>
        <span>总计: {totalElements}</span>
        <span>已打包: {getPackedCount()}</span>
        <span>未打包: {getUnpackedCount()}</span>
      </div>
      <button onClick={clearCompletedItems} disabled={getPackedCount() === 0}>
        清除已完成 ({getPackedCount()})
      </button>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isFilter}
            onChange={() => setIsFilter(!isFilter)}
          />
          过滤已打包的行李
        </label>
      </div>
      <div>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            value={newItemName}
            onChange={handleInputChange}
            placeholder="输入新物品名称"
          />
          <button type="submit">添加</button>
        </form>
      </div>
      <ul>
        {/* 使用过滤后的列表进行渲染 */}

        {getFilteredItems(todo).map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            onToggle={() => handleItemToggle(item)}
          />
        ))}
      </ul>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      ></Pagination>
    </section>
  );
}
