import React from 'react';

const TodoList = ({todos}) => {
  return todos.map((todo) => <Todo/>);
};

export default TodoList;