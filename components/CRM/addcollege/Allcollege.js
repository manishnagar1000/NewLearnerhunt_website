import React, { Component } from "react";
import Swal from "sweetalert2";
import Loading from "../../Comps/Loading";
import Tablenav from "../../Comps/Tablenav";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Spinner } from "react-bootstrap";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LoopIcon from "@mui/icons-material/Loop";


export default class Allcollege extends Component {
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
      searchInput: "",
      show: false,
      TotalCountNumber: '',
      currentPage: 1,
      totalPages: '',
      oldData: []
    };
  }

  getAssetList(page = 1) {
    this.setState({ isApiHitComplete: false, isDataFound: false });
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/get-all-colleges?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      if (response.data.length > 0) {
        this.setState({
          clgList: response.data,
          isDataFound: true,
          TotalCountNumber: response.totalRecords,
          currentPage: page,
          totalPages: Math.ceil(response.totalRecords / response.rowsPerPage),
          oldData: response.data
        });
        console.log(this.state.totalPages, "helloooo")
      } else {
        this.setState({ isDataFound: false });
      }
      this.setState({ isApiHitComplete: true });
    });
  }
  componentDidUpdate() {
    console.log(this.state.totalPages, "didupdate")
  }
  componentDidMount() {
    this.getAssetList();
  }

  handleSearchChange = (e) => {
    this.setState({ searchInput: e.target.value });
    const searchTerm = e.target.value.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, 'i');

    if (e.target.value === '') {
      this.setState({ clgList: this.state.oldData, isDataFound: this.state.oldData.length > 0 });
    } else {
      const filteredData = this.state.oldData.filter(data =>
        searchKeyword.test(data.college_name.toLowerCase()) ||
        searchKeyword.test(data.approved_by.toLowerCase()) ||
        searchKeyword.test(data.state.toLowerCase())
      );
      this.setState({ clgList: filteredData, isDataFound: filteredData.length > 0 });
    }
  };

  handleShow(e, id) {
    Swal.fire({
      title: 'Move to trash?',
      text: "This college will be moved to trash.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        var formData = new FormData();
        formData.append("college_id", id);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/remove-clg", {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("pt")}`
          },
          body: formData
        }).then(async response => {
          if (response.ok) {
            var res = await response.json();
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              this.setState({ searchInput: "" });
              this.getAssetList(this.state.currentPage);
            });
          } else {
            var res = await response.json();
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        }).catch(error => {
          console.error('Error:', error);
        });
      }
    });
  }

  handleRefresh = () => {
    this.getAssetList(this.state.currentPage);
  };


  handlePageChange = (event, page) => {
    this.getAssetList(page);
  };


  render() {
    return (
      <>
        <Tablenav
          TotalCount={{
            Total: (
              <h5>Total Count: {this.state.TotalCountNumber === '' ? '0' : this.state.TotalCountNumber}</h5>
            )
          }}
          Actions={{
            Actions: (
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.searchInput}
                  placeholder="Search..."
                  onChange={this.handleSearchChange}
                />
                <Tooltip title="Refresh">
                  <IconButton
                    aria-label="Refresh"
                    onClick={this.handleRefresh}
                  >
                    <LoopIcon />
                  </IconButton>
                </Tooltip>
              </div>
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
                  <th style={{ background: "var(--primary)" }}>Remove</th>
                  <th style={{ background: "var(--primary)" }}>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.clgList.map((clg, i) => (
                  <tr key={i}>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>{clg.college_name}</td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>{clg.approved_by}</td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>{clg.college_type}</td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}>{clg.state}</td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }} onClick={(e) => this.handleShow(e, clg._id)}><DeleteForeverIcon /></td>
                    <td style={{ wordWrap: "break-word", whiteSpace: "unset" }}><Link href={`addcollege?e=${clg._id}`}><EditIcon /></Link></td>
                  </tr>
                ))}
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

        {this.state.isDataFound &&
          <div className="pt-3">
            <Stack
              spacing={2}
              className="d-flex justify-content-center align-items-center"
              style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                backgroundColor: 'white',
                zIndex: 1000,
                padding: '10px 0',
                boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <Pagination
                count={this.state.totalPages}
                page={this.state.currentPage}
                onChange={this.handlePageChange}
                color="primary"
              />
            </Stack>
          </div>
        }
      </>
    );
  }
}