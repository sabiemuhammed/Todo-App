import { useState } from 'react'
import './App.css'
import Container from './Components/Main/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoApp from './TodoApp';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='background'>
    
      <Container/>
      {/* <TodoApp/> */}

     
    </div>
  )
}

export default App
