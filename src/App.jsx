import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './features/pages/Home'
import { Dashboard } from './features/pages/Dashboard';

export default function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </div>
  )
}
