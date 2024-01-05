import { useState } from 'react'
import './App.css'
import Containers from './Components/Main/Containers'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoApp from './TodoApp';
import {Container } from "react-bootstrap";
function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div className='background'>

  <div>

      <Containers/>
  </div>
      {/* <TodoApp/> */}

     
    </div>
  )
}

export default App
