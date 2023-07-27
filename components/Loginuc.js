import { useState } from "react";
import { useRouter } from "next/router";
import Swal from 'sweetalert2'

import {
  Tabs,
  Tab,
  Form,
  Button,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { CircularProgress } from "@mui/material";

export default function Loginuc({ isOpen, onClose, role }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showotp, setShowotp] = useState(false);
  const [userotp, setUserotp] = useState("");
  const [genratedotp, setGenratedotp] = useState(null);

  const [onotperror, setOnotpError] = useState(false);

  const [isloading, setIsloading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // const generateNewOtp = () => {
  //   // Simulate OTP sent to email
  //   const randomotp = Math.floor(100000 + Math.random() * 9000);
  //   // console.log(`OTP sent to ${email}: ${randomotp}`);
  //   // Prompt user to enter OTP
  //   // setGenratedotp(randomotp);
  //   // setOnotpError(false);
  //   // setUserotp("");
  //   return randomotp;
  // };

  const Studentregister = ()=>{
    // const otp = generateNewOtp();
    //   setGenratedotp(otp);
      try {
        setIsloading(true);
        const fd = new FormData();
        fd.append("email", email);
        // fd.append("otp", otp);
        fd.append("role", role);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/register", {
          method: "POST",
          body: fd,
        }).then(async(response) => {
          var res =await response.json()
          // console.log(res.message)
          if (response.ok) {
            // console.log("hello", response.data);
            Swal.fire({
              title: 'Success',
              text: `${res.message}`,
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(()=>{
              setIsloading(false);
              setShowotp(true);

            })
            // router.push('/thankyou')
          } else {
            Swal.fire({
              title: 'error',
              text: 'OTP not send.',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        });
       
      } catch (error) {
        // Handle network or fetch error
        console.error("Failed to fetch OTP:", error);
      }
  }


  const handleStudentSubmit =  (event) => {
    event.preventDefault();
    if (showotp) {
      // if (userotp === genratedotp.toString()) {
        setOnotpError(false);
        setIsloading(true);
        try {
          const fd = new FormData();
          fd.append("email", email);
          fd.append("otp",userotp)
          fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/login", {
            method: "POST",
            body: fd,
          }).then(async(response) => {

            // console.log(response)
            if(response.ok){
              var res =await response.json()
              // console.log(res)
              // console.log(res.data)
              // console.log(res.data.email)
            var userstatus = res.data.status
            var userid = res.data.token
            var useremail = res.data.email

              Swal.fire({
                title: 'Success',
                text: `${res.message}`,
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then(()=>{
                setIsloading(false)
                onClose()
                localStorage.setItem("status", userstatus);
                localStorage.setItem("userid", userid);
                localStorage.setItem("useremail", useremail);
                window.location.reload()
              })
            }else{
              var res =await response.json()
              Swal.fire({
                    title: 'error',
                    text: `${res.error}`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  }).then(()=>{
                        setIsloading(false)
                        // onClose()
                      })
            }
           

         
          
          });
        } catch (error) {
          console.error("Failed to fetch OTP:", error);
        }
      // } else {
      //   setOnotpError(true);
      // }
    } else {
      Studentregister()
    }
  };

  const handleOtpChange = (event) => {
    // console.log(event.target.value);
    setUserotp(event.target.value);
  };

  const resendOtp = () => {
    setShowotp(false)
    setUserotp("")
    setOnotpError(false)
    Studentregister()

  };
  return (
    <div>
      <Modal
        centered
        size="lg"
        animation={false}
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        show={isOpen}
        onHide={onClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col md={12} lg={6}>
                <div className="text-center mb-3">
                  <h1 className="text-2xl font-bold">Login and Apply</h1>
                  <h5 className="underline text-md font-bold my-2"> Student</h5>
                  <p className="text-xs text-center">
                    To keep connected with us, please login with your personal
                    information using your contact number.
                  </p>
                </div>

                <Form onSubmit={handleStudentSubmit}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      autoComplete="on"
                      style={{ marginBottom: "15px" }}
                    />
                  </Form.Group>

                  {showotp && (
                    <Form.Group controlId="otp">
                      <Form.Label>Enter OTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter the OTP"
                        value={userotp}
                        maxLength={6}
                        minLength={6}
                        onChange={handleOtpChange}
                        required
                        style={{ marginBottom: "15px" }}
                      />
                    </Form.Group>
                  )}

                  {onotperror && (
                    <>
                      <p className="text-danger mb-2">Invalid OTP</p>
                      <p className="text-primary mb-2" onClick={resendOtp}>
                        Resend OTP
                      </p>
                    </>
                  )}

                  <Button
                    className="w-100"
                    style={{background:"#0151c1"}}
                    type="submit"
                    id="loginwithotp"
                    disabled={isloading}
                  >
                    {isloading ? (
                      <>
                        Please Wait...
                        <CircularProgress
                          style={{ marginLeft: "1rem" }}
                          color="inherit"
                        />
                      </>
                    ) : showotp ? (
                      "Verify OTP"
                    ) : (
                      "Get OTP"
                    )}
                  </Button>
                </Form>
              </Col>
              <Col md={12} lg={6} className="d-none d-lg-block">
                <img
                  src="/assets/images/loginpageavtar.png"
                  alt="loginpagemodal"
                  width={400}
                  height={400}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
