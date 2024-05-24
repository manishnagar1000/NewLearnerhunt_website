import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import Loading from "/components/Comps/Loading";
import YearList from "@/components/Comps/YearList";
import Badge from "@mui/material/Badge";
// const baseurl = sessionStorage.getItem("apipathurl");
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MultipleTagsInput from "@/components/Comps/MultipleTagsInput";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { coursenameList } from "@/components/Comps/type";
import { courseeligibiltyCriteria } from "@/components/Comps/type";
import { coursestudymode } from "@/components/Comps/type";
import { courseduration } from "@/components/Comps/type";
import AddClgTopbar from "@/components/Comps/AddClgTopbar";

const numberKeys = ["course_annual_fees", "course_total_intake", "avg_fees"];
const courseLabels = coursenameList.map((course) => course.label);
const eligibilityLabels = courseeligibiltyCriteria.map(
  (course) => course.label
);
const studyLabels = coursestudymode.map((course) => course.label);
const durationLabels = courseduration.map((course) => course.label);

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courseFields: [],
      iscollegeListEmpty: false,
      selectedClg: "",
    };
  }

  getDataCourses = () => {
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/admin/get-college-info?tab=2&id=${this.props.edit_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
      }
    ).then(async (res) => {
      let response = await res.json();

      // console.log(response.data);
      if (response.error) {
        this.setState({ isError: true, errorMsg: response.error });
      } else {

        if(response.data == null || response.data== undefined){
          this.setState(
            {
              courseFields: [],
             },
          )
        }else{
          const { courses } = response.data;

          this.setState(
            {
              courseFields: courses.map((c) => {
                return {
                  ...c,
                  course_specialization: c.course_specialization
                    ? c.course_specialization.split(",")
                    : [],
                };
              }),
            },
            () => console.log(this.state.courseFields)
          );
        }

      
      }
    });
  };
  componentDidMount() {
    this.setState({
      selectedClg: this.props.edit_id,
    });
    if (this.props.edit_id) {
      this.getDataCourses();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.edit_id != this.props.edit_id) {
      this.setState({
        courseFields: [],
      });
    }
  }
  handleCourse = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to save the data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.props.edit_id) {
          this.setState({ isLoading: true });
          var formData = new FormData();
          let courses = this.state.courseFields.map((obj) => {
            let newobj = {
              ...obj,
              course_specialization: obj.course_specialization.join(","),
            };
            return newobj;
          });
          formData.append("courses", JSON.stringify(courses));
  
          fetch(
            process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/edit-college-info?tab=2&id=${this.props.edit_id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("pt")}`,
              },
              body: formData,
            }
          )
            .then(async (response) => {
              // console.log(response.data);
              this.setState({ isLoading: false });
              if (response.ok) {
                var res = await response.json();
                Swal.fire({
                  title: "Success",
                  text: `${res.message}`,
                  icon: "success",
                  confirmButtonText: "Ok",
                }).then(()=>{
                  this.getDataCourses()
                })
              } else {
                var res = await response.json();
                Swal.fire({
                  title: "error",
                  text: `${res.error}`,
                  icon: "error",
                  confirmButtonText: "Ok",
                }).then(() => {
                  this.setState({ isLoading: false });
                });
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
       
        }
        else{
           this.setState({ isLoading: true });
        var formData = new FormData();
        formData.append("college_id", this.state.selectedClg);
        let courses = this.state.courseFields.map((obj) => {
          let newobj = {
            ...obj,
            course_specialization: obj.course_specialization.join(","),
          };
          return newobj;
        });
        formData.append("courses", JSON.stringify(courses));

        fetch(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/add-college-course",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pt")}`,
            },
            body: formData,
          }
        )
          .then(async (response) => {
            // console.log(response.data);
            this.setState({ isLoading: false });
            if (response.ok) {
              var res = await response.json();
              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then(() => {
                this.setState(
                  {
                    coursespecilization: [],
                    selectedClg: "",
                  },
                  () => this.props.onSuccess()
                );
              });
            } else {
              var res = await response.json();
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              }).then(() => {
                this.setState({ isLoading: false });
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        }
      }



    });
  };

  onFieldChange(index, field, value, curFields, box) {
    const updatedFields = [...curFields];
    if (numberKeys.includes(field)) {
      updatedFields[index][field] = value.replace(/\D/g, "");
    } else {
      updatedFields[index][field] = value;
    }

    if (box === "1") {
      this.setState({
        courseFields: updatedFields,
      });
    }
  }
  addNewField = (box) => {
    if (box === "1") {
      this.setState((prevState) => ({
        courseFields: [
          ...prevState.courseFields,
          {
            course_description: "",
            course_name: "",
            course_annual_fees: "",
            eligibility_criteria: "",
            course_total_intake: "",
            study_mode: "",
            exam_accepted: "",
            course_duration: "",
            avg_fees: "",
            course_specialization: [],
          },
        ],
      }));
    }
  };
  deleteField(i, curFields, box) {
    const fields = [...curFields];
    fields.splice(i, 1);
    if (box === "1") {
      this.setState({
        courseFields: fields,
      });
    }
  }
  render() {
    // console.log(this.state.courseFields);
    // const { collegeList } = this.props;
    return (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
          <form action="#" onSubmit={(e) => this.handleCourse(e)}>
            {!this.props.edit_id && (
              <>
                <AddClgTopbar
                  onclgchange={(id) => this.setState({ selectedClg: id })}
                  selectedClg={this.state.selectedClg}
                  iscollegeListEmpty={(x) =>
                    this.setState({ iscollegeListEmpty: x })
                  }
                />
                <hr />
              </>
            )}
            {!this.state.iscollegeListEmpty ? (
              this.state.selectedClg != "" ? (
                <div>
                  <div className="row">
                    <div
                      className="col-md-12 border mb-3"
                      style={{ backgroundColor: "#ededed" }}
                    >
                      <h3 style={{ padding: "0.5rem 0rem" }}>
                        Courses{" "}
                        <Badge
                          badgeContent={this.state.courseFields.length}
                          color="primary"
                        >
                          <ApartmentIcon color="action" />
                        </Badge>
                      </h3>
                      {this.state.courseFields.map((field, i) => {
                        // console.log('rerendering',i)
                        return (
                          <div className="row" key={i}>
                            <div className="col-md-11">
                              <div className={Classes["form-group"]}>
                                <label
                                  className={Classes["labelname"]}
                                  htmlFor="name"
                                >
                                  Course Description{" "}
                                </label>
                                <textarea
                                  type="text"
                                  rows={4}
                                  className="form-control"
                                  placeholder="Enter Description"
                                  value={field.course_description}
                                  onChange={(e) =>
                                    this.onFieldChange(
                                      i,
                                      "course_description",
                                      e.target.value,
                                      this.state.courseFields,
                                      "1"
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className={Classes["form-group"]}>
                                <label
                                  className={Classes["labelname"]}
                                  htmlFor="name"
                                >
                                  Course Name{" "}
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Course Name"
                                  required
                                  value={field.course_name}
                                  onChange={(e) =>
                                    this.onFieldChange(
                                      i,
                                      "course_name",
                                      e.target.value,
                                      this.state.courseFields,
                                      "1"
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className={Classes["form-group"]}>
                                <label
                                  className={Classes["labelname"]}
                                  htmlFor="name"
                                >
                                  Course Annual Fee{" "}
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="eg: 5000000"
                                  minLength={2}
                                  maxLength={7}
                                  required
                                  value={field.course_annual_fees}
                                  onChange={(e) =>
                                    this.onFieldChange(
                                      i,
                                      "course_annual_fees",
                                      e.target.value,
                                      this.state.courseFields,
                                      "1"
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className={Classes["form-group"]}>
                                <label
                                  className={Classes["labelname"]}
                                  htmlFor="name"
                                >
                                  Eligibility Criteria (Percentage){" "}
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <select
                                  name="eligibility_criteria"
                                  id="eligibility_criteria"
                                  className="form-select"
                                  required
                                  value={field.eligibility_criteria}
                                  onChange={(event, newValue) =>
                                    this.onFieldChange(
                                      i,
                                      "eligibility_criteria",
                                      newValue,
                                      this.state.courseFields,
                                      "1"
                                    )
                                  }
                                >
                                  <option disabled value="">
                                    Select a Category Type
                                  </option>
                                  {courseeligibiltyCriteria.map((d, i) => {
                                    return (
                                      <option key={i} value={d.label}>
                                        {d.label}
                                      </option>
                                    );
                                  })}
                                </select>
                                {/* <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={eligibilityLabels}
  size="small"
  onChange={(event, newValue) =>
    this.onFieldChange(
      i,
      "eligibility_criteria",
      newValue,
      this.state.courseFields,
      "1"
    )
  }
  style={{ background: "white" }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Enter Eligibility Criteria"
      required
    />
  )}
/> */}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className={Classes["form-group"]}>
                                <label
                                  className={Classes["labelname"]}
                                  htmlFor="name"
                                >
                                  Total Intake{" "}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Course Total Intake"
                                  value={field.course_total_intake}
                                  onChange={(e) =>
                                    this.onFieldChange(
                                      i,
                                      "course_total_intake",
                                      e.target.value,
                                      this.state.courseFields,
                                      "1"
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className={Classes["form-group"]}>
                                <label
                                  className={Classes["labelname"]}
                                  htmlFor="name"
                                >
                                  Study Mode{" "}
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <select
                                  name="study_mode"
                                  id="study_mode"
                                  className="form-select"
                                  required
                                  value={field.study_mode}
                                  onChange={(event, newValue) =>
                                    this.onFieldChange(
                                      i,
                                      "study_mode",
                                      newValue,
                                      this.state.courseFields,
                                      "1"
                                    )
                                  }
                                >
                                  <option disabled value="">
                                    Select a Category Type
                                  </option>
                                  {coursestudymode.map((d, i) => {
                                    return (
                                      <option key={i} value={d.label}>
                                        {d.label}
                                      </option>
                                    );
                                  })}
                                </select>
                                {/* <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={studyLabels}
  size="small"
  onChange={(event, newValue) =>
    this.onFieldChange(
      i,
      "study_mode",
      newValue,
      this.state.courseFields,
      "1"
    )
  }
  style={{ background: "white" }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Select Study Mode"
      required
    />
  )}
/> */}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className={Classes["form-group"]}>
                                <label
                                  className={Classes["labelname"]}
                                  htmlFor="name"
                                >
                                  Exam Accepted
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Course Exam Accepted"
                                  value={field.exam_accepted}
                                  onChange={(e) =>
                                    this.onFieldChange(
                                      i,
                                      "exam_accepted",
                                      e.target.value,
                                      this.state.courseFields,
                                      "1"
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-1">
                              <div className={Classes.dltIcon}>
                                <Tooltip
                                  title="Delete"
                                  onClick={() =>
                                    this.deleteField(
                                      i,
                                      this.state.courseFields,
                                      "1"
                                    )
                                  }
                                >
                                  <IconButton>
                                    <DeleteIcon style={{ color: "red" }} />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className={Classes["form-group"]}>
                                <label
                                  className={Classes["labelname"]}
                                  htmlFor="name"
                                >
                                  Course Duration{" "}
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <select
                                  name="course_duration"
                                  id="course_duration"
                                  className="form-select"
                                  required
                                  value={field.course_duration}
                                  onChange={(event, newValue) =>
                                    this.onFieldChange(
                                      i,
                                      "course_duration",
                                      newValue,
                                      this.state.courseFields,
                                      "1"
                                    )
                                  }
                                >
                                  <option disabled value="">
                                    Select a Category Type
                                  </option>
                                  {courseduration.map((d, i) => {
                                    return (
                                      <option key={i} value={d.label}>
                                        {d.label}
                                      </option>
                                    );
                                  })}
                                </select>
                                {/* <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={durationLabels}
  size="small"
  onChange={(event, newValue) =>
    this.onFieldChange(
      i,
      "course_duration",
      newValue,
      this.state.courseFields,
      "1"
    )
  }
  style={{ background: "white" }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Enter Course Duration"
      required
    />
  )}
/> */}
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className={Classes["form-group"]}>
                                <label
                                  className={Classes["labelname"]}
                                  htmlFor="name"
                                >
                                  Avarage Fees
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="eg: 5000000"
                                  minLength={2}
                                  maxLength={7}
                                  value={field.avg_fees}
                                  onChange={(e) =>
                                    this.onFieldChange(
                                      i,
                                      "avg_fees",
                                      e.target.value,
                                      this.state.courseFields,
                                      "1"
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className={Classes["form-group"]}>
                                <label
                                  className={Classes["labelname"]}
                                  htmlFor="name"
                                >
                                  Course Specialization (Tags){" "}
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <MultipleTagsInput
                                  placeholder="Course Specialization"
                                  value={field.course_specialization}
                                  required
                                  onChange={(values) =>
                                    this.onFieldChange(
                                      i,
                                      "course_specialization",
                                      values,
                                      this.state.courseFields,
                                      "1"
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <hr />
                          </div>
                        );
                      })}
                      <span
                        className="add-more-btn"
                        onClick={() => this.addNewField("1")}
                      >
                        + Add More
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <CTA title={this.props.edit_id ? "Update" : "Create"} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={Classes["select-clg"]}>
                  <p>Please Select a College</p>
                </div>
              )
            ) : (
              <div className={Classes["select-clg"]}>
                <p>Create a College from General Info</p>
              </div>
            )}
          </form>
        </div>
        {
          <Loading
            show={this.state.isLoading}
            onHide={() => this.setState({ isLoading: false })}
          />
        }
      </div>
    );
  }
}
