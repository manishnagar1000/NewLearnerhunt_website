import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import Tablenav from "../Comps/Tablenav";
import LoopIcon from "@mui/icons-material/Loop";
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
      isApiHitComplete: true,
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
      ListType:''
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



  getAssetList() {
    try {
      this.setState({ isApiHitComplete: false, isDataFound: false });
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/counsellor/my-calls/${this.state.ListType}`, {
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

  // componentDidMount() {
  //   this.getAssetList();
  // }
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
        (data) => searchKeyword.test(data.studName.toLowerCase())
      );

      if (filteredData.length > 0) {
        this.setState({ clgList: filteredData, isDataFound: true });
      } else {
        this.setState({ isDataFound: false });
      }
    }
  };


  handleChange = (e) => {
    this.setState({ ListType: e.target.value },()=>this.getAssetList(this.state.ListType));
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
                        <MenuItem value={5}>Phone Leads</MenuItem>
                        <MenuItem value={7}>Mba Leads</MenuItem>
                        <MenuItem value={8}>Ug Leads</MenuItem>
                        <MenuItem value={9}>LLB Leads</MenuItem>
                        <MenuItem value={10}>Psychology Leads</MenuItem>
                        <MenuItem value={11}>Loan Leads</MenuItem>
                        <MenuItem value={12}>Dialer Leads</MenuItem>

                      </Select>
                    </FormControl>
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
                        {this.state.ListType == '5'?"College Name":"Student Name"}
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
                          {`${this.state.ListType == '5' ? clg.college_name : clg.studName}`}
                          
                           
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
        
          </>
        ) : (
          this.state.error
        )}
        {/* </div> */}
      </>
    );
  }
}
