import React from "react";
import { useState, useEffect } from "react";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Spinner, Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Typewriter } from "react-simple-typewriter";
import { FindInPage, Task, UploadFile, MonetizationOn, Description } from "@mui/icons-material";
import {FAQData} from "@/components/Comps/type";
import Accordion from "react-bootstrap/Accordion";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Swal from 'sweetalert2';
import Carousel from "react-multi-carousel";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import {partners} from "@/components/Comps/type";
import {Reasondata} from "@/components/Comps/type";
import { Card } from "react-bootstrap";
import {indiaData} from "../../components/Comps/type";
import {ukData} from "@/components/Comps/type";
import {countryData} from "@/components/Comps/type";
import Styles from "@/styles/Loanpage.module.css";
import { KeyPressForAlphabets, KeyPressForNumeric } from "@/components/Comps/formValidation";

const Loanpage = () => {

    


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentData, setCurrentData] = useState(indiaData);
  const [selectedButton, setSelectedButton] = useState("INDIA");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [amountValue, setAmountValue] = useState(0);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mobile', phone);
    formData.append('email', email);
    formData.append('country', selectedCountry);
    formData.append('state', selectedState);
    formData.append('city', selectedCity);
    formData.append('amount', amountValue);

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/loanrequest", {
      method: 'POST',
      body: formData
    })
      .then(async (response) => {
        let resp = await response.json();
        if (resp.message) {

          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: resp.message,
            confirmButtonColor: '#4CAF50'
          });
          setName("")
          setPhone("")
          setEmail("")
          setSelectedCountry("")
          setSelectedState("")
          setSelectedCity("")
          setAmountValue("")
        } else if (resp.error) {

          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: resp.error,
            confirmButtonColor: '#F44336'
          });
        }
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error);

      });
  }
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setSelectedCity('');
    setAmountValue(0)
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleAmountValueChange = (e) => {
    setAmountValue(e.target.value);
  };

  const handleIndiaClick = () => {
    setCurrentData(indiaData);
    setSelectedButton("INDIA");
  };

  const handleUKClick = () => {
    setCurrentData(ukData);
    setSelectedButton("UK");
  };

  Reasondata.map((e, i) => {
    e.ico =
      i == 0 ? (
        <CheckIcon />
      ) : i === 1 ? (
        <PersonAddAltIcon />
      ) : i == 2 ? (
        <QueryBuilderIcon />
      ) : (
        <LockIcon />
      );
  });

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
      <Container fluid className={Styles.cont}>
        <Row className={Styles.contI}>
          <div className={Styles.box1}>


            <h1 className={Styles.headingf}>
              <div className={Styles.mainHeading}>
                <Typewriter
                  words={['Instant Approval For Education Loan']}
                  loop={false}
                  typeSpeed={50}
                  deleteSpeed={40}
                  delaySpeed={2000}
                  onLoopDone={() => setIsTyping(false)}
                  stopBlinkinCursor={!isTyping}
                />
              </div>
            </h1>
            <p className={Styles.mainHeadingParagraph1}>
              Unlock Your Future with Our Hassle-Free Education Loans
            </p>

            <h2 className={Styles.mainHeadingParagraph2}>Fuel your aspirations with our empowering education loans. Break barriers, pursue passions, and embark on a journey to unlock your boundless potential with us 🤝 </h2>
            <a href='/contact-us'>
            <Button
              className={Styles.chooseUsButton}
              variant="contained"
              color="primary"
            >
              WHY CHOOSE US ?
            </Button>
            </a>
          </div>
          <div className={Styles.container}>
            <h2 className={Styles.form_heading}>REQUEST QUOTE NOW</h2>
            <h6 className={Styles.heading7}>
              Easy to apply for a loan with us, Once you have completed this form.
            </h6>

            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formName" className={Styles.input} >
                <Form.Control type="text" autoComplete="off" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)
                } onKeyDown={KeyPressForAlphabets} required maxLength="30" />
              </Form.Group>
              <Form.Group controlId="formEmail" className={Styles.input}>
                <Form.Control type="email" autoComplete="off" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formPhone" className={Styles.input}>
                <Form.Control
                  type="text" autoComplete="off"
                  placeholder="Phone"
                  value={phone}
                  onKeyDown={KeyPressForNumeric}
                  onChange={(e) => setPhone(e.target.value)}
                  isInvalid={!!error}
                  maxLength="10"
                  minLength="10"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
              <div>
                <Form.Group controlId="countrySelect" className={Styles.input}>
                  <Form.Select value={selectedCountry} onChange={handleCountryChange} required>
                    <option value="" className={Styles.inputCountry}>Select Country</option>
                    {countryData && countryData.countries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              {selectedCountry && (
                <div>
                  <Form.Group controlId="stateSelect" className={Styles.input}>
                    <Form.Select value={selectedState} onChange={handleStateChange} required>
                      <option value="">Select State</option>
                      {countryData.countries
                        .find((country) => country.name === selectedCountry)
                        .states.map((state) => (
                          <option key={state.name} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}

              {selectedState && (
                <div>
                  <Form.Group controlId="citySelect" className={Styles.input}>
                    <Form.Select value={selectedCity} onChange={handleCityChange} required>
                      <option value="">Select City</option>
                      {countryData.countries
                        .find((country) => country.name === selectedCountry)
                        .states.find((state) => state.name === selectedState)
                        .cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}
              {selectedCountry && (
                <div>
                  <div
                    className={Styles.amount}
                  >
                    <h6 className={Styles.head6}>
                      Amount
                    </h6>

                    <div className={Styles.range}>

                      <Form.Range
                        min="0"
                        max="1000000"
                        value={amountValue}
                        onChange={handleAmountValueChange}

                      />
                    </div>
                    <span className={Styles.amountSpan}>
                      {selectedCountry === 'India' ? (
                        <>₹{amountValue}</>
                      ) : selectedCountry === 'UK' ? (
                        <>${amountValue}</>
                      ) : (
                        ''
                      )}
                    </span>
                  </div>
                </div>
              )}

              {
                loading ? (
                  <Button disabled className={Styles.submitButton}>
                    Please wait .....
                    <Spinner animation="border" variant="light" size="sm" />
                  </Button>
                ) : (
                  <Button type="submit" className={Styles.submitButton}>
                    SEND REQUEST
                  </Button>
                )
              }
            </Form>
          </div>
        </Row>
      </Container>
      <div>
      <div className={`${Styles.container2} `}>

        <div className={`container`}>
          <div className={`${Styles.processContainer} row`}>
            <div className={Styles.heading}>
              <h2 className={Styles.heading2}>Reason to Choose Us</h2>
              <p className={`text-center`}>
                Bad credit is worse than a bad swing but at Cardomain.com your
                credit is good with us. Easy to apply for a loan with us, Once
                you have complete this form.{" "}
              </p>
            </div>
          </div>

          
            <div className='row'>
              {Reasondata.map((box, index) => (
                <div key={index} className='col-md-3'>
                    <div className="d-flex flex-column align-items-center">
                  <div className={`${Styles.icon22} my-2`}>
                    <div iconName={box.icon} />
                    {box.ico}
                  </div>
                  <h3 className={Styles.heading6}>{box.title}</h3>
                  <p className={`text-center my-2`}>{box.description}</p>
                </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <Container>
          <Row>
            <div className={Styles.processContainerp}>
              <div className={Styles.heading}>
                <h2 className={Styles.heading2}>
                  Education Loans - Bad Credit, Good Credit, or No Credit!
                </h2>
                <p className={Styles.headingp}>
                  Getting a Home loan with bad credit has never been easier! At
                  EasyLoan, we want to help you get into the Home you deserve.
                </p>
              </div>
            </div>
          </Row>
          <Row className={`justify-content-center ${Styles.iconnn}`}>
            <Col
              xs={10}
              sm={6}
              md={4}
              lg={2}
              className={`text-center ${Styles.col}`}
            >
              <div
                className={`d-flex flex-column align-items-center ${Styles.step}`}
              >
                <div className={Styles.iconWrapperr}>
                  <PeopleAltIcon fontSize="large" className={Styles.iconn} />
                  <p className={Styles.iconText}>Satisfied Clients</p>
                </div>
              </div>
            </Col>
            <Col
              xs={10}
              sm={6}
              md={4}
              lg={2}
              className={`text-center ${Styles.col}`}
            >
              <div
                className={`d-flex flex-column align-items-center ${Styles.step}`}
              >
                <div className={Styles.iconWrapperr}>
                  <MonetizationOnIcon
                    fontSize="large"
                    className={Styles.iconn}
                  />
                  <p className={Styles.iconText}>Education Loan</p>
                </div>
              </div>
            </Col>
            <Col
              xs={10}
              sm={6}
              md={4}
              lg={2}
              className={`text-center ${Styles.col}`}
            >
              <div
                className={`d-flex flex-column align-items-center ${Styles.step}`}
              >
                <div className={Styles.iconWrapperr}>
                  <ManageAccountsIcon
                    fontSize="large"
                    className={Styles.iconn}
                  />
                  <p className={Styles.iconText}>Repeat Client</p>
                </div>
              </div>
            </Col>
            <Col
              xs={10}
              sm={6}
              md={4}
              lg={2}
              className={`text-center ${Styles.col}`}
            >
              <div
                className={`d-flex flex-column align-items-center ${Styles.step}`}
              >
                <div className={Styles.iconWrapperr}>
                  <AssignmentIndIcon
                    fontSize="large"
                    className={Styles.iconn}
                  />
                  <p className={Styles.iconText}>Safe & Secure</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={Styles.outerDiv}>
        <Container>
          <Row>
            <Col xs={12}>
              <div className={Styles.topText}>Partners with us</div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={3}>
              <div className={Styles.innerDiv}>
                <SchoolIcon className={Styles.icon1} />
                <div className={Styles.iconText}>Students</div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className={Styles.innerDiv}>
                <GroupIcon className={Styles.icon2} />
                <div className={Styles.iconText}>Educational Counselors</div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className={Styles.innerDiv}>
                <AccountBalanceIcon className={Styles.icon3} />
                <div className={Styles.iconText}>Educational Institutes</div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className={Styles.innerDiv}>
                <AttachMoneyIcon className={Styles.icon4} />
                <div className={Styles.iconText}>Financial Institutes</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div className="container">
      {/* <div className="container">
     
  <div className="row">
 
    <div className="col-md-12 text-center mb-4">
      <h2 className={Styles.heading}>Partners with us</h2>
    </div>
  </div>
  <div className="row justify-content-center">
    <div className="col-sm-6 col-md-3 mb-4">
      <div className={Styles.innerDiv}>
        <SchoolIcon className={Styles.icon1} />
        <div className={Styles.iconText}>Students</div>
      </div>
    </div>
    <div className="col-sm-6 col-md-3 mb-4">
      <div className={Styles.innerDiv}>
        <GroupIcon className={Styles.icon2} />
        <div className={Styles.iconText}>Educational Counselors</div>
      </div>
    </div>
    <div className="col-sm-6 col-md-3 mb-4">
      <div className={Styles.innerDiv}>
        <AccountBalanceIcon className={Styles.icon3} />
        <div className={Styles.iconText}>Educational Institutes</div>
      </div>
    </div>
    <div className="col-sm-6 col-md-3 mb-4">
      <div className={Styles.innerDiv}>
        <AttachMoneyIcon className={Styles.icon4} />
        <div className={Styles.iconText}>Financial Institutes</div>
      </div>
    </div>
  </div>
</div> */}
      <div>
        <Container className={Styles.main}>
          <Row className="text-center">
            <Col>
              <h2 className={Styles.heading}>Our Partners </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                transitionDuration={500}
                containerClass={Styles.carousel_container}
                itemClass="carousel-item-padding-40-px"
                keyBoardControl={true}
                removeArrowOnDeviceType={["desktop"]}
              >
                {partners&&partners.map((partner, index) => (
                  <div key={index} className={Styles.imgg}>
                    {partner.map((item, idx) => (
                        // console.log(item)
                        <img
                          src={item.image}
                          alt='eduloan'
                          width={100}
                          height={50}
                        />
                    ))}
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={Styles.processContainer}>
        <div className={Styles.heading}>
          <h2 className={Styles.heading2}>
            Catch Your Dream to Study Abroad with Overseas Education Loan
          </h2>
          <p className={Styles.heading2}>Our Easy Application Process</p>
        </div>

        <div>
          <Container>
            <Row className="justify-content-center">
              <Col
                xs={10}
                sm={6}
                md={4}
                lg={2}
                className={`text-center ${Styles.col}`}
              >
                <div
                  className={`d-flex flex-column align-items-center ${Styles.step}`}
                >
                  <div className={Styles.iconWrapper}>
                    <Task fontSize="large" className={Styles.icon} />
                  </div>
                  <p className={Styles.iconText}>
                    Application <br />
                    Process
                  </p>
                </div>
              </Col>
              <Col
                xs={10}
                sm={6}
                md={4}
                lg={2}
                className={`text-center ${Styles.col}`}
              >
                <div
                  className={`d-flex flex-column align-items-center ${Styles.step}`}
                >
                  <div className={Styles.iconWrapper}>
                    <FindInPage fontSize="large" className={Styles.icon} />
                  </div>
                  <p className={Styles.iconText}>
                    Application <br />
                    Review
                  </p>
                </div>
              </Col>
              <Col
                xs={10}
                sm={6}
                md={4}
                lg={2}
                className={`text-center ${Styles.col}`}
              >
                <div
                  className={`d-flex flex-column align-items-center ${Styles.step}`}
                >
                  <div className={Styles.iconWrapper}>
                    <Description fontSize="large" className={Styles.icon} />
                  </div>
                  <p className={Styles.iconText}>
                    Provisional
                    <br />
                    Offers
                  </p>
                </div>
              </Col>
              <Col
                xs={10}
                sm={6}
                md={4}
                lg={2}
                className={`text-center ${Styles.col}`}
              >
                <div
                  className={`d-flex flex-column align-items-center ${Styles.step}`}
                >
                  <div className={Styles.iconWrapper}>
                    <UploadFile fontSize="large" className={Styles.icon} />
                  </div>
                  <p className={Styles.iconText}>Providing your documents</p>
                </div>
              </Col>
              <Col
                xs={10}
                sm={6}
                md={4}
                lg={2}
                className={`text-center ${Styles.col}`}
              >
                <div
                  className={`d-flex flex-column align-items-center ${Styles.step}`}
                >
                  <div className={Styles.iconWrapper}>
                    <MonetizationOn fontSize="large" className={Styles.icon} />
                  </div>
                  <p className={Styles.iconText}>Disbursement</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="container">
        <div className={Styles.loanCard2}>
          <h1 className={Styles.loanCard2}>
            Offers & privileges for students applying for an Education Loan
          </h1>
          <div className={Styles.mainButton}>
            <Button
              className={`${Styles.button} ${selectedButton === "INDIA" ? Styles.selected : ""
                }`}
              onClick={handleIndiaClick}
            >
              INDIA
            </Button>
            <Button
              className={`${Styles.button} ${selectedButton === "UK" ? Styles.selected : ""
                }`}
              onClick={handleUKClick}
            >
              UK
            </Button>
          </div>
        </div>

        <div className="row">
          {currentData && currentData.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 ">
              <Card key={index} className={Styles.cardContainer}>
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
                <div className={Styles.container2}>
                  <h2 className={Styles.cardName}>{item.heading}</h2>
                  <div className={Styles.cardSpecility}>{item.description}</div>
                  <div className={Styles.b}>
                    <Button className={Styles.cardButton} variant="primary">
                      {item.buttonText}
                    </Button>

                    {item.Link && (
                      <div className={Styles.linkDiv}>
                        <a className={Styles.link}>{item.linkText}</a>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className={Styles.headingMore}>More About Eduloans</div>
      <div className="container my-2">
        <Accordion>
          {FAQData && FAQData.map((item, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>
                <div className={Styles.questionContainer}>{`${index + 1}. ${item.question
                  }`}</div>
              </Accordion.Header>
              <Accordion.Body>
                <div>{item.answer}</div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

    </>
  );
};

export default Loanpage

