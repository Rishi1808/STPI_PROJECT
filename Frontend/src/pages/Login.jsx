


import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import logo from "/Images/logo.png";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("client"); // default to client
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = selectedRole === "admin" ? "api/admin/login" : "api/auth/login";
      const response = await API.post(endpoint, { email, password, role:selectedRole });

      const token = response.data.token;
      localStorage.setItem("token", token);
      login(response.data);

      if (response.data.role === "admin") {
        navigate("/adminGet");
      } else {
        navigate("/form");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center sm:min-h-[70vh] min-h-[30vh] bg-gray-100 p-7">
      <div className="bg-white p-8 w-96 bg-gray-900/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20">
        <div className="h-[10vh] bg-blue-900 flex items-center justify-between px-4 rounded-[5px]">
          <img src={logo} alt="Logo" className="h-full" />
        </div>

        {error && <p className="text-red-500 text-center my-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4 mt-6">
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
        <div>
        <div className="flex space-x-2 justify-center align-middle mt-2">
            <button
              className={`px-3 py-1 text-sm rounded-md transition ${
                selectedRole === "admin"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setSelectedRole("admin")}
            >
              Admin
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md transition ${
                selectedRole === "client"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setSelectedRole("client")}
            >
              Client
            </button>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
        
      </div>
    </div>
  );
};

export default Login;
