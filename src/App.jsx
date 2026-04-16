import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from './features/pages/Home';
import { Dashboard } from './features/pages/Dashboard';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predict" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}
