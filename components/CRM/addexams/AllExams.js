import React, { Component } from "react";
import Swal from "sweetalert2";
import Loading from "../../Comps/Loading";
import Tablenav from "../../Comps/Tablenav";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Spinner } from "react-bootstrap";
import Link from "next/link";

var oldData = []
export default class AllExams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courseList: [],
      isDataFound: false,
      isApiHitComplete: false,
      selectedCategory: [],
      username: localStorage.getItem("username"),
      statusAnchorEl: null,
      searchInput: "", 
      show:false,
      TotalCountNumber:''
    };
  }

  getAssetList() {
    this.setState({ isApiHitComplete: false, isDataFound: false });
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/exam?id=-1`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      // console.log(response.data)
      if (response.data.length > 0) {
        this.setState({ courseList: response.data, isDataFound: true,TotalCountNumber:response.data.length });
      }
      oldData=response.data
      this.setState({ isApiHitComplete: true });
    });
  }

  componentDidMount() {
    this.getAssetList();
  }
  handleSearchChange = (e) => {
    this.setState({searchInput:e.target.value})
    const searchTerm = e.target.value.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, 'i');

    if (e.target.value == '') {
      this.setState({ courseList: oldData })
      if (oldData.length > 0) {
          this.setState({ isDataFound: true })
      } else {
          this.setState({ isDataFound: false })
      }
  } else {
    const filteredData = oldData.filter(data =>
      searchKeyword.test(data.exam_name.toLowerCase())
  );

  if (filteredData.length > 0) {
      this.setState({ courseList: filteredData, isDataFound: true });
  } else {
      this.setState({ isDataFound: false });
  }
  }
  };
 handleDelete(e,id){
  Swal.fire({
    title: 'Move to trash?',
    text: "This course will be moved to trash.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  })
  .then((result) => {
    if (result.isConfirmed) {
  var formData = new FormData();
  formData.append("id",id)
  fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/exam", {
method: 'DELETE',
headers: {
'Authorization': `Bearer ${localStorage.getItem("pt")}`
},
body: formData
})
.then (async response => {
if (response.ok) {
var res = await response.json();
Swal.fire({
  title: "Success",
  text: `${res.message}`,
  icon: "success",
  confirmButtonText: "Ok",
}).then((e)=>{
  this.setState({searchInput:""})
  this.getAssetList()

})
} else {
var res = await response.json();
Swal.fire({
  title: "error",
  text: `${res.error}`,
  icon: "error",
  confirmButtonText: "Ok",
})
}
})
.catch(error => {
console.error('Error:', error);
});
    }
  });
 }

  render() {
    return (
      <>
      <Tablenav
        TotalCount={{
          Total:(
              <h5>Total Count :{this.state.TotalCountNumber == ''?'0':this.state.TotalCountNumber}</h5>
          )
         }}
          Actions={{
            Actions: (
              <input
            type="text"
            className="form-control"
            value={this.state.searchInput}
            placeholder="Search..."
            onChange={this.handleSearchChange}
          />
            ),
          }}
        />
        {this.state.isApiHitComplete ? (
          this.state.isDataFound ? (
            <table className={`table table-hover custom-table`}>
              <thead style={{ top: `8vh` }}>
                <tr>
                  <th style={{ background: "var(--primary)" }}>Exam name</th>
                  <th style={{ background: "var(--primary)" }}>Exam full name</th>
                  <th style={{ background: "var(--primary)" }}>Remove</th>
                  <th style={{ background: "var(--primary)" }}>Edit</th>

                </tr>
              </thead>
              <tbody>
                {this.state.courseList.map((clg, i) => {
                  return (
                      <tr key={i}>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}}>{clg.exam_name}</td>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}}>{clg.exam_full_name}</td>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}} onClick={(e)=>this.handleDelete(e,clg._id)}><DeleteForeverIcon/></td>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}}><Link href={`addexam?e=${clg._id}`}><EditIcon/></Link></td>

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

   
      </>
    );
  }
}
