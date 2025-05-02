import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api"; // Axios instance with base URL
import PDFViewer from "../../components/PDFViewer"; // Optional component for viewing PDFs
import Loading from "../../components/Loader"; // Optional loader component
import PropTypes from "prop-types";
import { pdfjs } from 'react-pdf';
import { AlertCircle, CheckCircle, XCircle, FileText, Camera } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PreviewForm = () => {
  const { formNumber } = useParams(); // from URL
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState(""); // To hold the current status of the form
  const [message, setMessage] = useState(""); // To hold the message from the admin
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state during status update
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Helper function to handle empty or invalid fields
  const getValue = (field, defaultValue = "N/A") => {
    if (field === null || field === undefined || field === "Not Provided" || field === 0) {
      return defaultValue;
    }
    return field;
  };

  // Adjust for date fields (like expected_occupancy_date)
  const formatDate = (date) => {
    if (!date || new Date(date).getTime() === 0) {
      return "Date not provided";
    }
    return new Date(date).toLocaleDateString();
  };

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
        setStatus(res.data.form.status); 
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
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    if (!status) return null;
    
    const statusLower = status.toLowerCase();
    if (statusLower === "accepted") {
      return (
        <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          <CheckCircle size={16} />
          <span>Accepted</span>
        </div>
      );
    } else if (statusLower === "rejected") {
      return (
        <div className="flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
          <XCircle size={16} />
          <span>Rejected</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
          <AlertCircle size={16} />
          <span>{status}</span>
        </div>
      );
    }
  };

  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-50 text-red-700 p-4 rounded-lg shadow flex items-center gap-3">
        <AlertCircle size={24} />
        <span>{error}</span>
      </div>
    </div>
  );

  if (!formData) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg mt-4 md:mt-8">
      {/* Header Section */}
      <div className="border-b pb-4 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Form #{formData.applicationId}</h1>
            <p className="text-gray-600 mt-1">{formData.unitName || "Unnamed Unit"}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Status:</span>
            {getStatusBadge(status)}
          </div>
        </div>
      </div>

      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center gap-2 shadow-lg z-50">
          <CheckCircle size={20} />
          <span>Form status updated successfully!</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("details")}
          className={`py-2 px-4 font-medium ${
            activeTab === "details"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Form Details
        </button>
        <button
          onClick={() => setActiveTab("documents")}
          className={`py-2 px-4 font-medium ${
            activeTab === "documents"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Uploaded Documents
        </button>
        <button
          onClick={() => setActiveTab("actions")}
          className={`py-2 px-4 font-medium ${
            activeTab === "actions"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Actions
        </button>
      </div>

      {/* Details Tab */}
      {activeTab === "details" && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">General Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Field 
              label="Unit Name" 
              value={getValue(formData.unitName)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="Contact Person" 
              value={getValue(formData.contactPerson)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="Email" 
              value={getValue(formData.email)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="Phone" 
              value={getValue(formData.phone)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="PAN" 
              value={getValue(formData.pan)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="GST" 
              value={getValue(formData.gst)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
          </div>

          <h2 className="text-lg font-semibold mt-8 mb-4 text-gray-800">Additional Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Field 
              label="Women-led?" 
              value={formData.women ? "Yes" : "No"} 
              highlighted={formData.women} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="SC/ST?" 
              value={formData.sc_st ? "Yes" : "No"} 
              highlighted={formData.sc_st} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="Divyangjan?" 
              value={formData.divyangjan ? "Yes" : "No"} 
              highlighted={formData.divyangjan} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="Involvement" 
              value={getValue(formData.involvement)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
          </div>

          <h2 className="text-lg font-semibold mt-8 mb-4 text-gray-800">Visit & Occupancy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Field 
              label="Date of Visit" 
              value={formatDate(formData.dateOfVisit)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="From Time" 
              value={getValue(formData.from)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="To Time" 
              value={getValue(formData.to)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="Expected Occupancy" 
              value={formatDate(formData.expected_occupancy_date)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
          </div>

          <h2 className="text-lg font-semibold mt-8 mb-4 text-gray-800">Bank & Payment Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Field 
              label="Bank Name" 
              value={getValue(formData.bankName)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="Branch Address" 
              value={getValue(formData.bankBranchAdd)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="DD No" 
              value={getValue(formData.dd_no)} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
            <Field 
              label="Deposit Amount" 
              value={`₹ ${getValue(formData.deposit_amount)}`} 
              icon={<FileText size={16} className="text-blue-500" />} 
            />
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === "documents" && (
        <div className="space-y-8">
          {formData?.uploadedFiles?.rocCertificate?.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-500" />
                ROC Certificates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.uploadedFiles.rocCertificate.map((file) => (
                  <a 
                    key={file._id}
                    href={file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border rounded-lg bg-white hover:bg-blue-50 transition"
                  >
                    <FileText size={24} className="text-blue-500" />
                    <span className="font-medium truncate">{file.originalName}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          {formData?.uploadedFiles?.casteCertificate?.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-500" />
                Cast Certificate
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.uploadedFiles.casteCertificate.map((file) => (
                  <a 
                    key={file._id}
                    href={file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border rounded-lg bg-white hover:bg-blue-50 transition"
                  >
                    <FileText size={24} className="text-blue-500" />
                    <span className="font-medium truncate">{file.originalName}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {formData.uploadedFiles?.passportPhotos?.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Camera size={20} className="text-blue-500" />
                Passport Photos
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.uploadedFiles.passportPhotos.map((photo, index) => (
                  <div key={index} className="bg-white p-2 border rounded-lg shadow-sm">
                    <img
                      src={photo}
                      alt={`Passport ${index + 1}`}
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.uploadedFiles?.rocCertificate?.url && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-500" />
                ROC Certificate
              </h3>
              <div className="border rounded-lg overflow-hidden">
                <PDFViewer fileUrl={`${formData.uploadedFiles.rocCertificate.url}.pdf`} />
              </div>
            </div>
          )}

          {(!formData.authLetterFile && 
            !formData?.uploadedFiles?.rocCertificate?.length && 
            !formData.uploadedFiles?.passportPhotos?.length && 
            !formData.uploadedFiles?.rocCertificate?.url) && (
            <div className="text-center p-8 text-gray-500">
              <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              <p>No documents have been uploaded for this application.</p>
            </div>
          )}
        </div>
      )}

      {/* Actions Tab */}
      {activeTab === "actions" && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Update Form Status</h3>
          
          <div className="mb-4">
            <label htmlFor="admin-message" className="block mb-2 font-medium text-gray-700">
              Admin Message
            </label>
            <textarea
              id="admin-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional message from admin"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              rows={4}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => handleStatusUpdate("Accepted")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition flex items-center justify-center gap-2"
              disabled={loading}
            >
              <CheckCircle size={20} />
              {loading ? "Processing..." : "Accept Application"}
            </button>
            
            <button
              onClick={() => handleStatusUpdate("Rejected")}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition flex items-center justify-center gap-2"
              disabled={loading}
            >
              <XCircle size={20} />
              {loading ? "Processing..." : "Reject Application"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value, icon, highlighted = false }) => (
  <div className={`p-4 rounded-lg ${highlighted ? 'bg-blue-50 border border-blue-100' : 'bg-white border border-gray-100'}`}>
    <div className="flex items-center gap-2 mb-1 text-gray-600">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <div className={`mt-1 ${highlighted ? 'text-blue-700 font-medium' : ''}`}>
      {value}
    </div>
  </div>
);

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  icon: PropTypes.node,
  highlighted: PropTypes.bool
};

export default PreviewForm;