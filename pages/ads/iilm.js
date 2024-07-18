import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Styles from "/styles/iilm.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PhoneIcon from "@mui/icons-material/Phone";
import Swal from "sweetalert2";
import { illmleads } from "/components/Comps/type";
import Classes from "/styles/mbaleads.module.css";
import { useRouter } from "next/router";
import Head from "next/head";

const colleges = [
  {
    name: "blackrock",
    image: "/assets/images/blackrock-logo-300.webp",
  },
  {
    name: "Pwc",
    image: "/assets/images/1392379897pwc.webp",
  },
  {
    name: "Dabur",
    image: "/assets/images/dabur_fGJRx0U.webp",
  },
  {
    name: "Google",
    image: "/assets/images/google.webp",
  },
  {
    name: "Grant",
    image: "/assets/images/grant.webp",
  },
];
export default function iilm() {
    const router = useRouter();
    const { pathname } = router;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const [isWindowScroll, setIsWindowScroll] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      if (windowHeight > 150) {
        setIsWindowScroll(true);
      } else {
        setIsWindowScroll(false);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const inputRef = useRef(null);

  const focusInput = () => {
    // Focus on the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    const Data = new FormData();
    Data.append("name", formData.name);
    Data.append("email", formData.email);
    Data.append("mobile", formData.mobile);
    Data.append("course", formData.course);
    Data.append("slug",pathname);

    setLoading(true);
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
        "/student/iilm-college-admission",
      {
        method: "POST",
        body: Data,
      }
    )
      .then(async (response) => {
        let resp = await response.json();

        if (resp.message) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: resp.message,
          }).then(() => {
            setFormData({
              name: "",
              email: "",
              mobile: "",
              course:""
            });
          });
        } else if (resp.error) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: resp.error,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
        <Head>
        <title>IILM University, UG Admissions Open 2024 & Check Programmers</title>
        <meta
          name="description"
          content=" IILM Institute For Higher Education diverse UG Programs (B.Tech, BCA & BBA) Open Admissions for 2024. Find your perfect fit & apply today"
        />
      </Head>
      <div
        className={`${Styles["non-sticky"]} ${
          isWindowScroll ? Styles["sticky"] : ""
        }`}
      >
        <div className={Styles["header-absolute"]}>
          <Container>
            <Row>
              <Col
                lg={6}
                xs={6}
                className={`${Styles["logo"]} align-self-center`}
              >
                <img src="/assets/images/iilm.png" alt="illm-img" />
              </Col>
              <Col
                lg={6}
                xs={6}
                className={`${Styles["logo"]} align-self-center`}
              >
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                    in Association with
                  </p>
                  <img src="/assets/images/Logo.webp" alt="learnerhunt-img" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Container fluid className={Styles["admission-form"]}>
        <Row className="justify-content-evenly align-items-center vh-100">
          <Col md={8} lg={6} className="mb-4">
            <h1>IILM Institute For Higher Education</h1>
            <p>
            Boost Your Capabilities with a Broad-Based Educational Approach
            </p>
          </Col>
          <Col md={6} lg={4} className="p-4 bg-white rounded shadow">
            <h2 className="text-center mb-4">Admissions Open For 2024</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  ref={inputRef}
                  value={formData.name}
                  name="name"
                  autoComplete="off"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  value={formData.email}
                  name="email"
                  autoComplete="off"
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMobile" className="mb-3">
                <Form.Label>Mobile Number *</Form.Label>
                <Form.Control
                  value={formData.mobile}
                  name="mobile"
                  onChange={handleInputChange}
                  maxLength={10}
                  minLength={10}
                  autoComplete="off"
                  type="tel"
                  placeholder="Enter your mobile number"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCourse" className="mb-3">
          <Form.Label>Course *</Form.Label>
          <Form.Control
            as="select"
            value={formData.course}
            name="course"
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select your course</option>
            <option value="B. Tech">B. Tech</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
          </Form.Control>
        </Form.Group>
              <Button
                variant="warning"
                type="submit"
                className="w-100"
                disabled={loading ? true : false}
              >
                SUBMIT
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop: "4rem" }}>
        <Row className="justify-content-center text-center ">
          <Col md={10}>
            <div className={Styles["widget-title"]}>
              <h3>
                Why <span className="text-primary">IILM ?</span>
              </h3>
            </div>
            <Row className="mt-4">
              <Col md={3} className="mb-3">
                <Card className={Styles["custom-card"]}>
                  <Card.Body>
                    <Card.Title className={Styles["card-title"]}>
                      Approvals
                    </Card.Title>
                    <Card.Text>AICTE, NBA Approved, Govt. of India</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-3">
                <Card className={Styles["custom-card"]}>
                  <Card.Body>
                    <Card.Title className={Styles["card-title"]}>
                      Campus
                    </Card.Title>
                    <Card.Text>Well equipped Library</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-3">
                <Card className={Styles["custom-card"]}>
                  <Card.Body>
                    <Card.Title className={Styles["card-title"]}>
                      Faculties
                    </Card.Title>
                    <Card.Text>Qualified and Eminent Faculties</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-3">
                <Card className={Styles["custom-card"]}>
                  <Card.Body>
                    <Card.Title className={Styles["card-title"]}>
                      Collaboration
                    </Card.Title>
                    <Card.Text>MOUs with International Universities</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Button
              className={Styles["btn"]}
              variant="warning"
              size="lg"
              onClick={focusInput}
            >
              LEARN MORE
            </Button>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <div className={Styles["widget-title"]}>
              <h3 className="mb-4">
                Programmes <span className="text-primary">Offered</span>
              </h3>
            </div>
            <p>
            Advance your career by selecting a course that genuinely interests you.

            </p>
          </Col>
        </Row>
        {/* <Row className="justify-content-center">
          <Col md={2} className="mb-4">
            <Card className="shadow">
              <Card.Img
                variant="top"
                src="https://media.swipepages.com/2023/5/63901ece633a3c0017483a62/aianddata.webp"
              />
              <Card.Body>
                <Card.Title className="text-center">Management</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
          <div className='row'>
            <div>
            <h3 className='my-2'>BBA</h3>
            {illmleads['BBA'].map((c, i) => {
                          return (
                            <div className={Classes.pill}>
                              <a>{c}</a>
                          </div>
                          );
                        })}
<hr/>

</div>
<div>
            <h3 className='my-2'>B.Tech</h3>
            {illmleads['B.Tech'].map((c, i) => {
                          return (
                            <div className={Classes.pill}>
                              <a>{c}</a>
                          </div>
                          );
                        })}

</div>


          </div>
      </Container>

      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <div className={Styles["widget-title"]}>
              <h3 className="mb-4">
                Top <span className="text-primary">Recruiters</span>
              </h3>
            </div>

            <p>
            Our placement program is crafted to ensure your sustained career success.
            </p>
          </Col>
        </Row>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={false}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={300}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {colleges.map((college, index) => (
            <img
              style={{ objectFit: "contain" }}
              src={college.image}
              alt={college.name}
              width={100}
              height={100}
            />
          ))}
        </Carousel>

        <Row className="text-center mt-3">
          <Col>
            <Button
              className={Styles["btn"]}
              variant="warning"
              size="lg"
              onClick={focusInput}
            >
              Talk To Our Experts
            </Button>
          </Col>
        </Row>
      </Container>

      <section className={Styles["Students-section"]}>
        <div className="container">
          <div className={Styles["widget-title"]}>
            <h3 className="font-weight-900 ">
              About{" "}
              <span >
                IILM Institute for Higher Education
              </span>
            </h3>
          </div>
          <div className="row">
            <div className={Styles["about-content"]}>
              <p>
                The IILM Centre for Entrepreneurship Development & Innovation
                (ICEDI) fosters the exchange of innovative ideas that will shape
                the future of entrepreneurship. Its mission to create
                entrepreneurs is realized through a dynamic culture of
                participation in structured courses, webinars, seminars,
                discussions, and a variety of activities including entrepreneur
                talks, business simulation games, and mentoring sessions. IILM
                accelerates new ventures by providing emerging entrepreneurs
                with access to opportunities, a supportive community, and
                essential resources. The ICEDI ecosystem supports ventures from
                the initial ideation stage through gap analysis, validation,
                prototype development, and testing, culminating in
                commercialization. At ICEDI’s incubation center, participants
                learn the art of creating business plans, pitching ideas,
                building networks, and scaling up their ventures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer
        className={`${Styles["footer"]} text-center font-weight-300 text-white m-0`}
      >
        © 2024 Decred Digital Services Pvt. Ltd.
      </footer>

      <div className={Styles["sideNavi"]}>
        <a className="bg-danger" href="tel:8860077807">
          <PhoneIcon /> 8860077807
        </a>
      </div>
    </>
  );
}
