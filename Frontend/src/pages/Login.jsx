import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import logo from "/Images/logo.png";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("api/auth/login", { email, password });
      const token = response.data.token; // ✅ fixed here
      localStorage.setItem("token", token); // ✅ store token
      login(response.data);
      navigate("/adminGet");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  

  return (
    <div className="flex justify-center items-center sm:min-h-[70vh] min-h-[30vh] bg-gray-100 p-7">
      <div className="bg-white p-8  w-96  bg-gray-900/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20">
        <div className="h-[10vh] bg-blue-900 flex  items-center rounded-[5px]"><div><img src={logo} alt="" /></div></div>
        {/* <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2> */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4 my-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
        Don`t have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
