import { useEffect, memo } from "react";
import PropTypes from "prop-types";

const Task = ({ id, task, handleDelete }) => {
  useEffect(() => {
    console.log("Rendering <Task />", task);
  });

  return (
    <li>
      {task} <button onClick={() => handleDelete(id)}> ❌ </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.string,
  task: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default memo(Task);
