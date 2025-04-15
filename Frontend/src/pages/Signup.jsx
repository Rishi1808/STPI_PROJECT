import { useState, useEffect } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    nationality: "",
    country: "",
    state: "",
    district: "",
    dob: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  // ✅ Fetch countries using GeoNames
  useEffect(() => {
    axios
      .get("https://secure.geonames.org/countryInfoJSON?username=shivam1234")
      .then((response) => {
        setCountries(response.data.geonames);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setError("Error fetching countries.");
      });
  }, []);

  // ✅ Fetch states using selected country geonameId
  const fetchStates = (countryGeonameId) => {
    axios
      .get(`https://secure.geonames.org/childrenJSON?geonameId=${countryGeonameId}&username=shivam1234`)
      .then((response) => {
        setStates(response.data.geonames || []);
      })
      .catch((err) => {
        console.error("Error fetching states:", err);
        setError("Error fetching states.");
      });
  };

  // ✅ Fetch districts using selected state geonameId
  const fetchDistricts = (stateGeonameId) => {
    axios
      .get(`https://secure.geonames.org/childrenJSON?geonameId=${stateGeonameId}&username=shivam1234`)
      .then((response) => {
        setDistricts(response.data.geonames || []);
      })
      .catch((err) => {
        console.error("Error fetching districts:", err);
        setError("Error fetching districts.");
      });
  };

  const handleCountryChange = (e) => {
    const selectedGeonameId = e.target.value;
    setFormData({ ...formData, country: selectedGeonameId, state: "", district: "" });
    setStates([]);
    setDistricts([]);
    fetchStates(selectedGeonameId);
  };

  const handleStateChange = (e) => {
    const selectedGeonameId = e.target.value;
    setFormData({ ...formData, state: selectedGeonameId, district: "" });
    setDistricts([]);
    fetchDistricts(selectedGeonameId);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "dob",
      "country",
      "state",
      "district",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError("Please fill all required fields.");
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!data.success) {
        setError(data.message || "Signup failed!");
      } else {
        alert("Signup successful!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          nationality: "",
          country: "",
          state: "",
          district: "",
          dob: "",
          role: "user",
        });
      }
    } catch (err) {
      setError("Server error, try again later.",err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.geonameId} value={country.geonameId}>
                  {country.countryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!formData.country}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.geonameId} value={state.geonameId}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!formData.state}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.geonameId} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
