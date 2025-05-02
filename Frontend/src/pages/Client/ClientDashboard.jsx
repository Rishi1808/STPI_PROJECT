import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion"; // Optional: Add framer-motion for animations

// Import your images
import img1 from "/Images/cubicle1.jpeg";
import img2 from "/Images/cubicle2.jpeg";
import img3 from "/Images/cubicle3.jpeg";
import img4 from "/Images/cubicle1.jpeg";
import img5 from "/Images/cubicle4.jpeg";

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your application has been received", time: "2 hours ago", read: false },
    { id: 2, message: "New incubation spaces available", time: "1 day ago", read: true },
    { id: 3, message: "Upcoming virtual workshop on startup funding", time: "3 days ago", read: true }
  ]);
  
  const [locationNames, setLocationNames] = useState({
    country: "",
    state: "",
    district: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
      // Here you would typically upload the image to your server
    }
  };

  // Carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch location data
  useEffect(() => {
    const fetchLocationNames = async () => {
      setLoading(true);
      try {
        if (user?.location?.country) {
          const countryRes = await axios.get(
            `https://secure.geonames.org/getJSON?geonameId=${user.location.country}&username=shivam1234`
          );
          const stateRes = await axios.get(
            `https://secure.geonames.org/getJSON?geonameId=${user.location.state}&username=shivam1234`
          );

          setLocationNames({
            country: countryRes.data.name,
            state: stateRes.data.name,
            district: user.location.district,
          });
        }
      } catch (error) {
        console.error("Error fetching location names:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationNames();
  }, [user]);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto bg-">
        <h1 className="text-3xl font-bold  text-gray-100 mb-6 bg-blue-700 py-2 px-9 rounded-md">
          Welcome to Your Incubation Dashboard
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - Profile Section */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-indigo-100">
              <div className="flex flex-col items-center">
                <div className="relative mb-6 group">
                  <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-md">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {user?.firstName?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="profileUpload"
                    className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-indigo-700 transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                  <input
                    type="file"
                    id="profileUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                <h2 className="text-xl font-bold text-indigo-900">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-indigo-500 font-medium">{user?.role || "Startup Founder"}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-sm text-gray-700 truncate">
                      {user?.email || "example@email.com"}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-sm text-gray-700">
                      {loading ? (
                        <span className="inline-flex items-center">
                          Loading...
                          <svg className="animate-spin ml-2 h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                      ) : locationNames.country && locationNames.state ? (
                        <span>
                          {locationNames.country}, {locationNames.state}
                          {locationNames.district && `, ${locationNames.district}`}
                        </span>
                      ) : (
                        "Location not available"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-indigo-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-indigo-900">Notifications</h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {notifications.filter(n => !n.read).length} New
                </span>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg ${
                        notification.read ? "bg-gray-50" : "bg-indigo-50 border-l-4 border-indigo-500"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        {!notification.read && (
                          <span className="bg-indigo-500 w-2 h-2 rounded-full"></span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No notifications</p>
                )}
              </div>
            </div>
          </div>

          {/* Right column - Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Main Actions Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-indigo-100">
              <h2 className="text-lg font-bold text-indigo-900 mb-4">Quick Actions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate("/formfill")}
                  className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Apply for Incubation</span>
                </button>
                
                <button
                  onClick={() => navigate("/status")}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Check Application Status</span>
                </button>
                
                <button
                  onClick={() => navigate("/formpreview")}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Preview Application</span>
                </button>
              </div>
            </div>

            {/* Carousel Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-indigo-100">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 py-3 px-6">
                <h2 className="text-lg font-bold text-white">STPI Incubation Spaces</h2>
              </div>
              
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {[img1, img2, img3, img4, img5].map((img, index) => (
                      <div key={index} className="w-full flex-shrink-0 relative h-72 sm:h-96">
                        <img 
                          src={img} 
                          className="w-full h-full object-cover" 
                          alt={`STPI Incubation Space ${index + 1}`} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                          <h3 className="text-white text-xl font-bold">Modern Workspace {index + 1}</h3>
                          <p className="text-white/90">
                            State-of-the-art facilities designed for startup success
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 p-2 rounded-full text-white shadow-lg"
                  onClick={() => setCurrentIndex((prev) => (prev === 0 ? 4 : prev - 1))}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 p-2 rounded-full text-white shadow-lg"
                  onClick={() => setCurrentIndex((prev) => (prev === 4 ? 0 : prev + 1))}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentIndex === i 
                          ? "bg-white w-6" 
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`View slide ${i + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-indigo-100">
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm font-medium">Available Spaces</h3>
                    <p className="text-2xl font-bold text-indigo-900">12</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-indigo-100">
                <div className="flex items-center">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm font-medium">Avg. Processing Time</h3>
                    <p className="text-2xl font-bold text-indigo-900">7 days</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-indigo-100">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-500 text-sm font-medium">Startups Incubated</h3>
                    <p className="text-2xl font-bold text-indigo-900">45+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ClientDashboard;