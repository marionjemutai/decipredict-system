import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from './features/pages/Home';
import { Dashboard } from './features/pages/Dashboard';
import { Prediction } from './features/pages/Prediction';
import { RegretAnalysis } from './features/pages/RegretAnalysis';
import { PredictionProvider } from './shared/context/PredictionContext';

export default function App() {
  return (
    <PredictionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predict" element={<Prediction />} />
          <Route path="/regret" element={<RegretAnalysis />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </PredictionProvider>
  );
}
