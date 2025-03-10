import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { validationSchema } from "../schemas/Validation";

const IncubationForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  });

  // State for conditional fields
  const [authLetterFile, setAuthLetterFile] = useState(false);
  const [otherLoc, setOtherLoc] = useState(false);
  const [scSt, setScSt] = useState(false);
  const [months, setMonths] = useState(false);
  const [years, setYears] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Handle file uploads with preview
  const [fileUploads, setFileUploads] = useState({
    authLetter: null,
    rocCertificate: null,
    casteCertificate: null,
    passportPhotos: []
  });

  const handleFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUploads({
        ...fileUploads,
        [fieldName]: e.target.files[0]
      });
    }
  };

  const handleMultiFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUploads({
        ...fileUploads,
        [fieldName]: [...(fileUploads[fieldName] || []), ...Array.from(e.target.files)]
      });
    }
  };
 
  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const formDataObj = new FormData();
      console.log("Form Data:", formData);
      // Append all form fields
      Object.keys(formData).forEach((key) => {
        // Skip file fields as we handle them separately
        if (key !== "files" && formData[key] !== undefined && formData[key] !== null) {
          formDataObj.append(key, formData[key]);
        }
      });

      // Append all files with proper field names
      if (fileUploads.authLetter) {
        formDataObj.append("authLetter", fileUploads.authLetter);
      }
      
      if (fileUploads.rocCertificate) {
        formDataObj.append("rocCertificate", fileUploads.rocCertificate);
      }
      
      if (fileUploads.casteCertificate) {
        formDataObj.append("casteCertificate", fileUploads.casteCertificate);
      }

      // Append passport photos
      if (fileUploads.passportPhotos.length > 0) {
        fileUploads.passportPhotos.forEach((photo, index) => {
          formDataObj.append("passportPhotos", photo);
        });
      }

      const response = await fetch("http://localhost:5000/api/form/submit", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Form submitted successfully!");
        reset(); // Reset form after successful submission
        setFileUploads({
          authLetter: null,
          rocCertificate: null,
          casteCertificate: null,
          passportPhotos: []
        });
        // Reset conditional fields
        setAuthLetterFile(false);
        setOtherLoc(false);
        setScSt(false);
        setMonths(false);
        setYears(false);
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-200 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-center mb-4">
        REQUEST FOR ALLOTMENT/EXTENSION OF INCUBATION SPACE
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name of Unit */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
          <label className="block font-medium">Name of the Unit</label>
          <input
            type="text"
            {...register("unitName")}
            className="w-full border p-2 rounded"
          />
          {errors.unitName && <span className="text-red-500">{errors.unitName?.message}</span>}
        </div>

        {/* Contact Person */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
          <label className="block font-medium">
            Contact Person/Authorized Signatory for:
            <div className="text-gray-600">
              <h3>Interaction in respect of incubation services.</h3>
            </div>
          </label>
          <input
            type="text"
            {...register("contactPerson", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.contactPerson && <span className="text-red-500">{errors.contactPerson?.message}</span>}
        </div>

        {/* Authorization Letter */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
          <label htmlFor="Auth-file">
            Please provide authorization letter duly Signed by the Proprietor/ partner or board resolution in case of Pvt. Ltd. firm
          </label>

          <input
            type="checkbox"
            className="m-4 border rounded-lg"
            {...register("authLetterFile")}
            onChange={(e) => setAuthLetterFile(e.target.checked)}
          />

          {authLetterFile && (
            <div>
              <label>Upload Authorization Letter:</label>
              <input 
                type="file" 
                id="Auth-letter" 
                className="border p-2 w-full" 
                onChange={(e) => handleFileChange(e, 'authLetter')}
              />
              {fileUploads.authLetter && (
                <div className="text-sm text-green-600 mt-1">
                  File selected: {fileUploads.authLetter.name}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Registered Office Address */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
          <label className="block font-medium">Full address of the Registered Office</label>
          <input
            type="text"
            {...register("registeredAddress", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.registeredAddress && (
            <span className="text-red-500">{errors.registeredAddress?.message}</span>
          )}
          <div className="mt-4 mb-6">
            <label className="text-md mt-4" htmlFor="">
              (Furnish copy of the ROC/ Regn. Certificate)
              <div className="mt-4">
                <input 
                  type="file" 
                  id="Roc-certificate"
                  onChange={(e) => handleFileChange(e, 'rocCertificate')} 
                />
                {fileUploads.rocCertificate && (
                  <div className="text-sm text-green-600 mt-1">
                    File selected: {fileUploads.rocCertificate.name}
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Branch Office Address */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
          <label className="block font-medium">
            Branch Office(S) Operations at other location, if Any Address
            <input 
              className="m-4" 
              type="checkbox" 
              name="other-loc" 
              onChange={(e) => setOtherLoc(e.target.checked)}
            />
          </label>

          {otherLoc && (
            <input
              type="text"
              placeholder="Enter Other Location Address"
              {...register("branchOffice", { required: otherLoc })}
              className="w-full border p-2 rounded"
            />
          )}
          {otherLoc && errors.branchOffice && (
            <span className="text-red-500">{errors.branchOffice?.message}</span>
          )}
        </div>

        {/* Status of Applicant */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
          <label className="block font-medium">Status of Applicant</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="Partnership"
                {...register("status")}
              />{" "}
              Partnership
            </label>
            <label>
              <input
                type="radio"
                value="Individual Promoter"
                {...register("status")}
              />{" "}
              Individual Promoter
            </label>
            <label>
              <input
                type="radio"
                value="Pvt. Ltd. Firm"
                {...register("status")}
              />{" "}
              Pvt. Ltd. Firm
            </label>
          </div>
          {errors.status && <span className="text-red-500">{errors.status?.message}</span>}
        </div>

        {/* SC/ST, Women, Divyangjan Entrepreneurs */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
          <label className="block font-medium">Company led by</label>
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                {...register("sc_st")}
                onChange={(e) => setScSt(e.target.checked)}
              /> SC/ST Entrepreneurs
              <div className="text-gray-600">
                (if yes, enclose caste certificate)
              </div>
            </label>
            {scSt && (
              <div className="mt-2 mb-2">
                <input 
                  type="file" 
                  id="scst-caste"
                  onChange={(e) => handleFileChange(e, 'casteCertificate')}
                />
                {fileUploads.casteCertificate && (
                  <div className="text-sm text-green-600 mt-1">
                    File selected: {fileUploads.casteCertificate.name}
                  </div>
                )}
              </div>
            )}
            <label>
              <input type="checkbox" {...register("women")} /> Women Entrepreneurs
              <div className="text-gray-600">
                (In case of Non Individual enterprises at least 51% of the shareholding and controlling stake should be held by women Entrepreneurs)
              </div>
            </label>
            <label>
              <input type="checkbox" {...register("divyangjan")} /> Divyangjan Entrepreneurs
              <div className="text-gray-600">
                (In case of Non Individual enterprises at least 51% of the shareholding and controlling stake should be held by Divyangjan Entrepreneurs)
              </div>
            </label>
          </div>
        </div>

        {/* Product Development Involvement */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
          <label className="block font-medium">Company Involved in</label>
          <div className="flex gap-4">
            <label>
              <input type="radio" value="Product Development" {...register("involvement")} /> Product Dev.
            </label>
            <label>
              <input type="radio" value="R&D" {...register("involvement")} /> R&D
            </label>
            <label>
              <input type="radio" value="Others" {...register("involvement")} /> Others
            </label>
          </div>
          {errors.involvement && <span className="text-red-500">{errors.involvement?.message}</span>}
        </div>

        {/* PAN & GST Number */}
        <div className="flex gap-4 mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
          <div className="w-1/2">
            <label className="block font-medium">PAN No.</label>
            <input type="text" {...register("pan")} className="w-full border p-2 rounded" />
            {errors.pan && <span className="text-red-500">{errors.pan?.message}</span>}
          </div>
          <div className="w-1/2">
            <label className="block font-medium">GST No.</label>
            <input type="text" {...register("gst")} className="w-full border p-2 rounded" />
            {errors.gst && <span className="text-red-500">{errors.gst?.message}</span>}
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex gap-4 mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full mx-auto">
          <div className="w-1/2">
            <label className="block font-medium">Mobile/Phone</label>
            <input type="text" {...register("phone")} className="w-full border p-2 rounded" />
            {errors.phone && <span className="text-red-500">{errors.phone?.message}</span>}
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Email</label>
            <input type="email" {...register("email")} className="w-full border p-2 rounded" />
            {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
          </div>
        </div>
        {/* Board of Directors */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full  mx-auto">
          <label className="block font-medium"> List of Board of Directors/Partners/proprietor:</label>
          <div className="text-gray-600">
            (Please provide the Name with address copy of passport & PAN, Furnish 2 passport size photo)
          </div>
          <textarea
            {...register("boardOfDirectors")}
            className="w-full border p-2 rounded"
            rows="3"
          ></textarea>
          {errors.boardOfDirectors && <span className="text-red-500">{errors.boardOfDirectors.message}</span>}
        </div>

        {/* Brief Background */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full  mx-auto">
          <label className="block font-medium">Brief Background</label>

        </div>


        {/* BANK DEIALS */}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full  mx-auto">
          <label htmlFor="bank-details" className="block text-lg font-semibold mb-4">
            Bank Details of Unit
          </label>

          {/* Bank Account Number */}
          <div className="flex flex-col mb-3">
            <label className="font-medium mb-1">a) Bank Account No.</label>
            <input
              type="text"
              {...register("AccountNo")}
              className="border p-2 rounded w-full"
            />
            {errors.AccountNo && <span className="text-red-500">{errors.AccountNo.message}</span>}
          </div>

          {/* Bank Name & Branch */}
          <div className="flex flex-col mb-3">
            <label className="font-medium mb-1">b) Bank Name & Branch Address</label>
            <input
              type="text"
              {...register("bankName")}
              className="border p-2 rounded w-full"
            />
            {errors.bankName && <span className="text-red-500">{errors.bankName.message}</span>}
          </div>

          {/* Authorized Signatory */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">c) Authorised Signatory</label>
            <input
              type="text"
              {...register("bankBranchAdd")}
              className="border p-2 rounded w-full"
            />
            {errors.bankBranchAdd && <span className="text-red-500">{errors.bankBranchAdd.message}</span>}
          </div>
        </div>

        {/* date of visit */}

        <div className="flex flex-col">
          <label className="font-medium">Date of Visit to the Incubation Facilities</label>
          <input type="date" {...register("dateOfVisit")} className="border p-2 rounded w-full" />
          {errors.purposeOfVisit && <span className="text-red-500">{errors.purposeOfVisit.message}</span>}
        </div>

        {/* purpose of visit */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full  mx-auto">
          <label htmlFor="pupose" className="font-medium mb-1"> Purpose of taking Incubation facility</label>
          <textarea
            {...register("purposeOfVisit")}
            className=" mt-2 mb-2 border p-2 rounded w-full"
            rows="3"
            name="purpose"
          ></textarea>

        </div>

        {/* time of work */}

        <div className="flex flex-col mt-6 p-4 bg-gray-50 rounded-lg shadow-md w-full  mx-auto">
          <label htmlFor="work-time" className="font-medium mb-2">
            Approximate Timing of Work
          </label>
          <div className="text-gray-600">
            (Time in 24 hours format)
          </div>
          <div className="flex items-center gap-4">
            <span>From</span>
            <input
              type="time"
              {...register("from", { required: true })}
              className="border p-2 rounded w-40"
            />

          </div>
          <div className="flex items-center gap-4 mt-2">
            <span>To</span>
            <input
              type="time"
              {...register("to", { required: true })}
              className="border p-2 rounded w-40"
            />

          </div>
        </div>
        {/* proposed period of time */}

        <label className="block font-semibold text-gray-700 mb-3">Proposed Period of Time</label>

        {/* Months Checkbox */}
        {!years && (
          <div className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              id="months"
              onChange={(e) => setMonths(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="months">Months</label>
          </div>
        )}

        {/* Months Input */}
        {months && (
          <div className="mt-2">
            <label htmlFor="months-input" className="block text-gray-700">Number of Months</label>
            <input
              type="number"
              id="months-input"
              {...register("months", { required: true })}
              className="border p-2 rounded w-full mt-1"
              min="1"
              placeholder="Enter months"
            />
          </div>
        )}

        {/* Years Checkbox */}
        {!months && (
          <div className="flex items-center gap-2 text-gray-600 mt-3">
            <input
              type="checkbox"
              id="years"
              onChange={(e) => setYears(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="years">Years</label>
          </div>
        )}

        {/* Years Input */}
        {years && (
          <div className="mt-2">
            <label htmlFor="years-input" className="block text-gray-700">Number of Years</label>
            <input
              type="number"
              id="years-input"
              {...register("years", { required: true })}
              className="border p-2 rounded w-full mt-1"
              min="1"
              placeholder="Enter years"
            />
          </div>
        )}

        {/* facility required */}
        <div className="mb-4">
          <label className="block font-medium">Incubation Space</label>
          <select
            {...register("incubation_space")}
            className="border p-2 rounded w-full mt-1"
          >
            <option value="plug_play">Plug & Play</option>
            <option value="raw">Raw</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Power Backup (Text Input) */}
        <div className="mb-4">
          <label className="block font-medium">Power Backup (in KVA)</label>
          <input
            type="text"
            {...register("power_backup", { required: true })}
            className="border p-2 rounded w-full mt-1"
            placeholder="Enter Power Backup (KVA)"
          />
        </div>

        {/* Internet Requirement (Text Input) */}
        <div className="mb-4">
          <label className="block font-medium">Internet Requirement (Capacity Required)</label>
          <input
            type="text"
            {...register("internet_requirement", { required: true })}
            className="border p-2 rounded w-full mt-1"
            placeholder="Enter Internet Capacity"
          />
        </div>

        {/* Business Support Facilities (Checkboxes & Inputs) */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Business Support Facilities</label>

          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" {...register("fax")} className="w-4 h-4" />
            <label>Fax (Outgoing/Incoming)</label>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" {...register("photocopy")} className="w-4 h-4" />
            <label>Photocopy</label>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" {...register("phone_call")} className="w-4 h-4" />
            <label>Phone Call</label>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("conference")} className="w-4 h-4" />
            <label>Conference/Discussion Room</label>
          </div>
        </div>



        {/* Lease Rent */}
        <div className="mb-4">
          <label className="block font-medium">Lease Rent</label>
          <input
            type="text"
            {...register("lease_rent")}
            className="border p-2 rounded w-full mt-1"
            placeholder="As applicable"
            readOnly
          />
        </div>

        {/* Electricity Charges */}
        <div className="mb-4">
          <label className="block font-medium">Electricity Charges</label>
          <input
            type="text"
            {...register("electricity_charges")}
            className="border p-2 rounded w-full mt-1"
            placeholder="As per actual on sub-meter"
            readOnly
          />
        </div>

        {/* Power Backup Charges */}
        <div className="mb-4">
          <label className="block font-medium">Power Backup Charges</label>
          <input
            type="text"
            {...register("power_backup_charges")}
            className="border p-2 rounded w-full mt-1"
            placeholder="As applicable"
            readOnly
          />
        </div>

        {/* Business Support Facilities */}
        <div className="mb-4">
          <label className="block font-medium">Business Support Facilities</label>
          <input
            type="text"
            {...register("business_support_facilities")}
            className="border p-2 rounded w-full mt-1"
            placeholder="As applicable"
            readOnly
          />
        </div>

        {/* Security Deposit */}
        <div className="mb-4">
          <label className="block font-medium">Security Deposit</label>
          <div className="flex gap-2">
            <input
              type="text"
              {...register("dd_no")}
              className="border p-2 rounded w-1/2 mt-1"
              placeholder="DD No."
            />
            <input
              type="date"
              {...register("dd_date")}
              className="border p-2 rounded w-1/2 mt-1"
            />
          </div>
          <input
            type="number"
            {...register("deposit_amount")}
            className="border p-2 rounded w-full mt-2"
            placeholder="Amount"
          />
        </div>

        {/* Expected Date of Occupancy */}
        <div className="mb-4">
          <label className="block font-medium">Expected Date of Occupancy</label>
          <input
            type="date"
            {...register("expected_occupancy_date")}
            className="border p-2 rounded w-full mt-1"
          />
        </div>


        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncubationForm;
