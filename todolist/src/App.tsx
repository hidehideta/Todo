import React, { useState } from 'react';
import './App.css';

//型を設定。例えば文字列型以外が入らないようにしている
type Todo = {
  inputValue: string;
  id: number;
  checked: boolean;
};

//APPという名前の関数を作成
function App() {
  //inputValue という状態を作って、初期値を空文字にして。
  // その値を変えたい時は setInputValue を使うようにしてね。
  const [inputValue, setInputValue] = useState("");
  //Todo型の配列としてtodosという状態を作成。状態を更新するためのsetTodos
  //初期値はTodo型の空の配列。
  const [todos, setTodos] = useState<Todo[]>([]);
  //const A = (引数) => {処理} というアロー関数の書き方
  //引数のほうは、eはeventの型を指定している 　「そのあとのはHTMLのinputで起きたイベントですよ」というTypeScriptへの指定
  //{処理}は、「今入力欄に書かれている文字を取り出す」という意味
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  //(引数)は、eはformで起きたイベントですよ、というTypeScriptへの指定
  //{処理}は、まず最初にページのリロードを防いで、その後新しいTodoを作成して、既存のtodosに新しいnewTodoが入っていく、最後に入力欄を空にする、という意味
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //新しいTodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: Date.now(),
      checked: false,
    };
    //既存のtodosに新しいnewTodoが入っていく 
    //todosが[A,B,C]、newTodoがDなら、setTodos([D,A,B,C])となる
    //setINputValue("")で入力欄を空にする
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  //新しく追加したものの編集
  //mapで既存のtodoを一つずつ見ていき、もしそのtodoのidが引数のidと同じなら、
  // そのtodoのinputValueを引数のinputValueに変える
  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, inputValue: inputValue };
      }
      return todo;
    });
    setTodos(newTodos);
  };
  
  //新しく作ったチェックボックスを完了したら文字をうちこめないようにしてる
  //mapで既存のtodoを一つずつ見ていき、もしそのtodoのidが引数のidと同じなら、
  // そのtodoのcheckedを引数のcheckedの反対に変える
  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !checked };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //消すボタンの設定 filterで既存のtodoを一つずつ見ていき、もしそのtodoのidが引数のidと違うなら
  // 新しい配列に入れる。結果的に引数のidと同じものは消える
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  
//OnSubmitは、送信(作成ボタンorEnter)を押したときに発生するイベント 
//eはそのイベントの情報を持っている　それをhandleSubmitに渡している
//onChangeは、入力欄に文字が入力されたときに発生するイベント
//valueはその入力された文字列　
//classNameはCSSで見た目を変えるための指定
//

  return (
    <div className="App">
      <div>
        <h2>Todoリスト By吉河 秀峰</h2>
        <form onSubmit={(e) => handleSubmit(e)}> 
          <input
            type="text"
            onChange={(e) => handleChange(e)} 
            value={inputValue}
            className='inputText'
          />
          <input type="submit" value="作成" className='submitButton'/>
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className='inputText'
                value={todo.inputValue}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={(e) => handleChecked(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>消す</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

//Appという関数を他のファイルでも使えるようにする
export default App;
