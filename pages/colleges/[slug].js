import React, { useState, useEffect } from "react";
import Classes from "/styles/colleges.module.css";
// import Link from 'next/link'
import LoginForm from "../../components/Loginuc";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
export default function CollegeName({ collegedata }) {
  // console.log(collegedata)
  const collegeid = collegedata._id;
  const [userStatus, setUserStatus] = useState(false);
  const [userid, setUserid] = useState("");
  const [useremail, setUseremail] = useState("");
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isApplyformOpen, setIsApplyformOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    gender: "",
    state: "",
    course: "",
  });

  useEffect(() => {
    const newstatus = localStorage.getItem("userid");
    // console.log(newstatus);
    if (newstatus) {
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/check-status", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userid")}`,
        },
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res)
        if (res.status) {
          setUserStatus(newstatus);
        } else {
          localStorage.removeItem("userid");
          localStorage.removeItem("status");
          localStorage.removeItem("useremail");
        }
      });
    } else {
      localStorage.removeItem("userid");
      localStorage.removeItem("status");
      localStorage.removeItem("useremail");
    }
  }, [userStatus]);

  const handlelogin = (e) => {
    setIsLoginFormOpen(true);
  };
  const handleopenform = (e) => {
    // console.log("formopen");
    setIsApplyformOpen(true);
  };
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const listcoursesOffered = collegedata.courses_offered;
  // console.log(listcoursesOffered)

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && value.length > 10) {
      return; // Do not update the state if more than 10 digits
    }

    // If you want to allow only numeric input for mobile number
    if (name === "mobile" && !/^\d*$/.test(value)) {
      return; // Do not update the state if non-numeric characters are entered
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data in formData state and do something with it here
    // console.log(formData);
    try {
      const fd = new FormData();
      fd.append("fullname", formData.fullname);
      fd.append("email", useremail);
      fd.append("mobile", formData.mobile);
      fd.append("gender", formData.gender);
      fd.append("state", formData.state);
      fd.append("course", formData.course);
      fd.append("collegeid", collegeid);

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/apply-college", {
        method: "POST",
        body: fd,
        headers: {
          Authorization: `Bearer ${userid}`,
        },
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res.error)
        if (res.error) {
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else {
          setIsApplyformOpen(false);
          Swal.fire({
            title: "Success",
            text: `${res.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });
    } catch (error) {
      console.error("Failed to fetch OTP:", error);
    }
  };

  const dummyBannerImg =
    collegedata.banner_img_path && collegedata.banner_img_path != ""
      ? collegedata.banner_img_path
      : "/assets/images/DummyBG.jpg";
  const dummyLogoImg =
    collegedata.logo_img_path && collegedata.logo_img_path != ""
      ? collegedata.logo_img_path
      : "/assets/images/DummyLOGO.jpg";
  return (
    <div className={Classes["colleges-slug"]}>
      <div
        className={Classes["banner-img"]}
        style={{ backgroundImage: `url(${dummyBannerImg})` }}
      ></div>

      <Tabs
        defaultActiveKey="overview"
        id="uncontrolled-tab-example"
        className={Classes["tabs-bar"]}
      >
        {/* <Tab eventKey="general" title="General">
       <div className="container">
  
        <div className={Classes['content-section']}>
          <div className={Classes['heading-section']}>
            <div className={Classes['left-div']}>
              <img src={dummyLogoImg} alt="" />
            </div>
            <div className={Classes['right-div']}>
              <h1>SAGE University</h1>
              <p>
                <img src="/assets/images/location.png" alt="" />
                <span>{collegedata.short_address}</span>&nbsp;&nbsp;
                <img src="/assets/images/bookmark.png" alt="" />
                <span>{collegedata.approved_by}</span>
              </p>

            </div>
          </div>
          <div className={Classes['description-section']}>
            <p>{collegedata.clg_description}</p>
          </div>
          <div className={Classes['small-description']}>
            <h2>Highlights</h2>
            <div className="row">
              <div className="col-md-6">
                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <th scope="row">Minimum Fees</th>
                      <td style={{ wordBreak: 'break-all' }}>{collegedata.min_fees}</td>
                    </tr>
                    <tr>
                      <th scope="row">Maximum Fees</th>
                      <td style={{ wordBreak: 'break-all' }}>{collegedata.max_fees}</td>
                    </tr>
                    <tr>
                      <th scope="row">Number of Courses</th>
                      <td style={{ wordBreak: 'break-all' }}>{collegedata.courses_count}</td>
                    </tr>
                    <tr>
                      <th scope="row">Courses Offered</th>
                      <td style={{ wordBreak: 'break-all' }}>{collegedata.courses_offered}</td>
                    </tr>
                    <tr>
                      <th scope="row">Rating</th>
                      <td style={{ wordBreak: 'break-all' }}>{collegedata.ratings}</td>
                    </tr>
                  
                    <tr>
                      <th scope="row">Highest Package</th>
                      <td style={{ wordBreak: 'break-all' }}>{collegedata.placement}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className={Classes['form-buttons']}>
                  {userStatus?
                     <button onClick={handleopenform}>Apply Form</button>:
                        <button 
                        onClick={handlelogin}
                        >Apply Now</button>
                     }
               
                 
                </div>
              </div>
            </div>
          </div>
          {
            collegedata.top_rec_companies && collegedata.top_rec_companies != "" &&
            <div className={Classes['small-description']}>
              <h2>Top Companies</h2>
              <p>{collegedata.top_rec_companies}</p>
            </div>
          }
          {
            collegedata.cut_off && collegedata.cut_off != "" &&
            <div className={Classes['small-description']}>
              <h2>Cut off</h2>
              <p>{collegedata.cut_off}</p>
            </div>
          }
          {
            collegedata.eligibility && collegedata.eligibility != "" &&
            <div className={Classes['small-description']}>
              <h2>Eligibility Selection</h2>
              <p>{collegedata.eligibility}</p>
            </div>
          }
          {
            collegedata.scholarship && collegedata.scholarship != "" &&
            <div className={Classes['small-description']}>
              <h2>Scholarship</h2>
              <p>{collegedata.scholarship}</p>
            </div>
          }
          {
            collegedata.application_process && collegedata.application_process != "" &&
            <div className={Classes['small-description']}>
              <h2>Application process</h2>
              <p>{collegedata.application_process}</p>
            </div>
          }
          {
            collegedata.application_link && collegedata.application_link != "" &&
            <div className={Classes['small-description']}>
              <h2>Application Link</h2>
              <p><a href={collegedata.application_link}>{collegedata.application_link}</a></p>
            </div>
          }
        </div>
      </div>
      </Tab> */}
        <Tab eventKey="overview" title="Overview">
          <div className="container">
            <div className={Classes["content-section"]}>
              <div className={Classes["heading-section"]}>
                <div className={Classes["left-div"]}>
                  <img src={dummyLogoImg} alt="" />
                </div>
                <div className={Classes["right-div"]}>
                  <h1>SAGE University</h1>
                  <p>
                    <img src="/assets/images/location.png" alt="" />
                    <span>{collegedata.short_address}</span>&nbsp;&nbsp;
                    <img src="/assets/images/bookmark.png" alt="" />
                    <span>{collegedata.approved_by}</span>
                  </p>
                </div>
              </div>
              <div className={Classes["description-section"]}>
                <p>
                  Sanskriti University Admission: The PhD entrance test and
                  interview date is September 17, 2023. The Sanskriti University
                  result for PhD entrance test will be announced on September
                  18. Candidates interested in Sanskriti University MBA
                  admission can register for the CAT 2023 exam till September
                  20. The other entrance exams accepted by Sanskriti University
                  are CUET/ JEE Main/ NEET UG/ XAT and NMAT.{" "}
                </p>
              </div>
              
              <div className={Classes["description-section"]}>
                <h3>Sanskriti University Highlights for 2023</h3>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Particulars </th>
                      <th>Details </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Institute Name </td>
                      <td>Sanskriti University</td>
                    </tr>
                    <tr>
                      <td>Institute Type </td>
                      <td>Private</td>
                    </tr>
                    <tr>
                      <td>Establishment Year</td>
                      <td>2016</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className={Classes["description-section"]}>
                <h3>Sanskriti University Top Courses & Fees</h3>
                  <div class={Classes["collegeDetail_classNotToggled"]}>
                    <Table >
                      <tbody>
                        <tr>
                          <td class={Classes["collegeDetail_courseName"]}>
                            BSc
                            <span class={Classes["collegeDetail_courseCount"]}>
                              13 Courses
                            </span>
                          </td>
                          <td class={Classes["collegeDetail_courseFees"]}>
                            <span class={Classes["collegeDetail_customSpan"]}>
                              Annual Fee
                            </span>
                            <span class={Classes["collegeDetail_price"]}>
                              ₹ 45,000 - 1,50,000
                            </span>
                          </td>
                        
                        </tr>
                        <tr>
                          <td class={Classes["collegeDetail_courseName"]}>
                            BSc
                            <span class={Classes["collegeDetail_courseCount"]}>
                              13 Courses
                            </span>
                          </td>
                          <td class={Classes["collegeDetail_courseFees"]}>
                            <span class={Classes["collegeDetail_customSpan"]}>
                              Annual Fee
                            </span>
                            <span class={Classes["collegeDetail_price"]}>
                              ₹ 45,000 - 1,50,000
                            </span>
                          </td>
                        
                        </tr>
                        <tr>
                          <td class={Classes["collegeDetail_courseName"]}>
                            BSc
                            <span class={Classes["collegeDetail_courseCount"]}>
                              13 Courses
                            </span>
                          </td>
                          <td class={Classes["collegeDetail_courseFees"]}>
                            <span class={Classes["collegeDetail_customSpan"]}>
                              Annual Fee
                            </span>
                            <span class={Classes["collegeDetail_price"]}>
                              ₹ 45,000 - 1,50,000
                            </span>
                          </td>
                        
                        </tr>
                        <tr>
                          <td class={Classes["collegeDetail_courseName"]}>
                            BSc
                            <span class={Classes["collegeDetail_courseCount"]}>
                              13 Courses
                            </span>
                          </td>
                          <td class={Classes["collegeDetail_courseFees"]}>
                            <span class={Classes["collegeDetail_customSpan"]}>
                              Annual Fee
                            </span>
                            <span class={Classes["collegeDetail_price"]}>
                              ₹ 45,000 - 1,50,000
                            </span>
                          </td>
                        
                        </tr>
                      </tbody>
                    </Table>
                    
                  </div>
                  
              </div>
              <div className={Classes["description-section"]}>
                <h3>FAQs about Sanskriti University</h3>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      How was the Sanskriti University ranking in 2021?
                    </Accordion.Header>
                    <Accordion.Body>
                      Ranking for the year 2021 are as follows: - School Of
                      Engineering & Information Technology Ranked 13th In Top
                      Colleges Of North India by India Today MDRA Best Colleges
                      Survey, 2021 - Ranked 8th In Multidisciplinary Emerging
                      Universities (All India) By The Week - School Of
                      Engineering & Information Technology Ranked 6th In U.P. By
                      Outlook I Care Rankings 2021 - Ranked 9th In U.P Among Top
                      Private MBA Institutions By Outlook India’s Best B-Schools
                      2021
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      How many component universities are there at Sanskriti
                      University?
                    </Accordion.Header>
                    <Accordion.Body>
                      The University is made up of 18 member schools that span a
                      range of fields including management, business,
                      paramedicine, science, Indian medicine, agriculture, the
                      arts, engineering & IT, rehabilitation, etc.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="courses" title="Courses">
          <div className="container">
            <div className="container">
              <div className={Classes["content-section"]}>
                <div className={Classes["heading-section"]}>
                  <div className={Classes["left-div"]}>
                    <img src={dummyLogoImg} alt="" />
                  </div>
                  <div className={Classes["right-div"]}>
                    <h1>SAGE University Campus</h1>
                    <p>
                      <img src="/assets/images/location.png" alt="" />
                      <span>{collegedata.short_address}</span>&nbsp;&nbsp;
                      <img src="/assets/images/bookmark.png" alt="" />
                      <span>{collegedata.approved_by}</span>
                    </p>
                  </div>
                </div>
                <div className={Classes["description-section"]}>
                  <h3>SAGE University Indore Courses and Fees 2023</h3>
                  <p>
                    SAGE University Indore, as a higher education institute,
                    receives a large number of applications each year.
                    Applicants frequently inquire about the SAGE University
                    Indore fees structure for specific courses of their choice.
                    Here is a list of SAGE University Indore courses and fees to
                    give applicants an idea of the university's fee structure.
                  </p>
                  <h3>
                    Sage University Courses, Fees and Eligibility Criteria 2023
                  </h3>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Course </th>
                        <th>Fees </th>
                        <th> Eligibility Criteria</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>B.Tech </td>
                        <td>Rs 40,000 - Rs 1,50,000</td>
                        <td>60%</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div>
                  <div className={Classes["courses-div"]}>
                    23 Courses are offered by SAGE University
                  </div>
                  <div className={Classes["courseCardBox"]}>
                    <div className={Classes["cardHeading"]}>
                      <a href="/colleges/sage-university-indore/btech-course">
                        B.Tech
                      </a>
                    </div>

                    <div className={Classes["courseCardDetails"]}>
                      <div className={Classes["courseDetailLeft"]}>
                        <div>
                          <p>
                            Total Intake:{" "}
                            <span
                              className={Classes["collegeDetail_detailStrong"]}
                            >
                              1028
                            </span>
                          </p>
                          <p>
                            Study Mody:{" "}
                            <span
                              className={Classes["collegeDetail_detailStrong"]}
                            >
                              Regular
                            </span>
                          </p>
                        </div>
                        <div>
                          <p>
                            Exam Accepted:{" "}
                            <span
                              className={Classes["collegeDetail_detailStrong"]}
                            >
                              {" "}
                              N/A
                            </span>
                          </p>
                          <p>
                            Annual Fees:{" "}
                            <span
                              className={Classes["collegeDetail_detailStrong"]}
                            >
                              1,15,000 - 1,30,000
                            </span>
                          </p>
                        </div>
                        <div>
                          <p>
                            Duration:{" "}
                            <span
                              className={Classes["collegeDetail_detailStrong"]}
                            >
                              3 - 4 Years
                            </span>
                          </p>
                          <p>
                            Average Fees:{" "}
                            <span
                              className={Classes["collegeDetail_detailStrong"]}
                            >
                              1,25,000
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className={Classes["courseDetailRight"]}>
                        <Button variant="primary">Apply Now</Button>
                        <Button variant="outline-primary">
                          Request A Callback
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="campus" title="Campus">
          <div className="container">
            <div className={Classes["content-section"]}>
              <div className={Classes["heading-section"]}>
                <div className={Classes["left-div"]}>
                  <img src={dummyLogoImg} alt="" />
                </div>
                <div className={Classes["right-div"]}>
                  <h1>SAGE University Campus</h1>
                  <p>
                    <img src="/assets/images/location.png" alt="" />
                    <span>{collegedata.short_address}</span>&nbsp;&nbsp;
                    <img src="/assets/images/bookmark.png" alt="" />
                    <span>{collegedata.approved_by}</span>
                  </p>
                </div>
              </div>
              <div className={Classes["description-section"]}>
                <h3>SAGE University Indore Campus</h3>
                <p>
                  SAGE University Indore is one of the premium education
                  universities in India. The institute also provides a
                  well-developed infrastructure to encourage the students with
                  their innovation and creativity. The SAGE University Indore
                  classrooms are elegantly designed for the students to promote
                  effective learning. In the classroom, the faculty members of
                  SAGE University Indore use various cluster activities like
                  role plays, individual assignments, class PPT, analysis
                  articles, and case studies. The library of SAGE University has
                  a comprehensive collection of books, journals, periodicals,
                  student projects, and other research materials to support the
                  learning of students and staff members.
                </p>
                <h3>SAGE University Hostel & Fees Structure</h3>
                <span>On-Campus Hostel Accommodation </span>
                <p>
                  The SU on-campus accommodation is fully operational. You will
                  have access to SU’s campus facilities such as Lifestyle @,
                  laundrette, convenience store and a 24-hour security coverage
                  within the campus. Students staying in the on-campus
                  accommodation will have options to single rooms, twin-sharing
                  or shared apartment and have access to the common pantry at
                  Cafeteria/Mess .
                </p>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="admission" title="Admission">
          <div className="container">
            <div className={Classes["content-section"]}>
              <div className={Classes["heading-section"]}>
                <div className={Classes["left-div"]}>
                  <img src={dummyLogoImg} alt="" />
                </div>
                <div className={Classes["right-div"]}>
                  <h1>SAGE University Admission - 2023</h1>
                  <p>
                    <img src="/assets/images/location.png" alt="" />
                    <span>{collegedata.short_address}</span>&nbsp;&nbsp;
                    <img src="/assets/images/bookmark.png" alt="" />
                    <span>{collegedata.approved_by}</span>
                  </p>
                </div>
              </div>
              <div className={Classes["description-section"]}>
                <h3>SAGE University Indore Admission</h3>
                <p>
                  The SAGE University enterance exam will be held on July 15 and
                  July 16, 2023. SAGE Indore admissions are offered in a diverse
                  range of courses at UG, PG, diploma, and PhD levels. SAGE
                  University Indore courses are structured to provide project
                  and research-based learning. This unique approach fosters a
                  dynamic educational environment. With the vision to transform
                  students into component professionals, SAGE University Indore
                  has set up 14 institutes with about 294 faculty members and
                  also signed numerous global tie-ups to provide industrial
                  exposure. Below are the guidelines and information on the SAGE
                  University Indore admission process.
                </p>

                <h3>SAGE University Indore Courses and Eligibility Criteria</h3>

                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Course </th>
                      <th>Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Engineering - B.Tech/B.Tech(LET)</td>
                      <td>
                        Must have passed Class 12 with 45% aggregate with
                        PCM/PCB as subjects in Class 12 for general category
                        candidates. 40% aggregate with PCM/PCB as subjects in
                        Class 12 for SC/ST/OBC category candidates. Admissions
                        will be based on JEE/ SEE Score. %
                      </td>
                    </tr>
                    <tr>
                      <td> Engineering - B.Tech </td>
                      <td>
                        60% aggregate in Class 12 with PCM/PCB as subjects in
                        class 12. Admissions will be based on JEE/ SEE Score.
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="scholarship" title="Scholarship">
          <div className="container">
            <div className={Classes["content-section"]}>
              <div className={Classes["heading-section"]}>
                <div className={Classes["left-div"]}>
                  <img src={dummyLogoImg} alt="" />
                </div>
                <div className={Classes["right-div"]}>
                  <h1>SAGE University Scholarship - 2023</h1>
                  <p>
                    <img src="/assets/images/location.png" alt="" />
                    <span>{collegedata.short_address}</span>&nbsp;&nbsp;
                    <img src="/assets/images/bookmark.png" alt="" />
                    <span>{collegedata.approved_by}</span>
                  </p>
                </div>
              </div>
              <div className={Classes["description-section"]}>
                <h3>SAGE University Indore Scholarship</h3>
                <p>
                  Many scholarship schemes are offered at the SAGE University
                  Indore for benefitting the students. SAGE University Indore
                  scholarships cater particularly to students who belong to the
                  reserved categories. Students can apply for the scholarships
                  offered by SAGE University Indore if they qualify the
                  eligibility criteria for the same. It is an attempt of the
                  university to remove obstacles from the path of education so
                  that more and more students get the opportunity of receiving a
                  quality education. The SAGE University Indore scholarship
                  details are given below.
                </p>

                <h3>SAGE Academic Scholarship Scheme</h3>

                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>UG/Diploma Eligibility Criteria</th>
                      <th>Scholarship</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>a</td>
                      <td>95%</td>
                      <td>50% Scholarship on Tuition Fees</td>
                    </tr>
                    <tr>
                      <td> b</td>
                      <td>90% - 95%</td>
                      <td>30% Scholarship on Tuition Fees</td>
                    </tr>
                    <tr>
                      <td>c</td>
                      <td>80%- 90%</td>
                      <td>25% Scholarship on Tuition Fees</td>
                    </tr>
                  </tbody>
                </Table>

                <h3>SAGE University Indore Sports Scholarships</h3>

                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>Scholarship</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>International Level</td>
                      <td>
                        20% Scholarship on Tuition Fees for only the First Year
                      </td>
                    </tr>
                    <tr>
                      <td> National Level</td>
                      <td>
                        10% Scholarship on Tuition Fees for only the First Year
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <h3>SAGE Indore Merit Cum Means Scholarships</h3>

                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Annual Income </th>
                      <th>Scholarship</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>4 lakh</td>
                      <td>100% Scholarship on Tuition Fees</td>
                    </tr>
                    <tr>
                      <td>4 lakh - 6 lakh</td>
                      <td>75% Scholarship on Tuition Fees</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="placement" title="Placement">
          <div className="container">
            <div className={Classes["content-section"]}>
              <div className={Classes["heading-section"]}>
                <div className={Classes["left-div"]}>
                  <img src={dummyLogoImg} alt="" />
                </div>
                <div className={Classes["right-div"]}>
                  <h1>SAGE University Placement - 2023</h1>
                  <p>
                    <img src="/assets/images/location.png" alt="" />
                    <span>{collegedata.short_address}</span>&nbsp;&nbsp;
                    <img src="/assets/images/bookmark.png" alt="" />
                    <span>{collegedata.approved_by}</span>
                  </p>
                </div>
              </div>
              <div className={Classes["description-section"]}>
                <h3>Placements at KSRM Bhubaneswar</h3>
                <p>
                  KIIT School of Rural Management, Bhubaneswar offers excellent
                  placement opportunities to the students. The college has a
                  record of placing 100% students in top reputed companies. KSRM
                  Bhubaneswar organises conclaves, guest lectures, seminars,
                  industrial visits as a part of placement activities. The
                  college has partnered with more than 350 partner organizations
                  for providing internships and placement to the students. Every
                  year, many companies are invited to the college campus for
                  placements. Some of the major recruiters of KIIT School of
                  Rural Management, Bhubaneswar are HDFC Bank, DCB Bank,
                  Samunnati, JEEViKA, Care India and Agriwatch.
                </p>
              </div>
              <div className={Classes["description-section"]}>
                <h3>Placement 2019</h3>
                <p>
                  KIIT School of Rural Management, Bhubaneswar offers excellent
                  placement opportunities to the students. The college has a
                  record of placing 100% students in top reputed companies. KSRM
                  Bhubaneswar organises conclaves, guest lectures, seminars,
                  industrial visits as a part of placement activities. The
                  college has partnered with more than 350 partner organizations
                  for providing internships and placement to the students. Every
                  year, many companies are invited to the college campus for
                  placements. Some of the major recruiters of KIIT School of
                  Rural Management, Bhubaneswar are HDFC Bank, DCB Bank,
                  Samunnati, JEEViKA, Care India and Agriwatch.
                </p>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="cutoff" title="Cutoff">
          <div className="container">
            <div className={Classes["content-section"]}>
              <div className={Classes["heading-section"]}>
                <div className={Classes["left-div"]}>
                  <img src={dummyLogoImg} alt="" />
                </div>
                <div className={Classes["right-div"]}>
                  <h1>SAGE University Cutoff - 2022</h1>
                  <p>
                    <img src="/assets/images/location.png" alt="" />
                    <span>{collegedata.short_address}</span>&nbsp;&nbsp;
                    <img src="/assets/images/bookmark.png" alt="" />
                    <span>{collegedata.approved_by}</span>
                  </p>
                </div>
              </div>
              <div className={Classes["description-section"]}>
                <h3>SAGE University Indore Cut off 2023</h3>
                <p>{collegedata.clg_description}</p>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>

      {isLoginFormOpen && (
        <LoginForm
          isOpen={isLoginFormOpen}
          onClose={() => setIsLoginFormOpen(false)}
          role="3"
        />
      )}
      {isApplyformOpen && (
        <Modal
          centered
          size="lg"
          animation={false}
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          show={isApplyformOpen}
          onHide={() => setIsApplyformOpen(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="justify-content-center align-items-center">
                <Col md={12}>
                  <div className="text-center mb-3">
                    <h3>SAGE University </h3>
                    <p>(Student Application Form)</p>
                  </div>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="fullname">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={useremail}
                        disabled
                        // onChange={handleChange}
                        placeholder="Enter email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="mobile">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        maxLength={10}
                        minLength={10}
                        placeholder="Enter your mobile number"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        placeholder="Select gender"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Select state"
                      >
                        <option value="">Select state</option>
                        {indianStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="course">
                      <Form.Label>Course</Form.Label>
                      <Form.Control
                        as="select"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                      >
                        <option value="">Select course</option>
                        {listcoursesOffered.includes(",") ? (
                          listcoursesOffered.split(",").map((course, index) => (
                            <option key={index} value={course.toLowerCase()}>
                              {course}
                            </option>
                          ))
                        ) : (
                          <option value={listcoursesOffered.toLowerCase()}>
                            {listcoursesOffered}
                          </option>
                        )}
                      </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  if (slug) {
    const encodedSlug = encodeURIComponent(slug);
    const url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/college?slug=" + encodedSlug;
    // console.log(url)
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data)
    if (data.data && data.data.length > 0) {
      return {
        props: { collegedata: data.data[0] },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
}
