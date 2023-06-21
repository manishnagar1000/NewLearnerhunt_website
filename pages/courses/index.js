import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FormControl, Button, Typography, Slider } from "@mui/material";
import FilterComponent from "../../components/FilterComponent";
import CourseCard from "@/components/CourseCard";
import CircularProgress from "@mui/material/CircularProgress";
import CourseName from "./[slug]";

export default function index(testeligibility, filterCollege) {
    const [searchResults, setSearchResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);


  const coursesdata = async() =>{
    setIsLoading(true)
    const filterCourse_res =  await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/courses?limit=-1&page=0");
    const filterCourse =  await filterCourse_res.json();
    console.log(filterCourse)
    setSearchResults(filterCourse.data);
    setIsLoading(false);
  }
    useEffect(() => {
        coursesdata()
      }, []);
  return (
    <div className="my-5">
      <Container>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between align-items-center ">
              <h4 className="font-bold mb-4" style={{color:"#0151c1"}}>Courses</h4>
           
            </div>
            <div style={{ overflow: "auto", height: "400px" }}>
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <CircularProgress color="inherit" size={30} />
                </div>
              ) :(
                <div className="grid grid-cols-1 gap-4">
                  {searchResults.map((course) => (
                    <CourseCard key={course.slug} course={course} />
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

