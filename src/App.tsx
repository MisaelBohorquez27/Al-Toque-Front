import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { OwnerServices } from './pages/owner_services_page';
import { UserVerificationPage } from './pages/user_verification_page';
import { PaymentCheckout } from './pages/payment_checkout_page';
import { ElectronicSignatureContract } from './pages/electronic_signature_contract_page';
import { ElectronicSignatureSign } from './pages/electronic_signature_sign_page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/owner/services" element={<OwnerServices />} />
        <Route path="/owner/user-verification" element={<UserVerificationPage />} />
        <Route path="/owner/electronic-signature-contract" element={<ElectronicSignatureContract />} />
        <Route path="/owner/electronic-signature-sign" element={<ElectronicSignatureSign />} />
        <Route
          path="/payment-checkout"
          element={<PaymentCheckout paymentFlow="identityVerification" />}
        />
        <Route path="/" element={<Navigate to="/owner/services" replace />} />
      </Routes>
    </Router>
  );
}

export default App;