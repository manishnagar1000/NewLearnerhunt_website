import React, { Component } from "react";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import Tablenav from "../Comps/Tablenav";
import { Spinner, Modal, Button } from "react-bootstrap";
import RestoreIcon from "@mui/icons-material/Restore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Styles from "../../styles/trash.module.css";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
var oldData = [];

const data = [
  {
    id: 1,
    type: "College",
    icon: "🎓",
  },
  {
    id: 2,
    type: "Course",
    icon: "💻",
  },
  {
    id: 3,
    type: "Exam",
    icon: "📝",
  },
];
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
      searchInput: "", // Search input
      show: false,
      TotalCountNumber: "",
      dataId: "1",
    };
  }

  getAssetList() {
    console.log(this.state.dataId);
    if (this.state.dataId == "1") {
      this.setState({ isApiHitComplete: false, isDataFound: false });

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/get-trashed-colleges`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
      }).then(async (res) => {
        let response = await res.json();
        // console.log(response.data);
        if (response.data.length > 0) {
          this.setState({
            clgList: response.data,
            isDataFound: true,
            TotalCountNumber: response.data.length,
          });
        }
        oldData = response.data;
        this.setState({ isApiHitComplete: true });
      });
    } else if (this.state.dataId == "2") {
      this.setState({ isApiHitComplete: false, isDataFound: false });

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/get-trashed-courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
      }).then(async (res) => {
        let response = await res.json();
        // console.log(response.data);
        if (response.data.length > 0) {
          this.setState({
            clgList: response.data,
            isDataFound: true,
            TotalCountNumber: response.data.length,
          });
        }
        oldData = response.data;
        this.setState({ isApiHitComplete: true });
      });
    } else if (this.state.dataId == "3") {
      this.setState({ isApiHitComplete: false, isDataFound: false });

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/get-trashed-exams`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
      }).then(async (res) => {
        let response = await res.json();
        // console.log(response.data);
        if (response.data.length > 0) {
          this.setState({
            clgList: response.data,
            isDataFound: true,
            TotalCountNumber: response.data.length,
          });
        }
        oldData = response.data;
        this.setState({ isApiHitComplete: true });
      });
    }
  }
  handleSearchChange = (e) => {
    const searchInput = e.target.value;
    this.setState({ searchInput });
  
    const searchTerm = searchInput.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, "i");
  
    if (searchInput === "") {
      this.setState({ clgList: oldData });
      if (oldData.length > 0) {
        this.setState({ isDataFound: true });
      } else {
        this.setState({ isDataFound: false });
      }
    } else {
      const filteredData = oldData.filter((data) => {
        if (this.state.dataId == '1') {
          return (
            searchKeyword.test(data.college_name.toLowerCase()) ||
            searchKeyword.test(data.approved_by.toLowerCase()) ||
            searchKeyword.test(data.state.toLowerCase())
          );
        } else if (this.state.dataId == '2') {
          return searchKeyword.test(data.course_name.toLowerCase());
        } else if (this.state.dataId == '3') {
          return searchKeyword.test(data.exam_name.toLowerCase());
        }
        return false;
      });
  
      if (filteredData.length > 0) {
        this.setState({ clgList: filteredData, isDataFound: true });
      } else {
        this.setState({ isDataFound: false });
      }
    }
  };
  

  handleRestore(e, id) {
    // console.log(id)
    // this.setState({show:true})
    Swal.fire({
      // title: 'Restore the college?',
      text: `${
        this.state.dataId == "1"
          ? "Are you sure you want to restore this college?"
          : this.state.dataId == "2"
          ? "Are you sure you want to restore this course"
          : this.state.dataId == "3"
          ? "Are you sure you want to restore this exam"
          : ""
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("its restdore")
        if (this.state.dataId == "1") {
          var formData = new FormData();
          formData.append("college_id", id);
          fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/restore-clg", {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pt")}`,
            },
            body: formData,
          }).then(async (response) => {
            // console.log(response)
            if (response.ok) {
              var res = await response.json();
              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then((e) => {
                // this.setState({clgList:this.state.clgList.filter(clg=>clg._id!= id)})
                this.setState({ searchInput: "" });
                this.getAssetList();
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
          });
        } else if (this.state.dataId == "2") {
          var formData = new FormData();
          formData.append("course_id", id);
          fetch(
            process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/restore-course",
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("pt")}`,
              },
              body: formData,
            }
          ).then(async (response) => {
            // console.log(response)
            if (response.ok) {
              var res = await response.json();
              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then((e) => {
                // this.setState({clgList:this.state.clgList.filter(clg=>clg._id!= id)})
                this.setState({ searchInput: "" });
                this.getAssetList();
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
          });
        } else if (this.state.dataId == "3") {
          var formData = new FormData();
          formData.append("exam_id", id);
          fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/restore-exam", {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pt")}`,
            },
            body: formData,
          }).then(async (response) => {
            // console.log(response)
            if (response.ok) {
              var res = await response.json();
              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then((e) => {
                // this.setState({clgList:this.state.clgList.filter(clg=>clg._id!= id)})
                this.setState({ searchInput: "" });
                this.getAssetList();
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
          });
        }
      }
    });
  }

  handleModalopen(e, dataid) {
    e.preventDefault();
    this.setState({ show: true, dataId: dataid }, () => {
      this.getAssetList();
    });

    // console.log("hello");
  }

  render() {
    return (
      <>
        <div className="row">
          {data.map((item) => (
            <div className="col-md-2">
              <div key={item.id} className={Styles.card}>
                <div className={Styles.icon}>{item.icon}</div>
                <h5 onClick={(e) => this.handleModalopen(e, item.id)}>
                  {item.type}
                </h5>
              </div>
            </div>
          ))}
        </div>

        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          backdrop="static"
          keyboard={false}
          centered
          size="lg"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {this.state.dataId == "1" && (
              <>
                <Tablenav
                  TotalCount={{
                    Total: (
                      <h5>
                        Total Count :
                        {this.state.TotalCountNumber == ""
                          ? "0"
                          : this.state.TotalCountNumber}
                      </h5>
                    ),
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
                          <th style={{ background: "var(--primary)" }}>
                            College name
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Approved By
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            College Type
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            State
                          </th>
                          {/* <th style={{ background: "var(--primary)" }}>Delete</th> */}
                          <th style={{ background: "var(--primary)" }}>
                            Restore
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  whiteSpace: "unset",
                                }}
                              >
                                {clg.college_name}
                              </td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  whiteSpace: "unset",
                                }}
                              >
                                {clg.approved_by}
                              </td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  whiteSpace: "unset",
                                }}
                              >
                                {clg.college_type}
                              </td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  whiteSpace: "unset",
                                }}
                              >
                                {clg.state}
                              </td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  whiteSpace: "unset",
                                }}
                                onClick={(e) => this.handleRestore(e, clg._id)}
                              >
                                <RestoreIcon />
                              </td>
                              {/* <td style={{wordWrap:"break-word",whiteSpace:"unset"}}><Link href={`addcollege?e=${clg._id}`}><RestoreFromTrashIcon/></Link></td> */}
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
                        height: "50vh",
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
                      height: "50vh",
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
              </>
            )}
            {this.state.dataId == "2" && (
              <>
                <Tablenav
                  TotalCount={{
                    Total: (
                      <h5>
                        Total Count :
                        {this.state.TotalCountNumber == ""
                          ? "0"
                          : this.state.TotalCountNumber}
                      </h5>
                    ),
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
                          <th style={{ background: "var(--primary)" }}>
                            Course name
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Course Type
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Restore
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  whiteSpace: "unset",
                                }}
                              >
                                {clg.course_name}
                              </td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  whiteSpace: "unset",
                                }}
                              >
                                {clg.type}
                              </td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  whiteSpace: "unset",
                                }}
                                onClick={(e) => this.handleRestore(e, clg._id)}
                              >
                                <RestoreIcon />
                              </td>
                              {/* <td style={{wordWrap:"break-word",whiteSpace:"unset"}}><Link href={`addcollege?e=${clg._id}`}><RestoreFromTrashIcon/></Link></td> */}
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
                        height: "50vh",
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
                      height: "50vh",
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
              </>
            )}
            {this.state.dataId == "3" && (
              <>
                <Tablenav
                  TotalCount={{
                    Total: (
                      <h5>
                        Total Count :
                        {this.state.TotalCountNumber == ""
                          ? "0"
                          : this.state.TotalCountNumber}
                      </h5>
                    ),
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
                          <th style={{ background: "var(--primary)" }}>
                            Exam name
                          </th>
                          <th style={{ background: "var(--primary)" }}>
                            Restore
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.clgList.map((clg, i) => {
                          return (
                            <tr key={i}>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  whiteSpace: "unset",
                                }}
                              >
                                {clg.exam_name}
                              </td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  whiteSpace: "unset",
                                }}
                                onClick={(e) => this.handleRestore(e, clg._id)}
                              >
                                <RestoreIcon />
                              </td>
                              {/* <td style={{wordWrap:"break-word",whiteSpace:"unset"}}><Link href={`addcollege?e=${clg._id}`}><RestoreFromTrashIcon/></Link></td> */}
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
                        height: "50vh",
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
                      height: "50vh",
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
              </>
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
