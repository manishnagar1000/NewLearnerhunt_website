import React,{useState,useEffect} from 'react'
import Classes from '/styles/colleges.module.css'
// import Link from 'next/link'
import LoginForm from "../../components/Loginuc";
import { Container,Row,Col, Modal,Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'

export default function CollegeName({ collegedata }) {
  // console.log(collegedata)
  const collegeid = collegedata._id;
  const [userStatus, setUserStatus] = useState(false);
  const [userid,setUserid] = useState("");
  const [useremail,setUseremail] = useState("");
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


  useEffect(()=>{
    const newstatus = localStorage.getItem("status");
    // console.log(newstatus)
    if (newstatus) {
      setUserStatus(newstatus);
      setUseremail(localStorage.getItem("useremail"))
      setUserid(localStorage.getItem("userid"))
    }
  },[userStatus])

  const handlelogin = (e) => {
    setIsLoginFormOpen(true);
  };
  const handleopenform = (e) => {
    // console.log("formopen");
    setIsApplyformOpen(true);

  };
  const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  const listcoursesOffered = collegedata.courses_offered;
  // console.log(listcoursesOffered)

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile' && value.length > 10) {
      return; // Do not update the state if more than 10 digits
    }

    // If you want to allow only numeric input for mobile number
    if (name === 'mobile' && !/^\d*$/.test(value)) {
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
        'Authorization': `Bearer ${userid}`
      }
    }).then(async(response) => {
        var res =await response.json()
        // console.log(res.error)
        if(res.error){
          Swal.fire({
            title: 'error',
            text: `${res.error}`,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }else{
          setIsApplyformOpen(false);
          Swal.fire({
            title: 'Success',
            text: `${res.message}`,
            icon: 'success',
            confirmButtonText: 'Ok'
          })

        }
    });
  } catch (error) {
    console.error("Failed to fetch OTP:", error);
  }
  };

  const dummyBannerImg = collegedata.banner_img_path && collegedata.banner_img_path != "" ? collegedata.banner_img_path : '/assets/images/DummyBG.jpg'
  const dummyLogoImg = collegedata.logo_img_path && collegedata.logo_img_path != "" ? collegedata.logo_img_path : '/assets/images/DummyLOGO.jpg'
  return (
    <div className={Classes['colleges-slug']}>
      <div className={Classes['banner-img']} style={{ backgroundImage: `url(${dummyBannerImg})` }}></div>
      <div className="container">
        <div className={Classes['content-section']}>
          <div className={Classes['heading-section']}>
            <div className={Classes['left-div']}>
              <img src={dummyLogoImg} alt="" />
            </div>
            <div className={Classes['right-div']}>
              <h1>{collegedata.name}</h1>
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
                    {/* <tr>
                      <th scope="row">Application Mode</th>
                      <td>{collegedata.application_process}</td>
                    </tr> */}
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
               
                  {/* <button><img src="/assets/images/download.png" alt="" /> Brochure</button> */}
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
      {
        isLoginFormOpen&&
        <LoginForm
              isOpen={isLoginFormOpen}
              onClose={() => setIsLoginFormOpen(false)}
              role ="3"
            />
      }
      {
        isApplyformOpen&&
          <Modal
          centered
          size="lg"
          animation={false}
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          show={isApplyformOpen}
          onHide={()=> setIsApplyformOpen(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="justify-content-center align-items-center">
                <Col md={12}>
                  <div className="text-center mb-3">
                    <h3>{collegedata.name} </h3>
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
          {listcoursesOffered.includes(',')?listcoursesOffered.split(",").map((course,index) => (
          <option key={index} value={course.toLowerCase()}>
          {course}
        </option>
          ))
        :
        <option value={listcoursesOffered.toLowerCase()}>
          {listcoursesOffered}
        </option>
        }
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
      }
    </div>
    
  )
}


export async function getServerSideProps(context) {
  const { slug } = context.params;
  if (slug) {
    const encodedSlug = encodeURIComponent(slug)
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/college?slug=" + encodedSlug
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