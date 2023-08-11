
import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import Loading from "/components/Comps/Loading";
import YearList from "@/components/Comps/YearList";
import Badge from '@mui/material/Badge';
// const baseurl = sessionStorage.getItem("apipathurl");
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ApartmentIcon from '@mui/icons-material/Apartment';

export default class Campus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      campusdesc: "",
      hostalfee:"",
      selectedClg: '',

    };
  }

  handleCampus = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    var formData = new FormData();
    formData.append("college_id", this.state.selectedClg);
    formData.append("campus_description", this.state.campusdesc);
    formData.append("hostel_fees_structure", this.state.hostalfee);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/add-college-campus", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
      body: formData,
    })
      .then(async (response) => {
        console.log(response);
        this.setState({  isLoading: false})
        if (response.ok) {
          var res = await response.json();
          Swal.fire({
            title: "Success",
            text: `${res.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            this.setState(
              {
                campusdesc: "",
                hostalfee:"",
                selectedClg: ''
               },
              () => this.props.onSuccess()
            );
          });
        } else {
          var res = await response.json();
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {
            this.setState({ isLoading: false });
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    const { collegeList } = this.props
    return (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
        <form action="#" onSubmit={(e) => this.handleCampus(e)}>
        <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label className={Classes["labelname"]} htmlFor="colleges">Colleges <span className={Classes["error"]}>*</span></label>
                  <select
                    name="colleges"
                    id="colleges"
                    className="form-select"
                    required
                    value={this.state.selectedClg}
                    onChange={(e) =>
                      this.setState({ selectedClg: e.target.value })
                    }
                  >
                    <option disabled value="">Select a college</option>
                    {collegeList.map((c, i) => {
                      return (
                        <option disabled={c.disabled} key={i} value={c._id}>
                          {c.college_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <hr />
          <div className="row">
            <div className="col-md-6">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Campus Description{" "}
                </label>
                <textarea
                  type="text"
                  rows={4}
                  className="form-control"
                  placeholder="Enter Description"
                  value={this.state.campusdesc}
                  onChange={(e) =>
                    this.setState({ campusdesc: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Hostal Fees Structure{" "}
                </label>
                <textarea
                  type="text"
                  rows={4}
                  className="form-control"
                  placeholder="Enter Description"
                  value={this.state.hostalfee}
                  onChange={(e) =>
                    this.setState({ hostalfee: e.target.value })
                  }
                />
              </div>
            </div>

          

            <div className="row">
              <div className="col-md-12">
                <CTA title="Create"  />
              </div>
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
    );
  }
}
