import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Modal, Spinner,Button } from "react-bootstrap";
// import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import Avatar from "@mui/material/Avatar";
import Classes from "/styles/Popup.module.css";
import Chip from "@mui/material/Chip";
import Loading from "@/components/Comps/Loading";
import LoopIcon from "@mui/icons-material/Loop";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const headCells = [
  {
    id: "studname",
    label: "Student Name",
  },
  {
    id: "counsellorname",
    label: "Counsellor name",
  },
  {
    id: "mobnumber",
    label: "Mobile Number",
  },
  {
    id: "fee",
    label: "Fees",
  },
  {
    id: "course",
    label: "Interested Course",
  },
  {
    id: "zone",
    label: "Zone",
  },
  {
    id: "qualification",
    label: "Qualification",
  },
  {
    id: "specialization",
    label: "Specialization",
  },

  {
    id: "date",
    label: "Date",
  },
];

function EnhancedTableHead(props) {
  // console.log(props);
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  // console.log(props);
  // console.log(props.rowsList);
  const [searchInput, setSearchInput] = useState("");
  const { numSelected } = props;
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    props.onSearchChange(e.target.value);
    // setRows(filteredData);
    // }
  };

  const handleOpen = (e) => {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/counsellor-list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      // console.log(res)
      let response = await res.json();
      console.log(response);
      if (response.data) {
        if (response.data.length > 0) {
          props.counsellorList(response.data);
          // props.setCounsellor(response.data);
          props.OnModalOpen(true);
        }
      } else {
        Swal.fire({
          title: "error",
          html: `${response.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    });
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="p"
            id="tableTitle"
            component="div"
          >
            Total Users : {props.rowsList.length}
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Assign Leads">
            <IconButton>
              <SendTimeExtensionIcon onClick={handleOpen} />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <input
              type="text"
              className="form-control"
              value={searchInput}
              placeholder="Search..."
              onChange={handleSearchChange}
            />
            <Tooltip title="Refresh">
              <IconButton
                aria-label="Refresh"
                onClick={() => props.userListData()}
              >
                <LoopIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

var oldData = [];

export default function Testeligibility() {
  const [selected, setSelected] = React.useState([]);
  const [rows, setRows] = useState([]);
  const [counsellorList, setCounsellorList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isremarkLoading, setIsRemarkLoading] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState("");
  const [remarkshowModal, setRemarkshowModal] = useState(false);
  const [bitlinkModal, setBitlinkModal] = useState(false);

  const [remarksHistory, setRemarksHistory] = useState([]);
  const [pipeline, setPipeLine] = useState(null);

  const [collegebitlink,setCollegebitlink] =useState([])
  const [iframeModal,setIframeModal] =useState(false)
  const [applyLink,setApplyLink] =useState('')
  const [leadId,setLeadId] =useState('')
  const [counsellorid,setCounsellorId] =useState('')
  const [collegeid,setCollegeId] =useState('')

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    setIsLoading(true);
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/leads?lid=${-1}&type=1`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
      }
    ).then(async (res) => {
      let response = await res.json();
      if (response.data) {
        if (response.data.length > 0) {
          setRows(response.data);
        }
        oldData = response.data;
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
      setIsLoading(false);
    });
  };
  const formatTimestamp = (timestamp) => {
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
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSearchChange = (value) => {
    const searchTerm = value.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, "i");

    if (searchKeyword === "") {
      setRows(oldData);
    } else {
      const filteredData = oldData.filter((data) =>
        searchKeyword.test(data.name.toLowerCase())
      );
      setRows(filteredData);
    }
  };

  const handleModalOpen = (value) => {
    setIsModalOpen(value);
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData();
    fd.append("lid", selected.join("&"));
    fd.append("lt", 1);
    fd.append("cid", selectedCounsellor);
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/admin/assign-leads-to-counsellor`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
        method: "POST",
        body: fd,
      }
    ).then(async (response) => {
      var res = await response.json();
      console.log(res);
      setIsLoading(false);
      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: `${res.message}`,
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
          setIsModalOpen(false);
          setSelected([]);
          setSelectedCounsellor("");
          getUserList();
        });
      } else {
        Swal.fire({
          title: "error",
          text: `${res.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    });
  };

  const handleGetRemarks = (e, c, id) => {
    e.preventDefault();
    console.log(c,id)
    setCounsellorId(c._id)
    setLeadId(id)
    try {
      setIsRemarkLoading(true);
      setRemarkshowModal(true);
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/admin/counsellor-lead-status?lid=${id}&lt=1&cid=${c._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (res) => {
        if (res.ok) {
          // console.log(res)
          let response = await res.json();
          console.log(response.data);
          setRemarksHistory(response.data.remarks);
          setPipeLine(response.data.pipeline);
        } else {
          let response = await res.json();
        }
        setIsRemarkLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };
  const steps = [
    "First Followup Complete",
    "Bit-link Registration Complete",
    "Fee Payment Success",
  ];
  const getMaxCount = (p) => {
    if (p.stage3) {
      return 3;
    } else if (p.stage2) {
      return 2;
    } else if (p.stage1) {
      return 1;
    }
  };

  const handleGetBitlink = (e) => {
    e.preventDefault();
    setBitlinkModal(true)
    try {
      // setIsRemarkLoading(true);
      setBitlinkModal(true);
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/admin/collegebitlinks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (res) => {
        if (res.ok) {
          // console.log(res)
          let response = await res.json();
          console.log(response.data);

          console.log(response.data.registered);
          setCollegebitlink(response.data);
          // setIsCollegeRegistered(response.data.registered)

        } else {
          let response = await res.json();
        }
        setIsRemarkLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpeniframe = (e,link) =>{
    e.preventDefault()
    console.log(link)
      setIframeModal(true)
      setApplyLink(link.where_to_apply)
      setCollegeId(link.college_id)
      // console.log(applyLink)
  }
 const handleSubmitIframe = (e)=>{
  e.preventDefault()
  Swal.fire({
    title: "Are you sure you registered the lead?",
    text:"If yes, You will not be able to re-apply this lead for this college bitlink!",
    showDenyButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      setIsRemarkLoading(true);
    const fd = new FormData();
    fd.append("leadType",1);
    fd.append("leadId", leadId);
    fd.append("cid", counsellorid);
    fd.append("collegeId",collegeid)
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/admin/bitlink-registration`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
        method: "POST",
        body: fd,
      }
    ).then(async (response) => {
      var res = await response.json();
      // console.log(res);
    
      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: `${res.message}`,
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          setIframeModal(false)
          setIsRemarkLoading(false);
          handleGetBitlink(e)

        });
      } else {
        Swal.fire({
          title: "error",
          text: `${res.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    });
      // setIframeModal(false)
    }
  });
 }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            userListData={getUserList}
            rowsList={rows}
            onSearchChange={(value) => handleSearchChange(value)}
            OnModalOpen={(value) => handleModalOpen(value)}
            counsellorList={(list) => setCounsellorList(list)}
          />
          <TableContainer sx={{ maxHeight: "70vh" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows.length}
                userListData={getUserList}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  // console.log(row)
                  // const CounsellorID = {row.counsellors.map((counselor, index) => (
                  //   <TableRow key={index}>
                  //     <TableCell>{counselor.name}</TableCell>
                  //   </TableRow>
                  // ))}

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row._id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {row.name.length > 20
                          ? row.name.substring(0, 20) + "..."
                          : row.name}
                      </TableCell>
                      <TableCell>
                        {row.counsellors.length > 0 ? (
                          row.counsellors.map((c, i) => {
                            return (
                              <Chip
                                onClick={(e) => handleGetRemarks(e, c, row._id)}
                                key={i}
                                label={c.name}
                                variant="outlined"
                                color="primary"
                                style={{
                                  marginRight: "5px",
                                  marginBottom: "5px",
                                }}
                              />
                            );
                          })
                        ) : (
                          <Chip
                            label={"Not Assigned"}
                            variant="outlined"
                            color="error"
                            style={{ marginRight: "5px", marginBottom: "5px" }}
                          />
                        )}
                      </TableCell>
                      <TableCell>{row.mobile}</TableCell>
                      <TableCell>{row.fee}</TableCell>
                      <TableCell>{row.course}</TableCell>
                      <TableCell>{row.zone}</TableCell>
                      <TableCell>{row.qualification}</TableCell>
                      <TableCell>{row.specialization}</TableCell>

                      <TableCell>{formatTimestamp(row.createdAt)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Modal
        centered
        show={isModalOpen}
        onHide={() => {
          setIsModalOpen(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <div>
              {counsellorList.map((s, i) => {
                return (
                  <div
                    key={i}
                    className={`${Classes.counsellorList} ${
                      s._id == selectedCounsellor ? Classes.selected : ""
                    }`}
                    onClick={() => setSelectedCounsellor(s._id)}
                  >
                    <Avatar>{s.name.substring(0, 1)}</Avatar>
                    <span className="ms-3">{s.name}</span>
                  </div>
                );
              })}
            </div>
            {selectedCounsellor != "" ? (
              <Button
                disabled={isLoading}
                className="bg-blue-500"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ? (
                  <>
                    <span>Please Wait...</span>
                    <Spinner animation="border" role="status" />
                  </>
                ) : (
                  "Assign"
                )}
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Modal.Body>
      </Modal>

      <Modal
        show={remarkshowModal}
        onHide={() => setRemarkshowModal(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Counsellor Remark History</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!isremarkLoading ? (
            remarksHistory.length > 0 ? (
              <>
              <table className={`table table-hover custom-table`}>
                <thead>
                  <tr>
                    <th style={{ background: "var(--primary)" }}>Remarks</th>
                    <th style={{ background: "var(--primary)" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {remarksHistory.map((obj, i) => {
                    return (
                      <tr key={i}>
                        <td>{obj.remarks}</td>
                        <td>{formatTimestamp(obj.createdAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <hr/>
              <Stack sx={{ width: "100%" }} spacing={4}>
              <Stepper
                alternativeLabel
                activeStep={pipeline ? getMaxCount(pipeline) : -1}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>
                    {label === "Bit-link Registration Complete" ? (
                <Button onClick={(e)=>handleGetBitlink(e)}>{label}</Button>
              ) : (
                label
              )}
                    </StepLabel>
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
                 activeStep={pipeline ? getMaxCount(pipeline) : -1}
               >
                 {steps.map((label) => (
                   <Step key={label}>
                     <StepLabel>{label}</StepLabel>
                   </Step>
                 ))}
               </Stepper>
             </Stack>
             </>
            )
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Spinner animation="border" variant="dark" />
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={bitlinkModal}
        onHide={() => setBitlinkModal(false)}
        scrollable
        backdrop="static"
        keyboard={false}
       size="xl"
        >
        <Modal.Header closeButton>
          <Modal.Title>College BitLink</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <table className={`table table-hover`}>
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
                    {collegebitlink.map((clg, i) => {
                      return (
                        <tr key={i}>
                          <td>{clg.college_name}</td>
                          <td >
                            <Chip  label={clg.registered?"Application sent":"Apply Now"} color={clg.registered ? "success" : 'primary'} variant={clg.registered ? "filled" : 'outlined'} onClick={(e)=>!clg.registered && handleOpeniframe(e,clg)} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
        </Modal.Body>
      </Modal>
 
      <Modal
        show={iframeModal}
        onHide={() => setIframeModal(false)}
        backdrop="static"
        keyboard={false}
        fullscreen={true} 
      >
     <Modal.Body className="p-0">
          <iframe
            src={applyLink}
            title="Where to Apply"
            width="100%"
            height="99%"
            style={{ border: 'none' }}
          ></iframe>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
            <Button variant="primary" onClick={(e) => handleSubmitIframe(e)}>
            BitLink Registration Success?
          </Button>
          <Button variant="danger" onClick={() => {
            Swal.fire({
              title: "Do you want to close the application form?",
              showDenyButton: true,
              confirmButtonText: "Yes",
              // denyButtonText: `Don't Close`
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                setIframeModal(false)
              }
            });
          }
            
            }>
            Close Application Form
          </Button>
        
        </Modal.Footer>
      </Modal>
      <Loading show={isLoading} onHide={() => setIsLoading(false)} />
    </>
  );
}
