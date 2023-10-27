import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import Loading from "/components/Comps/Loading";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import { IndianStates } from "/components/Comps/StatesIndia";
import { ImarticusApi } from "/components/Comps/type";

export default class Imarticus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fname: "",
      lname: "",
      mobilenumber: "",
      email: "",
      selectedStateName: "",
      selectedCityName: "",
      selectedCourseName: "",
      medium: "",
      campaign: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    try {
      const fd = new FormData();
      fd.append("f_name", this.state.fname);
      fd.append("l_name", this.state.lname);
      fd.append("phone", this.state.mobilenumber);
      fd.append("email", this.state.email);
      fd.append("state", this.state.selectedStateName);
      fd.append("city", this.state.selectedCityName);
      fd.append("course", this.state.selectedCourseName);
      fd.append("medium", this.state.medium);
      fd.append("campaign", this.state.campaign);

      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/imarticus-save-lead",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
          method: "POST",
          body: fd,
        }
      ).then(async (response) => {
        var res = await response.json();
        // console.log(res);
        this.setState({ isLoading: false });

        if (res.data.Status == "Success") {
          Swal.fire({
            title: "Lead Submitted",
            // text: `${res.data.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            this.setState({
              fname: "",
              lname: "",
              mobilenumber: "",
              email: "",
              selectedStateName: "",
              selectedCityName: "",
              selectedCourseName: "",
              medium: "",
              campaign: "",
            });
          });
        } else {
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {
            this.setState({ isLoading: false });
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    // console.log(IndianStates.India);
    // console.log(IndianStates)
    // console.log(IndianStates.India["Assam"].map((s) => console.log(s)));/
    return (
      <>
        <div className={Classes["add-user"]}>
          <div className={Classes["form-div"]}>
            <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
              <div className="row">
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="fname">
                      First Name <span className={Classes["error"]}>*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter First Name"
                      value={this.state.fname}
                      required
                      onChange={(e) => this.setState({ fname: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="lname">
                      Last Name <span className={Classes["error"]}>*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Last Name"
                      value={this.state.lname}
                      required
                      onChange={(e) => this.setState({ lname: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Mobile Number <span className={Classes["error"]}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      required
                      minLength={10}
                      maxLength={10}
                      value={this.state.mobilenumber}
                      onChange={(e) =>
                        this.setState({
                          mobilenumber: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      E-mail <span className={Classes["error"]}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      placeholder="Enter E-mail"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Select State <span className={Classes["error"]}>*</span>
                    </label>
                    <select
                      name="collegeapi"
                      id="collegeapi"
                      className="form-select"
                      required
                      value={this.state.selectedStateName}
                      onChange={(e) => {
                        this.setState({
                          selectedStateName: e.target.value || [],
                          selectedCityName: "",
                        });
                      }}
                    >
                      <option disabled value="">
                        Select an State
                      </option>
                      {Object.keys(IndianStates.India).map((state, i) => (
                        <option key={i} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Select City <span className={Classes["error"]}>*</span>
                    </label>
                    <select
                      name="city"
                      id="city"
                      className="form-select"
                      required
                      value={this.state.selectedCityName}
                      onChange={(e) =>
                        this.setState({ selectedCityName: e.target.value })
                      }
                    >
                      <option disabled value="">
                        Select a city
                      </option>
                      {this.state.selectedStateName != "" &&
                        IndianStates.India[this.state.selectedStateName].map(
                          (city, i) => (
                            <option key={i} value={city}>
                              {city}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Select course Name{" "}
                      <span className={Classes["error"]}>*</span>
                    </label>
                    <select
                      name="Course"
                      id="Course"
                      className="form-select"
                      required
                      value={this.state.selectedCourseName}
                      onChange={(e) =>
                        this.setState({ selectedCourseName: e.target.value })
                      }
                    >
                      <option disabled value="">
                        Select a Course
                      </option>
                      {ImarticusApi.map((s, i) => (
                        <option key={i} value={s.value}>
                          {s.Coursename}
                        </option>
                      ))}
                    </select>
                    {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Course Name"
                    value={this.state.selectedCourseName}
                    onChange={(e) => this.setState({ selectedCourseName: e.target.value })}
                  /> */}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      {" "}
                      Medium{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Medium"
                      value={this.state.medium}
                      onChange={(e) =>
                        this.setState({ medium: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      {" "}
                      Campaign{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Campaign"
                      value={this.state.campaign}
                      onChange={(e) =>
                        this.setState({ campaign: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <CTA title="Create" />
                </div>
              </div>
            </form>
          </div>

          {
            <Loading
              show={this.state.isLoading}
              onHide={() => this.setState({ isLoading: false })}
            />
          }
        </div>
      </>
    );
  }
}
