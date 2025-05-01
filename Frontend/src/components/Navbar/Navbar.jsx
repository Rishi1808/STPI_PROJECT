import { useState, useContext } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import bgImage from "/Images/inner_banner.jpg";
import logo from "/Images/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = ["HOME", "ABOUT", "CONTACT"];

  return (
    <nav
      className="relative z-50 shadow-md sm:h-[20vh] h-[10vh] flex flex-col justify-between"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top Bar */}
      <div className="shadow-[inset_0_60px_30px_-15px_rgba(0,0,0,1.8)]">
        <div className="relative lg:w-[90%] w-full mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-46 h-20 object-contain" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6 font-bold">
            {menuItems.map((item) =>
              item === "SERVICES" ? (
                <li
                  key={item}
                  className="relative text-white hover:bg-gray-600 px-3 py-2 rounded-md cursor-pointer transition duration-200"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {item} <ChevronDown className="inline-block w-4 h-4 ml-1" />
                  {isDropdownOpen && (
                    <ul className="absolute left-0 mt-2 bg-gray-800 text-white rounded-md shadow-md w-40 z-50">
                      <li
                        className="p-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => navigate(user ? "/form" : "/login")}
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
                  onClick={() => {
                    if (item === "HOME") navigate("/");
                  }}
                >
                  {item}
                </li>
              )
            )}

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

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Banner Title */}
      <div className="flex flex-col justify-between sm:w-[65%] mx-auto">
        <h1 className="text-white text-[45px] font-bold my-3">STPI Center</h1>
        <hr className="border-white/40" />
        <div className="flex gap-4">
          <button className="text-white my-3">CENTER</button>
          <div className="border-l-2 h-[40%] my-auto border-gray-500"></div>
          <button className="text-white my-3">RANCHI</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-0% bg-gray-800 p-4 space-y-3 text-center z-50 md:hidden">
          {menuItems.map((item) =>(
            // item === "SERVICES" ? (
            //   <li key={item} className="text-white p-2 rounded-md cursor-pointer relative">
            //     <button
            //       className="w-full flex justify-center items-center gap-2"
            //       onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            //     >
            //       {item} <ChevronDown className="w-4 h-4" />
            //     </button>
            //     {isDropdownOpen && (
            //       <ul className="bg-gray-700 p-2 rounded-md mt-2">
            //         <li
            //           className="p-2 hover:bg-gray-600 cursor-pointer"
            //           onClick={() => {
            //             navigate("/form");
            //             setIsOpen(false);
            //           }}
            //         >
            //           Incubation
            //         </li>
            //       </ul>
            //     )}
            //   </li>
            // ) : (
              <li
                key={item}
                className="text-white hover:bg-gray-600 p-2 rounded-md cursor-pointer"
                onClick={() => {
                  if (item === "HOME") {
                    setIsOpen(false);
                    navigate("/");
                  }
                }}
              >
                {item}
              </li>
            )
          )}

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
