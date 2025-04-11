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
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  const menuItems = ["HOME", "ABOUT", "SERVICES", "CONTACT"];

  return (
  <nav className=" shadow-md sm:h-[20vh] h-[10vh] flex flex-col justify-between" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover',  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat', }} >


    <div className="shadow-[inset_0_60px_30px_-15px_rgba(0,0,0,1.8)]">
  {/* Logo & Title */}
    <div className="relative lg:w-[90%] w-[100%] mx-auto flex justify-between items-center ">
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
          {/* Dropdown */}
          {isDropdownOpen && (
            <ul className="absolute left-0 mt-2 bg-gray-800 text-white rounded-md shadow-md w-40">
              <li
                className="p-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => navigate(user ? "/form" :
                  "/login")}
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
            // Add routes for other items if needed
          }}
        >
          {item}
        </li>
      )
    )}

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
  <div className="relative">
    <button
      onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
    >
      Login
    </button>
    {isLoginDropdownOpen && (
      <ul className="absolute right-0 mt-2 bg-white rounded-md shadow-md w-32 z-50 list-none">
        <li
          className="p-2 text-black text-center cursor-pointer hover:bg-blue-500 hover:text-white transition duration-200"
          onClick={() => {
            navigate("/login?type=admin");
            setIsLoginDropdownOpen(false);
          }}
          
        >
          Admin
        </li>
        <li
          className="p-2 text-black text-center cursor-pointer hover:bg-blue-500 hover:text-white transition duration-200"
          onClick={() => {
            navigate("/login?type=client");
            setIsLoginDropdownOpen(false);
          }}
          
        >
          Client
        </li>
      </ul>
    )}
  </div>
)}


  </ul>

  {/* Mobile Menu Button */}
  <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
    {isOpen ? <X size={28} /> : <Menu size={28} />}
  </button>




    </div>
    </div>


  <div className=" flex flex-col justify-between sm:w-[65%]  mx-auto">

      <div><h1 className="text-white text-[45px] font-bold my-3">STPI Center</h1></div>
      <hr className="border-white/40"/>
        
        <div className="flex gap-4">
        
        <div><button className="text-white my-3">CENTER </button></div>  
        <div className="border-l-2 h-[40%] my-auto  border-gray-500"></div>      
        <div><button className="text-white my-3">RANCHI</button></div>
        
      </div>

  </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gray-800 p-4 space-y-3 text-center">
          {menuItems.map((item) => (
            item === "SERVICES" ? (
              <li key={item} 
              className="text-white  p-2 rounded-md cursor-pointer relative">
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
                onClick={() => {
                  if (item === "HOME")
                    {
                    setIsOpen(true)
                    navigate("/")
                    }
                  }}
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
