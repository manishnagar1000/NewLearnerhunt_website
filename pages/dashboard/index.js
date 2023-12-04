import React, { useEffect, useState } from "react";
import { Button, Badge, Card, Container, Row, Col, Nav ,Spinner } from "react-bootstrap";
import Classes from "/styles/userdashboard.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import MyProfile from "../../components/studentdashboard/MyProfile";
import Educational from "../../components/studentdashboard/Educational";
import CollegeComponent from "../../components/studentdashboard/CollegeComponent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


export default function Index(props) {
  const [activeLink, setActiveLink] = useState("myprofile"); // state to manage active link
  const [sidemenuopen, setSidemenuopen] = useState(false);
  const [isuserlogin,setIsuserlogin] = useState(false);
  const [smyprofile,setSmyprofile] = useState([]);
  const [isLoading,setIsLoading]= useState(false);
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

      // hitting api
     
    }
  
  }, [])

  const studentDataApi = () =>{
    setIsLoading(true)
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/my-profile", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("userid")}`
      }
     
    }).then(async (response) => {
        var res = await response.json();

      console.log(res.data)
      setSmyprofile(res.data)
      setIsLoading(false)
    }).catch (error=>{
        alert(error);
    }) 
  }
  
  const onSuccess = () => {
    studentDataApi();
  };

  return (
    <>
    {isuserlogin&&
    <div
    className={Classes["stud-dashboard"]}
    style={{ backgroundColor: "#f8f8f8",height: "calc(100vh - 100px)" }}
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
              <li
                onClick={() => handleLinkClick("myprofile",setSidemenuopen(!sidemenuopen))}
                className={activeLink === "myprofile" ? Classes["active"] : ""}
              >
                My Profile
              </li>
              <li
                onClick={() => handleLinkClick("educational",setSidemenuopen(!sidemenuopen))}
                className={activeLink === "educational" ? Classes["active"] : ""}
              >
               Educational background
              </li>
              <li
                onClick={() => handleLinkClick("college",setSidemenuopen(!sidemenuopen))}
                className={activeLink === "college" ? Classes["active"] : ""}
              >
                Applied Colleges
              </li>
            </ul>
          </div>
        </Col>
   
        <Col md={9} xs={7} className={`${Classes["sidebar-content"]} ${sidemenuopen?Classes["show"]:""}`}>
        {!isLoading ?
          <div className={Classes['outercontainer']}>
          {/* Conditional rendering of content based on activeLink state */}
          {activeLink === "myprofile" && <MyProfile studentProfile={smyprofile} onSuccess={onSuccess}/>}
          {activeLink === "educational" && <Educational />}
          {activeLink === "college" && <CollegeComponent />}
          </div>
          :
          <div className='d-flex justify-content-center align-items-center' style={{ height: "80vh" }}> 
         <Spinner variant='outlined' />
         </div>
         }
        </Col>
        

      </Row>
    </Container>


  </div>}
    </>
  );
}
