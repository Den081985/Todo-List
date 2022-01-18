import React, { useState, useEffect } from "react";
import TodoList from "./Todo/Todo";
import Context from "./context";
//import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";
//Функция React.lazy позволяет рендерить динамический импорт как обычный компонент.
//т.е.AddTodo компонент подгрузится после основного рендера
const AddTodo = React.lazy(() => import("./Todo/AddTodo"));
function App() {
  //массив элементов,передаваемый в Todo компонент в качестве свойства
  //с применением хука useState для изменения сосотояния массива todos
  const [todos, setTodos] = useState(
    /*[]*/ [
      { id: 1, completed: false, title: "Learn JS" },
      { id: 2, completed: false, title: "Learn React" },
      { id: 3, completed: false, title: "Learn NodeJS" },
    ]
  );
  //хук для отслеживания состояния загрузки данных с сервера
  //const [loading, setLoading] = useState(true);

  /*Функция, переданная в useEffect, будет запущена после того, как рендер будет зафиксирован на 
экране.Второй аргумент -массив значений, от которых зависит эффект
Если вы хотите запустить эффект и сбросить его только один раз (при монтировании и размонтировании),
 вы можете передать пустой массив ([]) вторым аргументом. React посчитает, что ваш эффект не 
 зависит от каких-либо значений из пропсов или состояния и поэтому не будет выполнять повторных 
 запусков эффекта. */
  /*useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTodos(todos);
        setLoading(false);
      });
  }, []);*/
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

  //функция-реквизит для добавления элементов
  function addTodo(title) {
    const newTodo = {
      title,
      id: Date.now(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
  }
  /*Каждый объект Context используется вместе с Provider компонентом, который позволяет дочерним
   компонентам, использующим этот контекст, подписаться на его изменения.
   Все потребители, которые являются потомками Provider, будут повторно рендериться, как только
    проп value у Provider изменится.*/

  /*Компонент с ленивой загрузкой должен рендериться внутри компонента Suspense, который 
    позволяет нам показать запасное содержимое.Проп fallback принимает запасное содержание*/

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h2>Todo List</h2>

        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {/*loading && <Loader />*/}

        {todos.length ? (
          (<TodoList
            todos={todos}
            onToggle={toggleTodo}
          /> /*: loading ? null*/ /*: loading ? null*/)
        ) : (
          <h3>No todos</h3>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
