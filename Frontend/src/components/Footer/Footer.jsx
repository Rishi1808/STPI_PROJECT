import React from "react";
import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";

// ✅ Global style to apply white text to all <li> elements
const GlobalStyle = createGlobalStyle`
  li {
    color: white;
    list-style: none; /* Remove default bullet points */
  }
  a {
    text-decoration: none;
    color: white;
  }
  a:hover {
    text-decoration: underline;
  }
`;

// ✅ Data Arrays
const About = [
  { id: 1, txt: "About STPI", link: "#" },
  { id: 2, txt: "About STPI2", link: "#" },
  { id: 3, txt: "About STPI4", link: "#" },
  { id: 4, txt: "About STPI3", link: "#" }
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

// ✅ Footer Component
const Footer = () => {
  return (
    <>
      <GlobalStyle />
      <div className="bg-gradient-to-b from-blue-900 to-blue-300 text-white">
        <div className="flex flex-col lg:w-[90%] w-[100%] p-5 mx-auto">
          {/* Grid layout for sections */}
          <div className="grid lg:grid-cols-5 w-[90%] mx-auto text-left gap-6">
            {/* ✅ Using the reusable FooterSection component */}
            <FooterSection title="About" items={About} />
            <FooterSection title="Services" items={Services} />
            <FooterSection title="Information" items={Information} />
            <FooterSection title="Who is Who" items={WhosWho} />
            <FooterSection title="Media" items={Media} />
          </div>

          {/* Additional footer content */}
          <div className="mt-5 text-center text-sm">
            <p>© 2024 STPI. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

// ✅ Reusable Footer Section Component with PropTypes validation
const FooterSection = ({ title, items }) => {
  return (
    <div>
      <h1 className="text-[#fdb913] font-bold text-2xl mb-3">{title}</h1>
      <ul>
        {items.map((data) => (
          <li key={data.id} className="mb-2">
            <a href={data.link}>{data.txt}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ✅ Add PropTypes validation
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
