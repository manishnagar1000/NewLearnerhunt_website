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


// export default function index() {
//   const [active, setActive] = useState(1);
//   const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
//   const [value, setValue] = React.useState("1");
//   const handleTabClick = () => {
//     setIsRecommendationOpen(!isRecommendationOpen);
//   };
//   const handleActiveTab = (tab) => {
//     setActive(tab);
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div
//       className={Classes["stud-dashboard"]}
//       style={{ backgroundColor: "#f8f8f8" }}
//     >
//       <Container>
//         <Row>
//           <Col xs={3}>
//             <div className={Classes["sidebar"]}>
//               <ul>
//                 <li>Home</li>
//                 <li>Profile</li>
//                 <li>College</li>
//               </ul>
//             </div>
//           </Col>
//           <Col xs={9}>
//             <Box sx={{ width: "100%" }}>
//               <Tabs
//                 value={value}
//                 onChange={handleChange}
//                 textColor="secondary"
//                 indicatorColor="secondary"
//                 aria-label="secondary tabs example"
//               >
//                 <Tab value="1" label="Recommendations" />
//                 <Tab value="2" label="Shortlists" />
//                 <Tab value="3" label="Application" />
//               </Tabs>
//             </Box>
//             <div
//               className={Classes["menu-bar"]}
//               style={{
//                 display: "none",
//                 width: "100%",
//                 height: "10vh",
//                 // display: "flex",
//                 alignItems: "center",
//                 backgroundColor: "white",
//                 padding: "10px",
//                 marginTop: "18px",
//               }}
//             >
//               <div
//                 onClick={() => {
//                   handleActiveTab(1);
//                 }}
//                 style={
//                   active == 1
//                     ? {
//                         borderBottom: "2px solid blue",
//                         padding: "10px",
//                         color: "blue",
//                         cursor: "pointer",
//                       }
//                     : { padding: "10px", bsLinkHoverColorRgb: "25, 135, 84" }
//                 }
//               >
//                 Recommendations{" "}
//                 <Badge style={{ borderRadius: "50%" }} bg="primary">
//                   23
//                 </Badge>
//               </div>
//               <div
//                 onClick={() => {
//                   handleActiveTab(2);
//                 }}
//                 style={
//                   active == 2
//                     ? {
//                         borderBottom: "2px solid blue",
//                         padding: "10px",
//                         color: "blue",
//                         cursor: "pointer",
//                       }
//                     : { padding: "10px" }
//                 }
//               >
//                 Shortlists
//                 <Badge
//                   style={{ marginLeft: "2px", borderRadius: "50%" }}
//                   bg="primary"
//                 >
//                   12
//                 </Badge>
//               </div>

//               <div
//                 onClick={() => {
//                   handleActiveTab(3);
//                 }}
//                 style={
//                   active == 3
//                     ? {
//                         borderBottom: "2px solid blue",
//                         padding: "10px",
//                         color: "blue",
//                         cursor: "pointer",
//                       }
//                     : { padding: "10px" }
//                 }
//               >
//                 Applications
//                 <Badge
//                   style={{
//                     marginLeft: "2px",
//                     marginBottom: "4px",
//                     borderRadius: "50%",
//                   }}
//                   bg="primary"
//                 >
//                   41
//                 </Badge>
//               </div>
//             </div>
//             <div style={{ marginTop: "20px", display: "none" }}>
//               {active == 1 && (
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "28vh",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   {/* {[1, 2, 3, 4, 5].map((e, i) => { */}
//                   <Card style={{ marginBottom: "20px" }}>
//                     <div
//                       style={{
//                         borderBottom: "1px  solid #c4c4c4",
//                         paddingBottom: "22px",
//                         display: "flex",
//                         margin: "12px",
//                       }}
//                     >
//                       <div>
//                         <div className="card text-center border rounded-2 border-slaty w-20 h-16 ">
//                           <Card.Img
//                             src="i5.png"
//                             alt="Image"
//                             style={{
//                               width: "90px",
//                               height: "10vh",
//                               objectFit: "fill",
//                               padding: "4px",
//                             }}
//                           />
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           padding: "0px 20px",
//                         }}
//                       >
//                         <Row>
//                           <Col>
//                             <h2 style={{ fontWeight: "bold" }}>
//                               Jagran Lakecity University
//                             </h2>
//                             <h6
//                               style={{
//                                 fontSize: "12px",
//                                 fontWeight: "initial",
//                                 color: "#d4d4d4",
//                                 marginTop: "4px",
//                               }}
//                             >
//                               Bhopal Madhya Pradesh
//                             </h6>
//                           </Col>
//                         </Row>
//                       </div>
//                     </div>

//                     <div>
//                       <Container>
//                         <Row>
//                           <Col>
//                             <div
//                               style={{
//                                 fontWeight: "bolder",
//                                 marginRight: "10px",
//                               }}
//                             >
//                               Why should you choose this college? Know about the
//                               College
//                             </div>
//                             <Nav style={{ color: "blue" }}>
//                               <Nav.Link href="/path/to/destination">
//                                 Checkout USPs{" "}
//                               </Nav.Link>
//                               <span className="text-blue fw-normal fs-3 mr-3">
//                                 &gt;
//                               </span>
//                             </Nav>
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col className="d-flex justify-content-end mb-3">
//                             <Button
//                               style={{ marginRight: "10px" }}
//                               variant="outline-primary"
//                             >
//                               Schedule a Call
//                             </Button>
//                             <Button variant="outline-primary">
//                               Move to Shortlist
//                             </Button>{" "}
//                           </Col>
//                         </Row>
//                       </Container>
//                     </div>
//                   </Card>
//                   <Card style={{ marginBottom: "20px" }}>
//                     <div
//                       style={{
//                         borderBottom: "1px  solid #c4c4c4",
//                         paddingBottom: "22px",
//                         display: "flex",
//                         margin: "12px",
//                       }}
//                     >
//                       <div>
//                         <div className="card text-center border rounded-2 border-slaty w-20 h-16 ">
//                           <Card.Img
//                             src="i4.png"
//                             alt="Image"
//                             style={{
//                               width: "90px",
//                               height: "10vh",
//                               objectFit: "fill",
//                               padding: "4px",
//                             }}
//                           />
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           padding: "0px 20px",
//                         }}
//                       >
//                         <Row>
//                           <Col>
//                             <h2 style={{ fontWeight: "bold" }}>
//                               Gulzar Group of Institutes Ludhiana
//                             </h2>
//                             <h6
//                               style={{
//                                 fontSize: "12px",
//                                 fontWeight: "initial",
//                                 color: "#d4d4d4",
//                                 marginTop: "4px",
//                               }}
//                             >
//                               Ludhiana,Punjab
//                             </h6>
//                           </Col>
//                         </Row>
//                       </div>
//                     </div>

//                     <div>
//                       <Container>
//                         <Row>
//                           <Col>
//                             <div
//                               style={{
//                                 fontWeight: "bolder",
//                                 marginLeft: "10px",
//                               }}
//                             >
//                               Why should you choose this college? Know about the
//                               College
//                             </div>
//                             <Nav style={{ color: "blue" }}>
//                               <Nav.Link href="/path/to/destination">
//                                 Checkout USPs{" "}
//                               </Nav.Link>
//                               <span className="text-blue fw-normal fs-3 mr-3">
//                                 &gt;
//                               </span>
//                             </Nav>
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col className="d-flex justify-content-end mb-3">
//                             <Button
//                               style={{ marginRight: "10px" }}
//                               variant="outline-primary"
//                             >
//                               Schedule a Call
//                             </Button>
//                             <Button variant="outline-primary">
//                               Move to Shortlist
//                             </Button>
//                           </Col>
//                         </Row>
//                       </Container>
//                     </div>
//                   </Card>
//                   <div className="card text-center border rounded-2 border-slaty">
//                     <div className="card-body">
//                       <img
//                         src="path_to_your_image.jpg"
//                         alt="Card image"
//                         className="img-fluid"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {active == 2 && (
//                 <div
//                   style={{
//                     width: "1000px",
//                     height: "28vh",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   {[1, 2, 3, 4, 5].map((e, i) => {
//                     return (
//                       <Card style={{ marginBottom: "20px" }}>
//                         <div
//                           style={{
//                             borderBottom: "1px  solid #c4c4c4",
//                             paddingBottom: "22px",
//                             display: "flex",
//                             margin: "12px",
//                           }}
//                         >
//                           <div>
//                             <Card.Img
//                               src="i5.png"
//                               alt="Image"
//                               style={{
//                                 width: "100px",
//                                 height: "10vh",
//                                 objectFit: "fill",
//                               }}
//                             />
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               padding: "0px 20px",
//                             }}
//                           >
//                             <Row>
//                               <Col>
//                                 <h2 style={{ fontWeight: "bold" }}>
//                                   Jagran Lakecity University
//                                 </h2>
//                                 <h6
//                                   style={{
//                                     fontSize: "12px",
//                                     fontWeight: "initial",
//                                     color: "#d4d4d4",
//                                     marginTop: "px",
//                                   }}
//                                 >
//                                   Bhopal Madhya Pradesh
//                                 </h6>
//                               </Col>
//                             </Row>
//                           </div>
//                         </div>

//                         <div>
//                           <Container>
//                             <Row>
//                               <Col>
//                                 <div
//                                   style={{
//                                     fontWeight: "bolder",
//                                     marginLeft: "8px",
//                                   }}
//                                 >
//                                   Why should you choose this college? Know about
//                                   the College
//                                 </div>
//                                 <Nav style={{ color: "blue" }}>
//                                   <Nav.Link href="/path/to/destination">
//                                     Checkout USPs{" "}
//                                   </Nav.Link>
//                                   <span className="text-blue fw-normal fs-3 mr-3">
//                                     &gt;
//                                   </span>
//                                 </Nav>
//                               </Col>
//                             </Row>
//                             <Row>
//                               <Col className="d-flex justify-content-end mb-3">
//                                 <Button
//                                   style={{ marginRight: "10px" }}
//                                   variant="outline-primary"
//                                 >
//                                   Schedule a Call
//                                 </Button>
//                                 <Button variant="outline-primary">
//                                   Move to Shortlist
//                                 </Button>
//                               </Col>
//                             </Row>
//                           </Container>
//                         </div>
//                       </Card>
//                     );
//                   })}
//                 </div>
//               )}
//               {active == 3 && (
//                 <div
//                   style={{
//                     width: "1000px",
//                     height: "28vh",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   {[1, 2, 3, 4, 5].map((e, i) => {
//                     return (
//                       <Card style={{ marginBottom: "20px" }}>
//                         <div
//                           style={{
//                             borderBottom: "1px  solid #c4c4c4",
//                             paddingBottom: "22px",
//                             display: "flex",
//                             margin: "12px",
//                           }}
//                         >
//                           <div>
//                             <Card.Img
//                               src="i5.png"
//                               alt="Image"
//                               style={{
//                                 width: "100px",
//                                 height: "10vh",
//                                 objectFit: "fill",
//                               }}
//                             />
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               padding: "0px 20px",
//                             }}
//                           >
//                             <Row>
//                               <Col>
//                                 <h2 style={{ fontWeight: "bold" }}>
//                                   Jagran Lakecity University
//                                 </h2>
//                                 <h6
//                                   style={{
//                                     fontSize: "12px",
//                                     fontWeight: "initial",
//                                     color: "#d4d4d4",
//                                     marginTop: "px",
//                                   }}
//                                 >
//                                   Bhopal Madhya Pradesh
//                                 </h6>
//                               </Col>
//                             </Row>
//                           </div>
//                         </div>

//                         <div>
//                           <Container>
//                             <Row>
//                               <Col>
//                                 <div
//                                   style={{
//                                     fontWeight: "bolder",
//                                     marginRight: "0px",
//                                   }}
//                                 >
//                                   Why should you choose this college? Know about
//                                   the College
//                                 </div>
//                                 <Nav
//                                   style={{ color: "blue", marginRight: "60px" }}
//                                 >
//                                   <Nav.Link href="/path/to/destination">
//                                     Checkout USPs{" "}
//                                   </Nav.Link>
//                                   <span className="text-blue fw-normal fs-3 mr-3">
//                                     &gt;
//                                   </span>
//                                 </Nav>
//                               </Col>
//                             </Row>
//                             <Row>
//                               <Col className="d-flex justify-content-end mb-3">
//                                 <Button
//                                   style={{ marginRight: "10px" }}
//                                   variant="outline-primary"
//                                 >
//                                   Schedule a Call
//                                 </Button>
//                                 <Button variant="outline-primary">
//                                   Move to Shortlist
//                                 </Button>
//                               </Col>
//                             </Row>
//                           </Container>
//                         </div>
//                       </Card>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

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
