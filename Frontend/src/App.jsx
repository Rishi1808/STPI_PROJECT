import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import EncubqationForm from "./components/EncubqationForm";
import Footer from "./components/Footer/Footer";
import PreviewForm from "./pages/admin/PreviewForm"; 
import Landingpage from "./pages/admin/Landingpage";
import ClientDashboard from "./pages/Client/clientDashboard";
import UserFormsTable from "./pages/Client/UserFromsTable";

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
        <Route path="/formfill" element={<EncubqationForm />} />
        <Route path="/form" element={<ClientDashboard/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/list" element={<Fromlist />} /> */}
        <Route path="/status" element={<UserFormsTable/>} />
        <Route path="/adminGet" element={<Landingpage/>} />
        <Route path="/form-preview/:formNumber" element={<PreviewForm />} />
      </Routes>
      {showHome && <Home />}
      <Footer />
    </>
  );
};

export default App;
