import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';
import styles from "/styles/studentProfile.module.css";
import { genderType } from "@/components/Comps/type";
import { maritalType } from "@/components/Comps/type";
import { Physicalchallenge } from "@/components/Comps/type";
import FormatDate from "/components/Comps/FormatDate";
import Swal from "sweetalert2";


import { IndianStates } from "/components/Comps/StatesIndia";

import {
  TextField,
  MenuItem,
} from "@mui/material";

const MyProfile = (props) => {
  const studentProfile = props;
  console.log(studentProfile)
  const [showprofileinput,setShowProfileinput] = useState(false)
  const [showcontactinput,setShowContactinput] = useState(false)
  const [isLoading,setIsLoading]= useState(false);


  // Basic Details
  const [fullname,setFullname] = useState("");
  const [date,setDate] = useState("");
  const [gender,setGender] = useState("");
  const [maritalstatus,setMaritalstatus]= useState("");
  const [physically,setPhysically]= useState("");
  
  // contact Details
  const [mobile,setMobile] = useState("");
  const [email,setEmail] = useState("");
  const [country,setCountry] = useState("");
  const [state,setState]= useState("");
  const [city,setCity]= useState("");

  const handleSubmit=()=>{
    console.log("hello")
    setIsLoading(true)
    const fd = new FormData();
    fd.append("name",fullname==""?studentProfile.studentProfile.basic_details.fullname:fullname);
    fd.append("dob",date==""?studentProfile.studentProfile.basic_details.dob:date)
    fd.append("gender", gender==""?studentProfile.studentProfile.basic_details.gender:gender);
    fd.append("merital_status", maritalstatus==""?studentProfile.studentProfile.basic_details.merital_status:maritalstatus);
    fd.append("disablity", physically==""?studentProfile.studentProfile.basic_details.disablity:physically);
    fd.append("mobile",mobile==""?studentProfile.studentProfile.contact_details.mobile:mobile);
    fd.append("city", city==""?studentProfile.studentProfile.contact_details.city:city);
    fd.append("state", state==""?studentProfile.studentProfile.contact_details.state:state);
    fd.append("country", country==""?studentProfile.studentProfile.contact_details.country:country);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/student/my-profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("userid")}`
      },
      method: "PUT",
      body: fd,
    }).then(async (response) => {
      var res = await response.json()
      console.log(res)
      setIsLoading(false)
      if (response.ok) {
        // console.log("hello", response.data);
        
        Swal.fire({
          title: 'Success',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          setShowProfileinput(false)
        setShowContactinput(false)
          // After the user clicks 'Ok' on the success message
          if (typeof props.onSuccess === 'function') {
            props.onSuccess(); // Call the onSuccess callback if it exists
          }      
        });
      }else {
          Swal.fire({
            title: 'error',
            text: `${res.error}`,
            icon: 'error',
            confirmButtonText: 'Ok'
          }).then(()=>{
        this.setState({isLoading:false})

          })

      }
    });
  }
  return (
    <>   
        <div className={styles['basic-details']}>
          <div className={styles['basic']}>
            <h3>Basic Details</h3>
            {showprofileinput?
            <div style={{display:"flex"}}>
            <p onClick={handleSubmit}><CheckIcon color='success' fontSize="large"/></p>

            <p onClick={()=>setShowProfileinput(false)}><CloseIcon color='error' fontSize="large"/></p>
            </div>
:

            <p onClick={()=>setShowProfileinput(true)}><EditIcon color="info" fontSize="large"/></p>
}

          </div>
          <div className='row'>
            <div className='col-md-6 col-lg-4'>
            <div className={styles["box"]}>
            <div className={styles.heading}>Full Name </div>
            {showprofileinput?
            <TextField placeholder={studentProfile.studentProfile.basic_details.fullname} fullWidth size='small' margin="dense" type="text" value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
            :
            <h6>{studentProfile.studentProfile.basic_details.fullname?studentProfile.studentProfile.basic_details.fullname:"N/A"}</h6>

            }
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
            <div className={styles.heading}>DOB </div>
            {showprofileinput?
            <TextField fullWidth size='small' margin="dense" type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
            :
            <h6>{studentProfile.studentProfile.basic_details.dob?FormatDate(studentProfile.studentProfile.basic_details.dob):"N/A"}</h6>
            }
            </div>
          </div>
     
          {/* <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Social Category </div>
            <h6>N/A</h6>
          </div>
          </div> */}
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div className={styles.heading}>Gender </div>
          {showprofileinput?
              <TextField
              select
              fullWidth
              size='small'
              margin='dense'
              value={gender}
              onChange={(e)=>setGender(e.target.value)}
              >
              <MenuItem disabled value="">
                Select a gender
              </MenuItem>
              {genderType.map((e) => (
                   <MenuItem  value={e.value}>
                   {e.gendername}
                 </MenuItem>
                ))}
            </TextField>
            :
          <h6>{studentProfile.studentProfile.basic_details.gender?studentProfile.studentProfile.basic_details.gender:"N/A"}</h6>
          }
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div className={styles.heading}>Marital Status </div>
          {showprofileinput?
             <TextField
             select
             fullWidth
             size='small'
             margin='dense'
             value={maritalstatus} 
             onChange={(e)=>setMaritalstatus(e.target.value)}
             >
             <MenuItem disabled value="">
               Select a Marital Status
             </MenuItem>
             {maritalType.map((e) => (
                  <MenuItem  value={e.value}>
                  {e.MarrigeType}
                </MenuItem>
               ))}
           </TextField>
            :
          <h6>{studentProfile.studentProfile.basic_details.merital_status?studentProfile.studentProfile.basic_details.merital_status:"N/A"}</h6>
          }
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div className={styles.heading}>Physically challenged?</div>
          {showprofileinput?
          <TextField
          select
          fullWidth
          size='small'
          margin='dense'
          value={physically}
           onChange={(e)=>setPhysically(e.target.value)}
          >
          <MenuItem disabled value="">
            Select a Physically challenged
          </MenuItem>
          {Physicalchallenge.map((e) => (
               <MenuItem  value={e.value}>
               {e.PhysicalType}
             </MenuItem>
            ))}
        </TextField>

            :
          <h6>{studentProfile.studentProfile.basic_details.disablity === true?"Yes":"No"}</h6>
          }
          </div>
          </div>
          </div>
      </div>
    
      <div className={styles['basic-details']}>
          <div className={styles['basic']}>
            <h3>Contact Details</h3>
            {showcontactinput?
            <div style={{display:"flex"}}>
            <p onClick={handleSubmit}><CheckIcon color='success' fontSize="large"/></p>

            <p onClick={()=>setShowContactinput(false)}><CloseIcon color='error' fontSize="large"/></p>
            </div>
:

            <p onClick={()=>setShowContactinput(true)}><EditIcon color="info" fontSize="large"/></p>
}
          </div>
          <div className='row'>
            <div className='col-md-6 col-lg-4'>
            <div className={styles["box"]}>
            <div className={styles.heading}>Mobile Number</div>
            {showcontactinput?
            <TextField  placeholder={studentProfile.studentProfile.contact_details.mobile} fullWidth size='small' margin="dense" value={mobile} onChange={(e)=>setMobile(e.target.value.replace(/\D/g, ""))}/>
            :
            <h6>{studentProfile.studentProfile.contact_details.mobile?studentProfile.studentProfile.contact_details.mobile:"N/A"}</h6>
            }
            </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
            <div className={styles.heading}>Email address</div>
            {showcontactinput?
            <TextField disabled placeholder={studentProfile.studentProfile.contact_details.email} fullWidth size='small' margin="dense" type="text" />
            :
            <h6>{studentProfile.studentProfile.contact_details.email?studentProfile.studentProfile.contact_details.email:"N/A"}</h6>
          
              }
                </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div className={styles.heading}>Country</div>
          {showcontactinput?
           <TextField
           select
           fullWidth
           size='small'
           margin='dense'
           value={country}
           onChange={(e)=>{setCountry(e.target.value),setState(""),setCity("")}}
           >
           <MenuItem disabled value="">
             Select a country
           </MenuItem>
           {Object.keys(IndianStates).map((country, i) => (
                        <MenuItem key={i} value={country}>
                          {country}
                        </MenuItem>
                      ))}
         </TextField>
            :
          <h6>{studentProfile.studentProfile.contact_details.country?studentProfile.studentProfile.contact_details.country:"N/A"}</h6>
        }  </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div className={styles.heading}>State</div>
          {showcontactinput?
           <TextField
           select
           fullWidth
           size='small'
           margin='dense'
           value={state}
           onChange={(e)=>setState(e.target.value)}
           >
           <MenuItem disabled value="">
             Select a state
           </MenuItem>
           {country != "" && Object.keys(IndianStates[country]).map((state, i) => (
                        <MenuItem key={i} value={state}>
                          {state}
                        </MenuItem>
                      ))}
         </TextField>
            :
          <h6>{studentProfile.studentProfile.contact_details.state?studentProfile.studentProfile.contact_details.state:"N/A"}</h6>
         
            }
             </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div className={styles.heading}>City</div>
          {showcontactinput?
           <TextField
           select
           fullWidth
           size='small'
           margin='dense'
           value={city}
           onChange={(e)=>setCity(e.target.value)}
           >
           <MenuItem disabled value="">
             Select a city
           </MenuItem>
           {state != "" && IndianStates[country][state].map((city, i) => (
                 <MenuItem key={i} value={city}>
                 {city}
               </MenuItem>
             ))}
         </TextField>
            :
          <h6>{studentProfile.studentProfile.contact_details.city?studentProfile.studentProfile.contact_details.city:"N/A"}</h6>
           }
           </div>
          </div>
         
          </div>
      </div>
{/* 
      <Modal
        size="xl"
        show={showprofilemodal}
        onHide={() => setShowProfilemodal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <h3> Education Details</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <div className={styles["model-scroll"]}>
                <div className={styles["basic"]}>
                  <h6>Class X </h6>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <Button variant="secondary" type="submit">
                  Submit{" "}
                </Button>
              </div>
            </Form>
        </Modal.Body>
      </Modal> */}
      </>

  );
}


export default MyProfile;
