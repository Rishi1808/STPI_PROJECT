import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { RefreshCw, AlertCircle, CheckCircle, Clock, FileText } from "lucide-react";

const UserFormsTable = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchForms();
  }, [user?.email]);

  const fetchForms = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/auth/applications?email=${user?.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        const sortedForms = data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setForms(sortedForms);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch applications");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = async (applicationId) => {
    setRefreshing(applicationId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/auth/getStatus/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.status) {
        setForms((prevForms) =>
          prevForms.map((form) =>
            form.applicationId === applicationId
              ? { ...form, applicationStatus: data.status }
              : form
          )
        );
      } else {
        console.error("Failed to get status:", data.message);
      }
    } catch (error) {
      console.error("Status fetch error:", error);
    } finally {
      setRefreshing(null);
    }
  };

  const getStatusBadge = (status) => {
    if (!status || status === "Pending") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </span>
      );
    } else if (status === "Approved") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </span>
      );
    } else if (status === "Rejected") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          Rejected
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>
      );
    }
  };

  if (loading && forms.length === 0) {
    return (
      <div className="container mx-auto mt-10 p-6 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && forms.length === 0) {
    return (
      <div className="container mx-auto mt-10 p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Applications</h2>
          <button
            onClick={fetchForms}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh All
          </button>
        </div>

        {forms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <FileText className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No Applications Yet</h3>
            <p className="text-gray-500 text-center max-w-md">
              You havent submitted any applications yet. Once you submit an application, it will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Application ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Message
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {forms.map((form) => (
                      <tr key={form._id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {form.applicationId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {form.unitName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          {getStatusBadge(form.applicationStatus)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                          <div className="max-w-xs truncate">
                            {form.rejectionMessage ? form.rejectionMessage : "No message"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => getStatus(form.applicationId)}
                            disabled={refreshing === form.applicationId}
                            className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md 
                              ${refreshing === form.applicationId 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'text-blue-700 bg-blue-50 hover:bg-blue-100'} 
                              focus:outline-none transition-colors duration-300`}
                          >
                            {refreshing === form.applicationId ? (
                              <>
                                <RefreshCw className="animate-spin -ml-0.5 mr-2 h-4 w-4" />
                                Refreshing
                              </>
                            ) : (
                              <>
                                <RefreshCw className="-ml-0.5 mr-2 h-4 w-4" />
                                Refresh
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile view for message details */}
      {forms.length > 0 && (
        <div className="mt-4 md:hidden">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Application Messages</h3>
          <div className="space-y-3">
            {forms.map((form) => (
              <div key={`msg-${form._id}`} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-800">{form.applicationId}</span>
                  {getStatusBadge(form.applicationStatus)}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Unit:</span> {form.unitName}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Message:</span> {form.rejectionMessage || "No message"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserFormsTable;