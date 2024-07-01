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

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseurl: sessionStorage.getItem("apipathurl"),
      isApiHitComplete: false,
      ListType: "1",
      assignleaddata: [],
      collegeCount: 0,
      trashcount: 0,
      activeCAcount: 0,
      deactiveCAcount: 0,
      originalAssignData: [],
      chartObj: {
        registeredStud: {
          series: [
            {
              name: "Students",
              data: [],
            },
          ],
          options: {
            chart: {
              id: "registerstud",
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
        collegeAdmins: {
          series: [],
          options: {
            labels: [],
            chart: {
              type: "donut",
            },
            title: {
              text: "",
              align: "left",
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 350,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
        },
        collegeCount: {
          series: [],
          options: {
            labels: [],
            chart: {
              type: "donut",
            },
            title: {
              text: "",
              align: "left",
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 350,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
        },
        TestElStuds: {
          series: [
            {
              name: "Students",
              data: [],
            },
          ],
          options: {
            chart: {
              id: "TestElStuds",
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
          series: [],
          options: {
            labels: [],
            chart: {
              type: "polarArea",
            },
            title: {
              text: "",
              align: "left",
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 350,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
            tooltip: {
              enabled: true,
              onDatasetHover: {
                highlightDataSeries: true,
              },
            },
          },
        },
        leadsCountAssignedNotAssigned: {
          series: [],
          options: {
            legend: {
              show: false,
            },
            chart: {
              height: 350,
              type: "treemap",
            },
            title: {
              text: "Leads count (Assigned/Total)",
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
    }).then(async (res) => {
      let response = await res.json();
      // console.log(response.data);
      // Registered Student
      var { series, title, xaxis } = response.data.registeredStuds || {};
      this.state.chartObj.registeredStud.series[0].data = series[0].data;
      this.state.chartObj.registeredStud.options.title.text = title;
      this.state.chartObj.registeredStud.options.xaxis = xaxis;
      // college Admins count
      var { series, labels, title } = response.data.collegeAdmins || {};
      this.state.chartObj.collegeAdmins.series = series;
      this.state.chartObj.collegeAdmins.options.labels = labels;
      this.state.chartObj.collegeAdmins.options.title.text = title;
      // college count
      var { series, labels, title } = response.data.collegeCount || {};
      this.state.chartObj.collegeCount.series = series;
      this.state.chartObj.collegeCount.options.labels = labels;
      this.state.chartObj.collegeCount.options.title.text = title;
      // test count
      var { series, title, xaxis } = response.data.TestElStuds || {};
      this.state.chartObj.TestElStuds.series[0].data = series[0].data;
      this.state.chartObj.TestElStuds.options.title.text = title;
      this.state.chartObj.TestElStuds.options.xaxis = xaxis;
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
      var { title, data } = response.data.leadCountBasedOnRemarks || {};
      const leadremark = {
        series: [],
        labels: [],
      };
      data.forEach((el) => {
        leadremark.series.push(el.count);
        leadremark.labels.push(el.remarks);
      });
      // console.log(leadremark)
      this.state.chartObj.leadCountBasedOnRemarks.series = leadremark.series;
      this.state.chartObj.leadCountBasedOnRemarks.options.labels =
        leadremark.labels;
      this.state.chartObj.leadCountBasedOnRemarks.options.title.text = title;

      // leadscountassignednotAssigned

      var assigndata = response.data.leadsCountAssignedNotAssigned;
      // console.log(assigndata)
      var assignkey = [];
      for (const key in assigndata) {
        // console.log(key)
        assignkey.push({ label: assigndata[key].name, value: key });
      }

      // const leadassign = {
      //   series:[],
      // }

      // console.log(assignkey)
      let d = assigndata[this.state.ListType];
      let obj = [
        { x: "Total Leads", y: d.total },
        { x: "Assigned Leads", y: d.assigned },
      ];
      this.state.chartObj.leadsCountAssignedNotAssigned.series = [{ data: obj }];
      this.setState({
        assignleaddata: assignkey,
        originalAssignData: assigndata,
      });

      this.setState({ isApiHitComplete: true });
      // this.setState({
      //   collegeCount: response.data.total_college_count,
      //   trashcount: response.data.total_deactivated_college_count,
      //   activeCAcount: response.data.activated_ca_count,
      //   deactiveCAcount: response.data.deactivated_ca_count,
      //   isApiHitComplete: true,
      // });
    });
  }
  onLeadTypeChange(e) {
    // console.log(e.target.value);
    // console.log(this.state.originalAssignData);
    // const filterdata =
    // console.log(filterdata)
    this.state.originalAssignData[e.target.value];
    let d = this.state.originalAssignData[e.target.value];
    // console.log(d);
    let obj = [
      { x: "Total Leads", y: d.total },
      { x: "Assigned Leads", y: d.assigned },
    ];
    this.state.chartObj.leadsCountAssignedNotAssigned.series = [{ data: obj }];
    this.setState({ListType:e.target.value})
  }
  componentDidMount() {
    this.getAssetList();
  }
  render() {
    // console.log(this.state.chartObj.registeredStud.series);
    return (
      <div className={Classes["home-outer-div"]}>
        <h2>Dashboard Analysis</h2>
        {this.state.isApiHitComplete ? (
          <div className={Classes["dashboard-card-wrapper"]}>
            
            {this.state.chartObj.leadsCountAssignedNotAssigned.series?.length >
              0 && (
              <div className="col-md-12 mb-2">
                <div className="p-2 border bg-white shadow-sm">
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 120 }}
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-label">
                      Select the ListType
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.ListType}
                      label="Select"
                      onChange={(e) => this.onLeadTypeChange(e)}
                    >
                      {this.state.assignleaddata.map((s) => {
                        // console.log(s)
                        return (
                          <MenuItem key={s.value} value={s.value}>
                            {s.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <Chart
                    options={
                      this.state.chartObj.leadsCountAssignedNotAssigned.options
                    }
                    series={
                      this.state.chartObj.leadsCountAssignedNotAssigned.series
                    }
                    type="treemap"
                    height={300}
                  />
                </div>
              </div>
            )}
            <div className="row g-2">
              {this.state.chartObj.leadCountBasedOnRemarks.series?.length >
                0 && (
                <div className="col-md-6">
                  <div className="p-2 border bg-white shadow-sm">
                    <Chart
                      options={
                        this.state.chartObj.leadCountBasedOnRemarks.options
                      }
                      series={
                        this.state.chartObj.leadCountBasedOnRemarks.series
                      }
                      type="polarArea"
                      height={300}
                    />
                  </div>
                </div>
              )}
              {this.state.chartObj.collegeCount.series?.length > 0 && (
                <div className="col-md-6">
                  <div className="p-2 border bg-white shadow-sm">
                    <Chart
                      options={this.state.chartObj.collegeCount.options}
                      series={this.state.chartObj.collegeCount.series}
                      type="donut"
                      height={300}
                    />
                  </div>
                </div>
              )}
              {this.state.chartObj.collegeAdmins.series?.length > 0 && (
                <div className="col-md-6">
                  <div className="p-2 border bg-white shadow-sm">
                    <Chart
                      options={this.state.chartObj.collegeAdmins.options}
                      series={this.state.chartObj.collegeAdmins.series}
                      type="donut"
                      height={300}
                    />
                  </div>
                </div>
              )}

              {this.state.chartObj.registeredStud.series[0].data?.length >
                0 && (
                <div className="col-md-6">
                  <div className="p-2 border bg-white shadow-sm">
                    <Chart
                      options={this.state.chartObj.registeredStud.options}
                      series={this.state.chartObj.registeredStud.series}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              )}
              {this.state.chartObj.TestElStuds.series[0].data?.length > 0 && (
                <div className="col-md-6">
                  <div className="p-2 border bg-white shadow-sm">
                    <Chart
                      options={this.state.chartObj.TestElStuds.options}
                      series={this.state.chartObj.TestElStuds.series}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>
              )}

              {this.state.chartObj.leadsCountBasedOnMonth.series[0].data
                ?.length > 0 && (
                <div className="col-md-6">
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

            {/* <div className={Classes["dashboard-card"]}>
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
        <div className={Classes["dashboard-card"]}>
          <div className="row">
            <div className="col-9">
              <p>Activated College Admins</p>
              {this.state.isApiHitComplete ? (
                <span className={Classes["number"]}>{this.state.activeCAcount}</span>
              ) : (
                <div style={{ margin: "0.6rem 0rem" }}>
                  <Spinner />
                </div>
              )}
            </div>
            <div className="col-3 d-flex justify-content-end">
              <div className={Classes["img-div"]}>
               <GroupAddIcon />
              </div>
            </div>
            <div className="col-6">
              <Link href="/adminportal/activedeactive-clg?ca=1">
                <ArrowRightAltIcon />
                goto
              </Link>
            </div>
                
          </div>
        </div>
        <div className={Classes["dashboard-card"]}>
          <div className="row">
            <div className="col-9">
              <p>Deactivated College Admins</p>
              {this.state.isApiHitComplete ? (
                <span className={Classes["number"]}>{this.state.deactiveCAcount}</span>
              ) : (
                <div style={{ margin: "0.6rem 0rem" }}>
                  <Spinner />
                </div>
              )}
            </div>
            <div className="col-3 d-flex justify-content-end">
              <div className={Classes["img-div"]}>
               <PersonAddDisabledIcon />
              </div>
            </div>
            <div className="col-6">
              <Link href="/adminportal/activedeactive-clg?ca=0">
                <ArrowRightAltIcon />
                goto
              </Link>
            </div>
                
          </div>
        </div> */}
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
