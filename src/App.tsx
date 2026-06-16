import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home_page';
import { OwnerServices } from './pages/owner_services_page';
import { UserVerificationPage } from './pages/user_verification_page';
import { PaymentCheckout } from './pages/payment_checkout_page';
import { ElectronicSignatureContract } from './pages/electronic_signature_contract_page';
import { ElectronicSignatureSign } from './pages/electronic_signature_sign_page';
import { ContractVerificationProcess } from './pages/contract_verification_process_page';
import { SettingPage } from './pages/setting_page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/owner/home" element={<HomePage />} />
        <Route path="/owner/services" element={<OwnerServices />} />
        <Route path="/owner/user-verification" element={<UserVerificationPage />} />
        <Route path="/owner/electronic-signature-contract" element={<ElectronicSignatureContract />} />
        <Route path="/owner/electronic-signature-sign" element={<ElectronicSignatureSign />} />
        <Route path="/owner/contract-verification" element={<ContractVerificationProcess />} />
        <Route path="/owner/settings" element={<SettingPage />} />
        <Route path="/payment-checkout" element={<PaymentCheckout />} />
        <Route path="/" element={<Navigate to="/owner/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
