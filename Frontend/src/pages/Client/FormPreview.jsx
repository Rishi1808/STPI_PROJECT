// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const FormPreview = () => {
//   const { applicationId } = useParams(); // Get the applicationId from the URL
//   const [form, setForm] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/auth/getStatus/${applicationId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setForm(data.application); // Assuming your API returns the application data
//         } else {
//           console.error("Error fetching form details:", data.message);
//         }
//       })
//       .catch((error) => console.error("Fetch error:", error));
//   }, [applicationId]);

//   if (!form) {
//     return <div>Loading form details...</div>;
//   }

//   return (
//     <div>
//       <h1>Form Preview - {form.applicationId}</h1>
//       <p>Unit Name: {form.unitName}</p>
//       <p>Status: {form.status}</p>
//       {/* Display more form details here */}
//     </div>
//   );
// };

// export default FormPreview;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FormPreview = () => {
  const { applicationId } = useParams(); // Get the applicationId from the URL
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/getStatus/${applicationId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setForm(data.application); // Assuming your API returns the application data
        } else {
          console.error("Error fetching form details:", data.message);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [applicationId]);

  if (!form) {
    return <div>Loading form details...</div>;
  }

  return (
    <div>
      <h1>Form Preview - {form.applicationId}</h1>
      <p>Unit Name: {form.unitName}</p>
      <p>Status: {form.status}</p>
      {/* Display more form details here */}
    </div>
  );
};

export default FormPreview;
