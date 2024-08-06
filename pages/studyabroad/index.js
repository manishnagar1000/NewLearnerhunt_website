
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { StudyAbroadData } from '@/components/Comps/type';
import Styles from "@/styles/studyAbroad.module.css"
import Swal from 'sweetalert2';
import { KeyPressForAlphabets, KeyPressForNumeric } from "@/components/Comps/formValidation";
import Image from 'next/image';
import Link from 'next/link';
import Offerings from '@/components/Comps/Offerings';


const StudyAbroad = () => {

  const initialFormData = {
    name: '',
    email: '',
    mobile: '',
    country: '',
    enquiry: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formWarnings, setFormWarnings] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setFormWarnings(prevWarnings => ({
      ...prevWarnings,
      [name]: value ? '' : `Please fill the ${name}.`
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const warnings = {};
    for (const key in formData) {
      if (formData[key] === '') {
        warnings[key] = `Please fill the ${key}`;
      } else {
        warnings[key] = '';
      }
    }
    setFormWarnings(warnings);

    const hasEmptyField = Object.values(warnings).some(warning => warning !== '');
    if (hasEmptyField) {
      return;
    }

    const { name, email, mobile, country, enquiry } = formData;


    const Data = new FormData();
    Data.append('name', name);
    Data.append('email', email);
    Data.append('mobile', mobile);
    Data.append('country_preferred', country);
    Data.append('enquiry', enquiry);


    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/study-abroad-form", {
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
        setFormData(initialFormData);
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

  return (
    <>

      <div className={Styles.saMainDiv}>
        <Container className={Styles.saChildDiv}>
          <h2 className={Styles.saText}>Study Abroad</h2>
        </Container>
      </div>
      <Container className=' d-flex flex-row'>
        <Row className='mt-5'>
          <Col md={8}>
            <Row>
              {StudyAbroadData.map((item, index) => (
                <Col md={4} key={index} className="mb-4 text-center">
                  <div className={` ${Styles.countryCardBackground}  border rounded  shadow `}>
                    <Link style={{ textDecoration: "none" }} className='text-dark' href={item.slug}>
                      <Card.Img className='mt-2 p-2  ' style={{ borderRadius: '20px' }} src={item.image} />
                      <Card.Body className='d-flex justify-content-center'>
                        <Image className={` ${Styles.flag} rounded-circle bg-dark`} src={item.flag} width={40} height={40} />
                      </Card.Body>
                      <h5 style={{ textDecoration: "" }} className='text-center'>{item.country}</h5>

                      {/* <Link href={item.slug} className=' text-primary border-light' variant="outline-none ">Learn More</Link> */}
                      <p className=' text-primary border-light' >Learn More</p>
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={4} className='mb-2'>
            <Card>
              <Card.Body>
                <div className='text-center mb-3'>
                  <h4 className={Styles.formHeadingtext}>Quick Enquiry</h4>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control autoComplete='off' type="text" name="name" value={formData.name} onKeyDown={KeyPressForAlphabets} onChange={handleChange} />
                    <span className='text-danger'>{formWarnings.name}</span>
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control autoComplete='off' type="email" name="email" value={formData.email} onChange={handleChange} />
                    <span className='text-danger'>{formWarnings.email}</span>
                  </Form.Group>

                  <Form.Group controlId="formPhoneNumber" className="mb-3">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control minLength={10} maxLength={10} autoComplete='off' type="tel" name="mobile" value={formData.mobile} onKeyDown={KeyPressForNumeric} onChange={handleChange} />
                    <span className='text-danger'>{formWarnings.mobile}</span>
                  </Form.Group>


                  <Form.Group controlId="formCountry" className="mb-3">
                    <Form.Label>Country Preferred</Form.Label>
                    <Form.Control autoComplete='off' type="text" name="country" value={formData.country} onKeyDown={KeyPressForAlphabets} onChange={handleChange} />
                    <span className='text-danger'>{formWarnings.country}</span>
                  </Form.Group>

                  <Form.Group controlId="formEnquiry" className="mb-3">
                    <Form.Label>Enquiry</Form.Label>
                    <Form.Control autoComplete='off' type="text" name="enquiry" value={formData.enquiry} onChange={handleChange} />
                    <span className='text-danger'>{formWarnings.enquiry}</span>
                  </Form.Group>

                  <div className="text-center">
                    <Button variant="outline-dark" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <Testimonial /> */}
      <Offerings />
    </>

  );
}

export default StudyAbroad;

