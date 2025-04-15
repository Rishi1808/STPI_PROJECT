import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
// import EncubqationForm from "./components/EncubqationForm";
import Footer from "./components/Footer/Footer";
// import Fromlist from "./pages/admin/Fromlist";
import PreviewForm from "./pages/admin/PreviewForm"; 
import Landingpage from "./pages/admin/landingpage";
import ClientDashboard from "./pages/Client/clientDashboard";

const App = () => {
  const location = useLocation();
  const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    setShowHome(location.pathname === "/");
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* below will be routed if the user d */}
        {/* <Route path="/form" element={<EncubqationForm />} /> */}
        <Route path="/form" element={<ClientDashboard/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/adminGet" element={<Fromlist />} /> */}
        <Route path="/adminGet" element={<Landingpage/>} />
        <Route path="/form-preview/:formNumber" element={<PreviewForm />} />
      </Routes>
      {showHome && <Home />}
      <Footer />
    </>
  );
};

export default App;
