import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";
import { useState } from "react";
import logo1 from "/Images/stpilogo-footer.png";
import logo2 from "/Images/india.gov-logo.png";
import { FaTwitter, FaFacebook, FaLinkedin, FaYoutube, FaChevronDown, FaChevronUp } from "react-icons/fa";

// Global style with improved responsive styling
const GlobalStyle = createGlobalStyle`
  li {
    color: white;
    list-style: none;
    font-weight: 500;
    margin-bottom: 8px;
    position: relative;
    padding-left: 16px;
  }
  
  li:before {
    content: "•";
    position: absolute;
    left: 0;
    color: #fdb913;
  }
  
  a {
    text-decoration: none;
    color: white;
    transition: color 0.2s ease;
  }
  
  a:hover {
    text-decoration: none;
    color: #fdb913;
  }
  
  .footer-dropdown {
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
`;

// Data Arrays remain the same
const About = [
  { id: 1, txt: "About STPI", link: "#" },
  { id: 2, txt: "Objectives of STPI", link: "#" },
  { id: 3, txt: "Functions of STPI", link: "#" },
  { id: 4, txt: "Quality Objective", link: "#" },
  { id: 5, txt: "STPI Centers", link: "#" }
];

const Services = [
  { id: 1, txt: "Statutory Services", link: "#" },
  { id: 2, txt: "Internet Services/Data Communications", link: "#" },
  { id: 3, txt: "Incubation Services", link: "#" },
  { id: 4, txt: "PMC Services", link: "#" },
  { id: 5, txt: "Data Center", link: "#" },
  { id: 6, txt: "CRO Surveillance", link: "#" },
  { id: 7, txt: "Information Security Audit Service (VAPT)", link: "#" },
  { id: 8, txt: "Centres of Entrepreneurship (CoEs)", link: "#" },
  { id: 9, txt: "STPI Labs", link: "#" }
];

const Information = [
  { id: 1, txt: "Right to Information", link: "#" },
  { id: 2, txt: "GST Nodal Officers", link: "#" },
  { id: 3, txt: "Public Grievances", link: "#" },
  { id: 4, txt: "Citizens Charter", link: "#" },
  { id: 5, txt: "Public and Staff Grievance Officers", link: "#" },
  { id: 6, txt: "Internal Complaints Committee", link: "#" },
  { id: 7, txt: "Digitally Pay STPI through UPI/BHIM", link: "#" },
  { id: 8, txt: "Career", link: "#" },
  { id: 9, txt: "Circulars and Notifications", link: "#" },
  { id: 10, txt: "Webmail", link: "#" },
  { id: 11, txt: "FAQ's", link: "#" }
];

const WhosWho = [
  { id: 1, txt: "Know your ministers", link: "#" },
  { id: 2, txt: "Governing Council", link: "#" },
  { id: 3, txt: "Management Structure", link: "#" },
  { id: 4, txt: "STPI Jurisdictional Directors", link: "#" }
];

const Media = [
  { id: 1, txt: "News", link: "#" },
  { id: 2, txt: "Events", link: "#" },
  { id: 3, txt: "Campaigns", link: "#" },
  { id: 4, txt: "Blogs", link: "#" },
  { id: 5, txt: "Video Gallery", link: "#" },
  { id: 6, txt: "Photo Gallery", link: "#" },
  { id: 7, txt: "Newsletters", link: "#" },
  { id: 8, txt: "STPI KnowledgeUp Series", link: "#" },
  { id: 9, txt: "STPI Annual Reports", link: "#" }
];

// Improved Footer Component with better responsiveness
const Footer = () => {
  return (
    <>
      <GlobalStyle />
      <div className="bg-gradient-to-b from-[#010a65] to-[#27626e] text-white">
        <div className="container mx-auto px-14 py-8 md:py-12">
          {/* Nav links section - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-5 ">
            <FooterSection title="About" items={About} />
            <FooterSection title="Services" items={Services} />
            <FooterSection title="Information" items={Information} />
            <FooterSection title="Who is Who" items={WhosWho} />
            <FooterSection title="Media" items={Media} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-600 my-6"></div>

          {/* Contact & social media section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {/* Logo */}
            <div className="flex justify-center md:justify-start">
              <img src={logo1} alt="STPI Logo" className="max-h-16" />
            </div>
            
            {/* Address */}
            <div className="flex flex-col space-y-2 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-[#fdb913]">Headquarters</h2>
              <p className="text-sm md:text-base">
                Software Technology Parks of India, 1st Floor, Plate B, Office Block-1, East Kidwai Nagar, New Delhi-110023
              </p>
            </div>

            {/* Social media */}
            <div className="flex flex-col space-y-3 text-center md:text-left">
              <h2 className="text-lg font-semibold">CONNECT WITH US</h2>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="hover:text-[#fdb913] transition-colors duration-200">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="hover:text-[#fdb913] transition-colors duration-200">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="hover:text-[#fdb913] transition-colors duration-200">
                  <FaLinkedin size={24} />
                </a>
                <a href="#" className="hover:text-[#fdb913] transition-colors duration-200">
                  <FaYoutube size={24} />
                </a>
              </div>
            </div>
            
            {/* Gov logo */}
            <div className="flex justify-center md:justify-end">
              <img src={logo2} alt="India.gov Logo" className="max-h-16" />
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center">
            <p className="text-sm">© 2024 STPI. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Enhanced Footer Section Component with dropdown functionality
const FooterSection = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div>
      {/* Heading with dropdown toggle for mobile */}
      <div 
        className="flex items-center justify-between cursor-pointer md:cursor-default" 
        onClick={toggleDropdown}
      >
        <h2 className="text-xl font-bold text-[#fdb913] mb-4 pb-2 border-b border-[#fdb91333] inline-block">
          {title}
        </h2>
        <button className="text-[#fdb913] block md:hidden">
          {isOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </button>
      </div>
      
      {/* Links list - always visible on desktop, toggleable on mobile */}
      <div 
        className={`footer-dropdown ${isOpen ? 'max-h-96' : 'max-h-0 md:max-h-96'} md:block`}
      >
        <ul className="space-y-2 overflow-hidden">
          {items.map((data) => (
            <li key={data.id} className="text-sm md:text-base transition-all duration-200 hover:pl-5">
              <a href={data.link}>{data.txt}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// PropTypes validation
FooterSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      txt: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Footer;