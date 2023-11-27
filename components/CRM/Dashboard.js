import axios from "axios";
import React, { Component } from "react";
import Classes from  "/styles/dashboard-home.module.css";
import { Spinner,Button } from "react-bootstrap";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ArrowRightAltIcon  from '@mui/icons-material/ArrowRightAlt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import Link from "next/link";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseurl: sessionStorage.getItem("apipathurl"),
      isApiHitComplete: false,
      collegeCount: 0,
      trashcount:0
      
    };
  }

  getAssetList() {
    this.setState({ isApiHitComplete: false });
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/dashboard-getdata`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      console.log(response.data)
      // console.log(response.data.length);

     
      this.setState({collegeCount:response.data.total_college_count,trashcount:response.data.total_deactivated_college_count, isApiHitComplete: true });
    });
  }

  componentDidMount() {
    this.getAssetList();
  }
  render() {
    return (
      <div className={Classes["home-outer-div"]}>
        <h2>College Details</h2>
        <div className={Classes["dashboard-card-wrapper"]}>
          <div className={Classes["dashboard-card"]}>
            <div className="row">
              <div className="col-9">
                <p>Total Colleges</p>
                {this.state.isApiHitComplete ? (
                  <span className={Classes["number"]}>{this.state.collegeCount}</span>
                ) : (
                  <div style={{ margin: "0.6rem 0rem" }}>
                    <Spinner />
                  </div>
                )}
              </div>
              <div className="col-3 d-flex justify-content-end">
                <div className={Classes["img-div"]}>
                 <MapsHomeWorkIcon />
                </div>
              </div>
              <div className="col-6">
                <Link href="/adminportal/allcollege">
                  <ArrowRightAltIcon />
                  goto
                </Link>
              </div>
                  
            </div>
          </div>
          <div className={Classes["dashboard-card"]}>
            <div className="row">
              <div className="col-9">
                <p>Deactivated Colleges</p>
                {this.state.isApiHitComplete ? (
                  <span className={Classes["number"]}>{this.state.trashcount}</span>
                ) : (
                  <div style={{ margin: "0.6rem 0rem" }}>
                    <Spinner />
                  </div>
                )}
              </div>
              <div className="col-3 d-flex justify-content-end">
                <div className={Classes["img-div"]}>
                 <DeleteSweepIcon />
                </div>
              </div>
              <div className="col-6">
                <Link href="/adminportal/trashcolleges">
                  <ArrowRightAltIcon />
                  goto
                </Link>
              </div>
                  
            </div>
          </div>
        </div>
    
    
      </div>
    );
  }
}

