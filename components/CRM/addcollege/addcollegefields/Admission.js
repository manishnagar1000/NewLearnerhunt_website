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
export default class Admission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      admissiondesc: "",
      selectedClg: '',
      admissionFields: [],
    };
  }

  onFieldChange(index, field, value, curFields, box) {
    const updatedFields = [...curFields];
    updatedFields[index][field] = value;

    if (box === '1') {
      this.setState({
        admissionFields: updatedFields
      })
    }
  }
  addNewField = (box) => {
    if (box === '1') {
      this.setState((prevState) => ({
        admissionFields: [
          ...prevState.admissionFields,
          {  course_name: '', eligibility: '' }
        ]
      }));
    }

  }
  deleteField(i, curFields, box) {
    const fields = [...curFields];
    fields.splice(i, 1);
    if (box === '1') {
      this.setState({
        admissionFields: fields
      })
    }
  }

  handleAdmission =(e)=>{
    e.preventDefault()
    this.setState({isLoading:true})
    var formData = new FormData();
    formData.append("college_id", this.state.selectedClg);
    formData.append("admission_process", this.state.admissiondesc);
    formData.append("admission_eligibility_criteria", JSON.stringify(this.state.admissionFields));
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/add-college-admission", {
method: 'POST',
headers: {
  'Authorization': `Bearer ${localStorage.getItem("pt")}`
},
body: formData
})
.then (async response => {
  console.log(response)
  this.setState({  isLoading: false})

if (response.ok) {
  var res = await response.json();
  Swal.fire({
    title: "Success",
    text: `${res.message}`,
    icon: "success",
    confirmButtonText: "Ok",
  }).then(() => {
    this.setState({  admissiondesc: "",
    selectedClg: '',
    admissionFields: []},()=>this.props.onSuccess())

  });
} else {
  var res = await response.json();
  Swal.fire({
    title: "error",
    text: `${res.error}`,
    icon: "error",
    confirmButtonText: "Ok",
  }).then(() => {
    this.setState({isLoading:false})
  });
}
})
.catch(error => {
console.error('Error:', error);
});
  }
  render() {
    const { collegeList } = this.props
    return (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
        <form action="#" onSubmit={(e) => this.handleAdmission(e)}>
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
            <div className="col-md-12">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Admission Process{" "}
                </label>
                <textarea
                  type="text"
                  rows={4}
                  className="form-control"
                  placeholder="Enter Admission Process"
                  value={this.state.admissiondesc}
                  onChange={(e) =>
                    this.setState({ admissiondesc: e.target.value })
                  }
                />
              </div>
            </div>
        

          
            <div
              className="col-md-12 border mb-3"
              style={{ backgroundColor: "#ededed" }}
            >
              <h3 style={{ padding: "0.5rem 0rem" }}>
                Admissions{" "}
                <Badge
                  badgeContent={this.state.admissionFields.length}
                  color="primary"
                >
                  <ApartmentIcon color="action" />
                </Badge>
              </h3>
              {this.state.admissionFields.map((field, i) => {
                return (
                  <div className="row">
                   
                    <div className="col-md-5">
                      <div className={Classes["form-group"]}>
                        <label className={Classes["labelname"]} htmlFor="name">
                          Course Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter coursename"
                          required
                          value={field.course_name}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "course_name",
                              e.target.value,
                              this.state.admissionFields,
                              "1"
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-5">
                      <div className={Classes["form-group"]}>
                        <label className={Classes["labelname"]} htmlFor="name">
                        Eligibility 
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter eligibility"
                          required
                          value={field.eligibility}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "eligibility",
                              e.target.value,
                              this.state.admissionFields,
                              "1"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className={Classes.dltIcon}>
                        <Tooltip
                          title="Delete"
                          onClick={() =>
                            this.deleteField(
                              i,
                              this.state.admissionFields,
                              "1"
                            )
                          }
                        >
                          <IconButton>
                            <DeleteIcon style={{ color: "red" }} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                );
              })}
              <span
                className="add-more-btn"
                onClick={() => this.addNewField("1")}
              >
                + Add More
              </span>
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
