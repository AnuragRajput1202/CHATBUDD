import React from 'react'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatBox from './Components/Chatbox'
import UserState from './Context/UserState'


const App = () => {
  return (
    <UserState>
      <BrowserRouter>
        <div>
          <Routes>
            <Route element={<Home />} path='*' />
            <Route element={<ChatBox />} path='/chatbox' />
          </Routes>
        </div>
      </BrowserRouter>
    </UserState>
  )
}

export default App
