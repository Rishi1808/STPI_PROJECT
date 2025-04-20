import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const FormsTable = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // ✅ See what's in localStorage
  
    fetch("http://localhost:5000/api/admin/getAllForms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Send token with Bearer prefix
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Sort forms by createdAt (assuming it's available)
          const sortedForms = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setForms(sortedForms);
        }
      })
      .catch((error) => console.error("Error fetching forms:", error));
  }, []);

  const handleViewForm = (applicationId) => {
    navigate(`/form-preview/${applicationId}`);
  };

  return (
    <div className="container mx-auto mt-10 p-6">

      <div className="overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto"> {/* Scrollable container */}
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Application ID</th>
                <th className="py-3 px-6 text-left">Unit Name</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {forms.map((form) => (
                <tr key={form._id} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="py-3 px-6">{form.applicationId}</td>
                  <td className="py-3 px-6">{form.unitName}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={() => handleViewForm(form.applicationId)}
                    >
                      View Form
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormsTable;
