import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import refresh from "/Images/loading-arrow.png";
import img1 from "/Images/cubicle1.jpeg";
import img2 from "/Images/cubicle2.jpeg";
import img3 from "/Images/cubicle3.jpeg";
import img4 from "/Images/cubicle1.jpeg";
import img5 from "/Images/cubicle4.jpeg";

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);

  const [locationNames, setLocationNames] = useState({
    country: "",
    state: "",
    district: "",
  });
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLocationNames = async () => {
      try {
        if (user?.location?.country) {
          const countryRes = await axios.get(
            `https://secure.geonames.org/getJSON?geonameId=${user.location.country}&username=shivam1234`
          );
          const stateRes = await axios.get(
            `https://secure.geonames.org/getJSON?geonameId=${user.location.state}&username=shivam1234`
          );

          setLocationNames({
            country: countryRes.data.name,
            state: stateRes.data.name,
            district: user.location.district,
          });
        }
      } catch (error) {
        console.error("Error fetching location names:", error);
      }
    };

    fetchLocationNames();
  }, [user]);

  return (
    <div className="sm:max-w-[90%] flex justify-around mx-auto my-[5vh] rounded-md gap-[2rem] sm:flex-nowrap flex-wrap">
      {/* Profile Section */}
      <div className="bg-black/20 backdrop-blur-lg border border-black/30 rounded-xl shadow-lg p-6 w-[50%] h-auto m-5 flex flex-col gap-4">
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
          <p className="text-gray-700"><strong>Name:</strong> {user?.firstName + " " + user?.lastName || "N/A"}</p>
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

      {/* Approval Section */}
      <div className="bg-black/20 backdrop-blur-lg border border-black/30 rounded-xl shadow-lg p-6 w-[100%] h-auto m-5">
        <div className="bg-blue-500">
          <h2 className="text-lg text-white font-semibold mb-2 text-center">CLIENT PANEL</h2>
        </div>
        <marquee direction="left" className="text-center text-green-800 font-semibold">This is your approval/disapproval status section.</marquee>

        <div className="flex justify-center mt-2">
          <button
            onClick={() => navigate("/formfill")}
            className="bg-[#0098ff] hover:bg-blue-700 w-[90%] h-[4vh] font-bold text-lg rounded-md text-white shadow-[0_2px_0_0_#064585] hover:shadow-[0_4px_0_0_#4c1d95] active:translate-y-[2px] active:shadow-none transition-all duration-150 ease-in-out"
          >
            APPLY FOR INCUBATION
          </button>
        </div>

        <div className="flex justify-center w-full mt-3">
          <div className="flex w-[90%] h-[5vh] gap-4">
            <button
              onClick={() => {navigate("/status") }}
              className="w-[100%] flex bg-[#0098ff] hover:bg-blue-700 text-white font-bold text-lg rounded-md shadow-[0_2px_0_0_#064585] hover:shadow-[0_4px_0_0_#4c1d95] active:translate-y-[2px] active:shadow-none transition-all duration-150 ease-in-out"
            >
              <div className="w-[80%] my-auto">Check Status</div>
            </button>
          </div>
        </div>

        <div className="flex justify-center w-full mt-3">
          <button
            onClick={() => navigate("/formpreview")}
            className="w-[90%] h-[5vh] bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-md transition shadow-[0_4px_0_0_#4c1d95] hover:shadow-[0_4px_0_0_#4c1d95]"
          >
            Preview Filled Form
          </button>
        </div>

        {/* Carousel */}
        <div className="bg-white">
        <div className="w-full mt-3 flex justify-center py-4">
          <div className="relative w-[90%] overflow-hidden rounded-lg shadow-md">
            <div
              id="carouselSlides"
              className="flex transition-transform duration-700 ease-in-out h-[50%]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {[img1, img2, img3, img4, img5].map((img, index) => (
                <div key={index} className="relative w-full flex-shrink-0 h-[30vh]">
                  <img src={img} className="w-full object-cover h-full" alt={`slide ${index + 1}`} />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center p-2 text-sm">
                    Slide {index + 1}: This is a glimpse of STPI Incubation
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full ${currentIndex === i ? "bg-white" : "bg-gray-400"} transition-all duration-300`}
                ></button>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-black/20 backdrop-blur-lg border border-black/30 rounded-xl shadow-lg p-6 w-[100%] h-auto m-5">
        <div className="bg-blue-500">
          <h2 className="text-lg font-semibold mb-2 text-center text-white">NOTIFICATIONS</h2>
        </div>
        <p>Here you’ll see notices and notifications.</p>
      </div>
    </div>
  );
};

export default ClientDashboard;
