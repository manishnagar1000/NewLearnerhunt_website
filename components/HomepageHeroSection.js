import React, { useState } from "react";
import Classes from "../styles/HomePageHero.module.css";
import { useRouter } from "next/router";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Slider,
} from "@mui/material";
import SearchModal from "./SearchModal";

const SelectionBtns = [
  {
    value: 0,
    label: "Test Your Eligibility",
  },
  {
    value: 1,
    label: "Free Counselling",
  },
  {
    value: 2,
    label: "Explore Colleges",
  },
];

const qualificationdata = {
  ug: [
    "PCM 50%-55%",
    "PCM 55%-60%",
    "PCM 60%-65%",
    "PCM 70%-75%",
    "PCM 75%-80%",
    "PCM 80%-85%",
    "PCM 85%-above",
  ],
  pg: [
    "Graduation 50%-55%",
    "Graduation 55%-60%",
    "Graduation 60%-65%",
    "Graduation 70%-75%",
    "Graduation 75%-80%",
    "Graduation 80%-85%",
    "Graduation 85%-above",
  ],
};

const HomepageHeroSection = ({ data }) => {
  // console.log(data)

  const [fee, setFee] = useState(200000);
  const [activeBtn, setActiveBtn] = useState(SelectionBtns[0].value);
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");
  const [examAppears, setExamAppears] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedRanking, setSelectedRanking] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const router = useRouter();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("working");
    if (activeBtn == "2") {
      router.push(
        `/colleges?course=${selectedCourse}&zone=${selectedLocation}&rating=${selectedRanking}`
      );
    } else if (activeBtn == "0") {
      router.push(
        `/colleges?course=${selectedCourse}&zone=${selectedLocation}&fee=${fee}`
      );
    }
  };
  const handleSliderChange = (event, newValue) => {
    setFee(newValue);
  };
  const formatFeeLabel = (value) => {
    if (value >= 100000) {
      return `${value / 100000} Lakhs`;
    }
    return value;
  };
  return (
    <div className={Classes["hero-section"]}>
      <div className={Classes["overlay"]}></div>
      <div className="container" style={{ zIndex: 2, position: "relative" }}>
        <div className="row">
          <div className="col-md-10 col-lg-6 mx-auto">
            <div
              className={Classes["search-box"]}
              onClick={() => setIsSearchModalOpen(true)}
            >
              <div className={Classes["search-bar"]}>
                {/* <img src="/assets/images/search.png" alt="" /> */}
                <span>Search colleges, exams, courses & more.</span>
              </div>
              <div className={Classes["search-btn"]}>
                {" "}
                <img src="/assets/images/search.png" alt="" />{" "}
              </div>
            </div>
            <div className={Classes["buttons-section"]}>
              {SelectionBtns.map((btn, i) => {
                return (
                  <button
                    key={i}
                    className={activeBtn === i ? Classes["active"] : ""}
                    onClick={() => setActiveBtn(i)}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
            <div className={Classes["hero-form"]}>
              <span className={Classes["heading"]}>
                {SelectionBtns.find((btn) => btn.value == activeBtn).label}
              </span>
              <form action="#" onSubmit={handleFormSubmit}>
                <div className="row">
                  {activeBtn == "0" ? (
                    <>
                      <div className="col-md-6">
                        <TextField
                          className="rounded-lg"
                          required
                          fullWidth
                          margin="normal"
                          label="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          size="small"
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          className="rounded-lg"
                          fullWidth
                          required
                          margin="normal"
                          type="text"
                        inputProps={{minLength:10,maxLength:10}}
                          label="Contact Number"
                          value={contact}
                          onChange={(e) => setContact(e.target.value.replace(/\D/g, ""))}
                          size="small"
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-6">
                        <FormControl
                          required
                          size="small"
                          className="rounded-lg"
                          fullWidth
                          margin="normal"
                        >
                          <InputLabel>Location</InputLabel>
                          <Select
                            value={selectedLocation}
                            label="Location"
                            onChange={(e) =>
                              setSelectedLocation(e.target.value)
                            }
                          >
                            <MenuItem value="" disabled>
                              <em>Select</em>
                            </MenuItem>
                            {data?.zones.map((zone, i) => {
                              return (
                                <MenuItem key={i} value={zone.name}>
                                  {zone.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-md-6">
                        <FormControl
                          required
                          size="small"
                          className="rounded-lg"
                          fullWidth
                          margin="normal"
                        >
                          <InputLabel>Courses</InputLabel>
                          <Select
                            value={selectedCourse}
                            label="Courses"
                            onChange={(e) => setSelectedCourse(e.target.value)}
                          >
                            <MenuItem value="" disabled>
                              <em>Select</em>
                            </MenuItem>
                            {data.courses.map((c, i) => {
                              return (
                                <MenuItem key={i} value={c.course}>
                                  {c.course}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                      {selectedCourse != "" && (
                        <>
                          <div className="col-md-6">
                            <FormControl
                              size="small"
                              className="rounded-lg"
                              fullWidth
                              margin="normal"
                            >
                              <InputLabel>Specialization</InputLabel>
                              <Select
                                value={selectedSpecialization}
                                label="Specialization"
                                onChange={(e) =>
                                  setSelectedSpecialization(e.target.value)
                                }
                              >
                                <MenuItem value="" disabled>
                                  <em>Select</em>
                                </MenuItem>
                                {data.courses
                                  .find((c) => c.course == selectedCourse)
                                  .specialization.map((s, i) => {
                                    return (
                                      <MenuItem key={i} value={s}>
                                        {s}
                                      </MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-md-6">
                            <FormControl
                              required
                              size="small"
                              className="rounded-lg"
                              fullWidth
                              margin="normal"
                            >
                              <InputLabel>Qualification</InputLabel>
                              <Select
                                value={selectedQualification}
                                label="Qualification"
                                onChange={(e) =>
                                  setSelectedQualification(e.target.value)
                                }
                              >
                                <MenuItem value="" disabled>
                                  <em>Select</em>
                                </MenuItem>
                                {qualificationdata[
                                  data.courses.find(
                                    (c) => c.course == selectedCourse
                                  ).type
                                ].map((q, i) => {
                                  return (
                                    <MenuItem key={i} value={q}>
                                      {q}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </div>
                          {selectedQualification != "" && (
                            <div className="col-md-6">
                              <FormControl
                                size="small"
                                className="rounded-lg"
                                fullWidth
                                margin="normal"
                              >
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                  Entrance Exam
                                </FormLabel>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                  value={examAppears}
                                  onChange={(e) =>
                                    setExamAppears(e.target.value)
                                  }
                                >
                                  <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    label="Appear"
                                  />
                                  <FormControlLabel
                                    value="0"
                                    control={<Radio />}
                                    label="Non Appear"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>
                          )}
                        </>
                      )}
                      {examAppears != "" && examAppears != "0" && (
                        <div className="col-md-6">
                          <FormControl
                            size="small"
                            className="rounded-lg"
                            fullWidth
                            margin="normal"
                          >
                            <InputLabel>Exam*</InputLabel>
                            <Select
                              value={selectedExam}
                              label="Exam*"
                              onChange={(e) => setSelectedExam(e.target.value)}
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {data.courses
                                .find((c) => c.course == selectedCourse)
                                .entrance_exam.map((e, i) => {
                                  return (
                                    <MenuItem key={i} value={e}>
                                      {e}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </div>
                      )}
                      <div className="col-12 px-4">
                        <FormControl
                          size="small"
                          className="rounded-lg"
                          fullWidth
                          margin="normal"
                        >
                          <Typography id="input-slider" gutterBottom>
                            Fees
                          </Typography>
                          <Slider
                            value={fee}
                            onChange={handleSliderChange}
                            min={200000}
                            max={5000000}
                            step={100000}
                            marks={[{ value: fee, label: formatFeeLabel(fee) }]}
                            aria-labelledby="fee-slider"
                          />
                        </FormControl>
                      </div>
                      <div className="col-12">
                        <div className={Classes["submit-btn"]}>
                          <input type="submit" />
                        </div>
                      </div>
                    </>
                  ) : activeBtn == "1" ? (
                    <div className={Classes["free-counselling"]}>
                      <p>Toll Free Number</p>
                      <p>+91 1294631199</p>
                    </div>
                  ) : (
                    activeBtn == "2" && (
                      <>
                        <div className="col-md-4">
                          <FormControl
                            required
                            size="small"
                            className="rounded-lg"
                            fullWidth
                            margin="normal"
                          >
                            <InputLabel>Courses</InputLabel>
                            <Select
                              value={selectedCourse}
                              label="Courses"
                              onChange={(e) =>
                                setSelectedCourse(e.target.value)
                              }
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {data.courses.map((c, i) => {
                                return (
                                  <MenuItem key={i} value={c.course}>
                                    {c.course}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-4">
                          <FormControl
                            required
                            size="small"
                            className="rounded-lg"
                            fullWidth
                            margin="normal"
                          >
                            <InputLabel>Location</InputLabel>
                            <Select
                              value={selectedLocation}
                              label="Location"
                              onChange={(e) =>
                                setSelectedLocation(e.target.value)
                              }
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {data?.zones.map((zone, i) => {
                                return (
                                  <MenuItem key={i} value={zone.name}>
                                    {zone.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-4">
                          <FormControl
                            required
                            size="small"
                            className="rounded-lg"
                            fullWidth
                            margin="normal"
                          >
                            <InputLabel>Ratings</InputLabel>
                            <Select
                              value={selectedRanking}
                              label="Ratings"
                              onChange={(e) =>
                                setSelectedRanking(e.target.value)
                              }
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {data.ratings.map((r, i) => {
                                return (
                                  <MenuItem key={i} value={r.value}>
                                    {r.label}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-12">
                          <div className={Classes["submit-btn"]}>
                            <input type="submit" />
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isSearchModalOpen && (
        <SearchModal onHide={() => setIsSearchModalOpen(false)} />
      )}
    </div>
  );
};

export default HomepageHeroSection;
