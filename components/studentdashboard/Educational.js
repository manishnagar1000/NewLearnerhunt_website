import React ,{useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import styles from "/styles/studentProfile.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
const Educational = () => {
  const handleShow = () => setXlShow(true);
  const [xlShow, setXlShow] = useState(false);
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [year, setYear] = useState("");
  const [marks, setMarks] = useState("");
  const [percentage, setPercentage] = useState("");

  const [boardxii, setBoardxii] = useState("");
  const [schooll, setSchooll] = useState("");
  const [yearr, setYearr] = useState("");
  const [stream, setStream] = useState("");
  const [percentagee, setPercentagee] = useState("");

  const [university, setUniversity] = useState("");
  const [college, setCollege] = useState("");
  const [yearrr, setYearrr] = useState("");
  const [degree, setDegree] = useState("");
  const [specialisationn, setSpecialisationn] = useState("");
  const [percentageee, setPercentageee] = useState("");


  const handleSubmit = (event) => {
    setSmShow(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, [2000]);

    event.preventDefault();
  };
  return (
    <>   
        
      <div className={styles['basic-details']}>
          <div className={styles['basic']}>
            <h3> Education Details</h3>
            <p onClick={handleShow}><EditIcon/></p>
          </div>
          <div className={styles['basic']}>
            <h6>Class X  </h6>
          </div>
          <div className='row'>
            <div className='col-md-6 col-lg-4'>
            <div className={styles["box"]}>
            <div className='heading'>Board </div>
            <h6>CBSE</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
            <div>School </div>
            <h6>KV</h6>
          </div>
          </div>
     
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Passing Year </div>
            <h6>2012</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Marks type </div>
            <h6>CGPA</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Percentage/CGPA </div>
            <h6>9CGPA</h6>
          </div>
          </div>
       </div>
       <hr />
       <div className={styles['basic']}>
            <h6>Class XII  </h6>
          </div>
       <div className='row'>
            <div className='col-md-6 col-lg-4'>
            <div className={styles["box"]}>
            <div className='heading'>Board </div>
            <h6>CBSE</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
            <div>School </div>
            <h6>KV</h6>
          </div>
          </div>
     
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Passing Year </div>
            <h6>2012</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Stream </div>
            <h6>Science</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Percentage/CGPA </div>
            <h6>9CGPA</h6>
          </div>
          </div>
       </div>
       <hr />
       <div className={styles['basic']}>
            <h6>Graduation  </h6>
          </div>
       <div className='row'>
            <div className='col-md-6 col-lg-4'>
            <div className={styles["box"]}>
            <div className='heading'>University </div>
            <h6>DU</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
            <div>College </div>
            <h6>KV</h6>
          </div>
          </div>
     
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Passing Year </div>
            <h6>2012</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Degree </div>
            <h6>BSc</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Specialisation </div>
            <h6>9CGPA</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Percentage/CGPA </div>
            <h6>9CGPA</h6>
          </div>
          </div>

       </div>
      </div>
      <div className={styles['basic-details']}>
      <div className={styles['basic']}>
            <h3>Preferences </h3>
            <p><EditIcon/></p>
          </div>
       <div className='row'>
            <div className='col-md-6 col-lg-4'>
            <div className={styles["box"]}>
            <div className='heading'>Stream </div>
            <h6>Design</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
            <div>Level </div>
            <h6>PG</h6>
          </div>
          </div>
     
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Specialisation </div>
            <h6>No Preferences</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Location </div>
            <h6>N/A</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>College Type </div>
            <h6>N/A</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Fee-Range </div>
            <h6>3-4 Lpa</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Stream </div>
            <h6>Design</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Intrested in Study Abroad </div>
            <h6>No</h6>
          </div>
          </div>
          <div className='col-md-6 col-lg-4'>
          <div className={styles["box"]}>
          <div>Need A Loan? </div>
            <h6>Yes</h6>
          </div>
          </div>
       </div>
      </div>
      <Modal
        size="xl"
        show={xlShow}
        onHide={() => setXlShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <h3> Education Details</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
            <div className={styles["model-scroll"]}>
                <div className={styles["basic"]}>
                  <h6>Class X </h6>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div className="heading">Board </div>
                      <Form.Control
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
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>School </div>
                      <Form.Control
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
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>Passing Year </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="2000"
                        value={year}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setYear(e.target.value);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>Marks type </div>
                      <Form.Control
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
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>Percentage/CGPA </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="9.8"
                        value={percentage}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setPercentage(e.target.value);
                          }
                        }}
                      />
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
                      <div className="heading">Board </div>
                      <Form.Control
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
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>School </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="KV"
                        value={schooll}
                        onChange={(e) => {
                          const re = /^[A-Za-z]+$/;
                          if (e.target.value === "" || re.test(e.target.value))
                            setSchooll(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>Passing Year </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="2000"
                        value={yearr}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setYearr(e.target.value);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>Stream </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="SCIENCE"
                        value={stream}
                        onChange={(e) => {
                          const re = /^[A-Za-z]+$/;
                          if (e.target.value === "" || re.test(e.target.value))
                            setStream(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>Percentage/CGPA </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="CGPA"
                        value={percentagee}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (e.target.value === "" || re.test(e.target.value))
                            setPercentagee(e.target.value);
                        }}
                      />
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
                      <div className="heading">University </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="AKTU"
                        value={university}
                        onChange={(e) => {
                          const re = /^[A-Za-z]+$/;
                          if (e.target.value === "" || re.test(e.target.value))
                            setUniversity(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>College </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="St.Stephen"
                        value={college}
                        onChange={(e) => {
                          const re = /^[A-Za-z]+$/;
                          if (e.target.value === "" || re.test(e.target.value))
                            setCollege(e.target.value);
                        }}

                      />
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>Passing Year </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="2000"
                        value={yearrr}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (e.target.value === "" || re.test(e.target.value))
                            setYearrr(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>DEGREE </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="GRADUATE"
                        value={degree}
                        onChange={(e) => {
                          const re = /^[A-Za-z]+$/;
                          if (e.target.value === "" || re.test(e.target.value))
                            setDegree(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>SPECIALISATION </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Sci."
                        value={specialisationn}
                        onChange={(e) => {
                          const re = /^[A-Za-z]+$/;
                          if (e.target.value === "" || re.test(e.target.value))
                            setSpecialisationn(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className={styles["box"]}>
                      <div>Percentage/CGPA </div>
                      <Form.Control
                        required
                        type="text"
                        placeholder="9.8"
                        minLength={4}
                        maxLength={4}
                        value={percentageee}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (e.target.value === "" || re.test(e.target.value))
                            setPercentageee(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <Button variant="secondary" type="submit">
                  Submit{" "}
                </Button>
              </div>
            </Form>
        </Modal.Body>
      </Modal>
      </>

  );
}


export default Educational;
