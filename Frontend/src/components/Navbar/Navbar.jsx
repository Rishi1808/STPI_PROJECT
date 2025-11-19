import { useState, useContext, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import bgImage from "/Images/inner_banner.jpg";
import logo from "/Images/logo.png";

export default function Navbar() {
  // Add a div with padding to push content below fixed navbar
  useEffect(() => {
    if (!document.getElementById("navbar-spacer")) {
      const spacer = document.createElement("div");
      spacer.id = "navbar-spacer";
      document.body.prepend(spacer);
    }
    const updateSpacerHeight = () => {
      const navbar = document.querySelector("nav");
      const spacer = document.getElementById("navbar-spacer");
      if (navbar && spacer) {
        spacer.style.height = `${navbar.offsetHeight}px`;
      }
    };
    updateSpacerHeight();
    window.addEventListener("resize", updateSpacerHeight);

    return () => {
      window.removeEventListener("resize", updateSpacerHeight);
      const spacer = document.getElementById("navbar-spacer");
      if (spacer) spacer.remove();
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollRatio = Math.min(window.scrollY / 100, 1);
      setIsScrolled(scrollRatio > 0.05);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = ["HOME", "ABOUT", "CONTACT"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-md transition-all duration-300 ease-in-out flex flex-col justify-between ${
        isScrolled
          ? "min-h-[9vh] md:min-h-[13.5vh] lg:min-h-[15vh]"
          : "min-h-[10vh] md:min-h-[15vh] lg:min-h-[18vh]"
      }`}
      style={{
        backgroundImage: isScrolled
          ? "linear-gradient(to bottom, #1e3a8a, #000000)"
          : `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition:
          "background-image 0.5s ease-in-out, background-color 0.5s ease-in-out",
      }}
    >
      {/* Top Bar */}
      <div
        className={`${
          isScrolled ? "" : "shadow-[inset_0_60px_30px_-15px_rgba(0,0,0,1.8)]"
        }`}
      >
        <div className="relative w-full px-4 md:px-6 lg:w-[90%] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center py-2">
            <img
              src={logo}
              alt="Logo"
              className="h-12 md:h-16 lg:h-20 w-auto object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex h-full items-center space-x-4 lg:space-x-8 font-bold">

            {menuItems.map((item) => (
              <li
                key={item}
                className="text-white hover:text-yellow-300 px-3 py-2 cursor-pointer transition duration-200 text-sm lg:text-base"
                onClick={() => {
                  if (item === "HOME") navigate("/");
                }}
              >
                {item}
              </li>
            ))}

            {/* USER AREA */}
            {user ? (
              <li className="flex items-center space-x-4">
                {/* DASHBOARD BUTTON */}
                <button
                  onClick={() =>
                    navigate(user.role === "admin" ? "/adminGet" : "/form")
                  }
                  className="text-white hover:text-yellow-300 px-3 py-2 rounded-md transition duration-200 text-sm lg:text-base"
                >
                  DASHBOARD
                </button>

                {/* WELCOME */}
                <span className="text-white text-sm lg:text-base font-semibold whitespace-nowrap">
                  Welcome, {user.firstName} {user.lastName}
                </span>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm lg:text-base transition duration-200"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200 text-sm lg:text-base"
                >
                  Login
                </button>
              </li>
            )}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Banner Title */}
      <div className="flex flex-col justify-between w-[85%] sm:w-[75%] md:w-[65%] mx-auto mb-2 md:mb-4">
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[45px] font-bold my-2 md:my-3">
          STPI Center
        </h1>
        <hr className="border-white/40" />
        <div className="flex gap-2 md:gap-4">
          <button className="text-white text-sm md:text-base my-2 md:my-3">
            CENTER
          </button>
          <div className="border-l-2 h-[40%] my-auto border-gray-500"></div>
          <button className="text-white text-sm md:text-base my-2 md:my-3">
            RANCHI
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 p-4 space-y-3 text-center z-50 md:hidden">
          {menuItems.map((item) => (
            <div
              key={item}
              className="text-white hover:bg-gray-600 p-2 rounded-md cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                if (item === "HOME") navigate("/");
              }}
            >
              {item}
            </div>
          ))}

          {user ? (
            <div className="text-white space-y-3 pt-2 border-t border-gray-600">
              <button
                onClick={() => {
                  navigate(user.role === "admin" ? "/adminGet" : "/form");
                  setIsOpen(false);
                }}
                className="text-white hover:bg-gray-600 px-3 py-2 rounded-md transition duration-200"
              >
                DASHBOARD
              </button>

              <p className="font-semibold">
                Welcome, {user.firstName} {user.lastName}
              </p>

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
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200 mt-2 border-t border-gray-600 pt-4"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
