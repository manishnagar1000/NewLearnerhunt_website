
import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import Loading from "/components/Comps/Loading";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";


export default class ApiIntegration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedInstituteId: "",
      selectedApiId:"",
      selectedSourceId:'',
      collegeList: [],
      apiList: [],
      sourceNameList:[],


      name:'',
      mobilenumber:'',
      email:'',
      selectedStateName:'',
      stateList:[],
      selectedCityName:'',
      cityList:[],
      selectedCampusName:'',
      CampusNameList:[],
      selectedCourseName:'',
      CourseNameList:[],
      medium:'',
      campaign:'',

    };
  }

  componentDidMount(){
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/get-third-party-integration-data", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("pt")}`
      },
      })
      .then (async response => {
        const resp  =  await response.json()
        // console.log(resp)
        this.setState({collegeList:resp.data})
      })
      .catch(error => {
      console.error('Error:', error);
      });
  }
  
  handleInstituteChange = (selectedInstituteId) => {
    // console.log(selectedInstituteId)
    const selectedApiNames = this.state.collegeList.find(
      (apiDetails) => apiDetails.institute_id == parseInt(selectedInstituteId)
    )?.api_details;

    const selectedStates = this.state.collegeList.find(
      (stateDetails) => stateDetails.institute_id == parseInt(selectedInstituteId)
    )?.locations.map((state) => state.state);

  

    this.setState({
      selectedInstituteId,
      selectedSourceId: "",
      selectedApiId:"",
      selectedStateName:"",
      selectedCampusName:"",
      selectedCityName:"",
      selectedCourseName:"",
      apiList: selectedApiNames || [],
      stateList:selectedStates,

    });
  };

  handleApiChange = (id) => {
    // console.log(id)
    
    const selectedSourceNames = this.state.apiList
      .find((apiDetails) => apiDetails.id == id)
      ?.source;
      const selectedCampuss = this.state.apiList.find((apiDetails) => apiDetails.id == id)
      ?.courses.map((campus) => campus.campus);

      // console.log(selectedSourceNames)
    this.setState({
      selectedApiId:id,
      selectedSourceId: "",
      selectedCampusName:"",
      selectedCourseName:"",
      sourceNameList: selectedSourceNames || [],
      CampusNameList:selectedCampuss,
      CourseNameList: [],
    });
  };
  handleCampusChange = (selectedCampusName)=>{
    // const selectedCourseNames = this.state.collegeList
    //   .find((apiDetails) => apiDetails.institute_id === parseInt(this.state.selectedInstituteId))
    //   ?.courses.find((api) => api.campus === selectedCampusName)
    //   ?.course.map((course) => course);

      const selectedcourse = this.state.apiList.find((apiDetails) => apiDetails.id == this.state.selectedApiId)
      ?.courses.find(c => c.campus == selectedCampusName)?.course

    this.setState({
      selectedCampusName,
      selectedCourseName: "",
      CourseNameList: selectedcourse || [],
    });
  }

  handleStateChange = (selectedStateName)=>{
    // console.log(selectedStateName)
    const selectedStateNames = this.state.collegeList
      .find((apiDetails) => apiDetails.institute_id === parseInt(this.state.selectedInstituteId))
      ?.locations.find((api) => api.state === selectedStateName)
      ?.city.map((city) => city);

    this.setState({
      selectedStateName,
      // selectedStateName: "",
      cityList: selectedStateNames || [],
    });
  }







  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({isLoading:true})
    try {
      const fd = new FormData();
      fd.append("name", this.state.name);
      fd.append("mobile", this.state.mobilenumber);
      fd.append("email", this.state.email);
      fd.append("state", this.state.selectedStateName);
      fd.append("city",this.state.selectedCityName);
      fd.append("course",this.state.selectedCourseName);
      fd.append("medium", this.state.medium);
      fd.append("campaign", this.state.campaign);
      fd.append("campus", this.state.selectedCampusName);
      fd.append("source", this.state.sourceNameList.find(obj => obj.college_id == this.state.selectedSourceId)?.source_name);
      fd.append("college_id", this.state.selectedSourceId);
      fd.append("institute_id", this.state.selectedInstituteId);
      fd.append("institute_name",this.state.collegeList.find(obj=> obj.institute_id == this.state.selectedInstituteId)?.institute_name)
      fd.append("api_id", this.state.selectedApiId);
      fd.append("api_name",this.state.apiList.find(obj=> obj.id == this.state.selectedApiId)?.api_name)

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/save-api-details", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("pt")}`
        },
        method: "POST",
        body: fd,
      }).then(async (response) => {
        var res = await response.json()
        // console.log(res)
        // console.log(res.message)
        // console.log(res.error)
        this.setState({isLoading:false})

        if (res.data.status == "Success") {
          // console.log("hello", response.data);
          Swal.fire({
            title: 'Success',
            text: `${res.data.message}`,
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(() => {
            this.setState({  
              selectedInstituteId: "",
      selectedApiId:"",
     
      selectedSourceId:'',
      collegeList: [],
      apiList: [],
      sourceNameList:[],


      name:'',
      mobilenumber:'',
      email:'',
      selectedStateName:'',
      stateList:[],
      selectedCityName:'',
      cityList:[],
      selectedCampusName:'',
      CampusNameList:[],
      selectedCourseName:'',
      CourseNameList:[],
      medium:'',
      campaign:'',
            })
          })
        } else {
          Swal.fire({
            title: 'error',
            text: `${res.data.message}`,
            icon: 'error',
            confirmButtonText: 'Ok'
          }).then(()=>{
        this.setState({isLoading:false})
          })
          }

        }
      )
    } catch (error) {
      // Handle network or fetch error
      console.error(error);
    }
  };


  render() {

    return (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
        <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="row">
              <div className="col-md-3">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">Select Institute <span className={Classes["error"]}>*</span></label>
                  <select
                    name="colleges"
                    id="colleges"
                    required
                    className="form-select"
                    value={this.state.selectedInstituteId }
                    onChange={(e) => {
                      this.handleInstituteChange(e.target.value);
                 
                    }}
                  >
                    <option disabled value="">Select an institute</option>
                    {this.state.collegeList.map((c, i) => {
                      return (
                        <option key={i} value={c.institute_id}>
                          {c.institute_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">Select Api Name <span className={Classes["error"]}>*</span></label>
                  <select
                    name="collegeapi"
                    required
                    id="collegeapi"
                    className="form-select"
                    value={this.state.selectedApiId}
                    onChange={(e) => {
                      this.handleApiChange(e.target.value);
                    }}
                  >
                    <option disabled value="">Select an API</option>
                    {this.state.apiList.map((api, i) => (
                      <option key={i} value={api.id}>
                        {api.api_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">Select Source Name <span className={Classes["error"]}>*</span></label>
                  <select
                    required
                    name="sources"
                    id="sources"
                    className="form-select"
                    value={this.state.selectedSourceId}
                    onChange={(e) =>
                      this.setState({ selectedSourceId: e.target.value })
                    }
                  >
                    <option disabled value="">Select a source</option>
                    {this.state.sourceNameList.map((source, i) => (
                      <option key={i} value={source.college_id}>
                        {source.source_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>  
              {this.state.CampusNameList.length >0&&
             
               <div className="col-md-3">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">Select campus Name <span className={Classes["error"]}>*</span></label>
                  <select
                    name="campus"
                    id="campus"
                    required
                    className="form-select"
                    value={this.state.selectedCampusName}
                    onChange={(e) => {
                      const selectedCampusName = e.target.value;
                      this.handleCampusChange(selectedCampusName);
                    }}
                 
                  >
                    <option disabled value="">Select a campus</option>
                    {this.state.CampusNameList.map((campus, i) => (
                      <option key={i} value={campus}>
                        {campus}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            }
              
              </div>
              <hr></hr>

              <div className="row">
                <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">Student Name <span className={Classes["error"]}>*</span> </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={this.state.name}
                    required
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </div>
                </div>
                <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">Mobile Number <span className={Classes["error"]}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    required
                    minLength={1}
                    maxLength={10}
                    value={this.state.mobilenumber}
                    onChange={(e) => this.setState({ mobilenumber: e.target.value.replace(/\D/g, "") })}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">E-mail <span className={Classes["error"]}>*</span></label>
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
                  <label className={Classes["labelname"]} htmlFor="name">Select State <span className={Classes["error"]}>*</span></label>
                  <select
                    name="collegeapi"
                    id="collegeapi"
                    className="form-select"
                    required
                    value={this.state.selectedStateName}
                    onChange={(e) => {
                      const selectedStateName = e.target.value;
                      this.handleStateChange(selectedStateName);
                    }}
                  >
                    <option disabled value="">Select an State</option>
                    {this.state.stateList.map((state, i) => (
                      <option key={i} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">Select City <span className={Classes["error"]}>*</span></label>
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
                    <option disabled value="">Select a city</option>
                    {this.state.cityList.map((city, i) => (
                      <option key={i} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
           
              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">Select course Name <span className={Classes["error"]}>*</span></label>
                  {
                    this.state.CampusNameList.length >0?
                    <select
                    name="courses"
                    id="courses"
                    required
                    className="form-select"
                    value={this.state.selectedCourseName}
                    onChange={(e) =>
                      this.setState({ selectedCourseName: e.target.value })
                    }
                  >
                    <option disabled value="">Select a course</option>
                    {this.state.CourseNameList.map((course, i) => (
                      <option key={i} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                    :
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Course Name"
                    value={this.state.selectedCourseName}
                    onChange={(e) => this.setState({ selectedCourseName: e.target.value })}
                  />
                  }
                 
                </div>
              </div>




              <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name"> Medium </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Medium"
                    value={this.state.medium}
                    onChange={(e) => this.setState({ medium: e.target.value })}
                  />
                </div>
                </div>
                <div className="col-md-4">
                <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name"> Campaign </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Campaign"
                    value={this.state.campaign}
                    onChange={(e) => this.setState({ campaign: e.target.value })}
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
    );
  }
}
