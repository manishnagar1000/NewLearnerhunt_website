import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../Comps/Loading";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Dropdown from "react-bootstrap/Dropdown";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Spinner } from "react-bootstrap";
// import Classes from '/styles/Allcolleges.module.css'

export default class Allcollege extends Component {
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
      // selectedAsset: null,
    };
  }

  getAssetList() {
    this.setState({ isApiHitComplete: false, isDataFound: false });
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/GetCollegeList?tab=0`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      // console.log(response.data);
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
                  <th style={{ background: "var(--primary)" }}>College name</th>
                  <th style={{ background: "var(--primary)" }}>Approved By</th>
                  <th style={{ background: "var(--primary)" }}>College Type</th>
                  <th style={{ background: "var(--primary)" }}>State</th>
                </tr>
              </thead>
              <tbody>
                {this.state.clgList.map((clg, i) => {
                  return (
                      <tr key={i}>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}}>{clg.college_name}</td>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}}>{clg.approved_by}</td>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}}>{clg.college_type}</td>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}}>{clg.state}</td>
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
