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
  const [clgname, setclgname] = React.useState([]);
  const [counsellorclglist, setcounsellorclglist] = React.useState([]);

  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [specialization,setSpecialization] = useState('')
  const [qualification,setQualification] = useState('')
  const [Experience, setExperience] = useState("");
  const [Language,setLanguage] = useState('');
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const studentDataApi = () => {
    setIsLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/my-profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("cst")}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          var res = await response.json();
          console.log(res.data);
          oldData = res.data;
          setname(res.data.name);
        setGender(res.data.gender);
        setDate(res.data.createdAt.split('T')[0]);
          setMobile(res.data.mobile);
          setQualification(res.data.qualification)
          setSpecialization(res.data.specialization)
          setclgname(res.data.college_name.split("##12##"))
          setLanguage(res.data.preferredlang)
          setcounsellorclglist(res.clgList)
          if (res.data.country) {
            setCountry(res.data.country);
            setState(res.data.state);
            setCity(res.data.city);
          }
          setEmail(res.data.email);
        setExperience(res.data.experience_in_year);
          setVerified(res.data.verified);
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
  // console.log(studentDataApi())

 
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
        // fd.append('qualification',qualification)
        // fd.append('specialization',specialization)
        fd.append('college_name',clgname.join('##12##'))
        fd.append('preferredlang',Language)

        fd.append("dob", date);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/counsellor/my-profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("cst")}`,
          },
          method: "PUT",
          body: fd,
        }).then(async (response) => {
          var res = await response.json();
          // console.log(res);
          setIsLoading(false);
          if (response.ok) {
            // console.log("hello", response.data);

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
    setDate(oldData.createdAt.split('T')[0]);
    setGender(oldData.gender);
    setMobile(oldData.mobile);
    if(oldData.country){
      setCity(oldData.city);
      setState(oldData.state);
    }
    setEmail(oldData.email);
    setExperience(oldData.experience_in_year);
    setQualification(oldData.qualification)
    setSpecialization(oldData.specialization)
    setclgname(oldData.college_name.split("##12##"))
    setLanguage(oldData.preferredlang)

    setshowmykycinput(false);
  };

 


const handleChange = (event) => {
  console.log(event.target.value)
  // const {
  //   target: { value },
  // } = event;
  // setclgname(
  //   // On autofill we get a stringified value.
  //   typeof value === 'string' ? value.split(',') : value,
  // );
  const selectedValues = event.target.value;
  if (selectedValues.length <= 5) {
    setclgname(selectedValues);
}
 
};


useEffect(() => {
 console.log(clgname)
}, [clgname])

 
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
                <img
                  src={
                    verified
                      ? "/assets/images/verified.png"
                      : "/assets/images/notverified.png"
                  }
                  width={35}
                  height={35}
                  alt="img"
                />
              </div>
              {showmykycinput ? (
                <div style={{ display: "flex" }}>
                  <p onClick={handleKycclose}>
                    <CloseIcon color="error" fontSize="large" />
                  </p>
                </div>
              ) : (
                <p onClick={() => setshowmykycinput(true)}>
                  <EditIcon color="info" fontSize="large" />
                </p>
              )}
            </div>
            <div className="row">
            <div className="col-md-12 ">
                <div className={styles["box"]}>
                  <div className={styles.heading}>College Name <span style={{color:'#ff000094'}}>(You can select maximum upto 5 colleges.)</span></div>
                  {showmykycinput ? (
                  
                  <Select
                  sx={{ mt: 1 }}
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  fullWidth
                  multiple
                  value={clgname}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {counsellorclglist.map((clg) => (
                    <MenuItem
                      key={clg._id}
                      value={clg.college_name}
                    >
                      {clg.college_name}
                    </MenuItem>
                  ))}
                </Select>
                  ) : (
<>
                    {clgname.map((s)=>
                <Chip label={s} color="info" variant="outlined" style={{margin:'0.3rem'}}/> 
                    )}
                    </>
                  )}
                </div>
                <hr/>
              </div>
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
                     disabled
                     size="small"
                     margin="dense"
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
                  <div className={styles.heading}>Specialization</div>
                  {showmykycinput ? (
                     <Select
                     sx={{ mt: 1 }}
                     fullWidth
                     disabled
                     size="small"
                     margin="dense"
                     value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                     displayEmpty
                   >
                     <MenuItem value="" disabled>
                        Select a Specialization
                      </MenuItem>
                      {CounsellorSpecilization.map((e,i) => (
                        <MenuItem key={i} value={e}>{e}</MenuItem>
                      ))}
                   </Select>
                  ) : (
                    <h6>{specialization || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Language</div>
                  {showmykycinput ? (
                     <Select
                     sx={{ mt: 1 }}
                     fullWidth
                     size="small"
                     margin="dense"
                     value={Language}
                      onChange={(e) => setLanguage(e.target.value)}
                     displayEmpty
                   >
                     <MenuItem value="" disabled>
                        Select a Language
                      </MenuItem>
                      {CounsellorLanguage.map((e,i) => (
                        <MenuItem key={i} value={e}>{e}</MenuItem>
                      ))}
                   </Select>
                  ) : (
                    <h6>{Language || "N/A"}</h6>
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
