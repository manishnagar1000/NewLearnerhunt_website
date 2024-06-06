import React, { useState } from 'react';
import { Spinner, Container, Button, Card, Row, Col } from 'react-bootstrap';
import SchoolIcon from '@mui/icons-material/School';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import Styles from "@/styles/Loanpage.module.css";
import Form from 'react-bootstrap/Form';
import { countryData } from '../type';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { KeyPressForNumeric, KeyPressForAlphabets, validateEmail, validatePhoneNumber } from '../formValidation';


const EligibilityChecker = () => {
    const [step, setStep] = useState(1);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidMobile, setIsValidMobile] = useState(true);
    const [showPreferance, setShowPreferance] = useState(true);
    const [showLoanApply, setShowLoanApply] = useState(false)
    const [showCountrySelection, setShowCountrySelection] = useState(false);
    const [showCalenderSelection, setShowCalenderSelection] = useState(false);
    const [showAdmissionStatus, setShowAdmissionStatus] = useState(false);
    const [showAmount, setShowAmount] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [preferance, setPreferance] = useState("");
    const [country, setCountry] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [admissionStatus, setadmissionStatus] = useState("");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setmobile] = useState("")
    const [loading, setLoading] = useState(false);


    const handleCheckEligibilityClick = () => {
        setStep(1);
        setShowPreferance(true);
        setLoading(false)
        setIsValidEmail(true)

        setShowCountrySelection(false);
        setStartDate(new Date())
        setShowCalenderSelection(false);
        setShowAdmissionStatus(false);
        setShowAmount(false)
        setShowDetails(false)
        setShowLoanApply(false)
        setFadeIn(true);
        setTimeout(() => {
            setShowPreferance(true);
            setShowLoanApply(false);
            setFadeIn(false);
        }, 300);
        setPreferance("");
        setCountry("");
        setStartDate(new Date());
        setadmissionStatus("");
        setAmount("");
        setName("");
        setEmail("");
        setmobile("");
    };
    const handlePreferenceSelect = (e, item) => {
        setStep(2);
        setPreferance(item)
        setShowPreferance(false);
        setShowCountrySelection(true);
    };

    const handleCountrySelect = (e) => {
        setStep(3);
        setCountry(e.target.value)
        setShowCalenderSelection(true);
        setShowPreferance(false);
        setShowCountrySelection(false);
    };


    const handleDateChange = (date) => {
        const monthYear = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
        setStartDate(monthYear);
        setStep(4)
        setShowAdmissionStatus(true)
        setShowCalenderSelection(false)
    };
    const handleAddmissionStatus = (e, item) => {
        setStep(5);
        setadmissionStatus(item)
        setShowAmount(true)
        setShowCalenderSelection(false);
        setShowPreferance(false);
        setShowAdmissionStatus(false)
        setShowCountrySelection(false);
    };
    const handleAmount = (e, item) => {
        setStep(6)
        setAmount(item)
        setShowDetails(true)
        setShowCalenderSelection(false);
        setShowPreferance(false);
        setShowAdmissionStatus(false)
        setShowAmount(false)
        setShowCountrySelection(false);

    }
    const handleBackButtonClick = () => {
        setStep(step - 1);
        switch (step - 1) {
            case 1:
                setShowPreferance(true);
                setShowCountrySelection(false);
                break;
            case 2:
                setShowCountrySelection(true);
                setShowCalenderSelection(false);
                break;
            case 3:
                setShowCalenderSelection(true);
                setShowAdmissionStatus(false);
                break;
            case 4:
                setShowAdmissionStatus(true);
                setShowAmount(false);
                break;
            case 5:
                setShowAmount(true);
                setIsValidEmail(true)
                setIsValidMobile(true)
                setShowDetails(false);
                setName("")
                setEmail("")
                setmobile("")
                break;
            default:
                break;
        }
    };

    const handleLoanApplyClick = () => {
        setShowLoanApply(true)
        setShowPreferance(false)
        setShowCountrySelection(false)
        setShowCalenderSelection(false)
        setShowAdmissionStatus(false)
        setShowAmount(false)
        setShowDetails(false)

        setFadeIn(true);
        setTimeout(() => {
            setShowPreferance(false);
            setShowLoanApply(true);
            setFadeIn(false);
        }, 300);
    }

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        const isValidEmail = validateEmail(inputEmail);
        setIsValidEmail(isValidEmail);
    };

    const handleMobileChange = (e) => {
        const inputMobile = e.target.value;
        setmobile(inputMobile);
        if (inputMobile === "") {
            setIsValidMobile(true);
        } else {
            const isValidMobile = validatePhoneNumber(inputMobile);
            setIsValidMobile(isValidMobile);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (isFormFilled && isValidEmail && isValidMobile) {
            const formData = new FormData();
            formData.append('full_name', name);
            formData.append('loan_preference', preferance);
            formData.append('country', country);
            formData.append('email', email);
            formData.append('admission_status', admissionStatus);
            formData.append('mobile', mobile);
            formData.append('month_and_year', startDate);
            formData.append('amount', amount);

            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/loan_eligibility_checker", {
                method: 'POST',
                body: formData
            }).then(async (response) => {
                let resp = await response.json();
                if (resp.message) {

                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: resp.message,

                    });
                    setStep(1);
                    // setIsValid(true);
                    setShowPreferance(true);
                    setShowCountrySelection(false);
                    setShowCalenderSelection(false);
                    setShowAdmissionStatus(false);
                    setShowAmount(false);
                    setShowDetails(false);
                    setPreferance("");
                    setCountry("");
                    setStartDate(new Date());
                    setadmissionStatus("");
                    setAmount("");
                    setName("");
                    setEmail("");
                    setmobile("");
                } else if (resp.error) {

                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: resp.error,

                    });
                }
                setLoading(false)
            }).catch(error => {
                console.error('Error:', error);

            });

        }
    };


    const isFormFilled = name !== '' && email !== '' && mobile !== '';

    return (
        <div className=" bg-white" >
            <form onSubmit={handleSubmit}>
                <Container className="py-4">
                    <div className="text-center text-light">
                        <h3 className={Styles.headingMore}>Check your eligibility for a loan</h3>
                        <Button
                            style={{ marginRight: '10px' }}
                            className={`${showPreferance ? Styles.buttonSelected : showCountrySelection ? Styles.buttonSelected : showCalenderSelection ? Styles.buttonSelected : showAdmissionStatus ? Styles.buttonSelected : showAmount ? Styles.buttonSelected : showDetails ? Styles.buttonSelected : Styles.button} mt-4`}
                            onClick={handleCheckEligibilityClick}
                        >
                            Check Eligibility
                        </Button>
                        <Button className={`${showLoanApply ? Styles.buttonSelected : Styles.button}  mt-4`} onClick={handleLoanApplyClick}>
                            Apply for Loan
                        </Button>

                        <Card className={`${Styles.mainCard} mt-4 ${fadeIn ? Styles.fadeIn : ''}`}>

                            {showPreferance && (

                                <div className=" mt-3 ">

                                    <h5 className="text-dark">Step {step}/6</h5>
                                    <h4 className="text-secondary">Select your loan preference</h4>
                                    <div className="mt-4">
                                        <div className="row justify-content-center">
                                            <Button

                                                className={`${Styles.card} col-auto d-flex flex-column align-items-center mb-3 custom-icon-div`}
                                                value={preferance} onClick={(e) => handlePreferenceSelect(e, "Graduate")}
                                            >
                                                <SchoolIcon className="display-6 text-light" />
                                                Graduate
                                            </Button>
                                            <div className="col-auto"></div>
                                            <Button
                                                className={`${Styles.card} col-auto d-flex flex-column align-items-center mb-3`}
                                                value={preferance} onClick={(e) => handlePreferenceSelect(e, "Post Graduate")}
                                            >
                                                <SchoolOutlinedIcon className="display-6 text-light " />
                                                <p className="text-light">Post Graduate</p>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            )}

                            {showCountrySelection && (
                                <div className='mt-3'>
                                    <div className="d-flex justify-content-center align-items-center mb-3 ">
                                        <KeyboardBackspaceIcon style={{ cursor: 'pointer' }} onClick={handleBackButtonClick} />
                                        <h5 className="text-dark mb-0 ms-2 ">Step {step}/6</h5>
                                    </div>


                                    <h4 className="text-secondary">Which country do you wish to study in?</h4>
                                    <div className="mt-4">
                                        <div onClick={handleCountrySelect} className="row justify-content-center">
                                            {countryData.countries.map((country, index) => (
                                                <Button
                                                    value={country.name}
                                                    key={index}
                                                    style={{ marginRight: '10px' }}
                                                    className={`${Styles.card}  col-auto d-flex flex-column align-items-center mb-3 custom-icon-div text-light`}
                                                >
                                                    {country.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            )}
                            {showCalenderSelection && (
                                <div className='mt-3'>
                                    <div className="d-flex justify-content-center align-items-center mb-3 ">
                                        <KeyboardBackspaceIcon style={{ cursor: 'pointer' }} onClick={handleBackButtonClick} />
                                        <h5 className="text-dark mb-0 ms-2">Step {step}/6</h5>
                                    </div>


                                    <h4 className="text-secondary">Which intake do you want to go for?</h4>

                                    <DatePicker
                                        open
                                        value={startDate}
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                        className={`mt-0  ${Styles.InputHidden} `}

                                    />



                                </div>
                            )}
                            {showAdmissionStatus && (
                                <div className='mt-3'>
                                    <div className="d-flex justify-content-center align-items-center mb-3 ">
                                        <KeyboardBackspaceIcon style={{ cursor: 'pointer' }} onClick={handleBackButtonClick} />
                                        <h5 className="text-dark mb-0 ms-2">Step {step}/6</h5>
                                    </div>


                                    <h4 className="text-secondary">What’s your admission status?</h4>
                                    <div className="row">
                                        <div className='col-md-12 col-sm-12'>
                                            <Button value={admissionStatus} onClick={(e) => handleAddmissionStatus(e, "I've already filled an application")} className={`${Styles.AddmissionOption} my-2  `} type="button">I've already filled an application</Button>
                                        </div>
                                        <div className='col-md-12 col-sm-12'>
                                            <Button value={admissionStatus} onClick={(e) => handleAddmissionStatus(e, "I am yet to apply")} className={`${Styles.AddmissionOption} my-2 `} type="button">I am yet to apply</Button>

                                        </div>

                                    </div>
                                </div >
                            )}
                            {showAmount && (
                                <div className='mt-3'>
                                    <div className="d-flex justify-content-center align-items-center mb-3 ">
                                        <KeyboardBackspaceIcon style={{ cursor: 'pointer' }} onClick={handleBackButtonClick} />
                                        <h5 className="text-dark mb-0 ms-2">Step {step}/6</h5>
                                    </div>

                                    <h4 className="text-secondary ">Please specify the amount of loan you require</h4>
                                    <div className="d-flex flex-column align-items-center mt-3">
                                        <Button value={amount} size='md' onClick={(e) => handleAmount(e, "Under ₹10 Lakhs")} className={`${Styles.AddmissionOption} my-1 `} type="button">Under ₹10 Lakhs</Button>
                                        <Button value={amount} size='md' onClick={(e) => handleAmount(e, "₹10-25 Lakhs")} className={`${Styles.AddmissionOption} my-1 `} type="button">₹10-25 Lakhs</Button>
                                        <Button value={amount} size='md' onClick={(e) => handleAmount(e, "₹25-30 Lakhs")} className={`${Styles.AddmissionOption} my-1 `} type="button">₹25-30 Lakhs</Button>
                                        <Button value={amount} size='md' onClick={(e) => handleAmount(e, "₹50 Lakhs +")} className={`${Styles.AddmissionOption} my-1 `} type="button">₹50 Lakhs +</Button>
                                    </div>

                                </div>
                            )}
                            {showDetails && (
                                <div className='mt-3'>
                                    <div className="d-flex justify-content-center align-items-center mb-3 ">
                                        <KeyboardBackspaceIcon style={{ cursor: 'pointer' }} onClick={handleBackButtonClick} />
                                        <h5 className="text-dark mb-0 ms-2">Step {step}/6</h5>
                                    </div>

                                    <h4 className="text-secondary">You’re almost there! Verify your phone number to continue</h4>
                                    <div className="d-flex flex-column align-items-center  ">
                                        <Form className="mt-1 mb-3  border  rounded p-2 ">
                                            <Form.Group className='mb-3' controlId="formName">
                                                <Form.Control autoComplete='off' onKeyDown={KeyPressForAlphabets} onChange={(e) => setName(e.target.value)} type="text" placeholder="Please Enter Full Name" name="name" required />
                                            </Form.Group>
                                            <Form.Group className='mb-3' controlId="formEmail">
                                                <Form.Control autoComplete='off' isInvalid={!isValidEmail} onChange={handleEmailChange} type="email" placeholder="Please Enter Email ID" name="email" required />
                                                {email != "" && !isValidEmail && <span className='text-danger text-bold'>Invalid Email</span>}
                                            </Form.Group>
                                            <Form.Group className='mb-3' controlId="formMobile">
                                                <Form.Control autoComplete='off' maxLength="10" onKeyDown={KeyPressForNumeric} onChange={handleMobileChange} type="tel" placeholder="Please Enter Mobile No." name="mobile" required />
                                                {mobile !== "" && !isValidMobile && <span className='text-danger text-bold'>Invalid Mobile Number</span>}
                                            </Form.Group>

                                        </Form>

                                        {
                                            loading ? (
                                                <Button disabled className="bg-secondary border-secondary cursor-pointer mb-2">
                                                    Please wait .....
                                                    <Spinner animation="border" variant="light" size="sm" />
                                                </Button>
                                            ) : (
                                                <Button disabled={!isFormFilled || !isValidEmail || !isValidMobile || loading} className={`${isFormFilled && isValidEmail && isValidMobile ? Styles.buttonSelected : 'bg-secondary border-secondary cursor-pointer mb-2'}`} type="submit">continue</Button>

                                            )
                                        }
                                    </div>
                                </div>

                            )}


                            {showLoanApply && (
                                <Container className='pt-5' >
                                    <Row >
                                        <Col className='pt-5' md={6}>
                                            <h2>Finance Your Study Abroad Dreams</h2>
                                            <p>with Affordable Education Loans from 10+ Banking Partners</p>
                                            <div className='d-flex justify-content-center align-items-center '>
                                                <Button onClick={handleCheckEligibilityClick} className={`m-2 ${Styles.button}`}>Check Loan Eligibility</Button>
                                                <Button href='/contact-us' className={`m-2 ${Styles.button}`}>Request Callback</Button></div>
                                        </Col>
                                        <Col md={6}>
                                            <Image src='/assets/images/Loan/ElegiblityChecker/Education.webp' alt='education' width={350} height={270} />
                                        </Col>
                                    </Row>
                                </Container>
                            )}

                        </Card>

                    </div>
                </Container>
            </form>


        </div>

    );
};

export default EligibilityChecker;
