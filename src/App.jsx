import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

function App() {

  return (
  <Routes>
    <Route path="/" element={ <HomePage />} />
  </Routes>
  )
}

export default App

