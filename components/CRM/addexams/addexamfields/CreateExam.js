import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import Swal from "sweetalert2";
import CTA from "/components/Comps/CTA";
import Loading from "/components/Comps/Loading";
import Badge from "@mui/material/Badge";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MultipleTagsInput from "@/components/Comps/MultipleTagsInput";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Button from "@mui/material/Button";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
export default class Gernal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiHitComplete: true,
      isDataFound: false,

      exam_name: "",
      exam_logo: "",
      imageLogo: null,
      exam_full_name: "",
      exam_date: "",
      exam_highlights_description: "",
      exam_eligibility_criteria: "",
      exam_registration_description: "",
      exam_syllabus_description: "",
      exam_analysis_description: "",
      admit_card_description: "",
      exam_day_guidelines_description: "",
      exam_hall_prohibited_items: "",
      exam_timings_description: "",
      answer_key_description: "",
      result_and_scorecard: "",
      exam_score: "",
      admission_process: "",
      examDates: [],
      examHighlights: [],
      examSyllabus: [],
      examPattern: [
        {
          description: "",
          mode: "",
          duration: "",
          slots: "",
          question_count: "",
          total_marks: "",
          language: "",
          choices: "",
          question_type: "",
        },
      ],
      examTimings: [],

      isLoading: false,
      isError: false,
      errorMsg: "",
    };
  }

  componentDidMount() {
    if (this.props.edit_id) {
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/admin/exam?id=${this.props.edit_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (res) => {
        let response = await res.json();
        console.log(response);
        if (response.error) {
          this.setState({ isError: true, errorMsg: response.error });
        } else {
          const {
            admission_process,
            answer_key_description,
            admit_card_description,
            createdAt,
            exam_analysis_description,
            exam_date,
            exam_dates,
            exam_day_guidelines_description,
            exam_eligibility_criteria,
            exam_full_name,
            exam_hall_prohibited_items,
            exam_highlights,
            exam_highlights_description,
            exam_logo,
            exam_name,
            exam_pattern,
            exam_registration_description,
            exam_score,
            exam_syllabus,
            exam_syllabus_description,
            exam_timings,
            exam_timings_description,
            result_and_scorecard,
          } = response.data;

          this.setState({
            exam_name: exam_name,
            exam_logo: exam_logo,
            imageLogo: `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${exam_logo}`,
            exam_full_name: exam_full_name,
            exam_date: exam_date,
            exam_highlights_description: exam_highlights_description,
            exam_eligibility_criteria: exam_eligibility_criteria,
            exam_registration_description: exam_registration_description,
            exam_syllabus_description: exam_syllabus_description,
            exam_analysis_description: exam_analysis_description,
            admit_card_description: admit_card_description,
            exam_day_guidelines_description: exam_day_guidelines_description,
            exam_hall_prohibited_items: exam_hall_prohibited_items,
            exam_timings_description: exam_timings_description,
            answer_key_description: answer_key_description,
            result_and_scorecard: result_and_scorecard,
            exam_score: exam_score,
            admission_process: admission_process,
            examDates: exam_dates,
            examHighlights: exam_highlights,
            examSyllabus: exam_syllabus.map((c) => {
              return {
                ...c,
                topics: c.topics ? c.topics.split(",") : [],
              };
            }),
            examPattern: exam_pattern.map((c) => {
              return {
                ...c,
              };
            }),
            examTimings: exam_timings,
          });
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.edit_id != this.props.edit_id) {
      this.setState({
        exam_name: "",
        exam_logo: "",
        imageLogo: null,
        exam_full_name: "",
        exam_date: "",
        exam_highlights_description: "",
        exam_eligibility_criteria: "",
        exam_registration_description: "",
        exam_syllabus_description: "",
        exam_analysis_description: "",
        admit_card_description: "",
        exam_day_guidelines_description: "",
        exam_hall_prohibited_items: "",
        exam_timings_description: "",
        answer_key_description: "",
        result_and_scorecard: "",
        exam_score: "",
        admission_process: "",
        examDates: [],
        examHighlights: [],
        examSyllabus: [],
        examPattern: [
          {
            description: "",
            mode: "",
            duration: "",
            slots: "",
            question_count: "",
            total_marks: "",
            language: "",
            choices: "",
            question_type: "",
          },
        ],
        examTimings: [],
      });
    }
  }

  onFieldChange(index, field, value, curFields, box) {
    const updatedFields = [...curFields];
    updatedFields[index][field] = value;
    // console.log(field,value,box)
    if (box === "1") {
      this.setState({
        examDates: updatedFields,
      });
    } else if (box === "2") {
      this.setState({
        examHighlights: updatedFields,
      });
    } else if (box === "3") {
      this.setState({
        examSyllabus: updatedFields,
      });
    } else if (box === "4") {
      this.setState({
        examPattern: updatedFields,
      });
    } else if (box === "5") {
      this.setState({
        examTimings: updatedFields,
      });
    }
  }
  addNewField = (box) => {
    if (box === "1") {
      this.setState((prevState) => ({
        examDates: [
          ...prevState.examDates,
          {
            date: "",
            upcoming_date: "",
          },
        ],
      }));
    } else if (box === "2") {
      this.setState((prevState) => ({
        examHighlights: [
          ...prevState.examHighlights,
          { exam_particulars: "", exam_details: "" },
        ],
      }));
    } else if (box === "3") {
      this.setState((prevState) => ({
        examSyllabus: [...prevState.examSyllabus, { section: "", topics: "" }],
      }));
    } else if (box === "5") {
      this.setState((prevState) => ({
        examTimings: [
          ...prevState.examTimings,
          {
            exam_slot: "",
            exam_timing: "",
            reporting_time: "",
            last_entry_allowed: "",
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
        examDates: fields,
      });
    } else if (box === "2") {
      this.setState({
        examHighlights: fields,
      });
    } else if (box === "3") {
      this.setState({
        examSyllabus: fields,
      });
    } else if (box === "5") {
      this.setState({
        examTimings: fields,
      });
    }
  }

  handleSubmit = async (e) => {
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
        // console.log(this.state);
        try {
          if (this.props.edit_id) {
            this.setState({ isLoading: true });
            const fd = new FormData();
            let syllabusofexam = this.state.examSyllabus.map((obj) => {
              // console.log(obj);
              let newobj = {
                ...obj,
                topics: obj.topics.join(","),
              };
              return newobj;
            });
            fd.append("id",this.props.edit_id)
            fd.append("exam_name", this.state.exam_name);
            fd.append("exam_logo", this.state.exam_logo);
            fd.append("exam_full_name", this.state.exam_full_name);
            fd.append("exam_date", this.state.exam_date);
            fd.append("exam_dates", JSON.stringify(this.state.examDates));
            fd.append(
              "exam_highlights_description",
              this.state.exam_highlights_description
            );
            fd.append(
              "admit_card_description",
              this.state.admit_card_description,
            );
            fd.append(
              "exam_highlights",
              JSON.stringify(this.state.examHighlights)
            );
            fd.append(
              "exam_eligibility_criteria",
              this.state.exam_eligibility_criteria
            );
            fd.append(
              "exam_registration_description",
              this.state.exam_registration_description
            );
            fd.append(
              "exam_syllabus_description",
              this.state.exam_syllabus_description
            );
            fd.append("exam_syllabus", JSON.stringify(syllabusofexam));
            fd.append("exam_pattern", JSON.stringify(this.state.examPattern));
            fd.append(
              "exam_analysis_description",
              this.state.exam_analysis_description
            );
            fd.append(
              "exam_day_guidelines_description",
              this.state.exam_day_guidelines_description
            );
            fd.append(
              "exam_hall_prohibited_items",
              this.state.exam_hall_prohibited_items
            );
            fd.append(
              "exam_timings_description",
              this.state.exam_timings_description
            );
            fd.append("exam_timings", JSON.stringify(this.state.examTimings));
            fd.append(
              "answer_key_description",
              this.state.answer_key_description
            );
            fd.append("result_and_scorecard", this.state.result_and_scorecard);
            fd.append("exam_score", this.state.exam_score);
            fd.append("admission_process", this.state.admission_process);

            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/exam`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("pt")}`,
              },
              method: "PUT",
              body: fd,
            }).then(async (response) => {
              var res = await response.json();
              // console.log(res)
              // console.log(res.message)
              // console.log(res.error)
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
                })

              }
              this.setState({ isLoading: false });

            });
          } else {
            // console.log("dsfs");
            // this.setState({ isLoading: true });
            const fd = new FormData();

            let syllabusofexam = this.state.examSyllabus.map((obj) => {
              // console.log(obj);
              let newobj = {
                ...obj,
                topics: obj.topics.join(","),
              };
              return newobj;
            });
            fd.append("exam_name", this.state.exam_name);
            fd.append("exam_logo", this.state.exam_logo);
            fd.append("exam_full_name", this.state.exam_full_name);
            fd.append("exam_date", this.state.exam_date);
            fd.append("exam_dates", JSON.stringify(this.state.examDates));
            fd.append(
              "exam_highlights_description",
              this.state.exam_highlights_description
            );
            fd.append(
              "admit_card_description",
              this.state.admit_card_description,
            );
            fd.append(
              "exam_highlights",
              JSON.stringify(this.state.examHighlights)
            );
            fd.append(
              "exam_eligibility_criteria",
              this.state.exam_eligibility_criteria
            );
            fd.append(
              "exam_registration_description",
              this.state.exam_registration_description
            );
            fd.append(
              "exam_syllabus_description",
              this.state.exam_syllabus_description
            );
            fd.append("exam_syllabus", JSON.stringify(syllabusofexam));
            fd.append("exam_pattern", JSON.stringify(this.state.examPattern));
            fd.append(
              "exam_analysis_description",
              this.state.exam_analysis_description
            );
            fd.append(
              "exam_day_guidelines_description",
              this.state.exam_day_guidelines_description
            );
            fd.append(
              "exam_hall_prohibited_items",
              this.state.exam_hall_prohibited_items
            );
            fd.append(
              "exam_timings_description",
              this.state.exam_timings_description
            );
            fd.append("exam_timings", JSON.stringify(this.state.examTimings));
            fd.append(
              "answer_key_description",
              this.state.answer_key_description
            );
            fd.append("result_and_scorecard", this.state.result_and_scorecard);
            fd.append("exam_score", this.state.exam_score);
            fd.append("admission_process", this.state.admission_process);

            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/exam", {
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
                }).then(() => {
                  this.setState(
                    {
                      exam_name: "",
                      exam_logo: "",
                      imageLogo: null,
                      exam_full_name: "",
                      exam_date: "",
                      exam_highlights_description: "",
                      exam_eligibility_criteria: "",
                      exam_registration_description: "",
                      exam_syllabus_description: "",
                      exam_analysis_description: "",
                      admit_card_description: "",
                      exam_day_guidelines_description: "",
                      exam_hall_prohibited_items: "",
                      exam_timings_description: "",
                      answer_key_description: "",
                      result_and_scorecard: "",
                      exam_score: "",
                      admission_process: "",
                      examDates: [],
                      examHighlights: [],
                      examSyllabus: [],
                      examPattern: [
                        {
                          description: "",
                          mode: "",
                          duration: "",
                          slots: "",
                          question_count: "",
                          total_marks: "",
                          language: "",
                          choices: "",
                          question_type: "",
                        },
                      ],
                      examTimings: [],
                
                    },
                    
                  );
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
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
    // }
  };
  handleFileUpload = (event, imageType) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({ [imageType]: reader.result });
    };

    reader.readAsDataURL(file);
  };
  render() {
    return (
      <>
        {!this.state.isError ? (
          <div className={Classes["add-user"]}>
            <div className={Classes["form-div"]}>
              <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_name"
                      >
                        Exam Name <span className={Classes["error"]}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Enter Exam Name"
                        value={this.state.exam_name}
                        onChange={(e) =>
                          this.setState({ exam_name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* exam logo */}
                  <div className="col-md-4">
                    <label
                      className={Classes["labelname"]}
                      htmlFor="exam_full_name"
                    >
                      Exam Logo 
                    </label>
                    <br />
                    {/* <Button variant="contained" component="span">
                        Upload Logo Image
                      </Button> */}
                    <input
                      id="upload-logo"
                      // hidden
                      accept="image/*"
                      // required
                      type="file"
                      onChange={(e) =>
                        this.setState({ exam_logo: e.target.files[0] }, () =>
                          this.handleFileUpload(e, "imageLogo")
                        )
                      }
                    />
                    {this.state.imageLogo && (
                      <div
                        style={{
                          height: "250px",
                          width: "100%",
                          display: "flex",
                          border: "1px solid lightgray",
                          margin: "2rem 0",
                        }}
                      >
                        <img
                          src={this.state.imageLogo}
                          alt="Uploaded Logo"
                          style={{ objectFit: "contain", width: "100%" }}
                        />
                      </div>
                    )}
                  </div>
                  {/* <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_logo"
                      >
                        Exam Logo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Exam Logo URL"
                        value={this.state.exam_logo}
                        onChange={(e) =>
                          this.setState({ exam_logo: e.target.value })
                        }
                      />
                    </div>
                  </div> */}
                  {/* exam logo */}

                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_full_name"
                      >
                        Exam Full Name{" "}
                        <span className={Classes["error"]}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Exam Full Name"
                        value={this.state.exam_full_name}
                        onChange={(e) =>
                          this.setState({ exam_full_name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_date"
                      >
                        Exam Date <span className={Classes["error"]}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="Enter Exam Date"
                        value={this.state.exam_date}
                        onChange={(e) =>
                          this.setState({ exam_date: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_highlights_description"
                      >
                        Exam Highlights Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Exam Highlights Description"
                        value={this.state.exam_highlights_description}
                        onChange={(e) =>
                          this.setState({
                            exam_highlights_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_eligibility_criteria"
                      >
                        Exam Eligibility Criteria
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Exam Eligibility Criteria"
                        value={this.state.exam_eligibility_criteria}
                        onChange={(e) =>
                          this.setState({
                            exam_eligibility_criteria: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_registration_description"
                      >
                        Exam Registration Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Exam Registration Description"
                        value={this.state.exam_registration_description}
                        onChange={(e) =>
                          this.setState({
                            exam_registration_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_syllabus_description"
                      >
                        Exam Syllabus Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Exam Syllabus Description"
                        value={this.state.exam_syllabus_description}
                        onChange={(e) =>
                          this.setState({
                            exam_syllabus_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_analysis_description"
                      >
                        Exam Analysis Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Exam Analysis Description"
                        value={this.state.exam_analysis_description}
                        onChange={(e) =>
                          this.setState({
                            exam_analysis_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="admit_card_description"
                      >
                        Admit Card Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Admit Card Description"
                        value={this.state.admit_card_description}
                        onChange={(e) =>
                          this.setState({
                            admit_card_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_day_guidelines_description"
                      >
                        Exam Day Guidelines Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Exam Day Guidelines Description"
                        value={this.state.exam_day_guidelines_description}
                        onChange={(e) =>
                          this.setState({
                            exam_day_guidelines_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_hall_prohibited_items"
                      >
                        Exam Hall Prohibited Items
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Exam Hall Prohibited Items"
                        value={this.state.exam_hall_prohibited_items}
                        onChange={(e) =>
                          this.setState({
                            exam_hall_prohibited_items: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_timings_description"
                      >
                        Exam Timings Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Exam Timings Description"
                        value={this.state.exam_timings_description}
                        onChange={(e) =>
                          this.setState({
                            exam_timings_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="answer_key_description"
                      >
                        Answer Key Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Answer Key Description"
                        value={this.state.answer_key_description}
                        onChange={(e) =>
                          this.setState({
                            answer_key_description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="result_and_scorecard"
                      >
                        Result and Scorecard
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Result and Scorecard"
                        value={this.state.result_and_scorecard}
                        onChange={(e) =>
                          this.setState({
                            result_and_scorecard: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="exam_score"
                      >
                        Exam Score
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Exam Score"
                        value={this.state.exam_score}
                        onChange={(e) =>
                          this.setState({ exam_score: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className={Classes["form-group"]}>
                      <label
                        className={Classes["labelname"]}
                        htmlFor="admission_process"
                      >
                        Admission Process
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Admission Process"
                        value={this.state.admission_process}
                        onChange={(e) =>
                          this.setState({ admission_process: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <hr />

                {/* examDates  */}
                <div
                  className="col-md-12 border mb-3"
                  style={{ backgroundColor: "#ededed" }}
                >
                  <h3 style={{ padding: "0.5rem 0rem" }}>
                    Exam Dates
                    <Badge
                      badgeContent={this.state.examDates.length}
                      color="primary"
                    >
                      <LibraryBooksIcon color="action" />
                    </Badge>
                  </h3>
                  {this.state.examDates.map((course, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-6">
                          <div className={Classes["form-group"]}>
                            <label
                              className={Classes["labelname"]}
                              htmlFor="name"
                            >
                              Date
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: Sep’24"
                              value={course.date}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "date",
                                  e.target.value,
                                  this.state.examDates,
                                  "1"
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className={Classes["form-group"]}>
                            <label
                              className={Classes["labelname"]}
                              htmlFor="name"
                            >
                              Upcoming Date
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex:CAT 2024 from correction process"
                              value={course.upcoming_date}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "upcoming_date",
                                  e.target.value,
                                  this.state.examDates,
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
                                this.deleteField(i, this.state.examDates, "1")
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

                {/* examHighlights   */}
                <div
                  className="col-md-12 border mb-3"
                  style={{ backgroundColor: "#ededed" }}
                >
                  <h3 style={{ padding: "0.5rem 0rem" }}>
                    Exam Highlights
                    <Badge
                      badgeContent={this.state.examHighlights.length}
                      color="primary"
                    >
                      <MilitaryTechIcon color="action" />
                    </Badge>
                  </h3>
                  {this.state.examHighlights.map((course, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-6">
                          <div className={Classes["form-group"]}>
                            <label
                              className={Classes["labelname"]}
                              htmlFor="name"
                            >
                              Exam Particulars
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: CAT Full Form"
                              value={course.exam_particulars}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "exam_particulars",
                                  e.target.value,
                                  this.state.examHighlights,
                                  "2"
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
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
                              placeholder="ex:	Common Admission Test"
                              value={course.exam_details}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "exam_details",
                                  e.target.value,
                                  this.state.examHighlights,
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
                                  this.state.examHighlights,
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

                {/* examSyllabus  */}
                <div
                  className="col-md-12 border mb-3"
                  style={{ backgroundColor: "#ededed" }}
                >
                  <h3 style={{ padding: "0.5rem 0rem" }}>
                    Exam Syllabus
                    <Badge
                      badgeContent={this.state.examSyllabus.length}
                      color="primary"
                    >
                      <LiveHelpIcon color="action" />
                    </Badge>
                  </h3>
                  {this.state.examSyllabus.map((d, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-5">
                          <div className={Classes["form-group"]}>
                            <label
                              className={Classes["labelname"]}
                              htmlFor="name"
                            >
                              Syllabus Section
                            </label>
                            <input
                              type="text"
                              rows={3}
                              className="form-control"
                              required
                              placeholder="Enter section"
                              value={d.section}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "section",
                                  e.target.value,
                                  this.state.examSyllabus,
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
                              Syllabus Topics
                            </label>
                            <MultipleTagsInput
                              placeholder="Enter Syllabus topics"
                              value={d.topics}
                              required
                              onChange={(value) =>
                                this.onFieldChange(
                                  i,
                                  "topics",
                                  value,
                                  this.state.examSyllabus,
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
                                this.deleteField(
                                  i,
                                  this.state.examSyllabus,
                                  "3"
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
                    onClick={() => this.addNewField("3")}
                  >
                    + Add Exam Syllabus
                  </span>
                </div>
                <hr />

                {/* examPattern    */}
                <div
                  className="col-md-12 border mb-3"
                  style={{ backgroundColor: "#ededed" }}
                >
                  <h3 style={{ padding: "0.5rem 0rem" }}>Exam Pattern</h3>
                  {this.state.examPattern.map((exam, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-12">
                          <div className={Classes["form-group"]}>
                            <label
                              className={Classes["labelname"]}
                              htmlFor="name"
                            >
                              Description
                            </label>
                            <textarea
                              type="text"
                              className="form-control"
                              placeholder="Enter Exam Pattern Description"
                              value={exam.description}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "description",
                                  e.target.value,
                                  this.state.examPattern,
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
                              Mode
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex:	Computer Based Test"
                              value={exam.mode}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "mode",
                                  e.target.value,
                                  this.state.examPattern,
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
                              Duration
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex:120 minutes"
                              value={exam.duration}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "duration",
                                  e.target.value,
                                  this.state.examPattern,
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
                              Slots
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: Morning : 8:30 AM to 10:30 AM Afternoon"
                              value={exam.slots}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "slots",
                                  e.target.value,
                                  this.state.examPattern,
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
                              No. of questions
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: 66"
                              value={exam.question_count}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "question_count",
                                  e.target.value,
                                  this.state.examPattern,
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
                              Total marks
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex:198"
                              value={exam.total_marks}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "total_marks",
                                  e.target.value,
                                  this.state.examPattern,
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
                              Language of question paper
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: English"
                              value={exam.language}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "language",
                                  e.target.value,
                                  this.state.examPattern,
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
                              No. of answer choice
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex:4"
                              value={exam.choices}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "choices",
                                  e.target.value,
                                  this.state.examPattern,
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
                              Question type
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: MCQ and non MCQ"
                              value={exam.question_type}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "question_type",
                                  e.target.value,
                                  this.state.examPattern,
                                  "4"
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* examTimings     */}
                <div
                  className="col-md-12 border mb-3"
                  style={{ backgroundColor: "#ededed" }}
                >
                  <h3 style={{ padding: "0.5rem 0rem" }}>
                    Exam Timings
                    <Badge
                      badgeContent={this.state.examTimings.length}
                      color="primary"
                    >
                      <AccessTimeFilledIcon color="action" />
                    </Badge>
                  </h3>
                  {this.state.examTimings.map((course, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-2">
                          <div className={Classes["form-group"]}>
                            <label
                              className={Classes["labelname"]}
                              htmlFor="name"
                            >
                              Exam Slot
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: Slot 1"
                              value={course.exam_slot}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "exam_slot",
                                  e.target.value,
                                  this.state.examTimings,
                                  "5"
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
                              Exam Timing
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: 8:30 to 10:30 AM"
                              value={course.exam_timing}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "exam_timing",
                                  e.target.value,
                                  this.state.examTimings,
                                  "5"
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
                              Reporting Time
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: 7:00 AM"
                              value={course.reporting_time}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "reporting_time",
                                  e.target.value,
                                  this.state.examTimings,
                                  "5"
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
                              Last Entry Allowed
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: 8:15 AM"
                              value={course.last_entry_allowed}
                              onChange={(e) =>
                                this.onFieldChange(
                                  i,
                                  "last_entry_allowed",
                                  e.target.value,
                                  this.state.examTimings,
                                  "5"
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
                                this.deleteField(i, this.state.examTimings, "5")
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
                    onClick={() => this.addNewField("5")}
                  >
                    + Add Exam Timings
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
