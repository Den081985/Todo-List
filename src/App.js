import React, { useState } from "react";
import TodoList from "./Todo/Todo";
import Context from "./context";
function App() {
  //массив элементов,передаваемый в Todo компонент в качестве свойства
  //с применением хука useState для изменения сосотояния массива todos
  const [todos, setTodos] = useState([
    { id: 1, completed: false, title: "Learn JS" },
    { id: 2, completed: false, title: "Learn React" },
    { id: 3, completed: false, title: "Learn NodeJS" },
  ]);
  //определение функции toggleTodo,в которой с помощью функции-модификатора изменяется текущее
  //состояние todos
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (id === todo.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }
  //функция удаления элемента
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  /*Каждый объект Context используется вместе с Provider компонентом, который позволяет дочерним
   компонентам, использующим этот контекст, подписаться на его изменения.
   Все потребители, которые являются потомками Provider, будут повторно рендериться, как только
    проп value у Provider изменится.*/

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h2>Todo List</h2>

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : (
          <h3>No todos</h3>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
