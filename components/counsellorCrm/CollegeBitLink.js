import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Loading from "../Comps/Loading";
import { Spinner } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import Tablenav from "../Comps/Tablenav";
import LoopIcon from "@mui/icons-material/Loop";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Chip from '@mui/material/Chip';
var oldData = [];
var steps = [
  "First Followup Complete",
  "Bit-link Registration Complete",
  "Fee Payment Success",
];
export default class CollegeBitLink extends Component {
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
      lastrecid: "-1",
      searchInput: "", // Search input
      error: "",
      TotalCountNumber: "",
      remark: "",
      remarksHistory: [],
      showModal: false,
      leadid: "",
      callerType: "",
      pipeline:null
    };
  }
  getAssetList() {
    try {
      this.setState({ isApiHitComplete: false, isDataFound: false });
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/counsellor/collegebitlinks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("cst")}`,
        },
      }).then(async (res) => {
        if (res.ok) {
          // console.log(res)
          let response = await res.json();
          console.log(response.data);
          if (response.data.length > 0) {
            this.setState({ clgList: response.data, isDataFound: true });
          }
          this.setState({ TotalCountNumber: response.data.length });
          oldData = response.data;
        } else {
          let response = await res.json();
          this.setState({ error: response.error });
        }
        this.setState({ isApiHitComplete: true });
      });
    } catch (error) {
      console.error(error);
    }
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
        this.setState({ isDataFound: true});
      } else {
        this.setState({ isDataFound: false });
      }
    } else {
      const filteredData = oldData.filter(
        (data) =>
          searchKeyword.test(data.college_name.toLowerCase())
      );

      if (filteredData.length > 0) {
        this.setState({ clgList: filteredData, isDataFound: true });
      } else {
        this.setState({ isDataFound: false });
      }
    }
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  render() {
    return (
      <>

        {this.state.error == "" ? (
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
                  <div className="d-flex justify-content-between align-items-center">
             
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
                        onClick={() => this.getAssetList()}
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
                  <thead>
                    <tr>
                      <th style={{ background: "var(--primary)" }}>
                        College Name
                      </th>
                      <th style={{ background: "var(--primary)" }}>
                       Application Link
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clgList.map((clg, i) => {
                      return (
                        <tr key={i}>
                          <td>{clg.college_name}</td>
                          <td >
                            <Chip label="Apply Now" color="primary" variant="outlined" />
                          </td>
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
                    height: "inherit",
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
                  height: "inherit",
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
              show={this.state.showModal}
              onHide={this.toggleModal}
              backdrop="static"
              keyboard={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Remark</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="remarkForm">
                  <Form.Label>Remark</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter remark"
                    value={this.state.remark}
                    onChange={this.handleRemarkChange}
                  />
                </Form.Group>
                <div className="text-center mt-2">
                  <Button variant="primary" onClick={this.handleAddRemark}>
                    Add
                  </Button>
                </div>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
              <Modal.Body>
                <h5>Remarks History</h5>

                {this.state.remarksHistory.length > 0 ? (
                  <>
                  <table className={`table table-hover custom-table`}>
                    <thead>
                      <tr>
                        <th style={{ background: "var(--primary)" }}>
                          Remarks
                        </th>
                        <th style={{ background: "var(--primary)" }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.remarksHistory.map((obj, i) => {
                        return (
                          <tr key={i}>
                            <td>{obj.remarks}</td>
                            <td>{this.formatTimestamp(obj.createdAt)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                   <hr/>
                   <Stack sx={{ width: "100%" }} spacing={4}>
                   <Stepper
                     alternativeLabel
                     activeStep={this.state.pipeline ? this.getMaxCount(this.state.pipeline) : -1}
                   >
                     {steps.map((label) => (
                       <Step key={label}>
                         <StepLabel>{label}</StepLabel>
                       </Step>
                     ))}
                   </Stepper>
                 </Stack>
                 </>
                ) : (
                  <>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "inherit",
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
                    <hr/>
                    <Stack sx={{ width: "100%" }} spacing={4}>
                    <Stepper
                      alternativeLabel
                      activeStep={this.state.pipeline ? this.getMaxCount(this.state.pipeline) : -1}
                    >
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Stack>
                  </>
                )}
            
              </Modal.Body>
            </Modal>
          </>
        ) : (
          this.state.error
        )}
        {/* </div> */}
      </>
    );
  }
}
