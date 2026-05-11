import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from './features/pages/Home';
import { Dashboard } from './features/pages/Dashboard';
import { Prediction } from './features/pages/Prediction';
import { RegretAnalysis } from './features/pages/RegretAnalysis';
import { Login } from './features/pages/Login';
import { Signup } from './features/pages/Signup';
import { Feedback } from './features/pages/Feedback';
import { Settings } from './features/pages/Settings';
import { HelpSupport } from './features/pages/HelpSupport';
import { PredictionProvider } from './shared/context/PredictionContext';

export default function App() {
  return (
    <PredictionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predict" element={<Prediction />} />
          <Route path="/regret" element={<RegretAnalysis />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </PredictionProvider>
  );
}
