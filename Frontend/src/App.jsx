import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import EncubqationForm from "./components/EncubqationForm";
import Footer from "./components/Footer/Footer";
import Fromlist from "./pages/admin/Fromlist";

const App = () => {
  const location = useLocation();
  const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    // Show Home component only on root path
    setShowHome(location.pathname === "/");
  }, [location]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/form" element={<EncubqationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminGet" element={<Fromlist />} />
      </Routes>

      {showHome && <Home />}

      <Footer />
    </>
  );
};

export default App;
