// RemarkModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Box, TextField, Autocomplete } from "@mui/material";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import Loading from "../../Comps/Loading";

const DialerModule = ({ toggleDialer, getAssetList }) => {
  const [studentname, setStudentName] = useState("");
  const [studentemail, setStudentEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [course, setCourse] = useState("");
  const [pitchedCollege, setPitchedCollege] = useState("");
  const [budget, setBudget] = useState("");
  const [studentremark, setStudentRemark] = useState("");
  const [collegeApi, setCollegeApi] = useState([]);
  const [studerror, setStudError] = useState(false);
  const [emailerror, setEmailError] = useState(false);
  const [mobileerror, setMobileError] = useState(false);
  const [pitchederror, setPitchedError] = useState(false);
  const [remarkerror, setRemarkError] = useState(false);
  const [isLoading,setIsLoading] = useState(false)

  const collegeDataApi = () => {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/get-initial-data", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("cst")}`,
      },
    })
      .then(async (response) => {
        var res = await response.json();
        console.log(res.data);
        setCollegeApi(res.data.colleges);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    collegeDataApi();
  }, []);

  const dialerDataAdd = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(studentname == ''){
        setStudError(true)
      }else if(!emailRegex.test(studentemail)) {
        setEmailError(true)
        setStudError(false)

      }else if(mobile.trim() === "" || mobile.length !== 10 || isNaN(mobile)) {
        setMobileError(true)
        setEmailError(false)
      }else if(pitchedCollege == '') {
        setPitchedError(true)
        setMobileError(false)
      }else if(studentremark == '') {
        setRemarkError(true)
        setPitchedError(false)
      }else{
        setRemarkError(false)
        setIsLoading(true)
        const fd = new FormData();
        fd.append("studName", studentname);
        fd.append("studEmail", studentemail);
        fd.append("mobile", mobile);
        fd.append("course", course);
        fd.append("pitchedCollege", pitchedCollege);
        fd.append("budget", budget);
        fd.append("remarks", studentremark);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/dialer-lead", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("cst")}`,
          },
          method: "POST",
          body: fd,
        }).then(async (response) => {
          var res = await response.json();
          console.log(res);
          if (response.ok) {
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then((s) => {
              setStudentName(""), setStudentEmail(""), setMobile(""), setBudget("");
              setCourse("");
              setPitchedCollege("");
              setStudentRemark("");
              toggleDialer()
              getAssetList()
            });
          } else {
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
          setIsLoading(false)
        });
      }


   
  };

  return (
    <>
    <Modal
      show={true}
      onHide={toggleDialer}
      backdrop="static"
      keyboard={false}
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Dialer Lead</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <Box
            component="form"
            onSubmit={(e) => dialerDataAdd(e)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              size="small"
              id="name"
              name="name"
              margin="dense"
              type="text"
              fullWidth
              variant="outlined"
              label="Student Name"
              value={studentname}
              onChange={(e) => setStudentName(e.target.value)}
              required
              helperText={studerror ? "Fill the field" : ""}
              error={studerror ? true : false}
            />
            <TextField
              id="email"
              size="small"
              name="name"
              type="email"
              fullWidth
              variant="outlined"
              margin="dense"
              label="Student Email"
              value={studentemail}
              onChange={(e) => setStudentEmail(e.target.value)}
              required
              helperText={emailerror ? "Incorrect Entry" : ""}
              error={emailerror ? true : false}
            />
            <TextField
              size="small"
              id="mobile"
              name="mobile"
              margin="dense"
              type="text"
              fullWidth
              variant="outlined"
              label="Student mobile"
              value={mobile}
              inputProps={{ minLength: 10, maxLength: 10 }}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              required
              helperText={mobileerror ? "Incorrect Entry" : ""}
              error={mobileerror ? true : false}
            />
            <TextField
              size="small"
              id="course"
              name="course"
              margin="dense"
              type="text"
              fullWidth
              variant="outlined"
              label="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
            <TextField
              size="small"
              id="budget"
              name="budget"
              margin="dense"
              type="text"
              fullWidth
              variant="outlined"
              label="Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={collegeApi}
              onChange={(event, newValue) => {
                // console.log(newValue)
                if (newValue) {
                  setPitchedCollege(newValue._id);
                }
              }}
              getOptionLabel={(option) => option.college_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  margin="dense"
                  label="College List"
                  required
                  helperText={pitchederror ? "Fill the field" : ""}
              error={pitchederror ? true : false}
                />
              )}
            />
            <TextField
              size="small"
              id="studentremark"
              name="studentremark"
              margin="dense"
              type="text"
              fullWidth
              variant="outlined"
              label="Student Remark"
              value={studentremark}
              onChange={(e) => setStudentRemark(e.target.value)}
              required
              helperText={remarkerror ? "Fill the field" : ""}
              error={remarkerror ? true : false}
            />

            <Button type="submit" disabled={isLoading} variant="primary">
              {isLoading ? (
                <>
                  <span>Please Wait...</span>
                  <Spinner animation="border" role="status" />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </>
      </Modal.Body>
    </Modal>
      <Loading
      show={isLoading}
      onHide={() => setIsLoading(false)}
    />
    </>
  );
};

export default DialerModule;
