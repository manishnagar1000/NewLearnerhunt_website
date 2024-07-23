import React, { useState } from "react";
import { Container, Row, Col, Nav, Tab, ListGroup, Button } from 'react-bootstrap';
import Styles from "@/styles/studyAbroad.module.css";
import Image from "next/image";
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import {
  StudyAbroadInnerPageData,
  universities,
} from "@/components/Comps/type";
import { useRouter } from "next/router";
import Spinner from "react-bootstrap/Spinner";
import Faq from "@/components/Comps/Faq";
import TalktoExpert from '@/components/TalktoExpert';
import Carousel from "react-multi-carousel";
import TalktoExpertModal from "@/components/Comps/TalktoExpertModal";
import Swal from 'sweetalert2';

function StudyAbroadInnerPage() {


  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });


  const handleButtonClick = (e) => {
    e.preventDefault()
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData("")
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form Data:', formData);

    const Data = new FormData();
    Data.append('name', formData.name);
    Data.append('email', formData.email);
    Data.append('mobile', formData.mobile);


    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/study-abroad-enquire-form", {
      method: 'POST',
      body: Data
    }).then(async (response) => {
      let resp = await response.json();
      if (resp.message) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: resp.message,
        });
        handleCloseModal();
        setFormData("")
      } else if (resp.error) {

        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: resp.error,
        })
      }
    }).catch(error => {
      console.error('Error:', error);

    });

  };

  const router = useRouter();
  const { slug } = router.query;

  const countryData = StudyAbroadInnerPageData.countries.find(
    (country) => country.slug.toLowerCase() === slug?.toLowerCase()
  );
  console.log(countryData);
  const faqs = countryData?.details.FAQs;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 992, min: 576 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {countryData ? (
        <>
          <div className={Styles.saMainDiv}>
            <Container className={Styles.saChildDiv}>
              <h2 className={Styles.saText}>
                Study in {countryData.countryName}
              </h2>
            </Container>
          </div>
          {/* <div style={{ background: `url(${countryData.bannerImage})` }}>
                        <Container className={Styles.saChildDiv} style={{ minHeight: '30vh', backgroundSize: "cover", backgroundPosition: "center" }}>
                            <h2 className={Styles.saText}>Study in {countryData.countryName}</h2>
                        </Container>
                    </div> */}

          <div className={Styles["StickyEnquireNow"]}>
            <Button onClick={handleButtonClick} variant="outline-light ">Enquire Now</Button>
            <TalktoExpertModal handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              formData={formData}
              show={showModal} handleClose={handleCloseModal} />
          </div>

          <Container>

            <Row className="mt-5">
              <Col lg={6} md={12}>
                <Row>
                  <div>
                    <img
                      src={countryData.countryImage}
                      className={Styles.slugHeroImage}
                      alt="countryImage"
                    />
                  </div>
                </Row>
              </Col>
              <Col lg={6} md={12} className="mb-2">
                <h4 className={Styles.Overview}>OVERVIEW</h4>
                <p>{countryData.details.overview}</p>
                <div className="mb-4 mt-4">
                  <strong>
                    <h5>QUICK FACTS</h5>
                  </strong>
                  {countryData.details.highlights.map((item, index) => {
                    return (
                      <div className="d-flex">
                        <div>
                          <Image
                            className="mx-2 "
                            width={20}
                            height={20}
                            src="/assets/images/StudyAbroad/StudyAbroadInner/check-mark.webp"
                          />
                        </div>
                        <div>
                          <p key={index}>{item}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </Container>

          <div className={`${Styles.slugWhyStudy} mt-5`}>
            <Container xs={6}>
              <div className="text-center text-light p-4">
                {" "}
                <h1>Why Study in {countryData.countryName}?</h1>
              </div>
              <Row>
                {countryData.details.why_study.map((item, index) => (
                  <Col key={index} className={Styles.choose} md={3} xs={6}>
                    <div
                      className={Styles.circle}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={55}
                        height={55}
                      />
                    </div>
                    <p className="text-center">{item.text}</p>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
          {/* faq */}

          <Container className='mt-5 pt-5 pb-3 '>
            <div className='pb-2'>
              <h2 style={{ fontWeight: "lighter" }}>Do You Have <strong className='text-primary'>Questions ?</strong></h2>
            </div>
            <Faq faqs={faqs} />
          </Container>
          {/* overview details */}
          <Container style={{height:"45vh"}}  className='mt-5  '>
            <Tab.Container  defaultActiveKey="whyStudy">
              <Row>
                <Col className='my-4' sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="whyStudy">Why study in {countryData.countryName}?</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="educationSystem">Education system of {countryData.countryName}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="topuniversities">Top universities in {countryData.countryName}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="getaddmission">How to get admission?</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="qualifications">Qualifications offered</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="costofeducation">Cost of education</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="testRequirement">Test requirements</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="intake">Intake</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col className='my-4' sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="whyStudy">
                      <h2 className={Styles.Heading}>Why study in {countryData.countryName}?</h2>
                      <ListGroup>
                        {countryData.details.why.map((item, index) => (
                          <ListGroup.Item className='border-0' key={index}>
                            <WhereToVoteIcon color="warning" /> {item}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="educationSystem">
                      <h2 className={Styles.Heading}>Education system of {countryData.countryName}</h2>
                      {
                        countryData.details.education_subHeading ? countryData.details.education_subHeading : ""
                      }
                      <ListGroup>

                        {countryData.details.education.map((item, index) => (
                          <ListGroup.Item className='border-0' key={index}>
                            <WhereToVoteIcon color="warning" /> {item}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="qualifications">
                      <h2 className={Styles.Heading}>Qualifications offered</h2>
                      <ListGroup>
                        {countryData.details.qualifications_offered.map((item, index) => (
                          <ListGroup.Item className='border-0' key={index}>
                            <WhereToVoteIcon color="warning" /> {item}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="testRequirement">
                      <h2 className={Styles.Heading}>Test requirements</h2>
                      <ListGroup>
                        {countryData.details.test_requirements.map((item, index) => (
                          <ListGroup.Item className='border-0' key={index}>
                            <WhereToVoteIcon color="warning" /> {item}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="topuniversities">
                      <h2 className={Styles.Heading}>Top universities in {countryData.countryName}</h2>
                      <ListGroup>
                        {countryData.details.top_universities.map((item, index) => (
                          <ListGroup.Item className='border-0' key={index}>
                            <WhereToVoteIcon color="warning" /> {item}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="getaddmission">
                      <h2 className={Styles.Heading}>How to get admission?</h2>
                      <ListGroup>
                        {countryData.details.how_to_get_addmission.map((item, index) => (
                          <ListGroup.Item className='border-0' key={index}>
                            <WhereToVoteIcon color="warning" /> {item}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="costofeducation">
                      <h2 className={Styles.Heading}>Cost of education</h2>
                      <ListGroup>
                        {countryData.details.cost_of_education.map((item, index) => (
                          <ListGroup.Item className='border-0' key={index}>
                            <WhereToVoteIcon color="warning" /> {item}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="intake">
                      <h2 className={Styles.Heading}>Intake</h2>
                      <ListGroup>
                        {countryData.details.intake.map((item, index) => (
                          <ListGroup.Item className='border-0' key={index}>
                            <WhereToVoteIcon color="warning" /> {item}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Tab.Pane>

                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
          {/* <Container className={`${Styles.main}  `}>
                        <Row className="text-center">
                            <Col>
                                <h2 className={Styles.slugUniversityHeading}>Top Universities</h2>
                          
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <Carousel
                                    responsive={responsive}
                                    infinite={true}
                                    autoPlay={true}
                                    autoPlaySpeed={2000}
                                    transitionDuration={500}
                                    itemClass="carousel-item-padding-40-px"
                                    keyBoardControl={true}
                                    removeArrowOnDeviceType={["desktop"]}
                                >
                                    {universities && universities.map((item, index) => (
                                        <div key={index} className={Styles.imgg}>
                                            {item.map((item, idx) => (
                                                <img
                                                    key={idx}
                                                    src={item.image}
                                                    alt='eduloan'
                                                    width={130}
                                                    height={100}
                                                />

                                            ))}
                                        </div>
                                    ))}
                                </Carousel>
                            </Col>
                        </Row>
                    </Container> */}

          {/* <Container className='mt-3 pb-3 '>
                        <p className='text-primary'  >What we Offer</p>
                        <div className='pb-2'>
                            <h2 style={{ fontWeight: "lighter" }}>Do You Have <strong className='text-primary'>Questions ?</strong></h2>
                        </div>
                        <Faq faqs={faqs} />
                    </Container> */}

          <TalktoExpert
            Background={{ backgroundColor: "#1c4fa3" }}
            heading={`Study in ${countryData.countryName} Now`} paragraphText={"What if you can’t come to our office we can come to you virtually for your study abroad plans ! Get expert counselling services from home or any where ."}
            buttonText="Enquire Now" />
        </>
      ) : (
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
}

export default StudyAbroadInnerPage;
