import { useContext ,useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);

  const [locationNames, setLocationNames] = useState({
    country: "",
    state: "",
    district: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationNames = async () => {
      try {
        if (user?.location?.country) {
          const countryRes = await axios.get(
            `https://secure.geonames.org/getJSON?geonameId=${user.location.country}&username=shivam1234`
          );
          const countryName = countryRes.data.name;

          const stateRes = await axios.get(
            `https://secure.geonames.org/getJSON?geonameId=${user.location.state}&username=shivam1234`
          );
          const stateName = stateRes.data.name;

          // District is stored as name already
          const districtName = user.location.district;

          setLocationNames({
            country: countryName,
            state: stateName,
            district: districtName,
          });
        }
      } catch (error) {
        console.error("Error fetching location names:", error);
      }
    };

    fetchLocationNames();
  }, [user]);

    return (
    <div className='sm:max-w-[90%] flex justify-around mx-auto my-[5vh] rounded-md gap-[2rem] sm:flex-nowrap flex-wrap'>
      
      {/* Profile Section */}
      <div className='   bg-black/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6
                        w-[50%] h-auto m-5 flex flex-col gap-4 '>
        <div className="h-[200px] w-[200px] bg-white flex items-center justify-center border border-gray-300 rounded-[50%] mx-auto">
          <span className="text-gray-500">Profile Picture</span>
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="profileUpload" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Upload Profile Picture
          </label>
          <input type="file" id="profileUpload" className="hidden" accept="image/*" />
        </div>

        <div className="bg-white p-4 rounded-md border border-gray-300">
          <h2 className="text-lg font-semibold mb-2 text-center">User Details</h2>
          <p className="text-gray-700"><strong>Name:</strong> {user?.firstName +" "+ user?.lastName || "N/A"}</p>
          <p className="text-gray-700"><strong>Role:</strong> {user?.role || "N/A"}</p>
          <p className="text-gray-700"><strong>Email:</strong> {user?.email || "N/A"}</p>
          <p className="text-gray-700">
               <strong>Location:</strong>{" "}
               {locationNames.country && locationNames.state && locationNames.district
                ? `${locationNames.country}, ${locationNames.state}, ${locationNames.district}`
                : "N/A"}
          </p>



        </div>
      </div>

      {/* Approval / Disapproval Notification Section */}
      <div className="  bg-black/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6
                        w-[100%] h-auto m-5">
      <div className="bg-blue-500">
      <h2 className="text-lg text-white font-semibold mb-2 text-center">CLIENT PANNEL</h2>
        </div>
        <p className="text-center">This is your approval/disapproval status section.</p>
       <div className="flex justify-center">
       <button 
        onClick ={()=>{ navigate("/formfill")}}
        className="bg-green-900/20 ">
          Apply for Incubation
        </button>
       </div>
      </div>

      {/* Notice and Notification Section */}
      <div className="  bg-black/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6
                        w-[100%] h-auto m-5">
        <div className="bg-blue-500">
             <h2 className="text-lg font-semibold mb-2 text-center text-white">NOTIFICATIONS</h2>
        </div>
        <p>Here you’ll see notices and notifications.</p>
      </div>
    </div>
  );
};

export default ClientDashboard;