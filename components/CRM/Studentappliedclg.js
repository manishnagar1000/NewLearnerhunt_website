import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import { Spinner } from "react-bootstrap";

export default class Studentappliedclg extends Component {
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
      lastrecid:"-1"
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

  getAssetList() {
    this.setState({ isApiHitComplete: false, isDataFound: false });
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/leads?lid=${this.state.lastrecid}&type=2`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
        console.log(res)
      let response = await res.json();
      console.log(response.data);
      if (response.data.length > 0) {
        this.setState({ clgList: response.data, isDataFound: true });
      }
      this.setState({ isApiHitComplete: true });
    });
  }

  componentDidMount() {
    this.getAssetList();
  }

  render() {
    return (
      <>
      
        {this.state.isApiHitComplete ? (
          this.state.isDataFound ? (
            <table className={`table table-hover custom-table`}>
              <thead style={{ top: `-0.5px` }}>
                <tr>
                  <th style={{ background: "var(--primary)" }}>Full Name</th>
                  <th style={{ background: "var(--primary)" }}>Mobile Number</th>
                  <th style={{ background: "var(--primary)" }}>Course Intrested</th>
                  <th style={{ background: "var(--primary)" }}>State</th>
                  <th style={{ background: "var(--primary)" }}>Email</th>
                  <th style={{ background: "var(--primary)" }}>Date</th>



                </tr>
              </thead>
              <tbody>
                {this.state.clgList.map((clg, i) => {
                  return (
                    
                      <tr key={i}>
                        <td>{clg.full_name}</td>
                        <td>{clg.contact_no}</td>
                        <td>{clg.course_interested}</td>
                        <td>{clg.state}</td>
                        <td>{clg.email}</td>
                        <td>{this.formatTimestamp(clg.createdAt)}</td>
                  



                      </tr>
                    
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
            <div style={{ fontWeight: "500" }}>
              <span style={{ color: "#0d6efd", cursor: 'pointer' }}> No Records </span>
            </div>
          </div>
          )
        ) : (
             <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
        )}
        <Loading
          show={this.state.isLoading}
          onHide={() => this.setState({ isLoading: false })}
        />
        {/* {this.state.openPreviewAsset && (
          <Previewmodal
            show={this.state.openPreviewAsset}
            onHide={() => this.setState({ openPreviewAsset: false })}
            data={this.state.selectedAsset}
            baseurl={this.state.baseurl}
          />
        )} */}
      </>
    );
  }
}
