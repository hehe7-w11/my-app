import { useState } from 'react'
import todoItems from './todoItems.json'
import styles from './TodoList.module.css'

function TodoItem({ title, completed, onToggle }) {
    const itemClassName = `${styles.item} ${completed ? styles.checked : ''}`;
    return <li className={itemClassName}>
        <label>
            <input type="checkbox" checked={completed} onChange={onToggle} />
            {title} {completed && '✅'}
        </label>
    </li>;
}
export default function TodoList() {
    const [todos, setTodos] = useState(todoItems);
    const [isFilter, setIsFilter] = useState(false);
    const filteredItems = isFilter ? todos.filter((item) => !item.completed) : todos;

    // callback function
    const handleItemToggle = (item) => {
        setTodos(prevTodos => prevTodos.map(todo => (
            todo.id === item.id ? {
                ...todo, completed:
                    !item.completed
            } : todo
        )));
    }

    return (
        <section>
            <h1>Sally Ride 的 Todo 清单</h1>
            <label>
                <input type='checkbox' checked={isFilter} onChange={() => setIsFilter(!isFilter)} />
                过滤已完成的待办事项
            </label>
            <ul>{filteredItems.map((item) => (
                <TodoItem key={item.id}{...item}
                    onToggle={() => handleItemToggle(item)} />
            ))}
            </ul>
        </section>
    )
};