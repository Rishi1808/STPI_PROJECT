

const About=[
            {
                id:1,
                txt:"About STPI",
                link:"#"
            },
            {
                id:1,
                txt:"About STPI2",
                link:"#"
            },
            {
                id:1,
                txt:"About STPI4",
                link:"#"
            },
            {
                id:1,
                txt:"About STPI3",
                link:"#"
            },
               
];
const Services=[
            {
                id:1,
                txt:"Stautory Services",
                link:"#"
            },
            {
                id:1,
                txt:"Internet Services/Data Communications",
                link:"#"
            },
            {
                id:1,
                txt:"Incubation Services",
                link:"#"
            },
            {
                id:1,
                txt:"PMC Services",
                link:"#"
            },
            {
                id:1,
                txt:"Data Center",
                link:"#"
            },
            {
                id:1,
                txt:"CRO Surveillance",
                link:"#"
            },
            {
                id:1,
                txt:"Information Security Audit Service (VAPT)",
                link:"#"
            },
            {
                id:1,
                txt:"Centres of Entrepreneurship (CoEs)",
                link:"#"
            },
            {
                id:1,
                txt:"STPI Labs",
                link:"#"
            },
               
];
const Information=[
            {
                id:1,
                txt:"Right to Information",
                link:"#"
            },
            {
                id:1,
                txt:"GST Nodal Officers",
                link:"#"
            },
            {
                id:1,
                txt:"Public Grievances",
                link:"#"
            },
            {
                id:1,
                txt:"Citizens Charter",
                link:"#"
            },
            {
                id:1,
                txt:"Public and Staff Grievance Officers",
                link:"#"
            },
            {
                id:1,
                txt:"Internal Complaints Committee",
                link:"#"
            },
            {
                id:1,
                txt:"Digitally Pay STPI through UPI/BHIM",
                link:"#"
            },
            {
                id:1,
                txt:"Career",
                link:"#"
            },
            {
                id:1,
                txt:"Circulars and Notifications",
                link:"#"
            },
            {
                id:1,
                txt:"Webmail",
                link:"#"
            },
            {
                id:1,
                txt:"FAQ's",
                link:"#"
            },
               
];

const WhosWho = [
    {
        id: 1,
        txt: "Know your ministers",
        link: "#"
    },
    {
        id: 2,
        txt: "Governing Council",
        link: "#"
    },
    {
        id: 3,
        txt: "Management Structure",
        link: "#"
    },
    {
        id: 4,
        txt: "STPI Jurisdictional Directors",
        link: "#"
    }
];

const Media = [
    {
        id: 1,
        txt: "News",
        link: "#"
    },
    {
        id: 2,
        txt: "Events",
        link: "#"
    },
    {
        id: 3,
        txt: "Campaigns",
        link: "#"
    },
    {
        id: 4,
        txt: "Blogs",
        link: "#"
    },
    {
        id: 5,
        txt: "Video Gallery",
        link: "#"
    },
    {
        id: 6,
        txt: "Photo Gallery",
        link: "#"
    },
    {
        id: 7,
        txt: "Newsletters",
        link: "#"
    },
    {
        id: 8,
        txt: "STPI KnowledgeUp Series",
        link: "#"
    },
    {
        id: 9,
        txt: "STPI Annual Reports",
        link: "#"
    }
];





const Footer = () => {

  return (
    <>
            {/* below has been described as the main bg footer  */}
            <div className="bg-gradient-to-b from-blue-900 to-blue-300">
                
                <div className="flex flex-col lg:w-[80%] w-[100%] p-5">
                    {/* this will be the abou,services etc section  */}
                    
                    <div className="grid lg:grid-cols-5 " >

                        <div>
                                <div><h1>About </h1></div>
                                <div>
                                    {
                                        About.map((data)=>(
                                            <li key= {data.id}>
                                                <a href="data.link">{data.txt}</a>
                                            </li>
                                        ))
                                    }
                                </div>
                        </div>

                        <div>
                        <div><h1>About </h1></div>
                                <div>
                                    {
                                        About.map((data)=>(
                                            <li key= {data.id}>
                                                <a href="data.link">{data.txt}</a>
                                            </li>
                                        ))
                                    }
                                </div>
                        </div>

                        <div>
                        <div><h1>About </h1></div>
                                <div>
                                    {
                                        About.map((data)=>(
                                            <li key= {data.id}>
                                                <a href="data.link">{data.txt}</a>
                                            </li>
                                        ))
                                    }
                                </div>
                        </div>

                        <div>
                        <div><h1>About </h1></div>
                                <div>
                                    {
                                        About.map((data)=>(
                                            <li key= {data.id}>
                                                <a href="data.link">{data.txt}</a>
                                            </li>
                                        ))
                                    }
                                </div>
                        </div>

                        <div>

                        <div><h1>About </h1></div>
                                <div>
                                    {
                                        About.map((data)=>(
                                            <li key= {data.id}>
                                                <a href="data.link">{data.txt}</a>
                                            </li>
                                        ))
                                    }
                                </div>

                        </div>

                    {/* this will be the stpo logo section of footer */}
                    <div></div>

                    {/* this will be the terms and condition section of the footer */}
                    <div></div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default Footer
