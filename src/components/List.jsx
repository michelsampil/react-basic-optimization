import { useEffect, memo } from "react";
import PropTypes from "prop-types";
import Task from "./Task";

const List = ({ todoList, handleDelete }) => {
  useEffect(() => {
    // This effect is executed every new render
    console.log("Rendering <List />");
  });

  return (
    <ul>
      {todoList.map((todo) => (
        <Task
          key={todo.id}
          id={todo.id}
          task={todo.task}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

List.propTypes = {
  todoList: PropTypes.array,
  handleDelete: PropTypes.func,
};

export default memo(List);
