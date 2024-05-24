import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import Loading from "/components/Comps/Loading";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import { IndianStates } from "/components/Comps/StatesIndia";
import { genderType } from "/components/Comps/type";

export default class Vupune extends Component {
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
      selectedGenderName: "",
      selectedLocationName: "",
      campaign: "",
      locationList: [],
      error: "",
    };
  }

  getAssetList() {
    try {
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/vu-pune-basic-info`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (res) => {
        if (res.ok) {
          let response = await res.json();
          // console.log(response.data.locations);
          //   if (response.data.length > 0) {
          this.setState({ locationList: response.data.locations });
          //   }
        } else {
          let response = await res.json();
          this.setState({ error: response.error });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.getAssetList();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    try {
      const fd = new FormData();
      fd.append("FirstName", this.state.fname);
      fd.append("LastName", this.state.lname);
      fd.append("MobileNumber", this.state.mobilenumber);
      fd.append("Email", this.state.email);
      fd.append("State", this.state.selectedStateName);
      fd.append("City", this.state.selectedCityName);
      fd.append("Gender ", this.state.selectedGenderName);
      fd.append("Location", this.state.selectedLocationName);
      fd.append("leadCampaign", this.state.campaign);

      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/vu-pune-leadsubmit",
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

        if (res.data == "Success") {
          Swal.fire({
            title: `${res.data}`,
            text: "Lead Submitted",
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
              selectedGenderName: "",
              selectedLocationName: "",
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
                      Select Gender <span className={Classes["error"]}>*</span>
                    </label>
                    <select
                      name="Gender"
                      id="Gender"
                      className="form-select"
                      required
                      value={this.state.selectedGenderName}
                      onChange={(e) =>
                        this.setState({ selectedGenderName: e.target.value })
                      }
                    >
                      <option disabled value="">
                        Select a Gender
                      </option>
                      {genderType.map((s, i) => (
                        <option key={i} value={s.value}>
                          {s.gendername}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Select Program{" "}
                      <span className={Classes["error"]}>*</span>
                    </label>
                    <select
                      name="Location"
                      id="Location"
                      className="form-select"
                      required
                      value={this.state.selectedLocationName}
                      onChange={(e) =>
                        this.setState({ selectedLocationName: e.target.value })
                      }
                    >
                      <option disabled value="">
                        Select a Location
                      </option>

                      {this.state.locationList.map((s) => {
                        return (
                          <option key={s.Programme} value={s.Programme}>
                            {s.Programme_id}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      {" "}
                      Lead Campaign{" "}
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
