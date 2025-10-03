import React from 'react';
import './App.css';

function App() {
  const[todos,setTodos] = useState<Todo[]>([]);

  
  //型を設定。例えば文字列型以外が入らないようにしている
  type Todo = {
    inputValue:string;
    id:number;
    checked:boolean;
  }

  return (
    <div className="App">
        <div>
           <h2>Todoリスト By吉河 秀峰</h2>
           <form onSubmit={() => {}}>
            <input type ="text" onChange ={() => {}} className='inputText'/>
            <input type ="submit" value ="作成" className='submitButton'/>
           </form>
        </div>
    </div>
  );
}

export default App;
