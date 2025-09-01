import { todoListStore } from "./store/todoListStore.js";
import styles from "./TodoList.module.css";

function TodoItem({ title, completed, onToggle }) {
  const itemClassName = `${styles.item} ${completed ? styles.checked : ""}`;
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
    setIsFilter
  } = todoListStore();

  return (
    <section>
      <h1>Sally Ride 的 Todo 清单</h1>
      <label>
        <input
          type="checkbox"
          checked={isFilter}
          onChange={() => setIsFilter(!isFilter)}
        />
        过滤已完成的待办事项
      </label>
      <ul>
        {/* 使用过滤后的列表进行渲染 */}
    
        { getFilteredItems(todo).map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            onToggle={() => handleItemToggle(item)}
          />
        ))}
      </ul>
    </section>
  );
}
