import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api"; // Axios instance with base URL
import PDFViewer from "../../components/PDFViewer"; // Optional component for viewing PDFs
import Loading from "../../components/Loader"; // Optional loader component

const PreviewForm = () => {
  const { formNumber } = useParams(); // from URL
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState(""); // To hold the current status of the form
  const [message, setMessage] = useState(""); // To hold the message from the admin
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state during status update

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get(`/api/admin/forms/view/${formNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData(res.data.form);
        setStatus(res.data.form.status); // Set initial status
        setMessage(res.data.form.adminMessage || ""); // Set initial message if exists
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load form data");
      }
    };

    fetchForm();
  }, [formNumber]);

  const handleStatusUpdate = async (newStatus) => {
    setLoading(true); // Show loading state
    try {
      const token = localStorage.getItem("token");

      // Sending the status update request to the backend
      await API.patch(
        `/api/admin/forms/${formData.applicationId}/status`,
        {
          status: newStatus,
          message: message, // Include the custom message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the UI with the new status and message
      setStatus(newStatus);
      setLoading(false);
      alert(`Form ${newStatus} successfully!`); // Show success alert
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!formData) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-4">Form Preview: {formData.applicationId}</h1>

      {/* Display form details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Unit Name" value={formData.unitName} />
        <Field label="Contact Person" value={formData.contactPerson} />
        <Field label="Email" value={formData.email} />
        <Field label="Phone" value={formData.phone} />
        <Field label="Status" value={status} />
        <Field label="Women-led?" value={formData.women ? "Yes" : "No"} />
        <Field label="SC/ST?" value={formData.sc_st ? "Yes" : "No"} />
        <Field label="Divyangjan?" value={formData.divyangjan ? "Yes" : "No"} />
        <Field label="Involvement" value={formData.involvement} />
        <Field label="PAN" value={formData.pan} />
        <Field label="GST" value={formData.gst} />
        <Field label="Date of Visit" value={new Date(formData.dateOfVisit).toLocaleDateString()} />
        <Field label="From Time" value={formData.from} />
        <Field label="To Time" value={formData.to} />
        <Field label="Bank Name" value={formData.bankName} />
        <Field label="Branch Address" value={formData.bankBranchAdd} />
        <Field label="DD No" value={formData.dd_no} />
        <Field label="Deposit Amount" value={`₹ ${formData.deposit_amount}`} />
        <Field label="Expected Occupancy" value={new Date(formData.expected_occupancy_date).toLocaleDateString()} />
      </div>

      {/* Preview PDFs if available */}
      {formData.authLetterFile && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Authorization Letter:</h3>
          <PDFViewer fileUrl={formData.authLetterFile} />
        </div>
      )}

      {/* Preview passport photos */}
      {formData.uploadedFiles?.passportPhotos?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Passport Photos:</h3>
          <div className="flex flex-wrap gap-4">
            {formData.uploadedFiles.passportPhotos.map((photo, index) => (
              <img key={index} src={photo} alt={`Passport ${index + 1}`} className="h-32 rounded shadow" />
            ))}
          </div>
        </div>
      )}

      {/* Status Update Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Update Form Status</h3>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Optional message from admin"
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
        />

        <div className="mt-4 flex justify-between gap-4">
          <button
            onClick={() => handleStatusUpdate("Accepted")}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Updating..." : "Accept"}
          </button>
          <button
            onClick={() => handleStatusUpdate("Rejected")}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Updating..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

import PropTypes from "prop-types";

const Field = ({ label, value }) => (
  <div>
    <span className="text-gray-600 font-medium">{label}: </span>
    <span>{value}</span>
  </div>
);

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
};

export default PreviewForm;
