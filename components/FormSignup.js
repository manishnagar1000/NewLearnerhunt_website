import React, { useState,useEffect } from "react";
import Styles from "/styles/Loginform.module.css";
import Swal from "sweetalert2";
import { Form, Button, Modal, Row, Col, Spinner } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { IndianStates } from "/components/Comps/StatesIndia";
import { ExpinYear } from "@/components/Comps/type";
import { CounsellorSpecilization } from "@/components/Comps/type";
import { CounsellorLanguage } from "@/components/Comps/type";
import { genderType } from "@/components/Comps/type";
import { CounsellorQualification } from "@/components/Comps/type";
import Classes from "/styles/searchmodal.module.css";
import { useRouter } from "next/router";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const FormSignUp = ({ closeModal ,role ,islogin }) => {



  const [signupshowotp, setSignShowotp] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [signupuserotp, setSignupuserotp] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isApiHitComplete, setIsApiHitComplete] = useState(true);
  const [results, setResults] = useState([]);
  
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
  // const [clgSignupemail, setClgSignupEmail] = useState("");
  const [clgmobile, setClgMobile] = useState(""); // Add state for mobile
  // const [clgLandline, setClgLandline] = useState(""); // Add state for mobile
  const [designation, setDesignation] = useState(""); // Add state for mobile
  const [referrer, setReferrer] = useState(""); // Add state for mobile
  const [linkedIn, setLinkedIn] = useState(""); // Add state for mobile

  // counsollor signup
  const [counsellorname, setCounsellorname] = useState("");
  const [counsellormobile, setCounsellormobile] = useState("");
  const [counsellorstate, setCounsellorstate] = useState(""); 
  const [counsellorcity, setCounsellorcity] = useState(""); 
  const [counsellorexp, setCounsellorexp] = useState(""); 
  const [counsellorcountry, setCounsellorcountry] = useState("");
  const [counsellorgender, setCounsellorgender] = useState("");
  const [Counsellorspecilizationvalue, setCounsellorspecilizationvalue] = useState("");
  const [counsellorpreLang, setCounsellorpreLang] = useState("");
  const [CounsellorQualificationvalue, setCounsellorQualificationvalue] = useState("");

  const router = useRouter();

  useEffect(() => {
    let timeoutId;
    const fetchSearchResults = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          "/miscellaneous/global-search?term=" +
          searchTerm
      );
      const data = await response.json();
      var rs = data.data.filter((s) => s.type == "college");
      // console.log(data);
      if(role == 1){
        if (rs.length == 0) {
          rs = [{ title: "+ Add New", slug: "", type: "-1" }];
        }
      }
      
      setResults(rs);
      setIsApiHitComplete(true);
    };

    if (searchTerm.trim().length > 2) {
      setIsApiHitComplete(false);
      timeoutId = setTimeout(fetchSearchResults, 500);
    } else {
      setResults([]);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

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
 
  const handleStreamChange = (event) => {
    setStream(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleSignupOtpChange = (event) => {
    setSignupuserotp(event.target.value);
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

  const onClgselect = (clg) => {
    if (clg.type == "-1") {
      setClgName(searchTerm);
    } else setClgName(clg.title);
    setIsSearchModalOpen(false);
  };

    const handleSignUp =(e)=> {
        e.preventDefault()
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
                var usermobile = res.data.mobile;
  
                var role = res.data.role;
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
                  }else{
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
        } else {
          try {
            const fd = new FormData();
            if (role == 3) {
              fd.append("email", signupemail);
              fd.append("name", name); // Add name to form data
              fd.append("mobile", mobile); // Add mobile to form data
              fd.append("stream", stream); // Add stream to form data
              fd.append("level", level); // Add level to form data
              fd.append("password", password); // Add password to form data
              fd.append("role", role);
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
            } else if (role == 1) {
              fd.append("college_name", clgname); // Add name to form data
              fd.append("name", adminname);
              fd.append("email", signupemail); // Add mobile to form data
              // fd.append("stream", clgLandline); // Add stream to form data
              fd.append("mobile", clgmobile); // Add level to form data
              fd.append("designation", designation);
              fd.append("linked_in_link", linkedIn); // Add password to form data
              fd.append("referrer", referrer);
              fetch(
                process.env.NEXT_PUBLIC_API_ENDPOINT + "/clg-admin/register",
                {
                  method: "POST",
                  body: fd,
                }
              ).then(async (response) => {
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
            } else {
              fd.append("college_name", clgname); // Add name to form data
              fd.append("name", counsellorname);
              fd.append("email", signupemail); // Add mobile to form data
              // fd.append("stream", clgLandline); // Add stream to form data
              fd.append("mobile", counsellormobile); // Add level to form data
              fd.append("country", counsellorcountry);
              fd.append("state", counsellorstate);
              fd.append("city", counsellorcity); // Add password to form data
              fd.append("experience", counsellorexp);
              fd.append("specialization", Counsellorspecilizationvalue);
              fd.append("gender", counsellorgender);
              fd.append("qualification", CounsellorQualificationvalue);
              fd.append("preferredlang", counsellorpreLang);
  
              fetch(
                process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/register",
                {
                  method: "POST",
                  body: fd,
                }
              ).then(async (response) => {
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
            }
          } catch (error) {
            // Handle network or fetch error
            console.error("Failed to fetch OTP:", error);
          }
        }
    }
 
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
            <h5>Welcome, Create your account!</h5>
            <p style={{ color: "gray" }}>
                  {(role == 3)&& "Sign up as student"}
                  {(role == 2)&& "Sign up as counsellor"}
                  {(role == 1)&& "Sign up as college"}

                </p>
      </div>

 
          <Form onSubmit={handleSignUp}>
      <div className={Styles["middle-section"]}>

          <>
                    {role == "3" ? (
                      <>
                        <Form.Group controlId="name">
                          <Form.Label>
                            Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>

                        <Form.Group controlId="email">
                          <Form.Label>
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={signupemail}
                            onChange={handleSignupEmailChange}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                          <Form.Label>
                            Mobile
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={handleMobileChange}
                            required
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group>

                        <Form.Group controlId="stream">
                          <Form.Label>
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
                          <Form.Label>
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
                          <Form.Label>
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
                            <Form.Label>
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
                      <>
                       <Form.Group controlId="clgname">
                          <Form.Label>
                            College Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your College Name"
                            value={clgname}
                            onChange={(e) => setClgName(e.target.value)}
                            onClick={() => setIsSearchModalOpen(true)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                      <Form.Group controlId="counsellorname">
                        <Form.Label>
                          Counsellor Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          value={counsellorname}
                          onChange={(e) => setCounsellorname(e.target.value)}
                          required
                          style={{ marginBottom: "15px" }}
                        />
                      </Form.Group>
                      <Form.Group controlId="counselloremail">
                      <Form.Label>
                      Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={signupemail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        style={{ marginBottom: "15px" }}
                      />
                    </Form.Group>
                    <Form.Group controlId="mobile">
                          <Form.Label>
                            Mobile
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter your mobile number"
                            value={counsellormobile}
                            onChange={(e) => setCounsellormobile(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group>
                    <Form.Group controlId="state">
                          <Form.Label>
                            Country
                          </Form.Label>
                          <Form.Control
                            as="select"
                            style={{ marginBottom: "15px" }}
                            value={counsellorcountry}
                            onChange={(e) => {
                              setCounsellorcountry(e.target.value), setCounsellorstate(""), setCounsellorcity("");
                            }}
                            required
                          >
                            <option disabled value="">
                              Select Country
                            </option>
                            {Object.keys(IndianStates).map((country, i) => {
                              return (
                                <option key={i} value={country}>
                                  {country}
                                </option>
                              );
                            })}

                          </Form.Control>
                        </Form.Group>
                         <Form.Group controlId="state">
                          <Form.Label>
                            State
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={counsellorstate}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setCounsellorstate(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select State
                            </option>
                            {counsellorcountry != "" && Object.keys(IndianStates[counsellorcountry]).map((c, i) => {
                              return (
                                <option key={i} value={c}>
                                  {c}
                                </option>
                              );
                            })}

                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="city">
                          <Form.Label>
                            City
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={counsellorcity}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setCounsellorcity(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select city
                            </option>
                            {counsellorstate != "" &&
                              IndianStates[counsellorcountry][counsellorstate].map((c, i) => {
                                return (
                                  <option key={i} value={c}>
                                    {c}
                                  </option>
                                );
                              })}

                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="gender">
                          <Form.Label>
                          Gender
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={counsellorgender}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setCounsellorgender(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select..
                            </option>
                            {genderType.map((c, i) => {
                                return (
                                  <option key={i} value={c.value}>
                                    {c.gendername}
                                  </option>
                                );
                              })}

                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="qualification">
                          <Form.Label>
                          Qualification
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={CounsellorQualificationvalue}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setCounsellorQualificationvalue(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select..
                            </option>
                            {CounsellorQualification.map((c, i) => {
                                return (
                                  <option key={i} value={c}>
                                    {c}
                                  </option>
                                );
                              })}

                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="spe">
                          <Form.Label>
                          Specilization
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={Counsellorspecilizationvalue}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setCounsellorspecilizationvalue(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select..
                            </option>
                            {CounsellorSpecilization.map((c, i) => {
                                return (
                                  <option key={i} value={c}>
                                    {c}
                                  </option>
                                );
                              })}

                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exp">
                          <Form.Label>
                          Preferred Language
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={counsellorpreLang}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setCounsellorpreLang(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select..
                            </option>
                            {CounsellorLanguage.map((c, i) => {
                                return (
                                  <option key={i} value={c}>
                                    {c}
                                  </option>
                                );
                              })}

                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exp">
                          <Form.Label>
                          Experince in Year
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={counsellorexp}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setCounsellorexp(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Experince in Year
                            </option>
                            {ExpinYear.map((c, i) => {
                                return (
                                  <option key={i} value={c}>
                                    {c}
                                  </option>
                                );
                              })}

                          </Form.Control>
                        </Form.Group>
                        {signupshowotp && (
                          <Form.Group controlId="otp">
                            <Form.Label>
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
                    ) : (
                      <>
                        <Form.Group controlId="clgname">
                          <Form.Label>
                            College Name <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) =>  (
          <TextField
            {...params}
            placeholder="Enter a College Name"
            size='small' margin="dense" 
            value={clgname}
            onChange={(e) => setClgName(e.target.value)}
            required
            style={{ marginBottom: "15px" }}
          />
        )}
      /> */}
                          <Form.Control
                            type="text"
                            placeholder="Enter your College Name"
                            value={clgname}
                            onChange={(e) => setClgName(e.target.value)}
                            onClick={() => setIsSearchModalOpen(true)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="adminname">
                          <Form.Label>
                            Admin Name <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your Admin Name"
                            value={adminname}
                            onChange={(e) => setAdminName(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="clgemail">
                          <Form.Label>
                            Email <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={signupemail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                          <Form.Label>
                            Mobile <span style={{color:'red'}}>*</span>
                          </Form.Label> 
                          <Form.Control
                            type="number"
                            placeholder="Enter your mobile number"
                            value={clgmobile}
                            onChange={handleClgMobileChange}
                            required
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group>
                        {/* <Form.Group controlId="Landline Number">
                          <Form.Label>
                            Landline Number
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter your Landline number"
                            value={clgLandline}
                            onChange={handleClgLandlineChange}
                            required
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group> */}
                        <Form.Group controlId="designation">
                          <Form.Label>
                            Designation <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          <Form.Control
                            as="select" // Use select element for dropdown
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                          >
                            <option value="">Select Designation</option>
                            <option value="Chairman">Chairman</option>
                            <option value="Director">Director</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Other">Other</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="referrer">
                          <Form.Label>
                            Referrer
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Referrer"
                            value={referrer}
                            onChange={(e) => setReferrer(e.target.value)}
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="LinkedIn">
                          <Form.Label>
                            LinkedIn Link
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your LinkedIn Link"
                            value={linkedIn}
                            onChange={(e) => setLinkedIn(e.target.value)}
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        {/* <Form.Group controlId="state">
                          <Form.Label>
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

                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="city">
                          <Form.Label>
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

                          </Form.Control>
                        </Form.Group> */}
                        {signupshowotp && (
                          <Form.Group controlId="otp">
                            <Form.Label>
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
      </div>

                  <Button
                    className="w-100 mt-3"
                    style={{ background: "#0151c1" }}
                    type="submit"
                    disabled={isloading}
                  >
                    {signupshowotp ? "Enter OTP" : "Signup"}
                  </Button>
          </Form>
       

      <hr />
      <div className={Styles["botton-section"]}>
        <p className="text-center">
        Already have an account? <span onClick={islogin}>Login</span>
        </p>
      </div>
      <Modal
        className={Classes["custom-search-modal"]}
        size="md"
        style={{ background: "rgba(0,0,0,0.6)" }}
        centered
        show={isSearchModalOpen}
        onHide={() => setIsSearchModalOpen(false)}
      >
        <Modal.Header closeButton>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search colleges"
            className="form-control"
          />
        </Modal.Header>
        <Modal.Body style={{ padding: "0" }}>
          <div className={Classes["results"]}>
            {searchTerm.trim().length > 2 ? (
              isApiHitComplete ? (
                results.length > 0 ? (
                  results.map((el) => {
                    return (
                      <div
                        className={Classes["college"]}
                        onClick={() => onClgselect(el)}
                      >
                        <span>{el.title}</span>
                      </div>
                    );
                  })
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "100%", height: "inherit" }}
                  >
                    <span>No record</span>
                  </div>
                )
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "100%", height: "inherit", padding: "1rem" }}
                >
                  <Spinner variant="outlined" />
                </div>
              )
            ) : (
              <div className={Classes["trending-searches"]}>
                <br />
                <br />
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>



  );
};

export default FormSignUp;
