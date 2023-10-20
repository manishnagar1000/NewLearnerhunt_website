// import React, { useState } from "react";
// import { Card, Button } from "react-bootstrap";
// import Link from "next/link";
// import Classes from "/styles/studyAbroad.module.css";

// export default function StudyAbroad({StudyAbroad}) {
//   console.log(StudyAbroad)
//   return (
//     <>
//     <div id="studyId" className=" container  my-5" >
//       <div  className=" d-flex justify-content-between align-items-center my-4">
//         <h2>Study Abroad</h2>
//         {/* <Link href={"/courses"}>
//           <Button className={Classes.linkButton}>Explore More</Button>
//         </Link> */}
//       </div>
//         <div className="row">
//         <div className="col-md-6  col-lg-3">
//         <Link href={"/comingsoon"} style={{textDecoration:"none"}}>

//             <Card className={Classes.studyCard}>
//               <Card.Header className={Classes.cardHeader}>
//                 Study in UK
//               </Card.Header>
//               <Card.Body>
//                 <p
//                   className={`${Classes.comingSoon}`}
//                 >
//                   Coming Soon
//                 </p>
//               </Card.Body>
//               <Card.Footer className={Classes.cardFooter}>
//                   <Button className={Classes.linkButton}>
//                     Learn More
//                   </Button>
//               </Card.Footer>
//             </Card>
//             </Link>

//           </div>
//     </div>
//         </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Classes from "/styles/TopColleges.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function StudyAbroad({ StudyAbroad }) {
  // console.log(StudyAbroad);
  const [selectedCollegeType, setSelectedCollegeType] = useState("");
  const [isColleges, setIsColleges] = useState(StudyAbroad);
  const [active, setActive] = useState("MBA");
  const [nameactive, setNameActive] = useState("MBA");
  const [screenWidth, setsCreenWidth] = useState(1024);

  const [isLoading, setIsLoading] = useState(false);

  // const handleCollegeClick = (collegeId) => {
  //   setLoadingColleges((prevLoadingColleges) => {
  //     return [...prevLoadingColleges, collegeId]; // Add collegeId to the loadingColleges array
  //   });
  // };
  useEffect(() => {
    setsCreenWidth(screen.width);
  
  }, []);

  useEffect(() => {
    // console.log("dfjdsfkj",selectedCollegeType)
    const fetchCourses = async () => {
      // if (selectedCollegeType) {
      setIsLoading(true);
      const limit = 4;
      const collegesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/uk-colleges?limit=${limit}&page=0&course=${selectedCollegeType}`
      );
      const collegesData = await collegesRes.json();
      const resp = [...collegesData.data];
     
      setIsColleges(resp);
      setIsLoading(false);
     
    };

    if(selectedCollegeType !==""){
      fetchCourses();
    }
  }, [selectedCollegeType]);

  const collegeType = [
    {
      name: "MBA",
      type: "MBA",
    },
    {
      name: "MCA",
      type: "MCA",
    },

    {
      name: "L.L.B",
      type: "LLB",
    },

    {
      name: "B.com",
      type: "B.com",
    },
    {
      name: "BCA",
      type: "BCA",
    },
    {
      name: "BBA",
      type: "BBA",
    },

    {
      name: "M.COM",
      type: "M.COM",
    },
  ];

  const handleTabChange = (type, name) => {
    // console.log(type,name)
    setActive(type);
    setNameActive(name);
    setSelectedCollegeType(type);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      // partialVisibilityGutter: 50, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      // partialVisibilityGutter: 80, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 1,
    },
  };
  return (
    <>
      <section id="collegeId" className=" container my-5">
        <div className="d-flex justify-content-between align-items-center my-4">
          <h2 style={{ fontSize: "calc(1em + 1vw)" }}>
           Study Abroad{" "}
            <span style={{ color: "#0151c1" }}>{nameactive}</span> Course
          </h2>
          {/* <Link href={`/colleges?course=${active}&fee=200000`}>
            <Button className={Classes.linkButton}>
              Explore More
              <ArrowOutwardOutlinedIcon style={{ marginLeft: "2px" }} />
            </Button>
          </Link> */}
        </div>
        <div className="row">
          <div className="col-md-12 mb-4">
            <Stack
              direction="row"
              spacing={1}
              style={{
                width: "100%",
                paddingBottom: "1.5rem",
                overflowX: "auto",
              }}
            >
              {collegeType.map((college) => {
                return (
                  <Chip
                    key={college.type}
                    onClick={(e) => handleTabChange(college.type, college.name)}
                    label={college.name}
                    className={`${Classes["customchip"]} ${
                      active == college.type ? Classes["active"] : ""
                    }`}
                  />
                );
              })}
            </Stack>
          </div>
        </div>
        
        {screenWidth < 1024  ? (
          <Carousel
            responsive={responsive}
            showDots={true}
            partialVisbile={false}
          >
            {
              // isColleges.length>0?
              isColleges.map((s) => {
                // console.log(s);
                return s != null ? (
                  <div key={s._id} style={{ marginBottom: "2rem" }}>
                    {isLoading ? (
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={118}
                        />
                      </div>
                    ) : (
                      <Link
                        href={`/colleges/${s.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Card className={Classes.CustomCard}>
                          <span className={Classes.Custombadge}>
                            {" "}
                            <StarIcon
                              fontSize="inherit"
                              style={{ marginRight: "2px" }}
                            />{" "}
                            {s.ratings}
                          </span>
                          <Card.Img
                            //  onError={(e)=>e.target.src="/assets/images/DummySQUARE.jpg"}
                            variant="top"
                            src={
                              s.square_img_path && s.square_img_path !== ""
                                ? s.square_img_path
                                : "/assets/images/DummySQUARE.jpg"
                            }
                            alt="Image not Found"
                            className="img-fluid"
                            width={200}
                            height={250}
                          />
                          <Card.Body className="card-body">
                            <Card.Title>{s.name}</Card.Title>
                            <Card.Text className="d-flex align-items-center">
                              <LocationOnOutlinedIcon
                                fontSize="inherit"
                                style={{ marginRight: "2px" }}
                              />
                              {s.short_address}
                            </Card.Text>
                          </Card.Body>
                          <Card.Footer
                            className={Classes["custom-card-footer"]}
                          >
                            <Button className={Classes.linkButton}>
                              <span style={{ marginRight: "3px" }}>
                                <ArrowOutwardOutlinedIcon fontSize="inherit" />
                              </span>
                              View College
                            </Button>
                          </Card.Footer>
                        </Card>
                      </Link>
                    )}
                  </div>
                ) : null;
              })
              // :"no record"
            }
          </Carousel>
        ) : (
          <div className="row">
            {isColleges.map((s) => {
              const cardImg =
                s.square_img_path && s.square_img_path !== ""
                  ? s.square_img_path
                  : "/assets/images/DummySQUARE.jpg";
              return (
                <div key={s._id} className="col-lg-3 col-md-6 mb-3">
                  {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <Skeleton
                        variant="rectangular"
                        width={210}
                        height={118}
                      />
                    </div>
                  ) : (
                    <Link
                      href={`/colleges/${s.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card className={Classes.CustomCard}>
                        <span className={Classes.Custombadge}>
                          {" "}
                          <StarIcon
                            fontSize="inherit"
                            style={{ marginRight: "2px" }}
                          />{" "}
                          {s.ratings}
                        </span>
                        <Card.Img
                          //  onError={(e)=>e.target.src="/assets/images/DummySQUARE.jpg"}
                          variant="top"
                          src={cardImg}
                          alt="Image not Found"
                        />
                        <Card.Body className="card-body">
                          <Card.Title>{s.name}</Card.Title>
                          <Card.Text className="d-flex align-items-center">
                            <LocationOnOutlinedIcon
                              fontSize="inherit"
                              style={{ marginRight: "2px" }}
                            />
                            {s.short_address}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className={Classes["custom-card-footer"]}>
                          <Button className={Classes.linkButton}>
                            <span style={{ marginRight: "3px" }}>
                              <VisibilityIcon fontSize="inherit" />
                            </span>
                            View College
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
