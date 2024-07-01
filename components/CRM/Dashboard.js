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

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseurl: sessionStorage.getItem("apipathurl"),
      isApiHitComplete: false,
      assignedLeadsData: [],
      collegeAdmins:[],
      collegeCount: [],
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
      series: [{
        data: []
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        title: {
          text: '',
      },
      },
    }
    }
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
      console.log(response.data);
      const { leadsCountAssignedNotAssigned,collegeAdmins,collegeCount } = response.data;
      // for (const key in leadsCountAssignedNotAssigned) {
      //   let obj = leadsCountAssignedNotAssigned[key];
      //   obj["percentage"] = Math.floor((obj.assigned / obj.total) * 100);
      //   this.state.assignedLeadsData.push(obj);
      // }


         // leadsCountBasedOnMonth
         var { data, title, count } = response.data.leadsCountBasedOnMonth || {};
         // console.log(data)
         const rd = {
           series: [],
           categories: [],
         };
         data.forEach((el) => {
           rd.series.push(el.count);
           rd.categories.push(`${el.date.year}-${el.date.month}`);
         });
         this.state.chartObj.leadsCountBasedOnMonth.series[0].data = rd.series;
         this.state.chartObj.leadsCountBasedOnMonth.options.title.text = title;
         this.state.chartObj.leadsCountBasedOnMonth.options.xaxis.categories =
           rd.categories;

             // leadCountBasedOnRemarks
      var { data,title } = response.data.leadCountBasedOnRemarks || {};
      const leadremark = {
        series: [],
        categories: [],
      };
      data.forEach((el) => {
        leadremark.series.push(el.count);
        leadremark.categories.push(el.remarks);
      });
      // console.log(leadremark)
      this.state.chartObj.leadCountBasedOnRemarks.series[0].data  = leadremark.series;
      this.state.chartObj.leadCountBasedOnRemarks.options.xaxis.categories =leadremark.categories;
      this.state.chartObj.leadCountBasedOnRemarks.options.title.text = title;


      this.setState({
        assignedLeadsData: leadsCountAssignedNotAssigned,
        collegeAdmins:collegeAdmins,
        collegeCount:collegeCount,
        isApiHitComplete: true,
      });
    });
  }

  componentDidMount() {
    this.getAssetList();
  }

  render() {
    return (
      <div className={Classes["home-outer-div"]}>
        <h2>Dashboard Analysis</h2>
        {this.state.isApiHitComplete ? (
          <div className={Classes["dashboard-card-wrapper"]}>
            {/* <div className="row">
              {Object.keys(this.state.assignedLeadsData).map((key) => {
                let obj = this.state.assignedLeadsData[key];
                return (
                  <div className="col-2 mb-3">
                    <div className={Classes["custom-radialbox"]}>
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            background: "#f8f8f8",
                            marginBottom: "0",
                            padding: "0.5rem",
                          }}
                        >
                          {obj.name}
                        </p>
                      </div>
                      <div style={{ padding: "0.5rem" }}>
                        <span style={{ fontSize: "25px", color: "green" }}>
                          {obj.assigned}
                        </span>
                        <span> are assigned out of</span>
                        <span style={{ fontSize: "25px", color: "#00BFFF" }}>
                          {" "}
                          {obj.total}{" "}
                        </span>
                        <span>leads.</span>
                        
                      </div>
                    </div>
                  </div>
                );
              })}
            </div> */}
           
           <div className="row" style={{margin:'1rem 0'}}>
            {this.state.chartObj.leadsCountBasedOnMonth.series[0].data
                ?.length > 0 && (
                <div className="col-md-12 gx-0">
                  <div className="p-2 border bg-white shadow-sm">
                    <Chart
                      options={
                        this.state.chartObj.leadsCountBasedOnMonth.options
                      }
                      series={this.state.chartObj.leadsCountBasedOnMonth.series}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              )}
           </div>


             <div className="row">
        {this.state.collegeAdmins.labels.map((label, index) => (
          <div className="col-md-3">

            <div className={Classes["custom-radialbox"]} key={index}>
              <div style={{margin:'0.2rem 0',color:"#fff"}}><GroupIcon/></div>
              <div className={Classes['college-count-label']}>{label}</div>
              <div className={Classes['college-count-series']}>{this.state.collegeAdmins.series[index]}</div>
            </div>
        </div>
        ))}
        {this.state.collegeCount.labels.map((label, index) => (
        <div className="col-md-3">
            <div className={Classes["custom-radialbox"]} key={index}>
            <div style={{margin:'0.2rem 0',color:"#fff"}}><CorporateFareIcon /></div>
              <div className={Classes['college-count-label']}>{label}</div>
              <div className={Classes['college-count-series']}>{this.state.collegeCount.series[index]}</div>
          </div>
        </div>

        ))}
    </div>









            {/* registered colleges and registered college admin */}
            {/* <div className={Classes['college-outer-count']}>
             <div className="row">
        <div className="col-md-6 mb-3">
          <h3 className={Classes['college-count-heading']}>{this.state.collegeAdmins.title}</h3>
          <div className={Classes['collegecount']}>
        {this.state.collegeAdmins.labels.map((label, index) => (
            <div className={Classes["custom-radialbox"]} key={index}>
              <div >{label}</div>
              <div>{this.state.collegeAdmins.series[index]}</div>
            </div>
        ))}
        </div>
        </div>
 <div className="col-md-6 mb-3">
          <h3 className={Classes['college-count-heading']}>{this.state.collegeCount.title}</h3>
          <div className={Classes['collegecount']}>
        {this.state.collegeCount.labels.map((label, index) => (
            <div className={Classes["custom-radialbox"]} key={index}>
              <div>{label}</div>
              <div>{this.state.collegeCount.series[index]}</div>
          </div>
        ))}
        </div>
        </div>
      </div>
      </div> */}

      {/* all leads */}
            <div className="row">
              <div className="col-md-6">
                <div className={Classes["dashboard-lead-table"]}>
                  <div
                    className={Classes["Table-nav"]}
                    style={{
                      position: "sticky",
                      top: "0",
                      left: "0",
                      background: "#fff",
                      padding: "0.5rem",
                    }}
                  >
               
                    <div
                      className={Classes["Table-row"]}
                      style={{
                        borderRadius: "0px",
                        background: "#f8f8f8",
                        fontWeight: "600",
                        margin:"0"
                      }}
                    >
                      <span>Leads Name</span>
                      <div
                        style={{
                          display: "flex",
                          width: "300px",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <span className={Classes["Table-col"]} style={{color:"#00bfff"}}>
                          Total Leads
                        </span>
                        <span className={Classes["Table-col"]} style={{color:"green"}}>
                          Assigned Leads
                        </span>
                      </div>
                    </div>
                  </div>
                  {Object.keys(this.state.assignedLeadsData).map((key) => {
                    let obj = this.state.assignedLeadsData[key];
                    return (
                      <>
                        <div className={Classes["Table-row"]} style={{margin:"0.3rem 0.5rem"}}>
                          <span> {obj.name}</span>
                          <div
                            style={{
                              display: "flex",
                              width: "300px",
                              justifyContent: "space-around",
                            }}
                          >
                            <span className={Classes["Table-col"]}>
                              {" "}
                              {obj.total}
                            </span>
                            <span className={Classes["Table-col"]}>
                              {" "}
                              {obj.assigned}
                            </span>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className={Classes["dashboard-lead-table"]}>
                  <div className={Classes["Table-nav"]}>
                    <span className={Classes["main-heading"]}>All Leads</span>
                  </div>
                  <div className={Classes["Table-row"]}>
                    <span>Ashely Davis</span>
                    <div>
                      <span className={Classes["Table-col"]}>4th Dec 22</span>
                      <span className={Classes["Table-col"]}>Core Product</span>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-md-6">
              {this.state.chartObj.leadCountBasedOnRemarks.series[0].data
                ?.length > 0 && (
                <div className="col-md-12 gx-0">
                  <div className="p-2 border bg-white shadow-sm">
                    <Chart
                      options={
                        this.state.chartObj.leadCountBasedOnRemarks.options
                      }
                      series={this.state.chartObj.leadCountBasedOnRemarks.series}
                      type="bar"
                      height={300}
                    />
                  </div>
                </div>
              )}
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
    );
  }
}



{/* <Chip
                          size="small"
                          label={
                            <div>
                              Assigned Leads{" "}
                              <span
                                style={{
                                  fontSize: "20px",
                                  marginLeft: "0.2rem",
                                }}
                              >
                                ({obj.assigned})
                              </span>
                            </div>
                          }
                          color="success"
                          variant="outlined"
                        />
                        <Chip
                          size="small"
                          label={
                            <div>
                              Total Leads{" "}
                              <span
                                style={{
                                  fontSize: "20px",
                                  marginLeft: "0.2rem",
                                }}
                              >
                                ({obj.total})
                              </span>
                            </div>
                          }
                          color="primary"
                          variant="outlined"
                        /> */}