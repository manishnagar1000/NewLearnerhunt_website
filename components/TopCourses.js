import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Classes from "/styles/TopCourses.module.css";

export default function TopCourses({ courses }) {
  console.log(courses);
  const [loadingColleges, setLoadingColleges] = useState([]); // Added loadingColleges state
  const handleCollegeClick = (collegeId) => {
    setLoadingColleges((prevLoadingColleges) => {
      return [...prevLoadingColleges, collegeId]; // Add collegeId to the loadingColleges array
    });
  };
  return (
    <>
    <section id="courseId" className=" container  my-5" >
      <div  className=" d-flex justify-content-between align-items-center my-4">
        <h2>Top Courses</h2>
        <Link href={"/courses"}>
          <Button className={Classes.linkButton}>Explore More</Button>
        </Link>
      </div>
        <div className="row">
        {courses.map((s) => {
          return(
        <div className="col-lg-4 col-md-6 mb-3">

        <Card className={Classes["course-card"]}>
      <Card.Body>
        <Card.Title className={Classes["course-title"]}>{s.course_name}</Card.Title>
        <div className={Classes["course-info"]}>
          <div className={Classes["course-details"]}>
            <span className={Classes["course-detail-label"]}>Duration:</span>
            <span className={Classes["course-detail-value"]}>{s.course_description[0].course_duration}</span>
          </div>
          <div className={Classes["course-details"]}>
            <span className={Classes["course-detail-label"]}>Fees:</span>
            <span className={Classes["course-detail-value"]}>{s.course_description[0].annual_course_fee}</span>
          </div>
        </div>
        <Link href={`/courses/${s.slug}`}>
                  {loadingColleges.includes(s.slug) ? (
                    <Button variant="danger">Loading...</Button>
                  ) : (
                    <Button
                    className={Classes.linkButton}
                      onClick={() => handleCollegeClick(s.slug)}
                    >
                      <>View Course</>
                    </Button>
                  )}
                </Link>
      </Card.Body>
    </Card>
    </div>

          )}
)}
    </div>
        </section>
    </>
  );
}
