import { useState,useRef} from "react";
import TodoList from "./TodoList";
import {v4 as uuidv4} from "uuid";

function App() {
  const[todos,setTodos] = useState([{id:1,name:"Todo1",completed:false}]);


  const todoNameRef = useRef();

//これはタスクを追加する機能
  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if(name ==="") return; //空白のタスクを追加できないようにしてる
    setTodos((prevTodos) => {
      return [...prevTodos,{id:uuidv4(),name:name,completed:false}];
    }) ;
//prevTodosという前までのタスクに「id:uuidv4(),name:name,completed:false」というオブジェクトを追加している
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos]; //コピーしている
    const todo = newTodos.find((todo) => todo.id === id); //find関数はnewTodos の中から、id が一致する最初の要素を取り出して todo 変数に代入している
    todo.completed = !todo.completed; //これはチェックボックスを反転、外すから入れるに、逆もしかり
    setTodos(newTodos);　//新しいデータを React に渡して、画面を描き直させる命令
  };

  //完了したタスクを取り除き、未完了のタスクだけ残す
  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }


  return (
  <div>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input type="text" ref={todoNameRef}/>
    <button onClick={handleAddTodo}>タスクを追加</button>
    <button onClick={handleClear}>完了したタスクの削除</button>
    <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>  
  </div>
  )
}
//フィルター関数の部分は、trueを無視して、falseを認識してその長さを見ている
export default App;
