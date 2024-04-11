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
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
var oldData = [];

export default class MyCallinghistory extends Component {
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
      return 'Green';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Orange';
    } else {
      return 'Red';
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
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/counsellor/my-calls`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("cst")}`,
        },
      }).then(async (res) => {
        if (res.ok) {
          // console.log(res)
          let response = await res.json();
          console.log(response.data);
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
        (data) => searchKeyword.test(data.studEmail.toLowerCase())
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
      this.setState({  isLoading: true });
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/counsellor/remarks?lid=${this.state.leadid}&lt=5`,
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
            this.setState({ remarksHistory: response.data.remarks });
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
      this.setState({isLoading: true });
      try {
        const fd = new FormData();
        fd.append("remarks", this.state.remark);
        fd.append("leadType", 5);
        fd.append("leadId", this.state.leadid);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/remarks", {
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
              this.setState({ isLoading: false,remark:'' });
            });
          } else {
            var res = await response.json();
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            })
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
                        Student Email
                      </th>
                      <th style={{ background: "var(--primary)" }}>
                        Call Status
                      </th>  
                      <th style={{ background: "var(--primary)" }}>
                        Message
                      </th>
                      <th style={{ background: "var(--primary)" }}>Date</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clgList.map((clg, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {/* {clg.studEmail.replace(
                              /(?<=.{3}).(?=[^@]*?@)/g,
                              "*"
                            )} */}
                             {clg.studEmail}
                          </td>
                          <td style={{color:'green',fontWeight:'500'}}>{clg.status}</td>
                          <td>{clg.message}</td>
                          <td style={{color:this.DatebasedOncolor(clg.createdAt)}}>{this.formatTimestamp(clg.createdAt)}</td>
                        

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

                {this.state.remarksHistory.length>0 ?
                <table className={`table table-hover custom-table`}>
                  <thead>
                    <tr>
                    <th style={{ background: "var(--primary)" }}>Remarks</th>
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
                : <div
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
              </div>}
                {/* { 
                  this.state.remarksHistory.length>0 ? (
                    <ul>
                      {this.state.remarksHistory.map((obj, index) => (
                        <li key={index}>{obj.remarks}</li>
                      ))}
                    </ul>
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
                    } */}
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
