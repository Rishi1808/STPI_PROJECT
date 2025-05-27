import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const { user} = useContext(AuthContext);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [forms, setForms] = useState([]);
  const [formStats, setFormStats] = useState({
    accepted: 0,
    rejected: 0,
    waiting: 0
  });
  const navigate = useNavigate();

  // Fetch forms data
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      console.log("No token found, user might need to login");
      return;
    }
  
    fetch("http://localhost:5000/api/admin/getAllForms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Sort forms by createdAt (newest first)
          const sortedForms = data.data.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setForms(sortedForms);
          
          // Calculate statistics
          const stats = {
            accepted: data.data.filter(form => form.status === "accepted").length,
            rejected: data.data.filter(form => form.status === "rejected").length,
            waiting: data.data.filter(form => form.status === "pending" || !form.status).length
          };
          setFormStats(stats);
        }
      })
      .catch((error) => console.error("Error fetching forms:", error));
  }, []);

  // Function to enable push notifications
  const enableNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          setNotificationEnabled(true);
          // Show a test notification
          new Notification("Notifications Enabled", {
            body: "You will now receive updates on form status changes"
          });
        }
      });
    }
  };

  const handleViewForm = (applicationId) => {
    navigate(`/form-preview/${applicationId}`);
  };

  return (
    <div className="bg-gray-50 ">
      {/* Header with logout */}
      <header className="bg-blue-600 text-white shadow-md flex justify-center w-[90%] mt-4 mx-auto rounded-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-center ">Form Management Dashboard</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Section - 1/3 width on large screens */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col items-center">
            <div className="h-[180px] w-[180px] bg-gray-100 flex items-center justify-center border-2 border-gray-300 rounded-full mb-6 shadow-sm">
              {user?.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt="Profile" 
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-400 text-lg">Profile Picture</span>
              )}
            </div>

            <label 
              htmlFor="profileUpload" 
              className="cursor-pointer mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all transform hover:shadow-md font-medium text-sm sm:text-base w-full sm:w-auto text-center"
            >
              Upload Profile Picture
            </label>
            <input type="file" id="profileUpload" className="hidden" accept="image/*" />

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 w-full">
              <h2 className="text-lg font-semibold mb-3 text-center border-b border-gray-200 pb-2">User Details</h2>
              <div className="space-y-2">
                {/* <p className="text-gray-700 flex justify-between">
                  <span className="font-medium">Name:</span> 
                  <span>{user?.name || "N/A"}</span>
                </p> */}
                <p className="text-gray-700 flex justify-between">
                  <span className="font-medium">Email:</span> 
                  <span className="text-right">{user?.email || "N/A"}</span>
                </p>
                <p className="text-gray-700 flex justify-between">
                  <span className="font-medium">Role:</span> 
                  <span>{user?.role || "User"}</span>
                </p>
              </div>
            </div>
            
            {/* Push Notification Button */}
            <div className="mt-6 w-full">
              <button 
                onClick={enableNotifications}
                disabled={notificationEnabled}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-medium transition-all ${
                  notificationEnabled 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={notificationEnabled ? "" : "animate-pulse"}>
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                {notificationEnabled ? 'Notifications Enabled' : 'Enable Push Notifications'}
              </button>
            </div>
          </div>

          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Accepted Forms</p>
                    <h3 className="text-2xl font-bold text-green-600">{formStats.accepted}</h3>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Rejected Forms</p>
                    <h3 className="text-2xl font-bold text-red-600">{formStats.rejected}</h3>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pending Forms</p>
                    <h3 className="text-2xl font-bold text-blue-600">{formStats.waiting}</h3>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Applied Forms Section */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-blue-600 px-6 py-3">
                <h2 className="text-lg font-semibold text-white">APPLIED FORMS</h2>
              </div>
              <div className="p-4">
                {forms.length > 0 ? (
                  <div className="overflow-x-auto">
                    <div className="max-h-[400px] overflow-y-auto">
                      <table className="min-w-full border border-gray-300 shadow-sm rounded-lg">
                        <thead>
                          <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-4 text-left sticky top-0 bg-gray-100 z-10">Application ID</th>
                            <th className="py-3 px-4 text-left sticky top-0 bg-gray-100 z-10">Unit Name</th>
                            <th className="py-3 px-4 text-left sticky top-0 bg-gray-100 z-10">Status</th>
                            <th className="py-3 px-4 text-center sticky top-0 bg-gray-100 z-10">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                          {forms.map((form) => (
                            <tr key={form._id} className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
                              <td className="py-2 px-4">{form.applicationId}</td>
                              <td className="py-2 px-4">{form.unitName}</td>
                              <td className="py-2 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  form.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                  form.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {form.status || 'Pending'}
                                </span>
                              </td>
                              <td className="py-2 px-4 text-center">
                                <button
                                  className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600 transition-colors"
                                  onClick={() => handleViewForm(form.applicationId)}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No forms found. Start by submitting a new application.
                  </div>
                )}
              </div>
            </div>
            
            {/* Admin Panel Section */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-blue-600 px-6 py-3">
                <h2 className="text-lg font-semibold text-white">ADMIN PANEL</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">This section displays form approval status and provides administrative controls.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow bg-gray-50">
                    <h3 className="font-medium mb-2">Total Forms</h3>
                    <p className="text-2xl font-bold text-gray-800">{forms.length}</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow bg-gray-50">
                    <h3 className="font-medium mb-2">Acceptance Rate</h3>
                    <p className="text-2xl font-bold text-gray-800">
                      {forms.length > 0 
                        ? `${Math.round((formStats.accepted / forms.length) * 100)}%` 
                        : "0%"}
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow bg-gray-50">
                    <h3 className="font-medium mb-2">Processing Time</h3>
                    <p className="text-2xl font-bold text-gray-800">48h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;