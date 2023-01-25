import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Cartpage from './components/cart/Cartpage';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cartpage" element={<Cartpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
