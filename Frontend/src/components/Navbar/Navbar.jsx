import { useState, useContext } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import emblem from "/BharatEmplem.png";
import "./Navbar.css";

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
    <nav className="h-[40vh] shadow-md bg-cover bg-center w-[100%] flex flex-col justify-between" style={{ backgroundImage: "url('/inner_banner.jpg')" }}>
      <div className="flex justify-between w-[100%] sm:shadow-[inset_0px_50px_50px_-10px_rgba(0,0,10,5)]">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <img className="m-[2vh] mt-0" src={emblem} alt="Emblem" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 mr-5">
          {menuItems.map((item) => (
            item === "Services" ? (
              <div
                key={item}
                className="relative text-white font-bold hover:bg-gray-600 px-3 py-2 rounded-md cursor-pointer transition duration-200"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {item} <ChevronDown className="inline-block w-4 h-4 ml-1" />
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
              </div>
            ) : (
              <div
                key={item}
                className="text-white font-bold hover:bg-gray-600 px-3 py-2 rounded-md cursor-pointer transition duration-200"
              >
                {item}
              </div>
            )
          ))}

          {/* User Authentication */}
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
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className="sm:w-[80%] mx-auto text-center">
        <h1 className="text-5xl font-bold text-white my-4">STPI Center</h1>
        <hr />
        <h2 className="text-sm font-bold text-white my-4">RANCHI</h2>
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

          {/* Mobile User Authentication */}
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
