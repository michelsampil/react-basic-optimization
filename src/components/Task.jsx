import { useEffect, memo } from "react";
import PropTypes from "prop-types";

const Task = ({ id, task, handleDelete }) => {
  useEffect(() => {
    // here we can see each time the component instance is being
    // re-rendered 👇
    console.log("Rendering <Task />", task);
  });

  return (
    <li>
      {task} <button onClick={() => handleDelete(id)}> ❌ </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number,
  task: PropTypes.string,
  handleDelete: PropTypes.func,
};
// we can "memoize" a component in order to save it in memory
// and prevent it to being unnecessary re-render using the
// HOC function memo 👇
export default memo(Task);
