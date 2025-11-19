import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Import images - using placeholders for demo
const img1 = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800";
const img2 = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800";
const img3 = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800";
const img4 = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800";
const img5 = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800";

const ClientDashboard = () => {
 const { user } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your application has been received", time: "2 hours ago", read: false },
    { id: 2, message: "New incubation spaces available", time: "1 day ago", read: true },
    { id: 3, message: "Upcoming virtual workshop on startup funding", time: "3 days ago", read: true },
    { id: 4, message: "Mentor meeting scheduled for tomorrow", time: "5 hours ago", read: false }
  ]);
  
  const [locationNames, setLocationNames] = useState({
    country: "United States",
    state: "California",
    district: "San Francisco",
  });
  
  const [loading, setLoading] = useState(false);

  const applicationData = [
    { stage: 'Submitted', status: 'complete' },
    { stage: 'Review', status: 'current' },
    { stage: 'Interview', status: 'pending' },
    { stage: 'Decision', status: 'pending' }
  ];

  const recentActivities = [
    { id: 1, action: "Application submitted", date: "2024-11-18", icon: "📝" },
    { id: 2, action: "Document uploaded", date: "2024-11-17", icon: "📎" },
    { id: 3, action: "Profile updated", date: "2024-11-15", icon: "👤" },
    { id: 4, action: "Workshop attended", date: "2024-11-14", icon: "🎓" }
  ];

  const upcomingEvents = [
    { id: 1, title: "Pitch Practice Session", date: "Nov 22", time: "2:00 PM" },
    { id: 2, title: "Networking Mixer", date: "Nov 25", time: "6:00 PM" },
    { id: 3, title: "Investor Meeting", date: "Nov 28", time: "10:00 AM" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.firstName}!
          </h3>
          <p className="text-gray-600">Here's what's happening with your startup journey today.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
                  <span className="text-3xl font-bold text-white">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 text-center">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-indigo-600 font-medium mb-4">{user?.role}</p>

                <div className="w-full space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-700 truncate">{user?.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <span className="text-gray-700">
                      {locationNames.state}, {locationNames.country}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Applications</span>
                  <span className="font-bold text-indigo-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Meetings</span>
                  <span className="font-bold text-purple-600">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Events</span>
                  <span className="font-bold text-pink-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Connections</span>
                  <span className="font-bold text-amber-600">45</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => navigate("/formfill")} className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4 px-6 rounded-xl">New Application</button>
                <button onClick={() => navigate("/status")} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-xl">Check Status</button>
                <button onClick={() => navigate("/formpreview")} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl">Preview</button>
              </div>
            </div>

            {/* Application Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Application Progress</h2>
              <div className="flex items-center justify-between">
                {applicationData.map((stage, index) => (
                  <div key={index} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        stage.status === 'complete' ? 'bg-green-500' :
                        stage.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}>
                        {stage.status === 'complete' ? "✓" : index + 1}
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-700">{stage.stage}</span>
                    </div>
                    {index < applicationData.length - 1 && (
                      <div className="flex-1 h-1 mx-2 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities & Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl mr-3">{activity.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Events */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{event.time}</p>
                      </div>
                      <span className="text-xs font-medium text-indigo-600 bg-white px-2 py-1 rounded-full">
                        {event.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
                  {notifications.filter(n => !n.read).length} New
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg cursor-pointer ${
                      notification.read ? "bg-gray-50" : "bg-indigo-50 border-l-4 border-indigo-500"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      {!notification.read && <span className="bg-indigo-500 w-2 h-2 rounded-full"></span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-6">
                <h2 className="text-xl font-bold text-white">STPI Incubation Spaces</h2>
              </div>
              
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-1000"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {[img1, img2, img3, img4, img5].map((img, index) => (
                      <div key={index} className="w-full flex-shrink-0 relative h-80">
                        <img src={img} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                          <h3 className="text-white text-2xl font-bold">Modern Workspace {index + 1}</h3>
                          <p className="text-white/90 mt-2">State-of-the-art facilities designed for startup success</p>
                        </div>
                      </div>
                    ))}
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
