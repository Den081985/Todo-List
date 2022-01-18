import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";
//в TodoItem принимаем todo из Todo.js, деструктурируя его в {todo} и в элементе li получаем
//поле todo.title
//{index + 1} для того,чтобы индекс отображался не с нуля,а с единицы
//prop-types -библиотека для определения входящих свойств
//создание стилей элементов inline
const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    marginBottom: "2rem",
    border: "1px solid #ccc",
  },
  input: {
    marginRight: "1rem",
  },
};
function TodoItem({ todo, index, onChange }) {
  //получаем removeTodo функцию из App с помощью useContext
  /*Принимает объект контекста (значение, возвращённое из React.createContext) и возвращает текущее 
значение контекста для этого контекста. Текущее значение контекста определяется пропом value 
ближайшего <Context.Provider> над вызывающим компонентом в дереве */
  const { removeTodo } = useContext(Context);

  const classes = [];
  //проверяем если поле todo.completed===true,то в массив classes добавляем класс doneTodo(зачеркивание элемента)
  //в li элементе массив classes соединяем в строку с помощью join
  if (todo.competed) {
    classes.push("doneTodo");
  }
  console.log(todo);
  return (
    <li style={styles.li}>
      <span className={classes.join(" ")}>
        <input
          type="checkbox"
          checked={todo.competed}
          style={styles.input}
          onChange={() => onChange(todo.id)}
        />
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>
      <button className="rm" onClick={() => removeTodo(todo.id)}>
        &times;
      </button>
    </li>
  );
}
//&nbsp,&times - html символы,означают пробел и крестик
//указываем типы свойств todo и index
TodoItem.propTypes = {
  todo: PropTypes.object,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;
