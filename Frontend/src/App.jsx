import React from 'react'
import MonacoEditor from './components/MonacoEditor'
import { Route, Routes } from 'react-router-dom'
import ReviewCode from './components/ReviewCode'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<MonacoEditor/>}/>
      <Route path='/review' element={<ReviewCode/>}/>
    </Routes>
    </>
  )
}

export default App