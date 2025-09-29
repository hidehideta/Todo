import React from 'react'

const todo = ({todo,toggleTodo}) => {
  
  const handleTOdoClick = () => {
    toggleTodo(todo.id);
  };
  
  return (
    <div>
        <label>
            <input type="checkbox" 
            checked={todo.completed}
            readOnly 
            onChange={handleTOdoClick}/>
        </label>
        {todo.name}</div>
  )
};

export default todo