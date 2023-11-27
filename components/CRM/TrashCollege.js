import React, { Component } from "react";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import Tablenav from "../Comps/Tablenav";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Spinner } from "react-bootstrap";
import Link from "next/link";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

var oldData = []
export default class TrashColleges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      clgList: [],
      isDataFound: false,
      isApiHitComplete: false,
      selectedCategory: [],
      username: localStorage.getItem("username"),
      statusAnchorEl: null,
      // selectedAsset: null,
      searchInput: "", // Search input
      show:false
    };
  }

  getAssetList() {
    this.setState({ isApiHitComplete: false, isDataFound: false });
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/get-trashed-colleges`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      // console.log(response.data);
      if (response.data.length > 0) {
        this.setState({ clgList: response.data, isDataFound: true });
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
      this.setState({ clgList: oldData })
      if (oldData.length > 0) {
          this.setState({ isDataFound: true })
      } else {
          this.setState({ isDataFound: false })
      }
  } else {
    const filteredData = oldData.filter(data =>
      searchKeyword.test(data.college_name.toLowerCase())||
      searchKeyword.test(data.approved_by.toLowerCase())||
      searchKeyword.test(data.state.toLowerCase())

  );

  if (filteredData.length > 0) {
      this.setState({ clgList: filteredData, isDataFound: true });
  } else {
      this.setState({ isDataFound: false });
  }
  }
  };
  // handleClose=()=>{
  //   this.setState({show:false})
  //  }
 handleShow(e,id){
  console.log(id)
  // this.setState({show:true})
  Swal.fire({
    title: 'Restore the college?',
    text: "This college will be moved Restore.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  })
  .then((result) => {
    if (result.isConfirmed) {
      console.log("its restore")
  var formData = new FormData();
  formData.append("college_id",id)
  fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/restore-clg", {
method: 'PUT',
headers: {
'Authorization': `Bearer ${localStorage.getItem("pt")}`
},
body: formData
})
.then (async response => {
// console.log(response)
if (response.ok) {
var res = await response.json();
Swal.fire({
  title: "Success",
  text: `${res.message}`,
  icon: "success",
  confirmButtonText: "Ok",
}).then((e)=>{
  // this.setState({clgList:this.state.clgList.filter(clg=>clg._id!= id)})
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
                  <th style={{ background: "var(--primary)" }}>College name</th>
                  <th style={{ background: "var(--primary)" }}>Approved By</th>
                  <th style={{ background: "var(--primary)" }}>College Type</th>
                  <th style={{ background: "var(--primary)" }}>State</th>
                  {/* <th style={{ background: "var(--primary)" }}>Delete</th> */}
                  <th style={{ background: "var(--primary)" }}>Restore</th>

                </tr>
              </thead>
              <tbody>
                {this.state.clgList.map((clg, i) => {
                  return (
                      <tr key={i}>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}}>{clg.college_name}</td>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}}>{clg.approved_by}</td>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}}>{clg.college_type}</td>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}}>{clg.state}</td>
                        <td style={{wordWrap:"break-word",whiteSpace:"unset"}} onClick={(e)=>this.handleShow(e,clg._id)}><RestoreFromTrashIcon/></td>
                        {/* <td style={{wordWrap:"break-word",whiteSpace:"unset"}}><Link href={`addcollege?e=${clg._id}`}><RestoreFromTrashIcon/></Link></td> */}

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

{/* <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select the fields</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MultipleSelectInput/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Delete</Button>
        </Modal.Footer>
      </Modal> */}
   
      </>
    );
  }
}
