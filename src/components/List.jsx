import React from "react";
import { ACTIONS } from "./ToDo";

export default function List(props) {
  return (
    <div
      className="listContainer"
      style={{
        backgroundColor: "skyblue",
        fontWeight: "bold",
        padding: "10px",
        margin: "10px",
      }}
    >
      <h3 className="task">{props.task.task}</h3>
      <button
        className="toggle"
        onClick={() =>
          props.dispatch({
            type: ACTIONS.TOGGLE_TODO,
            payload: { id: props.task.id },
          })
        }
      >
        Hide this task
      </button>
    </div>
  );
}
