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

// Admin Panel
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBusinessOwners from './pages/admin/AdminBusinessOwners';
import AdminStores from './pages/admin/AdminStores';
import AdminOrders from './pages/admin/AdminOrders';
import AdminPayments from './pages/admin/AdminPayments';
import AdminIntegrations from './pages/admin/AdminIntegrations';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

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

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="owners" element={<AdminBusinessOwners />} />
        <Route path="stores" element={<AdminStores />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="integrations" element={<AdminIntegrations />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
