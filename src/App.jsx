import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MouvementDetail from './pages/MouvementDetail'
import ActivitesPage from './pages/ActivitesPage'

function App() {

  return (
  <Routes>
    <Route path="/" element={ <HomePage />} />
    <Route path="/LoginPage" element={ <LoginPage />} />
    <Route path="/SignupPage" element={ <RegisterPage />} />
    <Route path="/mouvementDetail" element={ <MouvementDetail />} />
    <Route path="/activites" element={ <ActivitesPage />} />
  </Routes>
  )
}

export default App

