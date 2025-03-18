import  { useEffect, useState } from "react";

const FormsTable = () => {
  const [forms, setForms] = useState([]);
  const token = localStorage.getItem("token"); // Get the JWT Token

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/getAllForms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q5MmRmMDhjYmI5OWY3M2Q4OWVjOGIiLCJlbWFpbCI6ImFkbWluQHN0cGkuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQyMjkxMDI0LCJleHAiOjE3NDIyOTE5MjR9.61J-O25beUvWNY6k7XBj1g8Yc996aDHIr85MtSJXuqA`, // Auth header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setForms(data.data); // Set fetched forms
        }
      })
      .catch((error) => console.error("Error fetching forms:", error));
  }, []);

  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Form Applications</h2>

      <div className="overflow-x-auto">
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
                    onClick={() => alert(`Viewing Form: ${form.applicationId}`)}
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
  );
};

export default FormsTable;
