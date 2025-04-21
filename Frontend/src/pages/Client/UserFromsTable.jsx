import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { data } from "react-router-dom";

const UserFormsTable = () => {
  const [forms, setForms] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/api/auth/applications?email=${user?.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const sortedForms = data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setForms(sortedForms);
        } else {
          console.error("Error fetching forms:", data.message);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [user?.email]);

  // const getStatus = async (applicationId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await fetch(`http://localhost:5000/api/auth/getStatus/${applicationId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await res.json();
  // console.log(data)
  //     if (data.success) {
  //       setForms((prevForms) =>
  //         prevForms.map((form) =>
  //           form.applicationId === applicationId
  //             ? { ...form, applicationStatus: res.status }
  //             : form
  //         )
  //       );
  //     } else {
  //       console.error("Failed to get status:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Status fetch error:", error);
  //   }
  // };

  const getStatus = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/auth/getStatus/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
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
    }
  };
  return (
    <div className="container mx-auto mt-10 p-6">
      <div className="overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto">
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
                    <div className="flex flex-col items-center gap-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => getStatus(form.applicationId)}
                      >
                        REFRESH 
                      </button>
                      <span className="text-sm text-gray-700">
                        {form.applicationStatus ? `Status: ${form.applicationStatus}` : "Status: Pending"}
                      </span>

                      
                    </div>
                  </td>

                  <td>
                  {form.rejectionMessage ? `Status: ${form.rejectionMessage}` : "message: no Message"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {forms.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No forms submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFormsTable;
