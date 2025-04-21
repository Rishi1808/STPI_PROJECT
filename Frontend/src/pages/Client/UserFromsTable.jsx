import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
 // Adjust path if needed

const UserFormsTable = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ useContext added

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/auth/applications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Email: user?.email, // ✅ Include user's email in the request
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
  }, [user?.email]); // ✅ Depend on email so effect runs when it's ready

  const handleViewForm = (applicationId) => {
    navigate(`/form-preview/${applicationId}`);
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

          {forms.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No forms submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFormsTable;


// import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';

// const UserFormsTable = () => {
//   const [forms, setForms] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("User Token:", token);

//     fetch("http://localhost:5000/api/user/getMyForms", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           const sortedForms = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//           setForms(sortedForms);
//         }
//       })
//       .catch((error) => console.error("Error fetching user forms:", error));
//   }, []);

//   const handleViewForm = (applicationId) => {
//     navigate(`/form-preview/${applicationId}`);
//   };

//   return (
//     <div className="container mx-auto mt-10 p-6">
//       <div className="overflow-x-auto">
//         <div className="max-h-[400px] overflow-y-auto">
//           <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
//             <thead>
//               <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                 <th className="py-3 px-6 text-left">Application ID</th>
//                 <th className="py-3 px-6 text-left">Unit Name</th>
//                 <th className="py-3 px-6 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-700 text-sm">
//               {forms.map((form) => (
//                 <tr key={form._id} className="border-b border-gray-300 hover:bg-gray-100">
//                   <td className="py-3 px-6">{form.applicationId}</td>
//                   <td className="py-3 px-6">{form.unitName}</td>
//                   <td className="py-3 px-6 text-center">
//                     <button
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                       onClick={() => handleViewForm(form.applicationId)}
//                     >
//                       View Form
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {forms.length === 0 && (
//             <p className="text-center text-gray-500 mt-4">No forms submitted yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserFormsTable;
