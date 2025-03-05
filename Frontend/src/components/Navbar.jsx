import { useState, useContext } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  const menuItems = ["Home", "About", "Services", "Contact"];

  return (
    <nav className="bg-gray-700 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" className="w-16 h-12 object-contain" />
          <h1 className="text-white text-xl font-bold">
            STPI - Software Technology Park Of India
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            item === "Services" ? (
              <li
                key={item}
                className="relative text-white hover:bg-gray-600 px-3 py-2 rounded-md cursor-pointer transition duration-200"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {item} <ChevronDown className="inline-block w-4 h-4 ml-1" />
                {/* Dropdown */}
                {isDropdownOpen && (
                  <ul className="absolute left-0 mt-2 bg-gray-800 text-white rounded-md shadow-md w-40">
                    <li
                      className="p-2 hover:bg-gray-600 cursor-pointer"
                      onClick={() => navigate("/form")}
                    >
                      Incubation
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <li
                key={item}
                className="text-white hover:bg-gray-600 px-3 py-2 rounded-md cursor-pointer transition duration-200"
              >
                {item}
              </li>
            )
          ))}

          {/* Display User Name & Logout Button */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white font-semibold">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Login
            </button>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gray-800 p-4 space-y-3 text-center">
          {menuItems.map((item) => (
            item === "Services" ? (
              <li key={item} className="text-white p-2 rounded-md cursor-pointer relative">
                <button
                  className="w-full flex justify-center items-center gap-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {item} <ChevronDown className="w-4 h-4" />
                </button>
                {isDropdownOpen && (
                  <ul className="bg-gray-700 p-2 rounded-md mt-2">
                    <li
                      className="p-2 hover:bg-gray-600 cursor-pointer"
                      onClick={() => {
                        navigate("/form");
                        setIsOpen(false);
                      }}
                    >
                      Incubation
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <li
                key={item}
                className="text-white hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </li>
            )
          ))}

          {/* Display User Name & Logout in Mobile View */}
          {user ? (
            <div className="text-white space-y-3">
              <p className="font-semibold">Welcome, {user.name}</p>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
            >
              Login
            </button>
          )}
        </ul>
      )}
    </nav>
  );
}
