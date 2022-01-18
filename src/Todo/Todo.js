import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
//один из способов создания стилей для элементов
const styles = {
  ul: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
};
//с помощью map проитерируем массив todos и вернем новый массив,где каждый элемент будет являться
//результатом вызова коллбэк-функции в map
function TodoList(props) {
  return (
    <ul style={styles.ul}>
      {props.todos.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            index={index}
            onChange={props.onToggle}
          />
        );
      })}
    </ul>
  );
}
//объект для определения типов свойств
//todos: является массивом,состоящим из объектов и он необходим для работы данного компонента(isRequired)
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoList;
