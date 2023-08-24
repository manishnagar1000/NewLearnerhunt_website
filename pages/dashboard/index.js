import React, { useEffect, useState } from "react";
import { Button, Badge, Card, Container, Row, Col, Nav } from "react-bootstrap";
import Classes from "/styles/userdashboard.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import HomeComponent from "../../components/studentdashboard/HomeComponent";
import ProfileComponent from "../../components/studentdashboard/ProfileComponent";
import CollegeComponent from "../../components/studentdashboard/CollegeComponent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


export default function Index() {
  const [activeLink, setActiveLink] = useState("college"); // state to manage active link
  const [sidemenuopen, setSidemenuopen] = useState(false);
  const [isuserlogin,setIsuserlogin] = useState(false)
  // Function to handle link clicks
  const handleLinkClick = (link) => {
    // console.log(link);
    setActiveLink(link);
  };

  useEffect(() => {
    if(localStorage.getItem("userid")==null && localStorage.getItem("userid")==undefined){
      window.history.back()
    }else{
      setIsuserlogin(true)
    }
  
  }, [])
  

  return (
    <>
    {isuserlogin&&
    <div
    className={Classes["stud-dashboard"]}
    style={{ backgroundColor: "#f8f8f8",height: "calc(100vh - 104px)" }}
  >
    <Container>
      <span className={`${Classes["arrowbutton"]}`} onClick={()=>setSidemenuopen(!sidemenuopen)}>
        <ArrowForwardIcon />
      </span>
      <Row>
        <Col md={3} xs={5} className={`${Classes["sidebar-parent"]} ${sidemenuopen?Classes["show"]:""}`}>
          {/* Sidebar content here */}
          <div className={Classes["sidebar"]}>
            <ul>
              {/* <li
                onClick={() => handleLinkClick("home")}
                className={activeLink === "home" ? Classes["active"] : ""}
              >
                Home
              </li>
              <li
                onClick={() => handleLinkClick("profile")}
                className={activeLink === "profile" ? Classes["active"] : ""}
              >
                Profile
              </li> */}
              <li
                onClick={() => handleLinkClick("college")}
                className={activeLink === "college" ? Classes["active"] : ""}
              >
                College
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9} xs={7} className={`${Classes["sidebar-content"]} ${sidemenuopen?Classes["show"]:""}`}>
          {/* Conditional rendering of content based on activeLink state */}
          {/* {activeLink === "home" && <HomeComponent />}
          {activeLink === "profile" && <ProfileComponent />} */}
          {activeLink === "college" && <CollegeComponent />}
        </Col>
      </Row>
    </Container>
  </div>}
    </>
  );
}
