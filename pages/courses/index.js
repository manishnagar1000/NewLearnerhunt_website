import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FormControl, Button, Typography, Slider } from "@mui/material";
import FilterComponent from "../../components/FilterComponent";
import CourseCard from "@/components/CourseCard";
import CircularProgress from "@mui/material/CircularProgress";
import CourseName from "./[slug]";
import { useRouter } from "next/router";
import AppliedFilterList from "../../components/AppliedFilterList";
import TuneIcon from "@mui/icons-material/Tune";
import Classes from "../../styles/filter.module.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function index(testeligibility, filterCollege) {

  
  const router = useRouter();

    const [searchResults, setSearchResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [coursesType,setCourseType] = React.useState("")
  const FilterCoursedata = [
    {
      name: "Undergraduate",
      type: "ug",
    },
    {
      name: "Postgraduate",
      type: "pg",
    },
  ];
  const CourseFilterData = async (course) => {
    setIsLoading(true);
    // console.log(course)
    try {
      
      const filterCollege_res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/courses?limit=-1&page=0&type=${course}`
      );
      const filterCollege = await filterCollege_res.json();
    //   console.log(filterCollege)
      setSearchResults(filterCollege.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching filtered colleges:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const { query } = router;
    // console.log(query);

    if (Object.keys(query).length > 0) {
    //   console.log('coming')
      const course = query.course;
      if(course){
        setCourseType(course);
      }
      CourseFilterData(course);
    } else {
      const course = "ug"
      setCourseType(course)
      CourseFilterData(course);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
 
    if(coursesType){
      url.searchParams.set("course", coursesType);
    }
    window.history.replaceState({}, "", url);
  }, [coursesType]);

  const HandleChangeFilter = (value) => {
    let element = document.getElementById("filter-cont");
    if (value == "open") {
      element.classList.add(`${Classes.filter_open}`);
      element.classList.remove(`${Classes.filter_close}`);
    } else if (value == "close") {
      element.classList.add(`${Classes.filter_close}`);
      element.classList.remove(`${Classes.filter_open}`);
    }
    // setHandleClickFilter(!showToggleMenu);
  };
  const handleCourseSelect = (e) => {
    // console.log(e.target.value);
    setCourseType(e.target.value);
    CourseFilterData(e.target.value);

    // Update filtered data based on selected zone
  };

  return (
    <div className="my-5">
      <Container>
        <Row>
        {/* <Col md={3}>
            <FilterComponent
              heading="Course Type"
              FilterType={FilterCoursedata}
              accessKey="type"
              Selectedfilter={coursesType}
              onSelect={handleCourseSelect}

            />
          </Col> */}
           <Col md={3} id="filter-cont" className={Classes.filter_container}>
            <div className={Classes.filter_header}>
              <div className={Classes.filter_title}>
                <div onClick={() => {HandleChangeFilter("close")}}><ArrowBackIcon /></div>
                <div>FILTERS</div>
              </div>
            </div>
                <FilterComponent
                type="ourcourses"
                Selectedfilter={coursesType}
                heading="OurCourses"
                accessKey="type"
                FilterType={FilterCoursedata}
              onSelect={handleCourseSelect}

              />
               <div
              className={Classes.filterDoneBtn}
              id="filterBtn"
              onClick={() => {
                HandleChangeFilter("close");
              }}
            >
              View Colleges
            </div>
          </Col>
          <Col md={9}>
          <div className={Classes["advance-filter-main"]}>
              <div
                className={Classes["advance-filter"]}
                onClick={() => {
                  HandleChangeFilter("open");
                }}
              >
                <TuneIcon /> Advance Filter
              </div>
            </div>
            <AppliedFilterList
              course={coursesType}
            />
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

