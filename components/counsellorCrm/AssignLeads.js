import React, { Component } from "react";
import Loading from "../Comps/Loading";
import Tablenav from "../Comps/Tablenav";
import IconButton from "@mui/material/IconButton";
import CallIcon from "@mui/icons-material/Call";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Tooltip from '@mui/material/Tooltip';
import LoopIcon from "@mui/icons-material/Loop";

var oldData = [];

export default class AssignLeads extends Component {
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
      counsellorType: "",
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
      if(this.state.counsellorType == 2){
        var filteredData = oldData.filter((data) => 
        searchKeyword.test(data.full_name.toLowerCase())
      )}else{
        var filteredData = oldData.filter((data) =>
    
        searchKeyword.test(data.name.toLowerCase())
      )}
      if (filteredData.length > 0) {
        this.setState({ clgList: filteredData, isDataFound: true });
      } else {
        this.setState({ isDataFound: false });
      }
    }
  };
  

  getAssetList(type){
    try {
      this.setState({
        isApiHitComplete: false,
        isDataFound: false,
      });
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/counsellor/assigned-leads/${type}`,
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
          if (response.data.length > 0) {
            this.setState({ clgList: response.data, isDataFound: true });
            oldData = response.data;
          }
          this.setState({ TotalCountNumber: response.data.length });
        } else {
          let response = await res.json();
          this.setState({ error: response.error });
        }
        this.setState({ isApiHitComplete: true});
      });
    } catch (error) {
      console.error(error);
    }
  }
  handleChange = (e) => {
    this.setState({ counsellorType: e.target.value },()=>this.getAssetList(this.state.counsellorType));
  };

  handleStudentCall = (e, counsellorInfo) => {
    e.preventDefault();
    console.log(counsellorInfo);

    try {
      this.setState({ isLoading: true });

      const fd = new FormData();
      fd.append("agentNum", counsellorInfo.agent_num); // agent number counsellor number
      fd.append(
        "customerNum",
        this.state.counsellorType == 2
          ? counsellorInfo.contact_no
          : counsellorInfo.mobile
      ); // student number
      fd.append("slug", ""); // college slug
      fd.append("counsEmail", localStorage.getItem("useremail")); // counsellor email
      fd.append("studEmail", counsellorInfo.email); // student email

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
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.searchInput}
                      placeholder="Search..."
                      onChange={this.handleSearchChange}
                    />
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                      fullWidth
                    >
                      <InputLabel id="demo-simple-select-label">
                        Select the list
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.counsellorType}
                        label="Select"
                        onChange={(e) => this.handleChange(e)}
                      >
                        <MenuItem value={1}>Test Eligibility</MenuItem>
                        <MenuItem value={2}>
                          Student Applied In Colleges
                        </MenuItem>
                        <MenuItem value={3}>Registered Students</MenuItem>
                        <MenuItem value={4}>PopUp Leads</MenuItem>
                      </Select>
                    </FormControl>
                    <Tooltip title="Refresh">
                    <IconButton
                      aria-label="Refresh"
                      onClick={(e) => this.getAssetList(this.state.counsellorType)}
                    >
                      <LoopIcon />
                    </IconButton>
                    </Tooltip>
                  </div>
                ),
              }}
            />
            {this.state.counsellorType != "" ? (
              this.state.isApiHitComplete ? (
                this.state.isDataFound ? (
                  this.state.counsellorType == 4 ? (
                    <table className={`table table-hover custom-table`}>
                      <thead>
                        <tr>
                          <th style={{ background: "var(--primary)" }}>
                            Student Name
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Student Mobile
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Student Email
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Course
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Qualification
                          </th>
                          <th style={{ background: "var(--primary)" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td>{clg.name}</td>
                              <td className="text-center">
                                <IconButton
                                  onClick={(e) =>
                                    this.handleStudentCall(e, clg)
                                  }
                                >
                                  <CallIcon color="primary" fontSize="small" />
                                </IconButton>
                              </td>
                              <td>{clg.email}</td>
                              <td>{clg.course}</td>
                              <td>{clg.qualification}</td>
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
                  ) : this.state.counsellorType == 1 ? (
                    <table className={`table table-hover custom-table`}>
                      <thead>
                        <tr>
                          <th style={{ background: "var(--primary)" }}>
                            Student Name
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Student Mobile
                          </th>
                          <th style={{ background: "var(--primary)" }}>Fees</th>
                          <th style={{ background: "var(--primary)" }}>Zone</th>
                          <th style={{ background: "var(--primary)" }}>
                            Course
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Qualification
                          </th>
                          <th style={{ background: "var(--primary)" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td>{clg.name}</td>
                              <td className="text-center">
                                <IconButton
                                  onClick={(e) =>
                                    this.handleStudentCall(e, clg)
                                  }
                                >
                                  <CallIcon color="primary" fontSize="small" />
                                </IconButton>
                              </td>
                              <td>{clg.fee}</td>
                              <td>{clg.zone}</td>
                              <td>{clg.course}</td>
                              <td>{clg.qualification}</td>
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
                  ) : this.state.counsellorType == 2 ? (
                    <table className={`table table-hover custom-table`}>
                      <thead>
                        <tr>
                          <th style={{ background: "var(--primary)" }}>
                            Student Name
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Student Mobile
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Email
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Gender
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Course Interested
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            State
                          </th>
                          <th style={{ background: "var(--primary)" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td>{clg.full_name}</td>
                              <td className="text-center">
                                <IconButton
                                  onClick={(e) =>
                                    this.handleStudentCall(e, clg)
                                  }
                                >
                                  <CallIcon color="primary" fontSize="small" />
                                </IconButton>
                              </td>
                              <td>{clg.email}</td>
                              <td>{clg.gender}</td>
                              <td>{clg.course_interested}</td>
                              <td>{clg.state}</td>
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
                  ) : this.state.counsellorType == 3 ? (
                    <table className={`table table-hover custom-table`}>
                      <thead>
                        <tr>
                          <th style={{ background: "var(--primary)" }}>
                            Student Name
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Student Mobile
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Email
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Stream
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Level
                          </th>
                          <th style={{ background: "var(--primary)" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td>{clg.name}</td>
                              <td className="text-center">
                                <IconButton
                                  onClick={(e) =>
                                    this.handleStudentCall(e, clg)
                                  }
                                >
                                  <CallIcon color="primary" fontSize="small" />
                                </IconButton>
                              </td>
                              <td>{clg.email}</td>
                              <td>{clg.selected_stream}</td>
                              <td>{clg.selected_level}</td>
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
                    ""
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
                    height: "80vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spinner
                    animation="border"
                    role="status"
                    variant="info"
                  ></Spinner>
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
                <div style={{ fontWeight: "500" }}>
                  <span style={{ color: "#0d6efd", cursor: "pointer" }}>
                    Select the List
                  </span>
                </div>
              </div>
            )}

            <Loading
              show={this.state.isLoading}
              onHide={() => this.setState({ isLoading: false })}
            />
          </>
        ) : (
          this.state.error
        )}
      </>
    );
  }
}
