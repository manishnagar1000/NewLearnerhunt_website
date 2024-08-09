import { useState, useEffect } from "react";
import Styles from "/styles/PopForm.module.css";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Badge, Row, Col, Container, Modal } from "react-bootstrap";
import Image from "next/image";



const PopForm = () => {
  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    course: "",
    qualification: "",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    mobileError: "",
    emailError: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/miscellaneous/testeligibility`
    ).then(async (res) => {
      setData(await res.json());
    });

    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [`${name}Error`]: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const { name, mobile, email } = formData;

    if (name.trim() === "") {
      setErrors({
        ...errors,
        nameError: "Name cannot be empty",
      });
      valid = false;
    }


    if (mobile.trim() === "" || mobile.length !== 10 || isNaN(mobile)) {
      setErrors({
        ...errors,
        mobileError: "Enter a valid 10-digit mobile number",
      });
      valid = false;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({
        ...errors,
        emailError: "Enter a valid email address",
      });
      valid = false;
    }

    return valid;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const { name, mobile, email, course, qualification } = formData;
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("mobile", mobile);
      fd.append("course", course);
      fd.append("qualification", qualification);

      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/save-modal-leads",
          {
            method: "POST",
            body: fd,
          }
        );

        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || "Server responded with an error.");
          } else {
            throw new Error("Server responded with a non-JSON error.");
          }
        }

        const res = await response.json();
        alert(res.message);
        closeModal()
      } catch (error) {
        alert(error.message || "An error occurred while processing the request.");
        setIsLoading(false);

      }
    }
  };

  const checkValue = (value) => {
    return value != undefined && value != null && value != "";
  };
  return (
    <>


      <Modal
        show={showModal} onHide={handleClose}
        centered
        size="lg"
      >

        <Modal.Header closeButton style={{ border: '0' }}>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={6} md={12} sm={12}>
              <div className={Styles.mainDiv}>
                <div className={Styles.textDiv}>

                  <h4 className={Styles.mainHeading} id="modal-modal-title"  >
                    Scholarship upto <Badge bg="danger" >75%</Badge>
                  </h4>
                  <h5 className={Styles.subHeading}>
                    Get Admission in Your Dream College/University
                  </h5>
                </div>
                <div className={Styles.imgsection}>
                  <Image
                    width={350}
                    height={350}
                    src="/assets/images/popupBoyy.jpg"
                    className="img-fluid"
                  />
                </div>
              </div>

            </Col>
            <Col lg={6} md={12} sm={12} className="mt-2">
                <h6 className={Styles.formHeading}>
                  Please enter your details to continue
                </h6>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  fullWidth
                  sx={{ mt: 2 }}
                  className="form-input"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={Boolean(errors.nameError)}
                  helperText={errors.nameError}
                />
                <TextField
                  label="Mobile No."
                  fullWidth
                  className="form-input"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                  error={Boolean(errors.mobileError)}
                  helperText={errors.mobileError}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 10,
                  }}
                />
                <TextField
                  label="Email ID"
                  fullWidth
                  className="form-input"
                  name="email"
                  value={formData.email}
                  sx={{ mt: 2 }}
                  onChange={handleInputChange}
                  error={Boolean(errors.emailError)}
                  helperText={errors.emailError}
                />

                <FormControl sx={{ mt: 2 }} fullWidth>
                  <InputLabel>Courses</InputLabel>
                  <Select
                    value={formData.course}
                    onChange={handleInputChange}
                    name="course"
                    label="Course"
                  >
                    <MenuItem value="" disabled>
                      <em>Select</em>
                    </MenuItem>
                    {checkValue(data.courses) && data.courses.map((c, i) => (
                      <MenuItem key={i} value={c.course}>
                        {c.course}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formData.course != "" &&
                  <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel>Qualification</InputLabel>
                    <Select
                      value={formData.qualification}
                      onChange={handleInputChange}
                      label="Qualification"
                      name="qualification"

                    >
                      <MenuItem value="" disabled>
                        <em>Select</em>
                      </MenuItem>
                      {checkValue(data.courses) && data.courses
                        .find((c) => c.course == formData.course)
                        .qualification.map((q, i) => {
                          return (
                            <MenuItem key={i} value={q}>
                              {q}
                            </MenuItem>
                          );
                        })
                      }
                    </Select>
                  </FormControl>
                }
                <div className="text-center">

                  <Button

                    variant="contained"

                    sx={{
                      mt: 2, fontSize: "1.2rem",
                      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
                      '&:hover': {
                        boxShadow: "0px 12px 35px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                    type="submit"
                    className={`submit-button m-4 px-5 py-2 shadow-md  ${Styles.formSubmitButton}`}
                    disabled={isLoading ? true : false}
                  >
                    {isLoading ? "Wait..." : "Submit"}
                  </Button>

                </div>
              </form></Col>
          </Row>
        </Modal.Body>
        {/* </Box> */}
      </Modal>
    </>
  );
};


export default PopForm;
