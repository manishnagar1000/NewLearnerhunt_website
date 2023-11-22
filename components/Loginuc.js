import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import Carousel, { CarouselItem } from "./CarouselItem";
import { IndianStates } from "/components/Comps/StatesIndia";

export default function Loginuc({ isOpen, onClose, role }) {
  const initialTimer = 120; // 120 seconds (2 minutes)
  const [timer, setTimer] = useState(initialTimer);
  const [resendDisabled, setResendDisabled] = useState(false);

  const [email, setEmail] = useState("");
  const [showotp, setShowotp] = useState(false);
  const [loginpassword, setLoginPassword] = useState("");
  const [loginwithpassword, setLoginwithPassword] = useState(false);

  const [signupshowotp, setSignShowotp] = useState(false);
  const [userotp, setUserotp] = useState("");
  const [signupuserotp, setSignupuserotp] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // student signup
  const [signupemail, setSignupEmail] = useState("");
  const [name, setName] = useState(""); // Add state for name
  const [mobile, setMobile] = useState(""); // Add state for mobile
  const [stream, setStream] = useState(""); // Add state for stream
  const [level, setLevel] = useState(""); // Add state for level
  const [password, setPassword] = useState(""); // Add state for password

  // college signup
  const [clgname, setClgName] = useState(""); // Add state for name
  const [adminname, setAdminName] = useState(""); // Add state for name
  const [clgSignupemail, setClgSignupEmail] = useState("");
  const [clgmobile, setClgMobile] = useState(""); // Add state for mobile
  const [clgLandline, setClgLandline] = useState(""); // Add state for mobile
  const [designation, setDesignation] = useState(""); // Add state for mobile
  const [clgstate, setClgstate] = useState(""); // Add state for mobile
  const [clgcity, setClgcity] = useState(""); // Add state for mobile

  const [lastOtpSentTime, setLastOtpSentTime] = useState(null);

  // counsollor signup
  const [counsellorname, setCounsellorname] = useState(""); 

  let countdown; // Define countdown outside of useEffect

  // Function to start the timer
  const startTimer = () => {
    setResendDisabled(true);
    countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          setShowotp(true);
          setResendDisabled(false);
          return initialTimer; // Reset the timer to its initial value
        }
        return prevTimer - 1;
      });
    }, 1000); // Update the timer every 1 second
  };
  useEffect(() => {
    // let countdown;
    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(countdown);
      setShowotp(true);
    };
  }, [initialTimer]); // Add initialTimer as a dependency

  const handleSignupLinkClick = () => {
    setShowSignup(true);
    setShowotp(false); // Close OTP form if open
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const Studentregister = () => {
    if (loginwithpassword) {
      try {
        const fd = new FormData();
        fd.append("email", email);
        fd.append("password", loginpassword);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/login", {
          method: "POST",
          body: fd,
        }).then(async (response) => {
          // console.log(response)
          if (response.ok) {
            var res = await response.json();
            // console.log(res)
            // console.log(res.data)
            // console.log(res.data.email)
            var userstatus = res.data.status;
            var userid = res.data.token;
            var useremail = res.data.email;

            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsloading(false);
              onClose();
              localStorage.setItem("status", userstatus);
              localStorage.setItem("userid", userid);
              localStorage.setItem("useremail", useremail);
              window.location.reload();
            });
          } else {
            var res = await response.json();
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsloading(false);
              // onClose()
            });
          }
        });
      } catch (error) {
        console.error("Failed to fetch OTP:", error);
      }
    } else {
      try {
        setIsloading(true);
        const fd = new FormData();
        fd.append("email", email);
        // fd.append("otp", otp);
        // fd.append("role", role);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/get-otp", {
          method: "POST",
          body: fd,
        }).then(async (response) => {
          var res = await response.json();
          // console.log(res.message)
          if (response.ok) {
            // console.log("hello", response.data);
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsloading(false);
              setShowotp(true);
              startTimer();
            });
            // router.push('/thankyou')
          } else {
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsloading(false);
            });
          }
        });
      } catch (error) {
        console.error("Failed to fetch OTP:", error);
      }
    }
  };

  const handleStudentSubmit = (event) => {
    event.preventDefault();
    if (showSignup) {
      if (signupshowotp) {
        try {
          const fd = new FormData();
          fd.append("email", signupemail);
          fd.append("otp", signupuserotp);
          fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/login", {
            method: "POST",
            body: fd,
          }).then(async (response) => {
            if (response.ok) {
              var res = await response.json();
              var userstatus = res.data.status;
              var userid = res.data.token;
              var useremail = res.data.email;

              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then(() => {
                setIsloading(false);
                onClose();
                localStorage.setItem("status", userstatus);
                localStorage.setItem("userid", userid);
                localStorage.setItem("useremail", useremail);
                window.location.reload();
              });
            } else {
              var res = await response.json();
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              }).then(() => {
                setIsloading(false);
                // onClose()
              });
            }
          });
        } catch (error) {
          console.error("Failed to fetch OTP:", error);
        }
      } else {
        try {
          const fd = new FormData();
          if(role == 3){
            fd.append("email", signupemail);
            fd.append("name", name); // Add name to form data
            fd.append("mobile", mobile); // Add mobile to form data
            fd.append("stream", stream); // Add stream to form data
            fd.append("level", level); // Add level to form data
            fd.append("password", password); // Add password to form data
            fd.append("role", role);
          }else if(role == 1){
            fd.append("name", clgname); // Add name to form data
            fd.append("name", adminname); // Add name to form data
            fd.append("email", clgSignupemail);
            fd.append("mobile", clgmobile); // Add mobile to form data
            fd.append("stream", clgLandline); // Add stream to form data
            fd.append("level", designation); // Add level to form data
            fd.append("password", state);
            fd.append("password", city); // Add password to form data
            fd.append("role", role);
          }else{
            console.log("signup counsellor")
          }
          
          fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/signup", {
            method: "POST",
            body: fd,
          }).then(async (response) => {
            var res = await response.json();
            // console.log(res.message)
            if (response.ok) {
              // console.log("hello", response.data);
              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then(() => {
                // console.log("done")
                setSignShowotp(true);
                // setIsloading(false);
                // setShowotp(true);
              });
            } else {
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              });
            }
          });
        } catch (error) {
          // Handle network or fetch error
          console.error("Failed to fetch OTP:", error);
        }
      }
    } else {
      if (showotp) {
        setIsloading(true);
        try {
          const fd = new FormData();
          fd.append("email", email);
          fd.append("otp", userotp);
          fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/login", {
            method: "POST",
            body: fd,
          }).then(async (response) => {
            // console.log(response)
            if (response.ok) {
              var res = await response.json();
              // console.log(res)
              // console.log(res.data)
              // console.log(res.data.email)
              var userstatus = res.data.status;
              var userid = res.data.token;
              var useremail = res.data.email;

              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then(() => {
                setIsloading(false);
                onClose();
                localStorage.setItem("status", userstatus);
                localStorage.setItem("userid", userid);
                localStorage.setItem("useremail", useremail);
                window.location.reload();
              });
            } else {
              var res = await response.json();
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              }).then(() => {
                setIsloading(false);
                // onClose()
              });
            }
          });
        } catch (error) {
          console.error("Failed to fetch OTP:", error);
        }
      } else {
        Studentregister();
      }
    }
  };

  const handleSignupOtpChange = (event) => {
    setSignupuserotp(event.target.value);
  };

  const handleOtpChange = (event) => {
    // console.log(event.target.value);
    setUserotp(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSignupEmailChange = (event) => {
    setSignupEmail(event.target.value);
  };
  const handleMobileChange = (event) => {
    const input = event.target.value;

    // Remove any non-numeric characters
    const numericInput = input.replace(/\D/g, "");

    // Limit to 10 characters
    const limitedInput = numericInput.slice(0, 10);

    setMobile(limitedInput);
  };

  const handleClgMobileChange = (event) => {
    const input = event.target.value;

    // Remove any non-numeric characters
    const numericInput = input.replace(/\D/g, "");

    // Limit to 10 characters
    const limitedInput = numericInput.slice(0, 10);

    setClgMobile(limitedInput);
  };
  const handleClgLandlineChange = (event) => {
    const input = event.target.value;

    // Remove any non-numeric characters
    const numericInput = input.replace(/\D/g, "");

    // Limit to 10 characters
    const limitedInput = numericInput.slice(0, 10);

    setClgLandline(limitedInput);
  };

  const handleStreamChange = (event) => {
    setStream(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const Streamdata = [
    {
      id: 1,
      name: "Commerce and Banking",
    },
    {
      id: 2,
      name: "Design",
    },
    {
      id: 3,
      name: "Engineering",
    },
    {
      id: 4,
      name: "Management",
    },
    {
      id: 5,
      name: "Hotel Management",
    },
    {
      id: 6,
      name: "Information Technology",
    },
    {
      id: 7,
      name: "Media and Mass Communication",
    },
    {
      id: 8,
      name: "Medical",
    },
    {
      id: 9,
      name: "Retail",
    },
    {
      id: 12,
      name: "Arts and Humanities",
    },
    {
      id: 16,
      name: "Others",
    },
  ];

  const handleResendOtp = () => {
    setIsloading(true);
    const fd = new FormData();
    fd.append("email", email);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/get-otp", {
      method: "POST",
      body: fd,
    }).then(async (response) => {
      var res = await response.json();
      // console.log(res.message)
      if (response.ok) {
        // console.log("hello", response.data);
        Swal.fire({
          title: "Success",
          text: `${res.message}`,
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsloading(false);
          startTimer();
        });
        // router.push('/thankyou')
      } else {
        Swal.fire({
          title: "error",
          text: `${res.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsloading(false);
        });
      }
    });
  };
  return (
    <div>
      <Modal
        id="sloginmodal"
        centered
        size="lg"
        animation={false}
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        show={isOpen}
        onHide={onClose}
      >
        {/* <Modal.Header closeButton>
        <Modal.Title>Login and Apply</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Row>
            <Col
              md={0}
              lg={5}
              className="d-none d-lg-block"
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
            </Col>
            <Col md={12} lg={7} style={{ padding: "1rem" }}>
              <div className="text-center mb-3">
                <img
                  src="/assets/images/Svglogo.svg"
                  width={200}
                  height={60}
                  alt="logo"
                />
                {/* <img src="/assets/images/Learnerhunt-Logo.png" width={200} height={60} /> */}

                <h3>
                  {" "}
                  {showSignup
                    ? "Welcome, Create your account"
                    : "Welcome Back!"}
                </h3>
                <p style={{ color: "gray" }}>
                  {" "}
                  {!showSignup && "Sign in to continue"}
                </p>
              </div>

              <Form
                style={{ maxHeight: "550px", overflowY: "auto" }}
                onSubmit={handleStudentSubmit}
              >
                {!showSignup ? (
                  <>
                    <Form.Group controlId="email">
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Email
                      </Form.Label>
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
                    {loginwithpassword && (
                      <Form.Group controlId="password">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter your password"
                          value={loginpassword}
                          onChange={handleLoginPasswordChange}
                          required
                          autoComplete="new-password"
                          style={{ marginBottom: "15px" }}
                        />
                      </Form.Group>
                    )}

                    {showotp && (
                      <Form.Group controlId="otp">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Enter OTP
                        </Form.Label>
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
                  </>
                ) : (
                  <>
                    {role == "3" ? (
                      <>
                        <Form.Group controlId="name">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleNameChange}
                            required
                            autoComplete="on"
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>

                        <Form.Group controlId="email">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={signupemail}
                            onChange={handleSignupEmailChange}
                            required
                            autoComplete="on"
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Mobile
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={handleMobileChange}
                            required
                            autoComplete="on"
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group>

                        <Form.Group controlId="stream">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Preferred Stream
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={stream}
                            style={{ marginBottom: "15px" }}
                            onChange={handleStreamChange}
                            required
                          >
                            <option disabled value="">
                              Select Stream
                            </option>
                            {Streamdata.map((s) => {
                              return <option value={s.name}>{s.name}</option>;
                            })}

                            {/* ... Other options ... */}
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="level">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Preferred Level
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={level}
                            onChange={handleLevelChange}
                            style={{ marginBottom: "15px" }}
                            required
                          >
                            <option disabled value="">
                              Select Level
                            </option>
                            <option value="UG">UG</option>
                            <option value="PG">PG</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Ph.D">Ph.D</option>
                            <option value="Certificate">Certificate</option>
                            {/* ... Other options ... */}
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="password">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            autoComplete="new-password"
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>

                        {signupshowotp && (
                          <Form.Group controlId="otp">
                            <Form.Label style={{ fontWeight: "bold" }}>
                              Enter OTP
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter the OTP"
                              value={signupuserotp}
                              maxLength={6}
                              minLength={6}
                              onChange={handleSignupOtpChange}
                              required
                              style={{ marginBottom: "15px" }}
                            />
                          </Form.Group>
                        )}
                      </>
                    ) : role == "2" ? (
                      <Form.Group controlId="counsellorname">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Counsellor Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          value={counsellorname}
                          onChange={(e)=>setCounsellorname(e.target.value)}
                          required
                          autoComplete="on"
                          style={{ marginBottom: "15px" }}
                        />
                      </Form.Group>
                    ) : (
                      <>
                        <Form.Group controlId="clgname">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            College Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your College Name"
                            value={clgname}
                            onChange={(e) => setClgName(e.target.value)}
                            required
                            autoComplete="on"
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="adminname">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Admin Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your Admin Name"
                            value={adminname}
                            onChange={(e) => setAdminName(e.target.value)}
                            required
                            autoComplete="on"
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="clgemail">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={clgSignupemail}
                            onChange={(e) => setClgSignupEmail(e.target.value)}
                            required
                            autoComplete="on"
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Mobile
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter your mobile number"
                            value={clgmobile}
                            onChange={handleClgMobileChange}
                            required
                            autoComplete="on"
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group>
                        <Form.Group controlId="Landline Number">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Landline Number
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter your Landline number"
                            value={clgLandline}
                            onChange={handleClgLandlineChange}
                            required
                            autoComplete="on"
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group>
                        <Form.Group controlId="designation">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Designation
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your designation"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            autoComplete="on"
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="state">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            State
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={clgstate}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setClgstate(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select State
                            </option>
                            {Object.keys(IndianStates["India"]).map((c, i) => {
                              return (
                                <option key={i} value={c}>
                                  {c}
                                </option>
                              );
                            })}

                            {/* ... Other options ... */}
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="city">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            City
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={clgcity}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setClgcity(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select city
                            </option>
                            {clgstate != "" &&
                              IndianStates["India"][clgstate].map((c, i) => {
                                return (
                                  <option key={i} value={c}>
                                    {c}
                                  </option>
                                );
                              })}

                            {/* ... Other options ... */}
                          </Form.Control>
                        </Form.Group>
                        {signupshowotp && (
                          <Form.Group controlId="otp">
                            <Form.Label style={{ fontWeight: "bold" }}>
                              Enter OTP
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter the OTP"
                              value={signupuserotp}
                              maxLength={6}
                              minLength={6}
                              onChange={handleSignupOtpChange}
                              required
                              style={{ marginBottom: "15px" }}
                            />
                          </Form.Group>
                        )}
                      </>
                    )}
                  </>
                )}

                {!showSignup ? (
                  <>
                    {timer === 120 ? (
                      showotp ? (
                        <span
                          className="d-inline-flex my-2 text-primary "
                          style={{ cursor: "pointer" }}
                          onClick={handleResendOtp}
                        >
                          Resend Otp
                        </span>
                      ) : null
                    ) : (
                      <p>Resend OTP in {timer} seconds</p>
                    )}

                    <Button
                      className="w-100"
                      style={{ background: "#0151c1" }}
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
                      ) : loginwithpassword ? (
                        "Login"
                      ) : (
                        "Get OTP"
                      )}
                    </Button>
                    {!loginwithpassword ? (
                      <div
                        onClick={() => setLoginwithPassword(true)}
                        className="w-100 my-2"
                        style={{
                          background: "#0151c1",
                          cursor: "pointer",
                          display: "flex",
                          borderRadius: "0.3rem",
                          color: "white",
                          height: "2.2rem",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                        }}
                      >
                        Login Via Password
                      </div>
                    ) : (
                      <div
                        onClick={() => setLoginwithPassword(false)}
                        className="w-100 my-2"
                        style={{
                          background: "#0151c1",
                          cursor: "pointer",
                          display: "flex",
                          borderRadius: "0.3rem",
                          color: "white",
                          height: "2.2rem",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                        }}
                      >
                        Login Via OTP
                      </div>
                    )}
                  </>
                ) : (
                  <Button
                    className="w-100"
                    style={{ background: "#0151c1" }}
                    type="submit"
                    disabled={isloading}
                  >
                    {signupshowotp ? "Enter OTP" : "Signup"}
                  </Button>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                  }}
                >
                  {showSignup ? (
                    <p>
                      Already have an account?{" "}
                      <span
                        style={{ color: "blue" }}
                        onClick={() => setShowSignup(false)}
                      >
                        Login
                      </span>
                    </p>
                  ) : (
                    <p>
                      New to LearnerHunt?{" "}
                      <span
                        style={{ color: "blue" }}
                        onClick={handleSignupLinkClick}
                      >
                        Signup
                      </span>
                    </p>
                  )}
                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}
