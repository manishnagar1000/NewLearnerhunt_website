import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import { Spinner } from "react-bootstrap";
import styles from "/styles/clgdb.module.css";
import Tablenav from "../Comps/Tablenav";
import LoopIcon from '@mui/icons-material/Loop';
import IconButton from '@mui/material/IconButton';
import CallIcon from "@mui/icons-material/Call";

var oldData = []

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
      lastrecid:"-1",
      searchInput: "", // Search input
      error:"",
      TotalCountNumber:''

      // selectedAsset: null,
    };
  }

 formatTimestamp(timestamp) {
    const dateObject = new Date(timestamp);
  
    const formattedTime = dateObject.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  
    return `${formattedTime}, ${formattedDate}`;
  }

  Callend(counsellor,student){
    // console.log(counsellor,student)

    if(counsellor && student){
      return 'Both'
    }

    if(!counsellor && student){
      return 'Student'
    }
    if(counsellor && !student){
      return 'Counsellor'
    }
      return '-'
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
      console.log(response.data);
      if (response.data.length > 0) {
        this.setState({ clgList: response.data, isDataFound: true });
      }
      this.setState({TotalCountNumber:response.data.length})
      oldData=response.data

    }else{
      let response = await res.json();
        this.setState({error:response.error})
    }
    this.setState({ isApiHitComplete: true });

    });
}catch (error) {
    console.error(error);
  }
  }

  componentDidMount() {
    this.getAssetList();
  }
  handleSearchChange = (e) => {
    this.setState({searchInput:e.target.value})
    const searchTerm = e.target.value.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, 'i');

    if (e.target.value == '') {
      this.setState({ clgList: oldData })
      if (oldData.length > 0) {
          this.setState({ isDataFound: true })
      } else {
          this.setState({ isDataFound: false })
      }
  } else {
    const filteredData = oldData.filter(data =>
      searchKeyword.test(data.customer_number.toLowerCase())
    //   searchKeyword.test(data.studentDetails.mobile.toLowerCase())||
    //   searchKeyword.test(data.studentDetails.email.toLowerCase()),

     

  );

  if (filteredData.length > 0) {
      this.setState({ clgList: filteredData, isDataFound: true });
  } else {

      this.setState({ isDataFound: false });
  }
  }
  };


  handleStudentCall = (e, counsellorInfo) => {
    e.preventDefault();
    console.log(counsellorInfo);

    try {
      this.setState({ isLoading: true });

      const fd = new FormData();
      fd.append("agentNum", counsellorInfo.agent_number); // agent number counsellor number
      fd.append("customerNum",counsellorInfo.customer_number); // student number
      fd.append("slug", counsellorInfo.slug); // college slug
      fd.append("counsEmail", localStorage.getItem("useremail")); // counsellor email
      fd.append("studEmail", counsellorInfo.studEmail); // student email

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/callback-student", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("cst")}`,
        },
        method: "POST",
        body: fd,
      }).then(async (response) => {
        var res = await response.json();
        console.log(res.data);
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
            {/* <div className={styles["basic-details"]}> */}

{this.state.error =="" ?
<>
        <Tablenav
        TotalCount={{
          Total: (
            <h5>
              Total Count :{this.state.TotalCountNumber == "" ? "0" : this.state.TotalCountNumber}
            </h5>
          ),
        }}
          Actions={{
            Actions: (
              <div className="d-flex justify-between align-center">
           
              <input
            type="text"
            className="form-control"
            value={this.state.searchInput}
            placeholder="Search..."
            onChange={this.handleSearchChange}
          />
        <IconButton aria-label="Refresh" onClick={()=>this.getAssetList()}>
        <LoopIcon/>
        </IconButton>
            </div>
                ),
              }}
        />
        {this.state.isApiHitComplete ? (
          this.state.isDataFound ? (
            <table className={`table table-hover custom-table`}>
              <thead>
                <tr>
                <th style={{ background: "var(--primary)" }}>College Name</th>
                <th style={{ background: "var(--primary)" }}>Student Mobile</th>
                <th style={{ background: "var(--primary)" }}>Student Email</th>
                  <th style={{ background: "var(--primary)" }}>Message</th>
                  <th style={{ background: "var(--primary)" }}>Date</th>


                </tr>
              </thead>
              <tbody>
                {this.state.clgList.map((clg, i) => {
                  return (
                    
                      <tr key={i}>
                        <td>{clg.college_name}</td>
                        <td className="text-center"> <IconButton onClick={(e) => this.handleStudentCall(e, clg)}>
                                         <CallIcon fontSize="small" />
                                       </IconButton></td>
                        {/* <td>{clg.customer_number}</td> */}
                        <td>{clg.studEmail.replace(/(?<=.{3}).(?=[^@]*?@)/g, '*')}</td>
                     
                        <td>{clg.message}</td>
                        <td>{this.formatTimestamp(clg.createdAt)}</td>
                        {/* <td>{this.Callend(clg.counsellorDisconnected,clg.studentDisconnected)}</td> */}
                  



                      </tr>
                    
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ display: "flex", width: "100%", height: 'inherit', justifyContent: "center", alignItems: 'center' }}>
            <div style={{ fontWeight: "500" }}>
              <span style={{ color: "#0d6efd", cursor: 'pointer' }}> No Records </span>
            </div>
          </div>
          )
        ) : (
             <div style={{ display: "flex", width: "100%", height: 'inherit', justifyContent: "center", alignItems: 'center' }}>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
        )}
        <Loading
          show={this.state.isLoading}
          onHide={() => this.setState({ isLoading: false })}
        />
    </>:this.state.error}
      {/* </div> */}
      </>
    );
  }
}
