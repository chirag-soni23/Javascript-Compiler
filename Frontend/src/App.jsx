import React from 'react'
import MonacoEditor from './components/MonacoEditor'
import { Route, Routes } from 'react-router-dom'
import ReviewCode from './components/ReviewCode'
import History from './components/History'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<MonacoEditor/>}/>
      <Route path='/review' element={<ReviewCode/>}/>
      <Route path='/history' element={<History/>}/>
    </Routes>
    </>
  )
}

export default App