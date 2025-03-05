import { Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar.jsx";
import EncubqationForm from "./components/EncubqationForm.jsx"
const App = () => {
  return (
    <>
   <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />     
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={<EncubqationForm/>} /> 
      </Routes>
      
    </>

    
  );
};

export default App;
