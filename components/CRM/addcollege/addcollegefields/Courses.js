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

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      coursedesc: "",
      coursename: "",
      coursefee: "",
      eligibilitycriteria: "",
      coursetotalintake: "",
      studymode: "",
      examaccepted: "",
      courseduration: "",
      avaragefee: "",
      coursespecilization: [],
      selectedClg: "",
    };
  }
 

  handleCourse = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    var formData = new FormData();
    formData.append("college_id", this.state.selectedClg);
    formData.append("course_description", this.state.courseduration);
    formData.append("course_name", this.state.coursename);
    formData.append("course_annual_fees", this.state.coursefee);
    formData.append("eligibility_criteria", this.state.eligibilitycriteria);
    formData.append("course_total_intake", this.state.coursetotalintake);
    formData.append("study_mode", this.state.studymode);
    formData.append("exam_accepted", this.state.examaccepted);
    formData.append("course_duration", this.state.courseduration);
    formData.append("avg_fees", this.state.avaragefee);
    formData.append("course_specialization", this.state.coursespecilization);


    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/add-college-course", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
      body: formData,
    })
      .then(async (response) => {
        console.log(response);
        this.setState({  isLoading: false})
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
                coursedesc: "",
                coursename: "",
                coursefee: "",
                eligibilitycriteria: "",
                coursetotalintake: "",
                studymode: "",
                examaccepted: "",
                courseduration: "",
                avaragefee: "",
                coursespecilization: [],
                selectedClg: ""},
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
  };
  render() {
    const { collegeList } = this.props;
    return (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
          <form action="#" onSubmit={(e) => this.handleCourse(e)}>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label className={Classes["labelname"]} htmlFor="colleges">
                    Colleges <span className={Classes["error"]}>*</span>
                  </label>
                  <select
                    name="colleges"
                    id="colleges"
                    className="form-select"
                    required
                    value={this.state.selectedClg}
                    onChange={(e) =>
                      this.setState({ selectedClg: e.target.value })
                    }
                  >
                    <option disabled value="">
                      Select a college
                    </option>
                    {collegeList.map((c, i) => {
                      return (
                        <option disabled={c.disabled} key={i} value={c._id}>
                          {c.college_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">
                    Course Description{" "}
                  </label>
                  <textarea
                    type="text"
                    rows={4}
                    className="form-control"
                    placeholder="Enter Description"
                    value={this.state.coursedesc}
                    onChange={(e) =>
                      this.setState({ coursedesc: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">
                    Course Name <span className={Classes["error"]}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Course Name"
                    required
                    value={this.state.coursename}
                    onChange={(e) =>
                      this.setState({ coursename: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">
                    Course Annual Fee{" "}<span className={Classes["error"]}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="eg: 5000000"
                    minLength={2}
                    maxLength={7}
                    required
                    value={this.state.coursefee}
                    onChange={(e) =>
                      this.setState({
                        coursefee: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">
                    Eligibility Criteria (Percentage){" "}
                    <span className={Classes["error"]}>*</span>
                  </label>
                  <input
                    type="text"
                    minLength={0}
                    maxLength={2}
                    className="form-control"
                    placeholder="eg: 50"
                    required
                    value={this.state.eligibilitycriteria}
                    onChange={(e) =>
                      this.setState({
                        eligibilitycriteria: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">
                    Total Intake{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Course Total Intake"
                    value={this.state.coursetotalintake}
                    onChange={(e) =>
                      this.setState({
                        coursetotalintake: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">
                    Study Mode <span className={Classes["error"]}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Course Study Mode"
                    required
                    value={this.state.studymode}
                    onChange={(e) =>
                      this.setState({ studymode: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">
                    Exam Accepted <span className={Classes["error"]}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Course Exam Accepted"
                    required
                    value={this.state.examaccepted}
                    onChange={(e) =>
                      this.setState({ examaccepted: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">
                    Course Duration <span className={Classes["error"]}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Course Course Duration"
                    required
                    value={this.state.courseduration}
                    onChange={(e) =>
                      this.setState({ courseduration: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">
                    Avarage Fee <span className={Classes["error"]}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="eg: 5000000"
                    required
                    minLength={2}
                    maxLength={7}
                    value={this.state.avaragefee}
                    onChange={(e) =>
                      this.setState({
                        avaragefee: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">
                    Course Specialization (Tags){" "}
                    <span className={Classes["error"]}>*</span>
                  </label>
                  {/* input tag  */}
                  <MultipleTagsInput
                    placeholder="Course Specialization"
                    value={this.state.coursespecilization}
                    required
                    onChange={(values) =>
                      this.setState({ coursespecilization: values })
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <CTA title="Create" />
                </div>
              </div>
            </div>
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
