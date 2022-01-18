import React, { useState } from "react";
import PropTypes from "prop-types";

//пльзовательский хук
function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}
//функция для добавления элементов к списку
function AddTodo({ onCreate }) {
  //в переменной сохраняем пользовательский хук,который будет фиксировать состояние input на событие onChange
  const input = useInputValue("");
  //хук useState для изменения состояния инпут формы и фиксации вводимых данных
  // const [value, setValue] = useState("");
  //функция для обработки отправки формы
  function submitHandler(e) {
    //отмена дефолтного поведения(чтобы страница не перезагружалась)
    e.preventDefault();

    if (input.value().trim()) {
      /*(value.trim())*/ onCreate(input.value());

      input.clear(); // setValue(""); //удаление введенного значения
    }
  }
  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      <input
        //value={value}
        //onChange={(event) => setValue(event.target.value)}
        {...input.bind} //=предыдущим двум полям
        style={{ marginRight: "1rem" }}
      />
      <button type="submit">Add todo</button>
    </form>
  );
}
//определение свойства onCreate
AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
