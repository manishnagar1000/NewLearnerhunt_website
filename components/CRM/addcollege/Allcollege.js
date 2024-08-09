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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterModal from "../FilterModal/FilterModal";
import Chip from '@mui/material/Chip';


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
      oldData: [],
      modalShow: false,
      searchValue: "",
      isFilterReset: false,
      isFilterApplied: false
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
      if (res.status === 429) {
        Swal.fire({
          title: "Error",
          text: response.error,
          icon: "error",
          confirmButtonText: "Ok",
        })
        this.setState({ isApiHitComplete: true });
        return;
      }
      if (response.data.length > 0) {
        this.setState({
          clgList: response.data,
          isDataFound: true,
          TotalCountNumber: response.totalRecords,
          currentPage: page,
          totalPages: Math.ceil(response.totalRecords / response.rowsPerPage),
          oldData: response.data
        });
      } else {
        this.setState({ isDataFound: false });
      }
      this.setState({ isApiHitComplete: true });
    }).catch((error) => {
      console.error('Error:', error);
      this.setState({ isApiHitComplete: true });
    });
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


  getSearchedCollegeData = () => {
    this.setState({ isApiHitComplete: false, isDataFound: false });
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/advance-search-clg?clgname=${this.state.searchValue}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      if (res.status === 429) { 
        Swal.fire({
          title: "Error",
          text: response.error,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(()=>{
          this.handleResetFilter()
        });
        this.setState({ isApiHitComplete: true });
        return;
      }
      if (response.data.length > 0) {
        this.setState({
          clgList: response.data,
          TotalCountNumber: response.data.length,
          isDataFound: true
        });
      } else {
        this.setState({ isDataFound: false });
      }
      this.setState({ isApiHitComplete: true });
    }).catch((error) => {
      console.error('Error:', error);
      this.setState({ isApiHitComplete: true });
    });
  }


  

  handleRefresh = () => {
    if (this.state.isFilterApplied) {
      this.getSearchedCollegeData();
    } else {
      this.getAssetList(this.state.currentPage);
    }
  };



  handlePageChange = (event, page) => {
    this.getAssetList(page);
  };

  handleShowSearchModal = () => {
    this.setState({ modalShow: true })
  }

  handleCloseSearchModal = () => {
    this.setState({ modalShow: false }
    )
  }

  handleSearchValueChange = (e) => {
    this.setState({ searchValue: e.target.value })
  };

  handleApplyFilter = () => {
    this.setState(
      {
        isFilterApplied: true,
        modalShow: false
      },
      this.getSearchedCollegeData
    );
  };

  handleResetFilter = () => {
    this.setState(
      {
        searchValue: "",
        isFilterApplied: false,
        isFilterReset: true,
        modalShow: false
      },
      this.getAssetList
    );
  };


  render() {
    return (
      <>
        <Tablenav
          TotalCount={{
            Total: (
              <div className="d-flex">
                <h5>Total Colleges: {this.state.TotalCountNumber === '' ? '0' : this.state.TotalCountNumber} </h5>
                <p style={{ marginLeft: "20px", marginRight: "3px" }}> {this.state.isFilterApplied && `Applied Filter : `} </p>
                {this.state.isFilterApplied && <Stack direction="row" spacing={1}>
                  <Chip className="bg-light" label={this.state.searchValue} variant="outlined" onDelete={this.handleResetFilter} />
                </Stack>}
              </div>
            )
          }}

          Actions={{
            Actions: (
              <div className="d-flex">
                {!this.state.isFilterApplied &&
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.searchInput}
                    placeholder="Search..."
                    onChange={this.handleSearchChange}
                  />
                }
                <FilterModal handleApplyFilter={this.handleApplyFilter} handleResetFilter={this.handleResetFilter} handleSearchValueChange={this.handleSearchValueChange} filterApplied={this.state.isFilterApplied} searchValue={this.state.searchValue} show={this.state.modalShow} handleClose={this.handleCloseSearchModal} />
                <Tooltip title="Refresh">
                  <IconButton
                    aria-label="Refresh"
                    onClick={this.handleRefresh}
                  >
                    <LoopIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Filter">
                  <IconButton
                    aria-label="Filter"
                  >
                    <FilterAltIcon className={`${this.state.isFilterApplied && "text-primary"}`} onClick={this.handleShowSearchModal} />
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

        {this.state.isDataFound && !this.state.isFilterApplied ?
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
          </div> : ""
        }
      </>
    );
  }
}