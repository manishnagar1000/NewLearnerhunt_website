import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import Swal from "sweetalert2";
import CTA from "/components/Comps/CTA";
import Loading from "/components/Comps/Loading";
import { IndianStates } from "/components/Comps/StatesIndia";
import Badge from "@mui/material/Badge";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MultipleTagsInput from "@/components/Comps/MultipleTagsInput";
import ApartmentIcon from '@mui/icons-material/Apartment';
import { TextField } from "@mui/material";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
export default class Gernal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiHitComplete: true,
      isDataFound: false,
      courseslug: "",
      course_type: "",
      course_name: "",
      course_full_name: "",
      what_is_course: "",
      why_pursue_course: "",

      course_eligibility: "",
      course_admission_process: "",
      course_entrance_exams_description: "",
      course_specialisations_description: "",
      course_specialisations: [],
      course_curriculum_description: "",
      course_curriculum_specialisations: [],
      top_ranked_colleges_description: "",
      top_ten_private_colleges_description: "",
      top_recruiters_for_course_graduates_description: "",
      top_recruiters_for_course_graduates: [],

      courseDescription: [
        {
          degree_name: "",
          known_as: "",
          degree_level: "",
          course_duration: "",
          admission_process: [],
          annual_course_fee: "",
          top_institutes: [],
          top_recruiters: [],
          specialisation: [],
        },
      ],
      courseEntranceExams: [],
      topRankedColleges: [],
      topTenPrivateColleges: [],
      Faqs: [],

      isLoading: false,
      isError: false,
      errorMsg: "",
    };
  }

  componentDidMount() {
    if (this.props.edit_id) {
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/admin/course?id=${this.props.edit_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (res) => {
        let response = await res.json();
        // console.log(response);
        if (response.error) {
          this.setState({ isError: true, errorMsg: response.error });
        } else {
          const {
            course_admission_process,
            course_curriculum_description,
            course_curriculum_specialisations,
            course_description,
            course_eligibility,
            course_entrance_exams,
            course_entrance_exams_description,
            course_full_name,
            course_name,
            course_specialisations,
            course_specialisations_description,
            createdAt,
            faqs,
            slug,
            status,
            top_ranked_colleges,
            top_ranked_colleges_description,
            top_recruiters_for_course_graduates,
            top_recruiters_for_course_graduates_description,
            top_ten_private_colleges,
            top_ten_private_colleges_description,
            type,
            updatedAt,
            what_is_course,
            why_pursue_course,
          } = response.data;

          this.setState({
            course_type: type,
            course_name: course_name,
            course_full_name: course_full_name,
            what_is_course: what_is_course,
            why_pursue_course: why_pursue_course,

            course_eligibility: course_eligibility,
            course_admission_process: course_admission_process,
            course_entrance_exams_description:
              course_entrance_exams_description,
            course_specialisations_description:
              course_specialisations_description,
            course_specialisations: course_specialisations
              ? course_specialisations.split(",")
              : [],
            course_curriculum_description: course_curriculum_description,
            course_curriculum_specialisations: course_curriculum_specialisations
              ? course_curriculum_specialisations.split(",")
              : [],
            top_ranked_colleges_description: top_ranked_colleges_description,
            top_ten_private_colleges_description:
              top_ten_private_colleges_description,
            top_recruiters_for_course_graduates_description:
              top_recruiters_for_course_graduates_description,
            top_recruiters_for_course_graduates:
              top_recruiters_for_course_graduates
                ? top_recruiters_for_course_graduates.split(",")
                : [],
            courseDescription: course_description,
            courseDescription: course_description.map((c) => {
              return {
                ...c,
                admission_process: c.admission_process
                  ? c.admission_process.split(",")
                  : [],
                top_institutes: c.top_institutes
                  ? c.top_institutes.split(",")
                  : [],
                top_recruiters: c.top_recruiters
                  ? c.top_recruiters.split(",")
                  : [],
                specialisation: c.specialisation
                  ? c.specialisation.split(",")
                  : [],
              };
            }),
            courseEntranceExams: course_entrance_exams,
            topRankedColleges: top_ranked_colleges,
            topTenPrivateColleges: top_ten_private_colleges,
            Faqs: faqs,
          });

          // this.setState({
          //   collegeslug: slug,
          //   collegename: college_name,
          //   selectedCountry: IndianStates[country] ? country : "",
          //   selectedState: found ? state : "",
          //   selectedCity: city,
          //   selectedcollegetype: college_type,
          //   selectedValues: approved_by ? approved_by.split(",") : [],
          //   selectedKeyword: keywords ? keywords.split(",") : [],
          //   ratings: ratings,
          // });
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.edit_id != this.props.edit_id) {
      this.setState({
        course_type: "",
        course_name: "",
        course_full_name: "",
        what_is_course: "",
        why_pursue_course: "",

        course_eligibility: "",
        course_admission_process: "",
        course_entrance_exams_description: "",
        course_specialisations_description: "",
        course_specialisations: [],
        course_curriculum_description: "",
        course_curriculum_specialisations: [],
        top_ranked_colleges_description: "",
        top_ten_private_colleges_description: "",
        top_recruiters_for_course_graduates_description: "",
        top_recruiters_for_course_graduates: [],

        courseDescription: [
          {
            degree_name: "",
            known_as: "",
            degree_level: "",
            course_duration: "",
            admission_process: [],
            annual_course_fee: "",
            top_institutes: [],
            top_recruiters: [],
            specialisation: [],
          },
        ],
        courseEntranceExams: [],
        topRankedColleges: [],
        topTenPrivateColleges: [],
        Faqs: [],
      });
    }
  }

  onFieldChange(index, field, value, curFields, box) {
    const updatedFields = [...curFields];
    updatedFields[index][field] = value;
    // console.log(field,value,box)
    if (box === "1") {
      this.setState({
        courseEntranceExams: updatedFields,
      });
    } else if (box === "2") {
      this.setState({
        topRankedColleges: updatedFields,
      });
    } else if (box === "3") {
      this.setState({
        Faqs: updatedFields,
      });
    } else if (box === "4") {
      this.setState({
        topTenPrivateColleges: updatedFields,
      });
    } else if (box === "5") {
      this.setState({
        courseDescription: updatedFields,
      });
    }
  }
  addNewField = (box) => {
    if (box === "1") {
      this.setState((prevState) => ({
        courseEntranceExams: [
          ...prevState.courseEntranceExams,
          {
            entrance_exam_name: "",
            registration_details: "",
            exam_details: "",
          },
        ],
      }));
    } else if (box === "2") {
      this.setState((prevState) => ({
        topRankedColleges: [
          ...prevState.topRankedColleges,
          { institute: "", eligibility: "", course_fee: "" },
        ],
      }));
    } else if (box === "3") {
      this.setState((prevState) => ({
        Faqs: [...prevState.Faqs, { question: "", answer: "" }],
      }));
    } else if (box === "4") {
      this.setState((prevState) => ({
        topTenPrivateColleges: [
          ...prevState.topTenPrivateColleges,
          { institute: "", eligibility: "", course_fee: "" },
        ],
      }));
    }
  };
  deleteField(i, curFields, box) {
    const fields = [...curFields];
    fields.splice(i, 1);
    if (box === "1") {
      this.setState({
        courseEntranceExams: fields,
      });
    } else if (box === "2") {
      this.setState({
        topRankedColleges: fields,
      });
    } else if (box === "3") {
      this.setState({
        Faqs: fields,
      });
    } else if (box === "4") {
      this.setState({
        topTenPrivateColleges: fields,
      });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // if(course_name == ""){
    //   Swal.fire('Enter Course name')
    // }else if(course_full_name == ""){
    //   Swal.fire('Enter Course full name')

    // }else if(what_is_course == ""){
    //   Swal.fire('Enter what is course')

    // }else if(why_pursue_course == ""){
    //   Swal.fire('Enter why pursue course')

    // }else{

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
        try {
          if (this.props.edit_id) {
            this.setState({ isLoading: true });
            const fd = new FormData();
            let courses = this.state.courseDescription.map((obj) => {
              // console.log(obj);
              let newobj = {
                ...obj,
                admission_process: obj.admission_process.join(","),
                top_institutes: obj.top_institutes.join(","),
                top_recruiters: obj.top_recruiters.join(","),
                specialisation: obj.specialisation.join(","),
              };
              return newobj;
            });
            fd.append("id",this.props.edit_id)
            fd.append("type", this.state.course_type);
            fd.append("course_name", this.state.course_name);
            fd.append("course_full_name", this.state.course_full_name);
            fd.append("what_is_course", this.state.what_is_course);
            fd.append("why_pursue_course", this.state.why_pursue_course);
            fd.append("course_description", JSON.stringify(courses[0]));
            fd.append(
              "course_specialisations_description",
              this.state.course_specialisations_description
            );
            fd.append(
              "course_curriculum_description",
              this.state.course_curriculum_description
            );
            fd.append(
              "course_curriculum_specialisations",
              this.state.course_curriculum_specialisations.join(',')
            );
            fd.append(
              "top_ranked_colleges_description",
              this.state.top_ranked_colleges_description
            );
            fd.append(
              "top_ranked_colleges",
              JSON.stringify(this.state.topRankedColleges)
            );
            fd.append(
              "top_ten_private_colleges_description",
              this.state.top_ten_private_colleges_description
            );
            fd.append(
              "top_ten_private_colleges",
              JSON.stringify(this.state.topTenPrivateColleges)
            );
            fd.append(
              "top_recruiters_for_course_graduates_description",
              this.state.top_recruiters_for_course_graduates_description
            );
            fd.append(
              "top_recruiters_for_course_graduates",
              this.state.top_recruiters_for_course_graduates.join(',')
            );
            fd.append("faqs", JSON.stringify(this.state.Faqs));
            fd.append("course_eligibility", this.state.course_eligibility);
            fd.append(
              "course_admission_process",
              this.state.course_admission_process
            );
            fd.append(
              "course_entrance_exams_description",
              this.state.course_entrance_exams_description
            );
            fd.append(
              "course_entrance_exams",
              JSON.stringify(this.state.courseEntranceExams)
            );
            fd.append(
              "course_specialisations",
              this.state.course_specialisations.join(',')
            );

            fetch(
              process.env.NEXT_PUBLIC_API_ENDPOINT +
                `/admin/course`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("pt")}`,
                },
                method: "PUT",
                body: fd,
              }
            ).then(async (response) => {
              var res = await response.json();
              // console.log(res)
              // console.log(res.message)
              // console.log(res.error)
              this.setState({ isLoading: false });
              if (response.ok) {
                // console.log("hello", response.data);
                Swal.fire({
                  title: "Success",
                  text: `${res.message}`,
                  icon: "success",
                  confirmButtonText: "Ok",
                });
              } else {
                Swal.fire({
                  title: "error",
                  text: `${res.error}`,
                  icon: "error",
                  confirmButtonText: "Ok",
                }).then(() => {
                  this.setState({ isLoading: false });
                });
              }
            });
          } else {
            this.setState({ isLoading: true });
            const fd = new FormData();

            let courses = this.state.courseDescription.map((obj) => {
              // console.log(obj);
              let newobj = {
                ...obj,
                admission_process: obj.admission_process.join(","),
                top_institutes: obj.top_institutes.join(","),
                top_recruiters: obj.top_recruiters.join(","),
                specialisation: obj.specialisation.join(","),
              };
              return newobj;
            });
            fd.append("type", this.state.course_type);
            fd.append("course_name", this.state.course_name);
            fd.append("course_full_name", this.state.course_full_name);
            fd.append("what_is_course", this.state.what_is_course);
            fd.append("why_pursue_course", this.state.why_pursue_course);
            fd.append("course_description", JSON.stringify(courses[0]));
            fd.append(
              "course_specialisations_description",
              this.state.course_specialisations_description
            );
            fd.append(
              "course_curriculum_description",
              this.state.course_curriculum_description
            );
            fd.append(
              "course_curriculum_specialisations",
           this.state.course_curriculum_specialisations.join(',')
            );
            fd.append(
              "top_ranked_colleges_description",
              this.state.top_ranked_colleges_description
            );
            fd.append(
              "top_ranked_colleges",
              JSON.stringify(this.state.topRankedColleges)
            );
            fd.append(
              "top_ten_private_colleges_description",
              this.state.top_ten_private_colleges_description
            );
            fd.append(
              "top_ten_private_colleges",
              JSON.stringify(this.state.topTenPrivateColleges)
            );
            fd.append(
              "top_recruiters_for_course_graduates_description",
              this.state.top_recruiters_for_course_graduates_description
            );
            fd.append(
              "top_recruiters_for_course_graduates",
             this.state.top_recruiters_for_course_graduates.join(',')
            );
            fd.append("faqs", JSON.stringify(this.state.Faqs));
            fd.append("course_eligibility", this.state.course_eligibility);
            fd.append(
              "course_admission_process",
              this.state.course_admission_process
            );
            fd.append(
              "course_entrance_exams_description",
              this.state.course_entrance_exams_description
            );
            fd.append(
              "course_entrance_exams",
              JSON.stringify(this.state.courseEntranceExams)
            );
            fd.append(
              "course_specialisations",
             this.state.course_specialisations.join(',')
            );

            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/course", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("pt")}`,
              },
              method: "POST",
              body: fd,
            }).then(async (response) => {
              var res = await response.json();
              // console.log(res);
              // console.log(res.data);
              // console.log(res.message)
              // console.log(res.error)
              this.setState({ isLoading: false });

              if (response.ok) {
                // console.log("hello", response.data);
                Swal.fire({
                  title: "Success",
                  text: `${res.message}`,
                  icon: "success",
                  confirmButtonText: "Ok",
                })
              } else {
                if (res.error && res.status == 0) {
                  Swal.fire({
                    title: "error",
                    text: `${res.error}`,
                    icon: "error",
                    confirmButtonText: "Login",
                  }).then(() => {
                    localStorage.removeItem("pt");
                    window.location.href = "/adminportal";
                  });
                } else {
                  Swal.fire({
                    title: "error",
                    text: `${res.error}`,
                    icon: "error",
                    confirmButtonText: "Ok",
                  }).then(() => {
                    this.setState({ isLoading: false });
                  });
                }
              }
            });
          }
        } catch (error) {
          // Handle network or fetch error
          console.error(error);
        }
      }
    });
    // }
  };

  render() {
    return (
      <>
        {!this.state.isError ? (
          <div className={Classes["add-user"]}>
            <div className={Classes["form-div"]}>
              <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="row">
                  {/* {this.props.edit_id && (
                    <div className="col-md-4">
                      <div className={Classes["form-group"]}>
                        <label className={Classes["labelname"]} htmlFor="slug">
                          Course Slug{" "}
                          <span className={Classes["error"]}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter College Slug"
                          required
                          value={this.state.courseslug}
                          onChange={(e) =>
                            this.setState({ collegeslug: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  )} */}

                  {/* course type */}
                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Course Type <span className={Classes["error"]}>*</span>
                      </label>

                      <select
                        name="coursetype"
                        id="coursetype"
                        className="form-select"
                        required
                        value={this.state.course_type}
                        onChange={(e) =>
                          this.setState({ course_type: e.target.value })
                        }
                      >
                        <option disabled value="">
                          Select a course type
                        </option>
                        <option value="ug">UG</option>
                        <option value="pg">PG</option>
                      </select>
                    </div>
                  </div>
                  {/* course name */}
                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Course Name <span className={Classes["error"]}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Enter Course Name"
                        value={this.state.course_name}
                        onChange={(e) =>
                          this.setState({ course_name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  {/* course full name */}
                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Course full name{" "}
                        <span className={Classes["error"]}>*</span>
                      </label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter Course Full Name"
                        value={this.state.course_full_name}
                        onChange={(e) =>
                          this.setState({ course_full_name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  {/* what is course */}
                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        What is course{" "}
                        <span className={Classes["error"]}>*</span>
                      </label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="What is course"
                        value={this.state.what_is_course}
                        onChange={(e) =>
                          this.setState({ what_is_course: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  {/*why_pursue_course */}
                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Why pursue course
                        <span className={Classes["error"]}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="why pursue course"
                        value={this.state.why_pursue_course}
                        onChange={(e) =>
                          this.setState({ why_pursue_course: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* course description */}
                  <div className="row">
                    <div
                      className="col-md-12 border mb-3"
                      style={{ backgroundColor: "#ededed" }}
                    >
                      <h3 style={{ padding: "0.5rem 0rem" }}>
                        Course Description
                      </h3>
                      {this.state.courseDescription.map((field, i) => {
                        return (
                          <div className="row" key={i}>
                            <div className="col-md-4">
                              <div className={Classes["form-group"]}>
                                <label
                                  className={Classes["labelname"]}
                                  htmlFor="name"
                                >
                                  Degree Name
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <input
                                  type="text"
                                  rows={4}
                                  className="form-control"
                                  placeholder="Enter Degree Name"
                                  value={field.degree_name}
                                  required
                                  onChange={(e) =>
                                    this.onFieldChange(
                                      i,
                                      "degree_name",
                                      e.target.value,
                                      this.state.courseDescription,
                                      "5"
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
                                  Known as
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Known as"
                                  value={field.known_as}
                                  required
                                  onChange={(e) =>
                                    this.onFieldChange(
                                      i,
                                      "known_as",
                                      e.target.value,
                                      this.state.courseDescription,
                                      "5"
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
                                  degree_level
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  placeholder="Enter degree level"
                                  value={field.degree_level}
                                  onChange={(e) =>
                                    this.onFieldChange(
                                      i,
                                      "degree_level",
                                      e.target.value,
                                      this.state.courseDescription,
                                      "5"
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
                                  Course Duration
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  placeholder="ex: 4 years"
                                  minLength={2}
                                  maxLength={7}
                                  value={field.course_duration}
                                  onChange={(e) =>
                                    this.onFieldChange(
                                      i,
                                      "course_duration",
                                      e.target.value,
                                      this.state.courseDescription,
                                      "5"
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
                                  Admission Process (Tags){" "}
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <MultipleTagsInput
                                  placeholder="Course Admission Process"
                                  value={field.admission_process}
                                  required
                                  onChange={(values) =>
                                    this.onFieldChange(
                                      i,
                                      "admission_process",
                                      values,
                                      this.state.courseDescription,
                                      "5"
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
                                  Annual Course Fee
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="ex: INR 40,000 – INR 1,00,000"
                                  value={field.annual_course_fee}
                                  required
                                  onChange={(e) =>
                                    this.onFieldChange(
                                      i,
                                      "annual_course_fee",
                                      e.target.value,
                                      this.state.courseDescription,
                                      "5"
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
                                  Top Institutes(Tags)
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <MultipleTagsInput
                                  placeholder="Enter Top Institute"
                                  required
                                  value={field.top_institutes}
                                  onChange={(values) =>
                                    this.onFieldChange(
                                      i,
                                      "top_institutes",
                                      values,
                                      this.state.courseDescription,
                                      "5"
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
                                  Top Recruiters(Tags)
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <MultipleTagsInput
                                  placeholder="Enter Top Recruiters"
                                  value={field.top_recruiters}
                                  required
                                  onChange={(values) =>
                                    this.onFieldChange(
                                      i,
                                      "top_recruiters",
                                      values,
                                      this.state.courseDescription,
                                      "5"
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
                                  Specialisation(Tags)
                                  <span className={Classes["error"]}>*</span>
                                </label>
                                <MultipleTagsInput
                                  placeholder="Enter Specialisation"
                                  value={field.specialisation}
                                  required
                                  onChange={(values) =>
                                    this.onFieldChange(
                                      i,
                                      "specialisation",
                                      values,
                                      this.state.courseDescription,
                                      "5"
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <hr />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* other field */}
                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Course Eligibility{" "}
                        <span className={Classes["error"]}></span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Course Eligibility"
                        value={this.state.course_eligibility}
                        onChange={(e) =>
                          this.setState({ course_eligibility: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Course Admission Process{" "}
                        <span className={Classes["error"]}></span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Course Admission Process"
                        value={this.state.course_admission_process}
                        onChange={(e) =>
                          this.setState({
                            course_admission_process: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Course Entrance Exams Description{" "}
                        <span className={Classes["error"]}></span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Course Entrance Exams Description"
                        value={this.state.course_entrance_exams_description}
                        onChange={(e) =>
                          this.setState({
                            course_entrance_exams_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Course Specialisations Description{" "}
                        <span className={Classes["error"]}></span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Course Specialisations Description"
                        value={this.state.course_specialisations_description}
                        onChange={(e) =>
                          this.setState({
                            course_specialisations_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Course Specialisations (Tags)
                        <span className={Classes["error"]}></span>
                      </label>
                      <MultipleTagsInput
                        placeholder="Enter Course Specialisations"
                        value={this.state.course_specialisations}
                        onChange={(values) =>
                          this.setState({ course_specialisations: values })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Course Curriculum Description{" "}
                        <span className={Classes["error"]}></span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Course Curriculum Description"
                        value={this.state.course_curriculum_description}
                        onChange={(e) =>
                          this.setState({
                            course_curriculum_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Course Curriculum Specialisations (Tags){" "}
                        <span className={Classes["error"]}></span>
                      </label>
                      <MultipleTagsInput
                        placeholder="Enter Course Curriculum Specialisations"
                        value={this.state.course_curriculum_specialisations}
                        onChange={(values) =>
                          this.setState({
                            course_curriculum_specialisations: values,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Top Ranked Colleges Description{" "}
                        <span className={Classes["error"]}></span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Top Ranked Colleges Description"
                        value={this.state.top_ranked_colleges_description}
                        onChange={(e) =>
                          this.setState({
                            top_ranked_colleges_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Top Ten Private Colleges Description{" "}
                        <span className={Classes["error"]}></span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Top Ten Private Colleges Description"
                        value={this.state.top_ten_private_colleges_description}
                        onChange={(e) =>
                          this.setState({
                            top_ten_private_colleges_description:
                              e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Top recruiters for course graduates (Tags){" "}
                        <span className={Classes["error"]}></span>
                      </label>
                      <MultipleTagsInput
                        placeholder="Enter Top recruiters for course graduates"
                        value={this.state.top_recruiters_for_course_graduates}
                        onChange={(values) =>
                          this.setState({
                            top_recruiters_for_course_graduates: values,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Enter Top recruiters for course graduates description{" "}
                        <span className={Classes["error"]}></span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Enter Top recruiters for course graduates description"
                        value={
                          this.state
                            .top_recruiters_for_course_graduates_description
                        }
                        onChange={(e) =>
                          this.setState({
                            top_recruiters_for_course_graduates_description:
                              e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <hr />

                {/* courseEntranceExam */}
                <div
                  className="col-md-12 border mb-3"
                  style={{ backgroundColor: "#ededed" }}
                >
                  <h3 style={{ padding: "0.5rem 0rem" }}>
                    Course Entrance Exams
                    <Badge
                      badgeContent={this.state.courseEntranceExams.length}
                      color="primary"
                    >
                      <LibraryBooksIcon color="action" />
                    </Badge>
                  </h3>
                  {this.state.courseEntranceExams.map((course, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-4">
                          <div className={Classes["form-group"]}>
                            <label
                              className={Classes["labelname"]}
                              htmlFor="name"
                            >
                              Entrance Exam Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: B.Tech"
                              value={course.entrance_exam_name}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "entrance_exam_name",
                                  e.target.value,
                                  this.state.courseEntranceExams,
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
                              Registration Details
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: 4 years"
                              value={course.registration_details}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "registration_details",
                                  e.target.value,
                                  this.state.courseEntranceExams,
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
                              Exam Details
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: Rs 40,000 - Rs 1,25,000 "
                              value={course.exam_details}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "exam_details",
                                  e.target.value,
                                  this.state.courseEntranceExams,
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
                                  this.state.courseEntranceExams,
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
                      </div>
                    );
                  })}
                  <span
                    className="add-more-btn"
                    onClick={() => this.addNewField("1")}
                  >
                    + Add Course
                  </span>
                </div>
                <hr />

                {/* topRankedColleges  */}
                <div
                  className="col-md-12 border mb-3"
                  style={{ backgroundColor: "#ededed" }}
                >
                  <h3 style={{ padding: "0.5rem 0rem" }}>
                    Top Ranked Colleges
                    <Badge
                      badgeContent={this.state.topRankedColleges.length}
                      color="primary"
                    >
                      <MilitaryTechIcon color="action" />
                    </Badge>
                  </h3>
                  {this.state.topRankedColleges.map((course, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-4">
                          <div className={Classes["form-group"]}>
                            <label
                              className={Classes["labelname"]}
                              htmlFor="name"
                            >
                              institute
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: B.Tech"
                              value={course.institute}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "institute",
                                  e.target.value,
                                  this.state.topRankedColleges,
                                  "2"
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
                              Eligibility
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: 4 years"
                              value={course.eligibility}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "eligibility",
                                  e.target.value,
                                  this.state.topRankedColleges,
                                  "2"
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
                              course_fee
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="ex: Rs 40,000 - Rs 1,25,000 "
                              value={course.course_fee}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "course_fee",
                                  e.target.value,
                                  this.state.topRankedColleges,
                                  "2"
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
                                  this.state.topRankedColleges,
                                  "2"
                                )
                              }
                            >
                              <IconButton>
                                <DeleteIcon style={{ color: "red" }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <span
                    className="add-more-btn"
                    onClick={() => this.addNewField("2")}
                  >
                    + Add Top Ranked Colleges
                  </span>
                </div>
                <hr />

                {/* faq */}
                <div
                  className="col-md-12 border mb-3"
                  style={{ backgroundColor: "#ededed" }}
                >
                  <h3 style={{ padding: "0.5rem 0rem" }}>
                    FAQs{" "}
                    <Badge
                      badgeContent={this.state.Faqs.length}
                      color="primary"
                    >
                      <LiveHelpIcon color="action" />
                    </Badge>
                  </h3>
                  {this.state.Faqs.map((d, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-5">
                          <div className={Classes["form-group"]}>
                            <label
                              className={Classes["labelname"]}
                              htmlFor="name"
                            >
                              Question
                            </label>
                            <textarea
                              type="text"
                              rows={3}
                              className="form-control"
                              placeholder="Enter question"
                              value={d.question}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "question",
                                  e.target.value,
                                  this.state.Faqs,
                                  "3"
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className={Classes["form-group"]}>
                            <label
                              className={Classes["labelname"]}
                              htmlFor="name"
                            >
                              Answer
                            </label>
                            <textarea
                              type="text"
                              rows={3}
                              className="form-control"
                              placeholder="Enter answer"
                              value={d.answer}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "answer",
                                  e.target.value,
                                  this.state.Faqs,
                                  "3"
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
                                this.deleteField(i, this.state.Faqs, "3")
                              }
                            >
                              <IconButton>
                                <DeleteIcon style={{ color: "red" }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <span
                    className="add-more-btn"
                    onClick={() => this.addNewField("3")}
                  >
                    + Add FAQ
                  </span>
                </div>
                <hr />

                {/* topTenPrivateColleges   */}
                <div
                  className="col-md-12 border mb-3"
                  style={{ backgroundColor: "#ededed" }}
                >
                  <h3 style={{ padding: "0.5rem 0rem" }}>
                    Top Ten Private Colleges
                    <Badge
                      badgeContent={this.state.topTenPrivateColleges.length}
                      color="primary"
                    >
                      <ApartmentIcon color="action" />
                    </Badge>
                  </h3>
                  {this.state.topTenPrivateColleges.map((course, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-4">
                          <div className={Classes["form-group"]}>
                            <label
                              className={Classes["labelname"]}
                              htmlFor="name"
                            >
                              institute
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: B.Tech"
                              value={course.institute}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "institute",
                                  e.target.value,
                                  this.state.topTenPrivateColleges,
                                  "4"
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
                              Eligibility
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: 4 years"
                              value={course.eligibility}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "eligibility",
                                  e.target.value,
                                  this.state.topTenPrivateColleges,
                                  "4"
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
                              course_fee
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="ex: Rs 40,000 - Rs 1,25,000 "
                              value={course.course_fee}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "course_fee",
                                  e.target.value,
                                  this.state.topTenPrivateColleges,
                                  "4"
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
                                  this.state.topRankedColleges,
                                  "4"
                                )
                              }
                            >
                              <IconButton>
                                <DeleteIcon style={{ color: "red" }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <span
                    className="add-more-btn"
                    onClick={() => this.addNewField("4")}
                  >
                    + Add Top Colleges
                  </span>
                </div>

                <div className="col-md-12">
                  <CTA title={this.props.edit_id ? "Update" : "Create"} />
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
        ) : (
          this.state.errorMsg
        )}
      </>
    );
  }
}
