import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { testController } from './controllers/GeminiController'

function App() {
  const [count, setCount] = useState(0)
  return (
    <> 
      <button onClick={testController} className='btn btn-outline-dark'>Hello</button>
    </>
  )
}

export default App
