import { Routes, Route } from 'react-router-dom';

// Placeholder: Import your pages here
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<div className="p-8 text-center">
          <h1 className="text-4xl font-bold text-primary-600">Welcome to ShopLynk</h1>
          <p className="mt-4 text-gray-600">WhatsApp Store Builder</p>
        </div>} />
        {/* Add more routes here */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;
