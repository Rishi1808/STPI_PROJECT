import image1 from "/Images/STPI_Bihar.png";
import image2 from "/Images/STPI_Build.jpg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ImageList=[
    {
        id:1,
        img:image1,
    },
    {
        id:2,
        img:image2,
    }
]

const AbMap = () => {

    var settings={
        dots: false,
        arrows:false,
        infinite:true,
        speed:800,
        slidesToScroll:1,
        autoplay:true,
        autoplaySpeed:4000,
        cssEase:"ease-in-out",
        pauseonHover:false,
        pauseOnFocus:true
      };


  return (
    <>
            <div className="flex flex-col lg:w-[70%] w-[98%] mx-auto gap-2">
                {/*  this is fo rthe HEading section */}
                <div className="mt-5">
                    <h1 className="text-[#3737a8] text-2xl font-bold">About STPI Ranchi</h1>
                </div>
                <div >
                    <h1 className="text-[#3737a8] text-lg font-bold">
                    Established by the Ministry of Electronics and Information Technology(MeitY), Government of India in 1991
                    </h1>
                </div>

            {/* following below will be the paragraph tags */}
                <div className="flex  flex-col text-gray-600 gap-4">
                    <p>Software Technology Parks of India (STPI), an autonomous society under Ministry of Electronics and Information Technology, Govt. of India has been set up with distinct focus to boost up Software export from the country.</p>
                    <p>STPI Headquarters is located in New Delhi with 67 centres and 14 Jurisdictional Directorates spread across the country.</p>
                    <p>STPI is constantly working with an objective to implement STP/EHTP scheme formulated by Govt. of India, set up and manage infrastructural facilities.</p>
                </div>

                <div className="flex gap-2  text-blue-900 mt-2">
                    <button 
                    className="bg-yellow-400 px-5 py-2 text-lg font-bold rounded-3xl hover:bg-blue-700 hover:text-yellow-300 transition duration-1000">
                            Know More
                    </button>

                    <button>About STPI-Patna</button>
                    <button>About STPI</button>
                </div>

                {/* image carousel will be done herer */}
                <div>

                <Slider 
              {...settings}>
                  {
                    ImageList.map((data)=>(
                      <div key={data.id}>
                      <div >        
                        {/* image section */}
                              <div className='order-1 sm:order-2'>
                                  <div className='relative z-10'>
                                    <img  src={data.img} alt="" 
                                    className='h-[70vh] object-cover mx-auto'/>
                                  </div>
                              </div>
        
                      </div>
                      </div> 
                    ))}
              


              </Slider>

                </div>
            </div>
    </>
  )
}

export default AbMap
