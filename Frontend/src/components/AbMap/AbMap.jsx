import { useState, useEffect } from "react";
import image1 from "/Images/STPI_Bihar.png";
import image2 from "/Images/STPI_Build.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageList = [
  {
    id: 1,
    img: image1,
    caption: "STPI Bihar - Empowering IT Growth"
  },
  {
    id: 2,
    img: image2,
    caption: "STPI Building - Innovation Hub"
  }
];

const AbMap = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("about-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.disconnect();
    };
  }, []);

  // Responsive slider settings
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        }
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          dots: true,
        }
      }
    ]
  };

  return (
    <div 
      id="about-section"
      className={`py-10 bg-gradient-to-b from-white to-blue-50 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col lg:w-[80%] md:w-[90%] w-[92%] mx-auto gap-4 md:gap-6">
        {/* Heading section with decorative element */}
        <div className="relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-1 bg-yellow-400 hidden md:block"></div>
          <h1 className="text-[#3737a8] text-2xl md:text-3xl lg:text-4xl font-bold md:ml-20">
            About STPI Ranchi
          </h1>
        </div>

        {/* Subheading with enhanced styling */}
        <div className="bg-blue-50 p-4 border-l-4 border-[#3737a8] rounded-r-md">
          <h2 className="text-[#3737a8] text-base md:text-lg lg:text-xl font-bold">
            Established by the Ministry of Electronics and Information Technology (MeitY), Government of India in 1991
          </h2>
        </div>

        {/* Content section with responsive image carousel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text paragraphs */}
          <div className="flex flex-col text-gray-600 gap-4 order-2 lg:order-1">
            <p className="text-sm md:text-base lg:text-lg">
              Software Technology Parks of India (STPI), an autonomous society under Ministry of Electronics and Information Technology, Govt. of India has been set up with distinct focus to boost up Software export from the country.
            </p>
            <p className="text-sm md:text-base lg:text-lg">
              STPI Headquarters is located in New Delhi with 67 centres and 14 Jurisdictional Directorates spread across the country.
            </p>
            <p className="text-sm md:text-base lg:text-lg">
              STPI is constantly working with an objective to implement STP/EHTP scheme formulated by Govt. of India, set up and manage infrastructural facilities.
            </p>
            
            {/* Call to action buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="bg-yellow-400 px-5 py-2 text-sm md:text-base font-bold rounded-full hover:bg-blue-700 hover:text-yellow-300 transition duration-500 shadow-md transform hover:-translate-y-1">
                Know More
              </button>
              
              <button className="px-4 py-2 text-sm md:text-base text-blue-900 border border-blue-900 rounded-full hover:bg-blue-900 hover:text-white transition duration-500">
                About STPI-Patna
              </button>
              
              <button className="px-4 py-2 text-sm md:text-base text-blue-900 border border-blue-900 rounded-full hover:bg-blue-900 hover:text-white transition duration-500">
                About STPI
              </button>
            </div>
          </div>
          
          {/* Image carousel */}
          <div className="order-1 lg:order-2 shadow-xl rounded-lg overflow-hidden">
            <Slider {...settings}>
              {ImageList.map((data) => (
                <div key={data.id} className="relative">
                  <div className="h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] w-full">
                    <img
                      src={data.img}
                      alt={`STPI Image ${data.id}`}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white text-sm md:text-base font-medium">
                        {data.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbMap;