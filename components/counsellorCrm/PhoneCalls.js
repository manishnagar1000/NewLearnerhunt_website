import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import { Spinner } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import CallIcon from "@mui/icons-material/Call";
import Tablenav from "../Comps/Tablenav";
import LoopIcon from "@mui/icons-material/Loop";
import DifferenceIcon from "@mui/icons-material/Difference";
import Tooltip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

var oldData = [];
var steps = [
  "First Followup Complete",
  "Bit-link Registration Complete",
  "Fee Payment Success",
];
export default class PhoneCalls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      clgList: [],
      isDataFound: false,
      isApiHitComplete: false,
      selectedCategory: [],
      username: localStorage.getItem("username"),
      statusAnchorEl: null,
      lastrecid: "-1",
      searchInput: "", // Search input
      error: "",
      TotalCountNumber: "",
      remark: "",
      remarksHistory: [],
      showModal: false,
      leadid: "",
      callerType: "",
      pipeline:null

      // selectedAsset: null,
    };
  }

  formatTimestamp(timestamp) {
    const dateObject = new Date(timestamp);

    const formattedTime = dateObject.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const formattedDate = dateObject.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return `${formattedTime}, ${formattedDate}`;
  }
  DatebasedOncolor = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Green";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Orange";
    } else {
      return "Red";
    }
  };

  Callend(counsellor, student) {
    // console.log(counsellor,student)

    if (counsellor && student) {
      return "Both";
    }

    if (!counsellor && student) {
      return "Student";
    }
    if (counsellor && !student) {
      return "Counsellor";
    }
    return "-";
  }

  getAssetList() {
    try {
      this.setState({ isApiHitComplete: false, isDataFound: false });
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/counsellor/phonecalls`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("cst")}`,
        },
      }).then(async (res) => {
        if (res.ok) {
          // console.log(res)
          let response = await res.json();
          // console.log(response.data);
          if (response.data.length > 0) {
            this.setState({ clgList: response.data, isDataFound: true });
          }
          this.setState({ TotalCountNumber: response.data.length });
          oldData = response.data;
        } else {
          let response = await res.json();
          this.setState({ error: response.error });
        }
        this.setState({ isApiHitComplete: true });
      });
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.getAssetList();
  }
  handleSearchChange = (e) => {
    this.setState({ searchInput: e.target.value });
    const searchTerm = e.target.value
      .trim()
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, "i");

    if (e.target.value == "") {
      this.setState({ clgList: oldData });
      if (oldData.length > 0) {
        this.setState({ isDataFound: true});
      } else {
        this.setState({ isDataFound: false });
      }
    } else {
      const filteredData = oldData.filter(
        (data) =>
          searchKeyword.test(data.college_name.toLowerCase()) ||
          searchKeyword.test(data.studEmail.toLowerCase())
      );

      if (filteredData.length > 0) {
        this.setState({ clgList: filteredData, isDataFound: true });
      } else {
        this.setState({ isDataFound: false });
      }
    }
  };

  handleGetRemarks = () => {
    try {
      this.setState({ isLoading: true });
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/counsellor/lead-status?lid=${this.state.leadid}&lt=5`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("cst")}`,
          },
        }
      ).then(async (res) => {
        if (res.ok) {
          // console.log(res)
          let response = await res.json();
          // console.log(response.data);
          this.setState({ remarksHistory: response.data.remarks ,pipeline:response.data.pipeline});
          this.setState({ showModal: true });
        } else {
          let response = await res.json();
          this.setState({ error: response.error });
        }
        this.setState({ isLoading: false });
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleStudentCall = (e, counsellorInfo) => {
    e.preventDefault();
    // console.log(counsellorInfo);

    try {
      this.setState({ isLoading: true });

      const fd = new FormData();
      fd.append("agentNum", counsellorInfo.agent_number); // agent number counsellor number
      fd.append("customerNum", counsellorInfo.customer_number); // student number
      fd.append("slug", counsellorInfo.slug); // college slug
      fd.append("counsEmail", localStorage.getItem("useremail")); // counsellor email
      fd.append("studEmail", counsellorInfo.studEmail); // student email
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/callback-student",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("cst")}`,
          },
          method: "POST",
          body: fd,
        }
      ).then(async (response) => {
        var res = await response.json();
        // console.log(res.data);
        if (res.error) {
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "success",
            text: `${res.data.success.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        this.setState({ isLoading: false });
      });
    } catch (error) {
      console.error("Failed to fetch OTP:", error);
    }
  };

  handleRemarkChange = (e) => {
    this.setState({ remark: e.target.value });
  };

  handleAddRemark = () => {
    if (this.state.remark.trim() !== "") {
      this.setState({ isLoading: true });
      try {
        const fd = new FormData();
        fd.append("remarks", this.state.remark);
        fd.append("leadType", 5);
        fd.append("leadId", this.state.leadid);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/lead-status", {
          method: "POST",
          body: fd,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("cst")}`,
          },
        }).then(async (response) => {
          if (response.ok) {
            var res = await response.json();
            // console.log(res);
            // console.log(res.data);
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              this.handleGetRemarks();
              this.setState({ isLoading: false, remark: "" });
            });
          } else {
            var res = await response.json();
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        });
      } catch (error) {
        console.error("Failed to fetch OTP:", error);
      }
    }
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  getMaxCount = (p) => {
    // console.log(p)
    if (p.stage3) {
      return 3;
    } else if (p.stage2) {
      return 2;
    } else if (p.stage1) {
      return 1;
    }
  };

  // handleChange = (e) => {
  //   this.setState({ callerType: e.target.value });
  //   if (e.target.value == "all") {
  //     this.setState({ clgList: oldData });
  //     if (oldData.length > 0) {
  //       this.setState({ isDataFound: true });
  //     } else {
  //       this.setState({ isDataFound: false });
  //     }
  //   } else if (e.target.value == "student") {
  //     const filteredData = oldData.filter((data) => !data.reverse_call);

  //     if (filteredData.length > 0) {
  //       this.setState({ clgList: filteredData, isDataFound: true });
  //     } else {
  //       this.setState({ isDataFound: false });
  //     }
  //   } else if (e.target.value == "counsellor") {
  //     const filteredData = oldData.filter((data) => data.reverse_call);

  //     if (filteredData.length > 0) {
  //       this.setState({ clgList: filteredData, isDataFound: true });
  //     } else {
  //       this.setState({ isDataFound: false });
  //     }
  //   }
  // };
  render() {
    return (
      <>
        {/* <div className={styles["basic-details"]}> */}

        {this.state.error == "" ? (
          <>
            <Tablenav
              TotalCount={{
                Total: (
                  <h5>
                    Total Count :
                    {this.state.TotalCountNumber == ""
                      ? "0"
                      : this.state.TotalCountNumber}
                  </h5>
                ),
              }}
              Actions={{
                Actions: (
                  <div className="d-flex justify-content-between align-items-center">
                    {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
        <InputLabel id="demo-simple-select-label">Select the Caller</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.callerType}
          label="Select"
          onChange={(e)=>this.handleChange(e)}
        >
          <MenuItem value='student'>Student</MenuItem>
          <MenuItem value='counsellor'>Counsellor</MenuItem>
          <MenuItem value='all'>All</MenuItem>

        </Select>
      </FormControl> */}
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.searchInput}
                      placeholder="Search..."
                      onChange={this.handleSearchChange}
                    />
                    <Tooltip title="Refresh">
                      <IconButton
                        aria-label="Refresh"
                        onClick={() => this.getAssetList()}
                      >
                        <LoopIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                ),
              }}
            />
            {this.state.isApiHitComplete ? (
              this.state.isDataFound ? (
                <table className={`table table-hover custom-table`}>
                  <thead>
                    <tr>
                      <th style={{ background: "var(--primary)" }}>
                        College Name
                      </th>
                      <th style={{ background: "var(--primary)" }}>
                        Click to Call
                      </th>
                      {/* <th style={{ background: "var(--primary)" }}>Caller</th> */}
                      {/* <th style={{ background: "var(--primary)" }}>
                        Student Email
                      </th> */}
                      <th style={{ background: "var(--primary)" }}>Remarks</th>

                      <th style={{ background: "var(--primary)" }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clgList.map((clg, i) => {
                      return (
                        <tr key={i}>
                          <td>{clg.college_name}</td>
                          <td className="text-center">
                            <Tooltip title="Call">
                              <IconButton
                                onClick={(e) => this.handleStudentCall(e, clg)}
                              >
                                <CallIcon color="primary" fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </td>
                          {/* <td style={{ fontWeight: "500" }}>
                            {clg.reverse_call ? (
                              <span
                                style={{ color: clg.reverse_call && "#2e7d32" }}
                              >
                                Counsellor
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: !clg.reverse_call && "#1976d2",
                                }}
                              >
                                Student
                              </span>
                            )}
                          </td> */}

                          {/* <td>{clg.customer_number}</td> */}
                          {/* <td>
                           
                            {clg.studEmail}
                          </td> */}
                          <td className="text-center">
                            <Tooltip title="Add Remark">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetRemarks()
                                  )
                                }
                              >
                                <DifferenceIcon
                                  color="success"
                                  fontSize="small"
                                />
                              </IconButton>
                            </Tooltip>
                          </td>
                          <td
                            style={{
                              color: this.DatebasedOncolor(clg.createdAt),
                            }}
                          >
                            {this.formatTimestamp(clg.createdAt)}
                          </td>

                          {/* <td>{this.Callend(clg.counsellorDisconnected,clg.studentDisconnected)}</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "inherit",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontWeight: "500" }}>
                    <span style={{ color: "#0d6efd", cursor: "pointer" }}>
                      {" "}
                      No Records{" "}
                    </span>
                  </div>
                </div>
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "inherit",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner animation="border" role="status" variant="info">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            <Loading
              show={this.state.isLoading}
              onHide={() => this.setState({ isLoading: false })}
            />

            <Modal
              show={this.state.showModal}
              onHide={this.toggleModal}
              backdrop="static"
              keyboard={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Remark</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="remarkForm">
                  <Form.Label>Remark</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter remark"
                    value={this.state.remark}
                    onChange={this.handleRemarkChange}
                  />
                </Form.Group>
                <div className="text-center mt-2">
                  <Button variant="primary" onClick={this.handleAddRemark}>
                    Add
                  </Button>
                </div>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
              <Modal.Body>
                <h5>Remarks History</h5>

                {this.state.remarksHistory.length > 0 ? (
                  <>
                  <table className={`table table-hover custom-table`}>
                    <thead>
                      <tr>
                        <th style={{ background: "var(--primary)" }}>
                          Remarks
                        </th>
                        <th style={{ background: "var(--primary)" }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.remarksHistory.map((obj, i) => {
                        return (
                          <tr key={i}>
                            <td>{obj.remarks}</td>
                            <td>{this.formatTimestamp(obj.createdAt)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                   <hr/>
                   <Stack sx={{ width: "100%" }} spacing={4}>
                   <Stepper
                     alternativeLabel
                     activeStep={this.state.pipeline ? this.getMaxCount(this.state.pipeline) : -1}
                   >
                     {steps.map((label) => (
                       <Step key={label}>
                         <StepLabel>{label}</StepLabel>
                       </Step>
                     ))}
                   </Stepper>
                 </Stack>
                 </>
                ) : (
                  <>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "inherit",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontWeight: "500" }}>
                      <span style={{ color: "#0d6efd", cursor: "pointer" }}>
                        {" "}
                        No Records{" "}
                      </span>
                    </div>
                  </div>
                    <hr/>
                    <Stack sx={{ width: "100%" }} spacing={4}>
                    <Stepper
                      alternativeLabel
                      activeStep={this.state.pipeline ? this.getMaxCount(this.state.pipeline) : -1}
                    >
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Stack>
                  </>
                )}
            
              </Modal.Body>
            </Modal>
          </>
        ) : (
          this.state.error
        )}
        {/* </div> */}
      </>
    );
  }
}
