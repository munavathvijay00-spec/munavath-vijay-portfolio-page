import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioContext'
import { SoundProvider } from './context/SoundContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ProjectDetail from './pages/ProjectDetail'

function App() {
  return (
    <PortfolioProvider>
      <SoundProvider>
        <CustomCursor />
        <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      </SoundProvider>
    </PortfolioProvider>
  )
}

export default App
