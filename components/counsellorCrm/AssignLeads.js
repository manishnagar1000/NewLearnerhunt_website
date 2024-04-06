import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import { Spinner } from "react-bootstrap";
import styles from "/styles/clgdb.module.css";
import Tablenav from "../Comps/Tablenav";

import LoopIcon from '@mui/icons-material/Loop';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
var oldData = []

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
      lastrecid:"-1",
      searchInput: "", // Search input
      error:"",
      TotalCountNumber:'',
      counsellorType:''
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
      searchKeyword.test(data.leads.name.toLowerCase())
  );

  if (filteredData.length > 0) {
      this.setState({ clgList: filteredData, isDataFound: true });
  } else {

      this.setState({ isDataFound: false });
  }
  }
  };
  handleChange=(e)=>{
    this.setState({counsellorType:e.target.value})
    try {
        this.setState({ isApiHitComplete: false, isDataFound: false });
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/counsellor/assigned-leads/${e.target.value}`, {
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
          oldData=response.data

          }
          this.setState({TotalCountNumber:response.data.length})
    
    
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
  render() {
    return (
      <>

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
              <div className="d-flex align-items-center">
              <input
            type="text"
            className="form-control"
            value={this.state.searchInput}
            placeholder="Search..."
            onChange={this.handleSearchChange}
          />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
        <InputLabel id="demo-simple-select-label">Select the list</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.counsellorType}
          label="Select"
          onChange={(e)=>this.handleChange(e)}
        >
          <MenuItem value={1}>Test Eligibility</MenuItem>
          <MenuItem value={2}>Student Applied Colleges</MenuItem>
          <MenuItem value={3}>Registered Students</MenuItem>
          <MenuItem value={4}>Popup Leads</MenuItem>
          <MenuItem value={5}>Counsellor Phone Calls</MenuItem>
          <MenuItem value={6}>Counsellor Video Calls</MenuItem>


        </Select>
      </FormControl>
              </div>
            ),
          }}
        />
        {this.state.isApiHitComplete ? (
          this.state.isDataFound ? (
            <table className={`table table-hover custom-table`}>
              <thead>
                <tr>
                <th style={{ background: "var(--primary)" }}>Student Name</th>
                <th style={{ background: "var(--primary)" }}>Student Mobile</th>
                  <th style={{ background: "var(--primary)" }}>Student Email</th>
                  <th style={{ background: "var(--primary)" }}>Course</th>
                  <th style={{ background: "var(--primary)" }}>Qualification</th>
                  <th style={{ background: "var(--primary)" }}>Date</th>




                </tr>
              </thead>
              <tbody>
                {this.state.clgList.map((clg, i) => {
                  return (
                    
                      <tr key={i}>
                        <td>{clg.leads.name}</td>
                        <td>{clg.leads.mobile}</td>
                        <td>{clg.leads.email.replace(/(?<=.{3}).(?=[^@]*?@)/g, '*')}</td>
                        <td>{clg.leads.course}</td>
                        <td>{clg.leads.email}</td>
                        <td>{this.formatTimestamp(clg.leads.createdAt)}</td>
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
            <div style={{ fontWeight: "500" }}>
              <span style={{ color: "#0d6efd", cursor: 'pointer' }}>Select the List</span>
            </div>
          </div>
            //  <div style={{ display: "flex", width: "100%", height: 'inherit', justifyContent: "center", alignItems: 'center' }}>
            //   <Spinner animation="border" role="status" variant="info">
            //     <span className="visually-hidden">Loading...</span>
            //   </Spinner>
            // </div>
        )}
        <Loading
          show={this.state.isLoading}
          onHide={() => this.setState({ isLoading: false })}
        />
    </>:this.state.error}
      </>
    );
  }
}
