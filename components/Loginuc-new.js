import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Form, Button, Modal, Row, Col, Spinner } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import Carousel, { CarouselItem } from "./CarouselItem";
import FormLogin from "./FormLogin";
import FormSignUp from "./FormSignup";


export default function Loginuc({ isOpen, onClose, role }) {
  const [isLogin,setIsLogin] =useState(true)

  return (
    <div>
      <Modal
        id="sloginmodal"
        centered
        size="lg"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" ,padding:'0.5rem'}}
        show={isOpen}
        onHide={onClose}
        keyboard={false}
        backdrop='static'
      >
        <Modal.Body >
          <Row>
            <div
              className="col-lg-5 d-none d-lg-block"
              style={{
                background:
                  "linear-gradient(180deg, rgba(1,81,193,1) 22%, rgba(93,201,228,1) 100%)",
              }}
            >
              <Carousel>
                <CarouselItem>
                  <h3 style={{ color: "white" }}>Education Library </h3>
                  <p style={{ color: "white", whiteSpace: "break-spaces" }}>
                    Get detailed information about Colleges, Careers, Courses,
                    and Exams at LearnerHunt. Register now and make informed
                    decisions about your career.
                  </p>
                </CarouselItem>
                <CarouselItem>
                  <h3 style={{ color: "white" }}>Guaranteed Admission </h3>
                  <p style={{ color: "white", whiteSpace: "break-spaces" }}>
                    Get detailed information about Colleges, Careers, Courses,
                    and Exams at LearnerHunt. Register now and make informed
                    decisions about your career.
                  </p>
                </CarouselItem>
                <CarouselItem>
                  <h3 style={{ color: "white" }}>Counselling </h3>
                  <p style={{ color: "white", whiteSpace: "break-spaces" }}>
                    Get detailed information about Colleges, Careers, Courses,
                    and Exams at LearnerHunt. Register now and make informed
                    decisions about your career.
                  </p>
                </CarouselItem>
              </Carousel>
            </div>
            <div className="col-md-12 col-lg-7 bg-white">
              {
                isLogin ?
                <FormLogin 
                closeModal={onClose} islogin={()=>setIsLogin(false)}
              />:
              <FormSignUp closeModal={onClose} role={role} islogin={()=>setIsLogin(true)}/>
              }
             
          
            </div>
          </Row>
        </Modal.Body>
      </Modal>

    </div>
  );
}
