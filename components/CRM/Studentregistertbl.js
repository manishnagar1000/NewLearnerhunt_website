import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import { Spinner } from "react-bootstrap";
import Tablenav from "../Comps/Tablenav";

var oldData = []
export default class Studentregistertbl extends Component {
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
      searchInput: "", // Search input
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
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/leads?lid=${this.state.lastrecid}&type=3`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      // console.log(response.data);
      if (response.data.length > 0) {
        this.setState({ clgList: response.data, isDataFound: true });
      }
      oldData=response.data
      this.setState({ isApiHitComplete: true });
    });
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
      searchKeyword.test(data.name.toLowerCase())||
      searchKeyword.test(data.mobile.toLowerCase())||
      searchKeyword.test(data.selected_level.toLowerCase())||
      searchKeyword.test(data.email.toLowerCase())


      

  );

  if (filteredData.length > 0) {
      this.setState({ clgList: filteredData, isDataFound: true });
  } else {
      this.setState({ isDataFound: false });
  }
  }
  };
  render() {
    return (
      <>
      <Tablenav
          Actions={{
            Actions: (
              <input
            type="text"
            className="form-control"
            value={this.state.searchInput}
            placeholder="Search..."
            onChange={this.handleSearchChange}
          />
            ),
          }}
        />
        {this.state.isApiHitComplete ? (
          this.state.isDataFound ? (
            <table className={`table table-hover custom-table`}>
              <thead>
                <tr>
                  <th style={{ background: "var(--primary)" }}>Student Name</th>
                  <th style={{ background: "var(--primary)" }}>Mobile Number</th>
                  <th style={{ background: "var(--primary)" }}>Email</th>
                  <th style={{ background: "var(--primary)" }}>Preferred Stream</th>
                  <th style={{ background: "var(--primary)" }}>Preferred Level</th>
                  <th style={{ background: "var(--primary)" }}>Date</th>



                </tr>
              </thead>
              <tbody>
                {this.state.clgList.map((clg, i) => {
                  return (
                    
                      <tr key={i}>
                        <td>{clg.name}</td>
                        <td>{clg.mobile}</td>
                        <td>{clg.email}</td>
                        <td>{clg.selected_stream}</td>
                        <td>{clg.selected_level}</td>
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
