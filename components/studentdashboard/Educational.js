import React, {useEffect,useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import styles from "/styles/studentProfile.module.css";
import CTA from "/components/Comps/CTA";
import { Spinner } from "react-bootstrap";
import { IndianStates } from "/components/Comps/StatesIndia";



import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';  



  const HomeComponent = () => {
  // const [educationDetailsShow, setEducationDetailsShow] = useState(false);
  // const [preferencesShow, setPreferencesShow] = useState(false);
  const [educationDetails,  setEducationDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [year, setYear] = useState("");
  const [marks, setMarks] = useState("");
  const [percentage, setPercentage] = useState("");

  const [boardxii, setBoardxii] = useState("");
  const [schoolxii, setSchoolxii] = useState("");
  const [yearxii, setYearxii] = useState("");
  const [streamxii, setStreamxii] = useState("");
  const [percentagexii, setPercentagexii] = useState("");

  const [universityg, setUniversityg] = useState("");
  const [collegeg, setCollegeg] = useState("");
  const [yearg, setYearg] = useState("");
  const [degreeg, setDegreeg] = useState("");
  const [specialisationg, setSpecialisationg] = useState("");
  const [percentageg, setPercentageg] = useState("");


  // const [level, setLevel] = useState("");
  // const [specialisation, setSpecialisation] = useState("");
  // const [location, setLocation] = useState("");
  // const [collegee, setCollegee] = useState("");
  // const [fee, setFee] = useState("");
  // const [abroad, setAbroad] = useState("");
  // const [loan, setLoan] = useState("");


  const [showEducationalInput, setshowEducationalInput] = useState(false);

  const handleIcnClick = () => {
    setshowEducationalInput(!showEducationalInput);
  };
  
  // const [preferencsShow, setPreferencsShow] = useState(false);
  
  // const handleIconClick = () => {
  //     setPreferencsShow(!preferencsShow);
  //   };
    
  const studentDataApi = () => {
    setIsLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/education-details", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userid")}`,
      },
    })
      .then(async (response) => {
        var res = await response.json();
        console.log(res.data);
        setEducationDetails(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    studentDataApi();
  }, []);
  

  const handleSubmit = (event) => {
    event.preventDefault();

  };

  return (
    <>   {!isLoading ? (
      <>
        {/* <Modal
          size="xl"
          show={showSuccess}
          onHide={() => setShowSuccess(false)}
          aria-labelledby="example-modal-sizes-title-sm"

        >
          <Alert severity="success" onClose={() => setShowSuccess(false)}>
            <AlertTitle>Success</AlertTitle>
          </Alert>
        </Modal> */}
        <div className={styles["basic-details"]}>
          <div className={styles["basic"]}>
            <h3> Education Details</h3>
            <p>
          {showEducationalInput ?  
                  
                 <CloseIcon
                   onClick={handleIcnClick}
            color="error" fontSize="large"
          />
              
 : (
          <EditIcon
            onClick={handleIcnClick}
            color="info" fontSize="large"
          />
        )}
            </p>
          </div>
          <div className={styles["basic"]}>
            <h6>Class X </h6>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Board </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="CBSE"
        value={name}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setName(e.target.value);
        }}
      />
) : (
  <h6>
  {educationDetails.class_X.board
    ? educationDetails.class_X.board
    : "N/A"}
</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>School </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="KV"
        value={school}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
          setSchool(e.target.value);
        }}
      />
) : (
  <h6>
  {educationDetails.class_X.school
    ? educationDetails.class_X.school
    : "N/A"}
</h6>
      )}              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Passing Year </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="2023"
        value={year}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setYear(e.target.value);
        }}
      />
) : (
  <h6>
  {educationDetails.class_X.passing_year
    ? educationDetails.class_X.passing_year
    : "N/A"}
</h6>
      )}
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading} >Marks type </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="CGPA"
        value={marks}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setMarks(e.target.value);
        }}
      />
) : (
  <h6>
  {educationDetails.class_X.marks_type
    ? educationDetails.class_X.marks_type
    : "N/A"}
</h6>
      )}
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Percentage/CGPA </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="9.8"
        value={percentage}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setPercentage(e.target.value);
        }}
      />
) : (
  <h6>
  {educationDetails.class_X.percentage
    ? educationDetails.class_X.percentage
    : "N/A"}
</h6>
      )}
              </div>
            </div>
          </div>
          <hr />
          <div className={styles["basic"]}>
            <h6>Class XII </h6>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Board </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="CBSE"
        value={boardxii}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setBoardxii(e.target.value);
        }}
      />
) : (
        <h6>CBSE</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>School </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="KV"
        value={schoolxii}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setSchoolxii(e.target.value);
        }}
      />
) : (
        <h6>KV</h6>
      )}
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Passing Year </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="2023"
        value={yearxii}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setYearxii(e.target.value);
        }}
      />
) : (
        <h6>2023</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Stream </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="Science"
        value={streamxii}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setStreamxii(e.target.value);
        }}
      />
) : (
        <h6>Science</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Percentage/CGPA </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="Percentage"
        value={percentagexii}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setPercentagexii(e.target.value);
        }}
      />
) : (
        <h6>Percentage</h6>
      )}
              </div>
            </div>
          </div>
          <hr />
          <div className={styles["basic"]}>
            <h6>Graduation </h6>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>University </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="AKTU"
        value={universityg}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setUniversityg(e.target.value);
        }}
      />
) : (
        <h6>AKTU</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>College </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="ST.STEPHEN"
        value={collegeg}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setCollegeg(e.target.value);
        }}
      />
) : (
        <h6>CGPA</h6>
      )}
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Passing Year </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="2023"
        value={yearg}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setYearg(e.target.value);
        }}
      />
) : (
        <h6>2023</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Degree </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="B.tech"
        value={degreeg}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setDegreeg(e.target.value);
        }}
      />
) : (
        <h6>B.tech</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Specialisation </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="CS"
        value={specialisationg}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setSpecialisationg(e.target.value);
        }}
      />
) : (
        <h6>CS</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Percentage/CGPA </div>
                {showEducationalInput ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="CGPA"
        value={percentageg}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setPercentageg(e.target.value);
        }}
      />
) : (
        <h6>CGPA</h6>
      )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles["basic-details"]}>
          <div className={styles["basic"]}>
            <h3>Preferences </h3>
            <p>
          {preferencsShow ?  
            <div style={{display:'flex',gap:'30px'}}>  
                  
                <CheckIcon />  
                 <CloseIcon
                   onClick={handleIconClick}
                   className="me-2"
                  style={{ cursor: "pointer",color:'red' }}
          />
              
        </div>
 : (
          <EditIcon
            onClick={handleIconClick}
            className="me-2"
            style={{ cursor: "pointer",color:'blue'}}
          />
        )}
        
            </p>
          
          



             
               </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>

                <div className={styles.heading}>Stream </div>
                {preferencsShow ? (
        <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <TextField
              fullWidth
              size="small"
              margin="dense"
              placeholder="Art"

              value={customMenuItem}
              onClick={(event) => handleTextFieldClick(event, popupState)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  popupState.close();
                }
              }}
            />
            <Menu
              {...bindMenu(popupState)}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleCustomItemClick(popupState, 'Art')}>
                Art
              </MenuItem>
              <MenuItem onClick={() => handleCustomItemClick(popupState, ' Science')}>
                 Science 
              </MenuItem>
              <MenuItem onClick={() => handleCustomItemClick(popupState, 'Commerce')}>
                Commerce
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>

) : (
        <h6>Design</h6>
      )}

              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Level </div>
                {preferencsShow ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="PG"
        value={level}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setLevel(e.target.value);
        }}
      />
) : (
        <h6>PG</h6>
      )}
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Specialisation </div>
                {preferencsShow ? (

                <TextField fullWidth size='small' margin="dense" 
        required
        type="text"
        placeholder="NO Preference"
        value={specialisation}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setSpecialisation(e.target.value);
        }}
      />
) : (
        <h6>NO Preference</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading} >Location </div>
                {preferencsShow ? (

<TextField fullWidth size='small' margin="dense" 
required
type="text"
placeholder="N/A"
value={location}
onChange={(e) => {
const re = /^[A-Za-z]+$/;
if (e.target.value === "" || re.test(e.target.value))
setLocation(e.target.value);
}}
/>
) : (
<h6>N/A</h6>
)}
</div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>College Type </div>
                {preferencsShow ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="N/A"
        value={collegee}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
          setCollegee(e.target.value);
        }}
      />
) : (
        <h6>N/A</h6>
      )}

              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Fee-Range </div>
                {preferencsShow ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="3-4LPA"
        value={fee}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setFee(e.target.value);
        }}
      />
) : (
        <h6>3-4LPA</h6>
      )}
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Intrested in Study Abroad </div>
                {preferencsShow ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="No"
        value={abroad}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
          setAbroad(e.target.value);
        }}
      />
) : (
        <h6>No</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Need A Loan? </div>
                {preferencsShow ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="Yes"
        value={loan}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
          setLoan(e.target.value);
        }}
      />
) : (
        <h6>Yes</h6>
      )}
              </div>
            </div>
          </div>
        </div> */}
      <CTA title="Save" color="white" fontWeight="bold" onClick={handleSubmit} />
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

export default HomeComponent;