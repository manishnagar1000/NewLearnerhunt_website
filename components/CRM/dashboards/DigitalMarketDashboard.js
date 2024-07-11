import axios from "axios";
import React, { Component } from "react";
import Classes from "/styles/dashboard-home.module.css";
import { Spinner, Button } from "react-bootstrap";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import Link from "next/link";
// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Chip } from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import FlagIcon from "@mui/icons-material/Flag";
import SpeedIcon from "@mui/icons-material/Speed";
import GroupIcon from "@mui/icons-material/Group";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SchoolIcon from "@mui/icons-material/School";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import Modal from "react-bootstrap/Modal";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DifferenceIcon from "@mui/icons-material/Difference";
const d = () => {
  let total = 600;
  let ass = 200;
  let per = Math.floor((ass / total) * 100);
  return per;
};
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const assigneLeadsIcons = {
  1: <SpeedIcon color="primary" />,
  2: <GroupIcon color="secondary" />,
  3: <ContactEmergencyIcon color="success" />,
  4: <AddRoadIcon color="action" />,
  5: <ContactPhoneIcon color="disabled" />,
  7: <SignalCellularAlt2BarIcon color="primary" />,
  8: <SchoolIcon color="secondary" />,
  9: <CorporateFareIcon color="success" />,
  10: <StoreMallDirectoryIcon color="action" />,
  11: <CreditScoreIcon color="disabled" />,
};

export default class DigitalMarketDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseurl: sessionStorage.getItem("apipathurl"),
      isApiHitComplete: false,
      isApiHitCompleteModal: false,
      myblog: 0,
      mycourses: 0,
      myexam: 0,
      mycolleges: 0,
      seocounts: [],
      ct: "3",
      chartObj: {
        leadsCountBasedOnMonth: {
          series: [
            {
              name: "Lead Per Month",
              data: [],
            },
          ],
          options: {
            chart: {
              id: "leadsCountBasedOnMonth",
              height: 350,
              type: "line",
              // background:'red',
              zoom: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: "",
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: [],
            },
          },
        },
        leadCountBasedOnRemarks: {
          series: [
            {
              data: [],
            },
          ],
          options: {
            chart: {
              height: 350,
              type: "bar",
              events: {
                click: function (chart, w, e) {
                  // console.log(chart, w, e)
                },
              },
            },
            plotOptions: {
              bar: {
                columnWidth: "45%",
                distributed: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: [],
              labels: {
                style: {
                  fontSize: "12px",
                },
              },
            },
            title: {
              text: "",
            },
          },
        },
        ModalChartData: {
          series: [
            {
              name: "Lead Per Month",
              data: [],
            },
          ],
          options: {
            chart: {
              id: "ModalChartData",
              height: 350,
              type: "line",
              // background:'red',
              zoom: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: "",
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: [],
            },
          },
        },
      },
    };
  }

  getAssetList() {
    this.setState({ isApiHitComplete: false });
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/dashboard-getdata`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    })
      .then(async (res) => {
        let response = await res.json();
        console.log(response.data);
        const {
          blogs_count,
          courses_count,
          exams_count,
          colleges_count,
          seo_counts,
        } = response.data;
  
        this.setState({
          myblog: blogs_count,
          mycourses: courses_count,
          myexam: exams_count,
          mycolleges: colleges_count,
          seocounts: seo_counts,

          isApiHitComplete: true,
        });

        // console.log(this.state.seocounts)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getAssetList();
  }

  render() {
    return (
      <>
        <div className={Classes["home-outer-div"]}>
          {this.state.isApiHitComplete ? (
            <div className={Classes["dashboard-card-wrapper"]}>
              <h3>SEO Analysis</h3>
              <div className="row">
                <div className="col-md-3">
                  <div className={Classes["custom-radialbox-dm"]}>
                    <div className={Classes["college-count-label"]}>
                       Blogs SEO
                    </div>
                    <div className={Classes["college-count-series"]}>
                      {this.state.seocounts.seo_count_blog}
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={Classes["custom-radialbox-dm"]}>
                    <div className={Classes["college-count-label"]}>
                       Colleges SEO
                    </div>
                    <div className={Classes["college-count-series"]}>
                      {this.state.seocounts.seo_count_college}
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={Classes["custom-radialbox-dm"]}>
                    <div className={Classes["college-count-label"]}>
                      Courses SEO
                    </div>
                    <div className={Classes["college-count-series"]}>
                      {this.state.seocounts.seo_count_course}
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={Classes["custom-radialbox-dm"]}>
                    <div className={Classes["college-count-label"]}>
                      Exams SEO
                    </div>
                    <div className={Classes["college-count-series"]}>
                      {this.state.seocounts.seo_count_exam}
                    </div>
                  </div>
                </div>
              </div>
              <hr style={{marginTop:'0',color:'rgba(0,0,0,0.4)'}} />
              <div className="row">
                <div className="col-md-6">
                  <div className={`${Classes["my-count"]}`}>
                    <p className={Classes["three-d-text"]}>My Work</p>
                    <div className="row">
                      <div className="col-md-3">
                        <div className={Classes["custom-radialbox-dm-my"]}>
                          <div className={Classes["college-count-label-my"]}>
                            Blogs created
                          </div>
                          <div className={Classes["college-count-series-my"]}>
                            {this.state.myblog.created_by_me}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className={Classes["custom-radialbox-dm-my"]}>
                          <div className={Classes["college-count-label-my"]}>
                            Courses created
                          </div>
                          <div className={Classes["college-count-series-my"]}>
                            {this.state.mycourses.created_by_me}
                          </div>
                        </div>
                      </div>{" "}
                      <div className="col-md-3">
                        <div className={Classes["custom-radialbox-dm-my"]}>
                          <div className={Classes["college-count-label-my"]}>
                            Exams created
                          </div>
                          <div className={Classes["college-count-series-my"]}>
                            {this.state.myexam.created_by_me}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className={Classes["custom-radialbox-dm-my"]}>
                          <div className={Classes["college-count-label-my"]}>
                            Colleges created
                          </div>
                          <div className={Classes["college-count-series-my"]}>
                            {this.state.mycolleges.created_by_me}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ width: "100%", height: "75vh", padding: "1rem" }}
            >
              <Spinner variant="outlined" />
            </div>
          )}
        </div>
      </>
    );
  }
}
