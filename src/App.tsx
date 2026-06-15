import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { OwnerServices } from './pages/owner_services_page';
import { UserVerificationPage } from './pages/user_verification_page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/owner/services" element={<OwnerServices />} />
        <Route path="/owner/user-verification" element={<UserVerificationPage />} />
        <Route path="/" element={<Navigate to="/owner/services" replace />} />
      </Routes>
    </Router>
  );
}

export default App;