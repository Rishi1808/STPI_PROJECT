import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import EncubqationForm from "./components/EncubqationForm";
const App = () => {
  return (
    <>
   <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/form" element={<EncubqationForm />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
