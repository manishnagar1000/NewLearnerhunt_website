import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import styles from "/styles/studentProfile.module.css";
import { Physicalchallenge } from "@/components/Comps/type";
import FormatDate from "/components/Comps/FormatDate";
import Swal from "sweetalert2";
import CTA from "/components/Comps/CTA";
import { genderType } from "@/components/Comps/type";
import { maritalType } from "@/components/Comps/type";
import { Spinner } from "react-bootstrap";
import { IndianStates } from "/components/Comps/StatesIndia";
import { TextField, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CounsellorSpecilization } from "@/components/Comps/type";
import { CounsellorLanguage } from "@/components/Comps/type";
import { CounsellorQualification } from "@/components/Comps/type";
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';

var oldData = [];

const Myprofile = () => {
  const [showmykycinput, setshowmykycinput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // kyc Details

  const [name, setname] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [qualification,setQualification] = useState('')
  const [Experience, setExperience] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const studentDataApi = () => {
    setIsLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/tutor/my-profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tp")}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          var res = await response.json();
          // console.log(res.data);
          oldData = res.data;
          setname(res.data.name);
        setGender(res.data.gender);
        setCountry(res.data.country)
        setState(res.data.state)
        setCity(res.data.city)

        setDate(res.data.dob&&res.data.dob.split('T')[0]);
          setMobile(res.data.mobile);
          setQualification(res.data.qualification)
          setEmail(res.data.email);
        setExperience(res.data.experience_in_year);
        } else {
          var res = await response.json();

          setError(res.error);
          // setIsLoading(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

 
  useEffect(() => {
    studentDataApi();
  }, []);
  const handleSubmit = () => {
    // console.log("hello");
    if (showmykycinput) {
      if (mobile.length !== 10 || /\s/.test(mobile)) {
        // Display an error message or take the appropriate action
        setError(true);
      } else {
        // Your form submission logic
        setError(false);
        setIsLoading(true);
        const fd = new FormData();
        fd.append("name",name);
        fd.append("mobile", mobile);
        fd.append("state", state);
        fd.append("city", city);
        fd.append("experience", Experience);
        fd.append("country", country);
        fd.append("gender", gender);
        fd.append('qualification',qualification)
        fd.append("dob", date);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/tutor/my-profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tp")}`,
          },
          method: "PUT",
          body: fd,
        }).then(async (response) => {
          var res = await response.json();
          setIsLoading(false);
          if (response.ok) {
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setshowmykycinput(false);
              studentDataApi();
            });
          } else {
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsLoading(false);
            });
          }
        });
      }
    }
  };

  const handleKycclose = () => {
    console.log(oldData);
    setname(oldData.name);
    setDate(oldData.dob&&oldData.dob.split('T')[0]);
    setGender(oldData.gender);
    setMobile(oldData.mobile);
    if(oldData.country){
      setCity(oldData.city);
      setState(oldData.state);
    }
    setEmail(oldData.email);
    setExperience(oldData.experience_in_year);
    setQualification(oldData.qualification)

    setshowmykycinput(false);
  };



 
  return (
    <>
      {!isLoading ? (
        <>
        {error =="" ?
          <div className={styles["basic-details"]} style={{ margin: "0.5rem" }}>
            <div className={styles["basic"]}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: "0px 5px" }}>My Profile</h3>
              </div>
              {showmykycinput ? (
                <div style={{ display: "flex" }}>
                  <span onClick={handleKycclose}>
                    <CloseIcon color="error" fontSize="large" />
                  </span>
                </div>
              ) : (
                <span onClick={() => setshowmykycinput(true)}>
                  <EditIcon color="info" fontSize="large" />
                </span>
              )}
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Name</div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      placeholder={name}
                      size="small"
                      margin="dense"
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setname(
                          e.target.value.charAt(0).toUpperCase() +
                            e.target.value.slice(1)
                        )
                      }
                    />
                  ) : (
                    <h6>{name || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Gender </div>
                  {showmykycinput ? (
                     <Select
                     sx={{ mt: 1 }}
                     fullWidth
                     size="small"
                     margin="dense"
                     value={gender}
                      onChange={(e) => setGender(e.target.value)}
                     displayEmpty
                   >
                     <MenuItem value="" disabled>
                        Select a gender
                      </MenuItem>
                      {genderType.map((e,i) => (
                        <MenuItem key={i} value={e.value}>{e.gendername}</MenuItem>
                      ))}
                   </Select>
                  ) : (
                    <h6>{gender || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Qualification</div>
                  {showmykycinput ? (
                     <Select
                     sx={{ mt: 1 }}
                     fullWidth
                     size="small"
                     margin="dense"
                     disabled
                     value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                     displayEmpty
                   >
                     <MenuItem value="" disabled>
                        Select a qualification
                      </MenuItem>
                      {CounsellorQualification.map((e,i) => (
                        <MenuItem key={i} value={e}>{e}</MenuItem>
                      ))}
                   </Select>
                  ) : (
                    <h6>{qualification || "N/A"}</h6>
                  )}
                </div>
              </div>
             
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Experience</div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={Experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  ) : (
                    <h6>{Experience || "N/A"}</h6>
                  )}
                </div>
              </div>

             
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Mobile Number</div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      value={mobile}
                      inputProps={{ minLength: 10, maxLength: 10 }}
                      onChange={(e) =>
                        setMobile(e.target.value.replace(/\D/g, ""))
                      }
                      helperText={error ? "Incorrect Entry" : ""}
                      error={error ? true : false}
                    />
                  ) : (
                    <h6>{mobile || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Email address</div>
                  {showmykycinput ? (
                    <TextField
                      disabled
                      placeholder={email}
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                    />
                  ) : (
                    <h6>{email || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>DOB </div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  ) : (
                    <h6>{date && FormatDate(date) || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Country</div>
                  {showmykycinput ? (
                    <Select
                     sx={{ mt: 1 }}
                     fullWidth
                      size="small"
                      margin="dense"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setState("");
                        setCity("");
                      }}
                      displayEmpty
                      //  inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="" disabled>
                        Select a country
                      </MenuItem>
                      {Object.keys(IndianStates).map((country, i) => (
                        <MenuItem key={i} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <h6>{country || "N/A"}</h6>
                  )}{" "}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>State</div>
                  {showmykycinput ? (
                    <Select
                     sx={{ mt: 1 }}
                     fullWidth
                      size="small"
                      margin="dense"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem disabled value="">
                        Select a state
                      </MenuItem>
                      {country != "" &&
                        Object.keys(IndianStates[country]).map((state, i) => (
                          <MenuItem key={i} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                    </Select>
                  ) : (
                    <h6>{state || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>City</div>
                  {showmykycinput ? (
                     <Select
                     sx={{ mt: 1 }}
                     fullWidth
                     size="small"
                     margin="dense"
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     displayEmpty
                   >
                    <MenuItem disabled value="">
                        Select a city
                      </MenuItem>
                      {state &&
                        state != "" &&
                        IndianStates[country][state].map((city, i) => (
                          <MenuItem key={i} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                   </Select>
                  ) : (
                    <h6>{city || "N/A"}</h6>
                  )}
                </div>
              </div>
            </div>
          </div>
:<p style={{display:'flex',justifyContent:'center',alignItems:'center',height:'85vh',color:'red'}}>{error}</p>}
          {showmykycinput == true && (
            <CTA
              title="Save"
              color="white"
              fontWeight="bold"
              onClick={handleSubmit}
            />
          )}
          
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner variant="outlined" />
        </div>
      )}
    </>
  );
};

export default Myprofile;
