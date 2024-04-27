import React, { useState,useEffect } from "react";
import Styles from "/styles/Loginform.module.css";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const FormLogin = ({ closeModal,islogin }) => {
  const initialTimer = 120; // 120 seconds (2 minutes)
  const [timer, setTimer] = useState(initialTimer);
  const [showotp, setShowotp] = useState(false);

  const [email, setEmail] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [isLoginWithOTP, setIsLoginWithOTP] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [isOTPSending, setIsOTPSending] = useState(false);
  const router = useRouter();



  let countdown; // Define countdown outside of useEffect

  // Function to start the timer
  const startTimer = () => {
    countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          setShowotp(true);
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
  }, [initialTimer]);
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

  const handlePassLogin = (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("email", email);
      fd.append("password", password);
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
          // var usermobile = res.data.mobile;
          Swal.fire({
            title: "Success",
            text: `${res.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            setIsloading(false);
            localStorage.setItem("status", userstatus);
            localStorage.setItem("useremail", useremail);
            localStorage.setItem("usermobile", usermobile);
            if (role == 3) {
              localStorage.setItem("userid", userid);
              window.location.reload();
            } else if (role == 1) {
              router.push("/collegeportal/my-kyc");
              localStorage.setItem("ct", userid);
            } else {
              router.push("/counsellorportal/my-profile");
              localStorage.setItem("cst", userid);
            }
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
  };
  const handleOTPLogin = (e) => {
    e.preventDefault();
    if(!showOTPInput){
        handleGetOTP()
    }else{
        try {
            const fd = new FormData();
            fd.append("email", email);
            fd.append("otp", otp);
            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/login", {
              method: "POST",
              body: fd,
            }).then(async (response) => {
              if (response.ok) {
                var res = await response.json();
                var userstatus = res.data.status;
                var userid = res.data.token;
                var useremail = res.data.email;
                var usermobile = res.data.mobile;
                var role = res.data.role;
                Swal.fire({
                  title: "Success",
                  text: `${res.message}`,
                  icon: "success",
                  confirmButtonText: "Ok",
                }).then(() => {
                  localStorage.setItem("status", userstatus);
                  localStorage.setItem("useremail", useremail);
                  localStorage.setItem("usermobile", usermobile);
                  if (role == 3) {
                    localStorage.setItem("userid", userid);
                    window.location.reload();
                  } else if (role == 1) {
                    router.push("/collegeportal/my-kyc");
                    localStorage.setItem("ct", userid);
                  } else {
                    router.push("/counsellorportal/my-profile");
                    localStorage.setItem("cst", userid);
                  }
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
    }
    
  };

  const handleGetOTP = () => {
    try {
      const isValidEmail = emailRegex.test(email);
      if (isValidEmail) {
        setIsOTPSending(true);
        const fd = new FormData();
        fd.append("email", email);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/get-otp", {
          method: "POST",
          body: fd,
        }).then(async (response) => {
          var res = await response.json();
          if (response.ok) {
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setShowOTPInput(true);
              setIsOTPSending(false);
                startTimer()
            });
          } else {
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsOTPSending(false);
            });
          }
        });
      } else {
        Swal.fire({
          title: "error",
          text: `Invalid email`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.error("Failed to fetch OTP:", error);
      setIsOTPSending(false);
    }
  };
  return (
    <div className={Styles["login-outer-div"]}>
      <span className={Styles["close-button"]} onClick={closeModal}>
        &times;
      </span>
      <div className={Styles["top-section"]}>
        <img
          src="/assets/images/learnerhunt-logo.webp"
          width={200}
          height={60}
          alt="logo"
        />
        {isLoginWithOTP ? (
          <h5>OTP Verification</h5>
        ) : (
          <>
            <h5>Welcome Back!</h5>
            <p>Sign in to continue</p>
          </>
        )}
      </div>
      <div className={Styles["middle-section"]}>
        {isLoginWithOTP ? (
          <Form onSubmit={handleOTPLogin}>
            <div className="mb-3">
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ marginBottom: "15px" }}
                  disabled={showOTPInput}
                />
              </Form.Group>
            </div>
            {showOTPInput ? (
              <>
                <div className="mb-3" style={{ position: "relative" }}>
                  <label htmlFor="otp" className="form-label">
                    OTP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    autoComplete="off"
                    placeholder="Enter your otp"
                    required
                  />
                </div>
                
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
                
                <button  type="submit" className="btn btn-primary w-100 mb-2" disabled={isloading}>
                  Login
                </button>
              </>
            ) : (
              <button
                type="submit"
                disabled={isloading}
                className="btn btn-primary w-100 mb-2"
                // onClick={handleGetOTP}
              >
                {isOTPSending ? (
                  <>
                    Generating...
                    <Spinner animation="border" size="sm" />
                  </>
                ) : (
                  <>Generate OTP</>
                )}
              </button>
            )}

            <button
              type="button"
              className="btn btn-outline-primary w-100"
              onClick={() => {
                setIsLoginWithOTP(false), setEmail(""), setPassword("") ,setOTP(""), setShowotp(false) ,setShowOTPInput(false);
              }}
            >
              Login via password?
            </button>
          </Form>
        ) : (
          <Form onSubmit={handlePassLogin}>
            <div className="mb-3">
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ marginBottom: "15px" }}
                />
              </Form.Group>
            </div>
            <div className="mb-3" style={{ position: "relative" }}>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={isShowPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  style={{ marginBottom: "15px" }}
                />
              </Form.Group>
              <i
                className={
                  Styles["eye"] +
                  ` bi ${isShowPass ? "bi-eye" : "bi-eye-slash"}`
                }
                onClick={() => setIsShowPass(!isShowPass)}
              ></i>
            </div>
            {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Remember me</label>
                <span className={Styles['forgot-pass-btn']}>Forgot password?</span>
              </div> */}
            <button type="submit" className="btn btn-primary w-100 mb-2" disabled={isloading} >
              Login
            </button>
            <button
              type="button"
              className="btn btn-outline-primary w-100"
              onClick={() => {
                setIsLoginWithOTP(true), setEmail(""), setPassword("");
              }}
            >
              Login via OTP?
            </button>
          </Form>
        )}
      </div>

      <hr />
      <div className={Styles["botton-section"]}>
        <p className="text-center">
          New to LearnerHunt? <span onClick={islogin}>Signup</span>
        </p>
      </div>
    </div>
  );
};

export default FormLogin;
