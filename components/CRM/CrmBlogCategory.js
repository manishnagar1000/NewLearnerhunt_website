import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import { Spinner } from "react-bootstrap";
import Tablenav from "../Comps/Tablenav";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

var oldData = [];

export default class CrmBlogCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      clgList: [],
      isDataFound: false,
      isApiHitComplete: true,
      selectedCategory: [],
      username: localStorage.getItem("username"),
      statusAnchorEl: null,
      lastrecid: "-1",
      approvalStatus: "",
      searchInput: "", // Search input
      category: "",
      isModalOpen: false,
      role: 0,
      editModal: false,
      categoryId: "",
      // selectedAsset: null,
    };
  }

  formatTimestamp(timestamp) {
    const dateObject = new Date(timestamp);

    const formattedTime = dateObject.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const formattedDate = dateObject.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return `${formattedTime}, ${formattedDate}`;
  }

  getAssetList() {
    this.setState({ isApiHitComplete: false, isDataFound: false });
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/blog-category`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      // console.log(res)
      let response = await res.json();
      // console.log(response);
      if (response.data) {
        if (response.data.length > 0) {
          this.setState({ clgList: response.data, isDataFound: true });
        }
        oldData = response.data;
        this.setState({ isApiHitComplete: true });
      } else {
        Swal.fire({
          title: "error",
          html: `${response.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.reload();
        });
      }
    });
  }

  componentDidMount() {
    this.getAssetList();
  }
  handleSearchChange = (e) => {
    this.setState({ searchInput: e.target.value });
    const searchTerm = e.target.value
      .trim()
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, "i");

    if (e.target.value == "") {
      this.setState({ clgList: oldData });
      if (oldData.length > 0) {
        this.setState({ isDataFound: true });
      } else {
        this.setState({ isDataFound: false });
      }
    } else {
      const filteredData = oldData.filter((data) =>
        searchKeyword.test(data.name.toLowerCase())
      );

      if (filteredData.length > 0) {
        this.setState({ clgList: filteredData, isDataFound: true });
      } else {
        this.setState({ isDataFound: false });
      }
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.editModal) {
      try {
        this.setState({ isLoading: true });
        const fd = new FormData();
        fd.append("name", this.state.category);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/blog-category", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
          method: "POST",
          body: fd,
        }).then(async (response) => {
          var res = await response.json();
          // console.log(res)
          // console.log(res.message)
          if (response.ok) {
            // console.log("hello", response.data);
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              // props.onLogin(res.data.token,res.data.role,formData.name);
              this.setState({
                isLoading: false,
                isModalOpen: false,
                category: "",
              });
              this.getAssetList();
            });
          } else {
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            });
            this.setState({ isLoading: false });
          }
        });
      } catch (error) {
        // Handle network or fetch error
        console.error(error);
      }
    } else {
      const fd = new FormData();
      fd.append("id", this.state.categoryId);
      fd.append("name", this.state.category);
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/blog-category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
        method: "PUT",
        body: fd,
      }).then(async (response) => {
        var res = await response.json();

        if (response.ok) {
          Swal.fire({
            title: "Success",
            text: `${res.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            this.setState({
              isLoading: false,
              isModalOpen: false,
              category: "",
              editModal: false,
            });
            this.getAssetList();
          });
        } else {
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
          this.setState({ isLoading: false });
        }
      });
    }
  }

  handleEditModal = (e, row) => {
    this.setState({
      isLoading: false,
      editModal: true,
      category: row.name,
      isModalOpen: true,
      categoryId: row._id,
    });
  };
  handleDeleteModal(e,row){
    console.log(row)
    // this.setState({show:true})
    Swal.fire({
      title: 'Do you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    })
    .then((result) => {
      if (result.isConfirmed) {
        // console.log("its delete")
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/blog-category/${row._id}`, {
  method: 'Delete',
  headers: {
  'Authorization': `Bearer ${localStorage.getItem("pt")}`
  },
  // body: formData
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
              <>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.searchInput}
                    placeholder="Search..."
                    onChange={(e) => this.handleSearchChange(e)}
                  />

                  <IconButton
                    style={{ margin: "0 0.5rem 0 1rem" }}
                    onClick={() => this.setState({ isModalOpen: true })}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </>
            ),
          }}
        />
        {this.state.isApiHitComplete ? (
          this.state.isDataFound ? (
            <table className={`table table-hover custom-table`}>
              <thead style={{ top: `8vh` }}>
                <tr>
                  <th
                  colspan="2"
                    style={{
                      background: "var(--primary)",
                    }}
                  >
                    Actions
                  </th>
                  <th style={{ background: "var(--primary)" }}>Category</th>
                  <th style={{ background: "var(--primary)" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.clgList.map((clg, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <IconButton
                          onClick={(e) => this.handleEditModal(e, clg)}
                        >
                          <EditIcon />
                        </IconButton>
                      </td>
                      <td
                      >
                        <IconButton
                          onClick={(e) => this.handleDeleteModal(e, clg)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </td>

                      <td>{clg.name}</td>
                      <td>{this.formatTimestamp(clg.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "80vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: "500" }}>
                <span style={{ color: "#0d6efd", cursor: "pointer" }}>
                  {" "}
                  No Records{" "}
                </span>
              </div>
            </div>
          )
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "80vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" role="status" variant="info">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <Loading
          show={this.state.isLoading}
          onHide={() => this.setState({ isLoading: false })}
        />
        <Modal
          centered
          show={this.state.isModalOpen}
          onHide={() =>
            this.setState({
              isModalOpen: false,
              editModal: false,
              category: "",
            })
          }
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {!this.state.editModal ? "Add New Category" : "Edit Category"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Box
              component="form"
              onSubmit={(e) => this.handleSubmit(e)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                id="category"
                name="name"
                type="text"
                fullWidth
                variant="outlined"
                label="Category"
                value={this.state.category}
                onChange={(e) => this.setState({ category: e.target.value })}
                required
              />

              <Button
                disabled={this.state.isLoading}
                className="bg-blue-500"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {this.state.isLoading ? (
                  <>
                    <span>Please Wait...</span>
                    <Spinner animation="border" role="status" />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </Modal.Body>
        </Modal>

        {/* {this.state.openPreviewAsset && (
          <Previewmodal
            show={this.state.openPreviewAsset}
            onHide={() => this.setState({ openPreviewAsset: false })}
            data={this.state.selectedAsset}
            baseurl={this.state.baseurl}
          />
        )} */}
      </>
    );
  }
}
