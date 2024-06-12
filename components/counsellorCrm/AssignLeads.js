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
import DifferenceIcon from "@mui/icons-material/Difference";
import Tooltip from '@mui/material/Tooltip';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import LoopIcon from "@mui/icons-material/Loop";
import RemarkModal from "./component/RemarkModule";
import Bitlinksend from "./component/Bitlinksend";

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
      searchInput: "", 
      error: "",
      TotalCountNumber: "",
      remark: "",
      remarksHistory: [],
      showModal: false,
      showbitModal:false,
      leadid: "",
      counsellorType: "",
      pipeline:null,
      isCustomRemark:false,
     steps : [
    "First Followup Complete",
    "Bit-link Registration Complete",
    "Fee Payment Success",
  ],
  clgBroucher:[]
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
    // console.log(counsellorInfo);

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
      fd.append("lid",counsellorInfo._id); // Lead id of row of student
      fd.append("lt", this.state.counsellorType); //  Lead type of select list 

      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + `/counsellor/callback-student`,
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
        }else if(res.data.error){
          Swal.fire({
            title: "error",
            text: `${res.data.error.message}`,
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
      this.setState({ isLoading: false });

      console.error("Failed to fetch OTP:", error);
    }
  };

  handleGetRemarks = (type) => {
    // console.log(type)
    // this.setState({callerType:type}),(()=>{
    //   console.log('hello')
    // })
    try {
      this.setState({ isLoading: true,counsellorType:type }),(()=>{
        // console.log("hello1")
      });
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/counsellor/lead-status?lid=${this.state.leadid}&lt=${this.state.counsellorType}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("cst")}`,
          },
        }
      ).then(async (res) => {
        if (res.ok) {
          let response = await res.json();
          this.setState({ remarksHistory: response.data.remarks,pipeline:response.data.pipeline });
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

  handleGetBitlink = () => {
    try {
      this.setState({ isLoading: true })
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/counsellor/clg-broucher-list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("cst")}`,
          },
        }
      ).then(async (res) => {
        if (res.ok) {
          let response = await res.json();
          // console.log(response.data)
          this.setState({ clgBroucher: response.data});
          this.setState({ showbitModal: true });
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

  handleRemarkChange = (e) => {
    if(e.target.value == "-1"){
      this.setState({isCustomRemark:true,remark:""})
    }else{
      this.setState({isCustomRemark:false,remark: e.target.value})
    }
  };
  handleCustomRemarkChange = (e) => {
    this.setState({ remark: e.target.value });
  };

  handleAddRemark = () => {
    if (this.state.remark.trim() !== "") {
      this.setState({ isLoading: true });
      try {
        const fd = new FormData();
        fd.append("remarks", this.state.remark);
        fd.append("leadType", this.state.counsellorType);
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
              this.setState({ isLoading: false, remark: "", counsellorType:this.state.counsellorType });
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
  togglebitModal = () => {
    this.setState({ showbitModal: !this.state.showbitModal });
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

  handleShare = (obj) =>{
    // console.log(obj)
    Swal.fire({
      title: "Are you sure?",
      text: "You want to send the Broucher!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
    try {
      this.setState({ isLoading: true });
      const fd = new FormData();
      fd.append("broucher", `https://learnerhunt-assets.s3.amazonaws.com/${obj.college_broucher_pdf}`); 
      fd.append("cName", obj.college_name); 
      fd.append("lid", this.state.leadid); 
      fd.append("lt",this.state.counsellorType); 

      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/send-broucher",
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
            text: `${res.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        this.setState({ isLoading: false });
      });
    } catch (error) {
      this.setState({ isLoading: false });

      console.error("Failed to fetch OTP:", error);
    }
  }
  })
  }
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
                        <MenuItem value={7}>Mba Leads</MenuItem>
                        <MenuItem value={8}>Ug Leads</MenuItem>
                        <MenuItem value={9}>LLB Leads</MenuItem>
                        <MenuItem value={10}>Psychology Leads</MenuItem>
                        <MenuItem value={11}>Loan Leads</MenuItem>

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
                  this.state.counsellorType == 11 ? (
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
                            Remarks
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Send Email
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Country
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            State
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            City
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Budget
                          </th>
                          <th style={{ background: "var(--primary)" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td>{clg.name || 'NA'}</td>
                              <td className="text-center">
                                <IconButton
                                  onClick={(e) =>
                                    this.handleStudentCall(e, clg)
                                  }
                                >
                                  <CallIcon color="primary" fontSize="small" />
                                </IconButton>
                              </td>
                              <td className="text-center">
                            <Tooltip title="Add Remark">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetRemarks(11)
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
                          <td className="text-center">
                            <Tooltip title="Send Email">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetBitlink()
                                  )
                                }
                              >
                                <AttachEmailIcon
                                  color="secondary"
                                  fontSize="small"
                                />
                              </IconButton>
                            </Tooltip>
                            
                          </td>
                              {/* <td>{clg.email || 'NA'}</td> */}
                              <td>{clg.country || 'NA'}</td>
                              <td>{clg.state || 'NA'}</td>
                              <td>{clg.city || 'NA'}</td>
                              <td>{clg.amount || 'NA'}</td>
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
                  ):
                  this.state.counsellorType == 10 ? (
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
                            Remarks
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Send Email
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Course
                          </th>
                        
                          <th style={{ background: "var(--primary)" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td>{clg.name || 'NA'}</td>
                              <td className="text-center">
                                <IconButton
                                  onClick={(e) =>
                                    this.handleStudentCall(e, clg)
                                  }
                                >
                                  <CallIcon color="primary" fontSize="small" />
                                </IconButton>
                              </td>
                              <td className="text-center">
                            <Tooltip title="Add Remark">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetRemarks(10)
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
                          <td className="text-center">
                            <Tooltip title="Send Email">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetBitlink()
                                  )
                                }
                              >
                                <AttachEmailIcon
                                  color="secondary"
                                  fontSize="small"
                                />
                              </IconButton>
                            </Tooltip>
                            
                          </td>
                              {/* <td>{clg.email || 'NA'}</td> */}
                              <td>{clg.course || 'NA'}</td>
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
                  ):
                  this.state.counsellorType == 9 ? (
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
                            Remarks
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Send Email
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Course
                          </th>
                        
                          <th style={{ background: "var(--primary)" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td>{clg.name || 'NA'}</td>
                              <td className="text-center">
                                <IconButton
                                  onClick={(e) =>
                                    this.handleStudentCall(e, clg)
                                  }
                                >
                                  <CallIcon color="primary" fontSize="small" />
                                </IconButton>
                              </td>
                              <td className="text-center">
                            <Tooltip title="Add Remark">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetRemarks(9)
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
                              {/* <td>{clg.email || 'NA'}</td> */}
                              <td className="text-center">
                            <Tooltip title="Send Email">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetBitlink()
                                  )
                                }
                              >
                                <AttachEmailIcon
                                  color="secondary"
                                  fontSize="small"
                                />
                              </IconButton>
                            </Tooltip>
                            
                          </td>
                              <td>{clg.course || 'NA'}</td>
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
                  ):
                  this.state.counsellorType == 8 ? (
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
                            Remarks
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Send Email
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Course
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            City
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Budget
                          </th>
                          <th style={{ background: "var(--primary)" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td>{clg.name || 'NA'}</td>
                              <td className="text-center">
                                <IconButton
                                  onClick={(e) =>
                                    this.handleStudentCall(e, clg)
                                  }
                                >
                                  <CallIcon color="primary" fontSize="small" />
                                </IconButton>
                              </td>
                              <td className="text-center">
                            <Tooltip title="Add Remark">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetRemarks(8)
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
                          <td className="text-center">
                            <Tooltip title="Send Email">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetBitlink()
                                  )
                                }
                              >
                                <AttachEmailIcon
                                  color="secondary"
                                  fontSize="small"
                                />
                              </IconButton>
                            </Tooltip>
                            
                          </td>
                              {/* <td>{clg.email || 'NA'}</td> */}
                              <td>{clg.course || 'NA'}</td>
                              <td>{clg.city || 'NA'}</td>
                              <td>{clg.budget || 'NA'}</td>
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
                  ):
                  this.state.counsellorType == 7 ? (
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
                            Remarks
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Send Email
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Course
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            City
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Budget
                          </th>
                          <th style={{ background: "var(--primary)" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td>{clg.name || 'NA'}</td>
                              <td className="text-center">
                                <IconButton
                                  onClick={(e) =>
                                    this.handleStudentCall(e, clg)
                                  }
                                >
                                  <CallIcon color="primary" fontSize="small" />
                                </IconButton>
                              </td>
                              <td className="text-center">
                            <Tooltip title="Add Remark">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetRemarks(7)
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
                          <td className="text-center">
                            <Tooltip title="Send Email">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetBitlink()
                                  )
                                }
                              >
                                <AttachEmailIcon
                                  color="secondary"
                                  fontSize="small"
                                />
                              </IconButton>
                            </Tooltip>
                            
                          </td>
                              {/* <td>{clg.email || 'NA'}</td> */}
                              <td>{clg.course || 'NA'}</td>
                              <td>{clg.city || 'NA'}</td>
                              <td>{clg.budget || 'NA'}</td>
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
                  ) :
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
                            Remarks
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                           Send Email
                          </th>
                          {/* <th style={{ background: "var(--primary)" }}>
                            Student Email
                          </th> */}
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
                              <td className="text-center">
                            <Tooltip title="Add Remark">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetRemarks(4)
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
                          <td className="text-center">
                            <Tooltip title="Send Email">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetBitlink()
                                  )
                                }
                              >
                                <AttachEmailIcon
                                  color="secondary"
                                  fontSize="small"
                                />
                              </IconButton>
                            </Tooltip>
                            
                          </td>
                              {/* <td>{clg.email}</td> */}
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
                          <th style={{ background: "var(--primary)" }}>
                            Remarks
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
                              <td className="text-center">
                            <Tooltip title="Add Remark">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetRemarks(1)
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
                            Remarks
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                           Send Email
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
                              <td className="text-center">
                            <Tooltip title="Add Remark">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetRemarks(2)
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
                          <td className="text-center">
                            <Tooltip title="Send Email">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetBitlink()
                                  )
                                }
                              >
                                <AttachEmailIcon
                                  color="secondary"
                                  fontSize="small"
                                />
                              </IconButton>
                            </Tooltip>
                            
                          </td>
                              {/* <td>{clg.email}</td> */}
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
                            Remarks
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                           Send Email
                          </th>
                          {/* <th style={{ background: "var(--primary)" }}>
                            Email
                          </th> */}
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
                              <td className="text-center">
                            <Tooltip title="Add Remark">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetRemarks(3)
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
                          <td className="text-center">
                            <Tooltip title="Send Email">
                              <IconButton
                                onClick={(e) =>
                                  this.setState({ leadid: clg._id }, () =>
                                    this.handleGetBitlink()
                                  )
                                }
                              >
                                <AttachEmailIcon
                                  color="secondary"
                                  fontSize="small"
                                />
                              </IconButton>
                            </Tooltip>
                            
                          </td>
                              {/* <td>{clg.email}</td> */}
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
    {/* <Modal
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
                            <td style={{whiteSpace:'break-spaces',wordBreak:'break-all'}}>{obj.remarks}</td>
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
            </Modal> */}


            <RemarkModal
          showModal={this.state.showModal}
          toggleModal={this.toggleModal}
          remark={this.state.remark}
          handleRemarkChange={this.handleRemarkChange}
          isCustomRemark={this.state.isCustomRemark}
          handleCustomRemarkChange={this.handleCustomRemarkChange}
          handleAddRemark={this.handleAddRemark}
          remarksHistory={this.state.remarksHistory}
          formatTimestamp={this.formatTimestamp}
          steps={this.state.steps}
          getMaxCount={this.getMaxCount}
          pipeline={this.state.pipeline}
        />

        <Bitlinksend
         showbitModal={this.state.showbitModal}
         togglebitModal={this.togglebitModal}
         clgBroucher={this.state.clgBroucher}
         handleShare={this.handleShare}
        />


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
