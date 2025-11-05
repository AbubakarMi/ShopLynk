import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Onboarding from './pages/Onboarding';
import PortalLayout from './layouts/PortalLayout';
import Dashboard from './pages/portal/Dashboard';
import Products from './pages/portal/Products';
import Orders from './pages/portal/Orders';
import Payments from './pages/portal/Payments';
import WhatsApp from './pages/portal/WhatsApp';
import Invoices from './pages/portal/Invoices';
import Analytics from './pages/portal/Analytics';
import Customers from './pages/portal/Customers';
import Settings from './pages/portal/Settings';
import Help from './pages/portal/Help';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Portal Routes */}
      <Route path="/portal" element={<PortalLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="payments" element={<Payments />} />
        <Route path="whatsapp" element={<WhatsApp />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="customers" element={<Customers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  );
}

export default App;
