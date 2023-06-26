import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Classes from "/styles/TopExam.module.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';

export default function TopExams({ exams }) {
  // console.log(exams)
  const [loadingExams, setLoadingExams] = useState([]);

  const handleExamClick = (examSlug) => {
    setLoadingExams((prevLoadingExams) => [...prevLoadingExams, examSlug]);
  };

  return (
    <div id="examId" className="container  my-5">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Top Exams</h2>
        <Link href={"/exams"}>
          <Button className={Classes.linkButton}>Explore More<ArrowOutwardOutlinedIcon  style={{marginLeft:"2px"}}/></Button>
        </Link>
      </div>
      <div className="row">
        {exams.map((exam,i) => (
             <div key={i} className="col-lg-3 col-md-6 mb-3">
          <div className={Classes.card} key={exam.slug}>
            <div className={Classes.logo}>
              <img src={exam.exam_logo} alt={exam.examname_short} />
            </div>
            <div className={Classes.info}>
              <h4 className={Classes.name}>{exam.exam_name}</h4>
              <p className={Classes.fullName}>{exam.exam_full_name}</p>
              <div className={Classes.details}>
                <span className={Classes.detailLabel}>Exam Date:</span>
              <p className={Classes.fullName}>{exam.exam_date}</p>

              {/* {exam.exam_dates.map((e,i)=>{
                return(
                  <>
                  <span className={Classes.detailValue}>{e.date}</span>
                  {i!=exam.exam_dates.length - 1 && ","}
                  </>

                )
              })} */}
              </div>
              <div className={Classes.details}>
                <span className={Classes.detailLabel}>Exam Mode:</span>
                <span className={Classes.detailValue}>{exam.exam_pattern[0].mode}</span>
              </div>
            </div>
            <div className={Classes.buttonContainer}>
            <Link href={`/exams/${exam.slug}`}>
              {loadingExams.includes(exam.slug) ? (
                <Button variant="danger">Loading...</Button>
              ) : (
                <Button
                className={Classes.linkButton}
                  onClick={() => handleExamClick(exam.slug)}
                >
                   <span style={{marginRight:"3px"}}><VisibilityIcon fontSize="inherit"/></span>  View Exams
                </Button>
              )}
            </Link>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}
