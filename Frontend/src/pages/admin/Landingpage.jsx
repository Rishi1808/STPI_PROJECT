import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const LandingPage = () => {
  const { user } = useContext(AuthContext);
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
          const sortedForms = data.data.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setForms(sortedForms);
          
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

  const enableNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          setNotificationEnabled(true);
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

  // Prepare data for charts
  const pieData = [
    { name: 'Accepted', value: formStats.accepted, color: '#10b981' },
    { name: 'Rejected', value: formStats.rejected, color: '#ef4444' },
    { name: 'Pending', value: formStats.waiting, color: '#3b82f6' }
  ];

  const barData = [
    { name: 'Accepted', count: formStats.accepted, fill: '#10b981' },
    { name: 'Rejected', count: formStats.rejected, fill: '#ef4444' },
    { name: 'Pending', count: formStats.waiting, fill: '#3b82f6' }
  ];

  // Monthly trend data (simulated - you can calculate from actual form dates)
  const monthlyData = [
    { month: 'Jan', forms: 12 },
    { month: 'Feb', forms: 19 },
    { month: 'Mar', forms: 15 },
    { month: 'Apr', forms: 25 },
    { month: 'May', forms: 22 },
    { month: 'Jun', forms: forms.length }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg w-[80%] mx-auto mb-4 rounded-b-3xl mt-2">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Form Management Dashboard</h1>
              <p className="text-blue-100 text-sm mt-1">Welcome back, {user?.email}</p>
            </div>
            <button 
              onClick={enableNotifications}
              disabled={notificationEnabled}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all ${
                notificationEnabled 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-blue-800 hover:bg-blue-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              {notificationEnabled ? 'Enabled' : 'Enable Notifications'}
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">

        
        {/* Additional Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium opacity-90 mb-2">Acceptance Rate</h3>
            <p className="text-3xl font-bold">
              {forms.length > 0 
                ? `${Math.round((formStats.accepted / forms.length) * 100)}%` 
                : "0%"}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium opacity-90 mb-2">Avg. Processing Time</h3>
            <p className="text-3xl font-bold">48h</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium opacity-90 mb-2">Success Rate</h3>
            <p className="text-3xl font-bold">
              {forms.length > 0 
                ? `${Math.round(((formStats.accepted) / (formStats.accepted + formStats.rejected)) * 100)}%` 
                : "0%"}
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Forms</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">{forms.length}</h3>
              </div>
              <div className="p-4 bg-purple-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Accepted</p>
                <h3 className="text-3xl font-bold text-green-600 mt-2">{formStats.accepted}</h3>
              </div>
              <div className="p-4 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Rejected</p>
                <h3 className="text-3xl font-bold text-red-600 mt-2">{formStats.rejected}</h3>
              </div>
              <div className="p-4 bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Pending</p>
                <h3 className="text-3xl font-bold text-blue-600 mt-2">{formStats.waiting}</h3>
              </div>
              <div className="p-4 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Applied Forms Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-5">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
          </div>
          <div className="p-6">
            {forms.length > 0 ? (
              <div className="overflow-x-auto">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-sm leading-normal border-b-2 border-gray-200">
                        <th className="py-3 px-6 text-left sticky top-0 bg-gray-50 z-10">Application ID</th>
                        <th className="py-3 px-6 text-left sticky top-0 bg-gray-50 z-10">Unit Name</th>
                        <th className="py-3 px-6 text-left sticky top-0 bg-gray-50 z-10">Status</th>
                        <th className="py-3 px-6 text-center sticky top-0 bg-gray-50 z-10">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                      {forms.map((form) => (
                        <tr key={form._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 font-medium">{form.applicationId}</td>
                          <td className="py-4 px-6">{form.unitName}</td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              form.status === 'accepted' ? 'bg-green-100 text-green-700' :
                              form.status === 'rejected' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {form.status || 'Pending'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                              onClick={() => handleViewForm(form.applicationId)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-300 mb-4">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <p className="text-gray-500 text-lg">No forms found</p>
                <p className="text-gray-400 text-sm mt-2">Start by submitting a new application</p>
              </div>
            )}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Form Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Forms by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart - Monthly Trend */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Form Submissions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="forms" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        

      </main>
    </div>
  );
};

export default LandingPage;