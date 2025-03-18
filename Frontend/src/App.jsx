import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import EncubqationForm from "./components/EncubqationForm";
import Footer from "./components/Footer/Footer";
import Fromlist from "./pages/admin/Fromlist";
const App = () => {
  return (
    <>
   <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/form" element={<EncubqationForm />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminGet" element={<Fromlist />} />
      </Routes>
    <Home/>
    <Footer/>
    </>
  );
};

export default App;
