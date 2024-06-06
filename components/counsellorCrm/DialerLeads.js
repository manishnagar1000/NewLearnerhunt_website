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
import RemarkModal from "./component/RemarkModule";
import DialerModule from "./component/DialerModule";

var oldData = [];
export default class DialerLeads extends Component {
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
      showDialer: false,
      toggleDialer: false,
      leadid: "",
      callerType: "",
      pipeline: null,
      steps: [
        "First Followup Complete",
        "Bit-link Registration Complete",
        "Fee Payment Success",
      ],
      // selectedAsset: null,

      studentname: "",
      studentemail: "",
      mobile: "",
      course: "",
      pitchedCollege: "",
      budget: "",
      studentremark: "",
      error: "",
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
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/counsellor/dialer-lead`, {
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
        this.setState({ isDataFound: true });
      } else {
        this.setState({ isDataFound: false });
      }
    } else {
      const filteredData = oldData.filter(
        (data) =>
          searchKeyword.test(data.student_name.toLowerCase()) ||
          searchKeyword.test(data.student_email.toLowerCase())
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
          `/counsellor/lead-status?lid=${this.state.leadid}&lt=12`,
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
          this.setState({
            remarksHistory: response.data.remarks,
            pipeline: response.data.pipeline,
          });
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
      fd.append("customerNum", counsellorInfo.mobile); // student number
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
        fd.append("leadType", 12);
        fd.append("leadId", this.state.leadid);
        fetch(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/lead-status",
          {
            method: "POST",
            body: fd,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("cst")}`,
            },
          }
        ).then(async (response) => {
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
    if (p.stage3) {
      return 3;
    } else if (p.stage2) {
      return 2;
    } else if (p.stage1) {
      return 1;
    }
  };

  //   e.preventDefault();
  //   const fd = new FormData();
  //   fd.append("studName", this.state.studentname);
  //   fd.append("studEmail", this.state.studentemail);
  //   fd.append("mobile", this.state.mobile);
  //   fd.append("course", this.state.course);
  //   fd.append("pitchedCollege", this.state.pitchedCollege);
  //   fd.append("budget", this.state.budget);
  //   fd.append("remarks", this.state.studentremark);

  //   try {
  //     const response = await fetch(
  //       process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/dialer-lead",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("cst")}`,
  //         },
  //         method: "POST",
  //         body: fd,
  //       }
  //     );

  //     const res = await response.json();
  //     console.log(res);

  //     if (response.ok) {
  //       Swal.fire({
  //         title: "Success",
  //         text: `${res.message}`,
  //         icon: "success",
  //         confirmButtonText: "Ok",
  //       }).then(() => {
  //         this.setState({
  //           studentname: "",
  //           studentemail: "",
  //           mobile: "",
  //           course: "",
  //           pitchedCollege: "",
  //           budget: "",
  //           studentremark: "",
  //         });
  //         this.props.getAssetList();
  //       });
  //     } else {
  //       Swal.fire({
  //         title: "Error",
  //         text: `${res.error}`,
  //         icon: "error",
  //         confirmButtonText: "Ok",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     Swal.fire({
  //       title: "Error",
  //       text: "Something went wrong!",
  //       icon: "error",
  //       confirmButtonText: "Ok",
  //     });
  //   }
  // };
  render() {
    return (
      <>
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
                    <Button
                      variant="primary"
                      onClick={() => this.setState({ showDialer: true })}
                    >
                      +
                    </Button>
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
                        Student Name
                      </th>

                      <th style={{ background: "var(--primary)" }}>
                        Click to Call
                      </th>

                      <th style={{ background: "var(--primary)" }}>Remarks</th>
                      <th style={{ background: "var(--primary)" }}>
                        College Name
                      </th>
                      <th style={{ background: "var(--primary)" }}>Course</th>
                      <th style={{ background: "var(--primary)" }}>Budget</th>
                      <th style={{ background: "var(--primary)" }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clgList.map((clg, i) => {
                      return (
                        <tr key={i}>
                          <td>{clg.student_name}</td>

                          <td className="text-center">
                            <Tooltip title="Call">
                              <IconButton
                                onClick={(e) => this.handleStudentCall(e, clg)}
                              >
                                <CallIcon color="primary" fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </td>

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
                          <td>{clg.pitched_college}</td>
                          <td>{clg.course}</td>
                          <td>{clg.budget}</td>
                          <td
                            style={{
                              color: this.DatebasedOncolor(clg.createdAt),
                            }}
                          >
                            {this.formatTimestamp(clg.createdAt)}
                          </td>
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

            <RemarkModal
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
              remark={this.state.remark}
              handleRemarkChange={this.handleRemarkChange}
              handleAddRemark={this.handleAddRemark}
              remarksHistory={this.state.remarksHistory}
              formatTimestamp={this.formatTimestamp}
              steps={this.state.steps}
              getMaxCount={this.getMaxCount}
              pipeline={this.state.pipeline}
            />
            {this.state.showDialer && (
              <DialerModule
                toggleDialer={() => this.setState({ showDialer: false })}
                isLoading={this.state.isLoading}
                getAssetList={()=>this.getAssetList()}
                studentname={this.state.studentname}
                studentemail={this.state.studentemail}
                mobile={this.state.mobile}
                course={this.state.course}
                pitchedCollege={this.state.pitchedCollege}
                budget={this.state.budget}
                studentremark={this.state.studentremark}
                error={this.state.error}
              />
            )}
          </>
        ) : (
          this.state.error
        )}
      </>
    );
  }
}
