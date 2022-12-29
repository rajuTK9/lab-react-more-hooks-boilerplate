import React, { useState, useReducer, useRef } from "react";
import List from "./List";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      return [newTodo(action.payload.task), ...todos];
    }
    case ACTIONS.TOGGLE_TODO: {
      return todos.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, hidden: !task.hidden };
        }
        return task;
      });
    }
  }
}

function newTodo(task) {
  return { id: Date.now(), task: task, hidden: false };
}

export default function ToDo() {
  const [task, setTask] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  const inputRef = useRef(null);
  function focus() {
    inputRef.current.focus();
  }

  function handleSubmit(e) {
    setTask("");
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { task: task } });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          ref={inputRef}
          onChange={(e) => setTask(e.target.value)}
        />
      </form>

      {todos.map((task) => {
        if (task.hidden)
          return (
            <List
              key={task.id}
              task={{ task: "This task is hidden", id: task.id }}
              dispatch={dispatch}
            />
          );
        else return <List key={task.id} task={task} dispatch={dispatch} />;
      })}

      <button style={{ marginTop: "40px" }} className="refBtn" onClick={focus}>
        Get Back Writing
      </button>
    </div>
  );
}
