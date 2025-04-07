import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import EncubqationForm from "./components/EncubqationForm";
import Footer from "./components/Footer/Footer";
import Fromlist from "./pages/admin/Fromlist";

const App = () => {
  // 👇 Only useState - determine if Home should show initially
  const [showHome] = useState(() => window.location.pathname === "/");

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/form" element={<EncubqationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminGet" element={<Fromlist />} />
      </Routes>

      {/* ✅ showHome is set once based on initial path */}
      {showHome && <Home />}

      <Footer />
    </>
  );
};

export default App;
