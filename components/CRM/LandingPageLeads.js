// import React, { Component } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Loading from "../Comps/Loading";
// import { Spinner } from "react-bootstrap";
// import Tablenav from "../Comps/Tablenav";
// var oldData = []

// export default class LandingPageLeads extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: false,
//       clgList: [],
//       isDataFound: false,
//       isApiHitComplete: false,
//       selectedCategory: [],
//       username: localStorage.getItem("username"),
//       statusAnchorEl: null,
//       searchInput: "", // Search input
//       lastrecid:"-1",
//       TotalCountNumber:''
//       // selectedAsset: null,
//     };
//   }

//  formatTimestamp(timestamp) {
//     const dateObject = new Date(timestamp);

//     const formattedTime = dateObject.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });

//     const formattedDate = dateObject.toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });

//     return `${formattedTime}, ${formattedDate}`;
//   }

//   getAssetList() {
//     this.setState({ isApiHitComplete: false, isDataFound: false });
//     fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/learnerhunt-landing-page-leads`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("pt")}`,
//       },
//     }).then(async (res) => {
//       let response = await res.json();
//       // console.log(response.data);
//       if (response.data.length > 0) {
//         this.setState({ clgList: response.data, isDataFound: true ,TotalCountNumber:response.data.length });
//       }
//       oldData=response.data
//       this.setState({ isApiHitComplete: true });
//     });
//   }

//   componentDidMount() {
//     this.getAssetList();
//   }

//   handleSearchChange = (e) => {
//     this.setState({searchInput:e.target.value})
//     const searchTerm = e.target.value.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
//     const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, 'i');

//     if (e.target.value == '') {
//       this.setState({ clgList: oldData })
//       if (oldData.length > 0) {
//           this.setState({ isDataFound: true })
//       } else {
//           this.setState({ isDataFound: false })
//       }
//   } else {
//     const filteredData = oldData.filter(data =>
//       searchKeyword.test(data.name.toLowerCase())||
//       searchKeyword.test(data.mobile.toLowerCase())||
//       searchKeyword.test(data.course.toLowerCase())



//   );

//   if (filteredData.length > 0) {
//       this.setState({ clgList: filteredData, isDataFound: true });
//   } else {
//       this.setState({ isDataFound: false });
//   }
//   }
//   };
//   render() {
//     return (
//       <>
//        <Tablenav
//        TotalCount={{
//         Total:(
//             <h5>Total Count :{this.state.TotalCountNumber == ''?'0':this.state.TotalCountNumber}</h5>
//         )
//        }}
//           Actions={{

//             Actions: (
//               <input
//             type="text"
//             className="form-control"
//             value={this.state.searchInput}
//             placeholder="Search..."
//             onChange={this.handleSearchChange}
//           />
//             ),
//           }}
//         />
//         {this.state.isApiHitComplete ? (
//           this.state.isDataFound ? (
//             <table className={`table table-hover custom-table`}>
//               <thead>
//                 <tr>
//                   <th style={{ background: "var(--primary)" }}>Student Name</th>
//                   <th style={{ background: "var(--primary)" }}>Mobile Number</th>
//                   <th style={{ background: "var(--primary)" }}>Email</th>
//                   <th style={{ background: "var(--primary)" }}>Courses</th>
//                   <th style={{ background: "var(--primary)" }}>State</th>
//                   <th style={{ background: "var(--primary)" }}>Date</th>



//                 </tr>
//               </thead>
//               <tbody>
//                 {this.state.clgList.reverse().map((clg, i) => {
//                   return (

//                       <tr key={i}>
//                         <td>{clg.name}</td>
//                         <td>{clg.mobile}</td>
//                         <td>{clg.email}</td>
//                         <td>{clg.course}</td>
//                         <td>{clg.state}</td>
//                         <td>{this.formatTimestamp(clg.createdAt)}</td>
//                       </tr>

//                   );
//                 })}
//               </tbody>
//             </table>
//           ) : (
//             <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
//             <div style={{ fontWeight: "500" }}>
//               <span style={{ color: "#0d6efd", cursor: 'pointer' }}> No Records </span>
//             </div>
//           </div>
//           )
//         ) : (
//              <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
//               <Spinner animation="border" role="status" variant="info">
//                 <span className="visually-hidden">Loading...</span>
//               </Spinner>
//             </div>
//         )}
//         <Loading
//           show={this.state.isLoading}
//           onHide={() => this.setState({ isLoading: false })}
//         />
//         {/* {this.state.openPreviewAsset && (
//           <Previewmodal
//             show={this.state.openPreviewAsset}
//             onHide={() => this.setState({ openPreviewAsset: false })}
//             data={this.state.selectedAsset}
//             baseurl={this.state.baseurl}
//           />
//         )} */}
//       </>
//     );
//   }
// }



// 

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
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import Avatar from "@mui/material/Avatar";
import Classes from "/styles/Popup.module.css";
import Chip from "@mui/material/Chip";
import LoopIcon from "@mui/icons-material/Loop";
import Loading from "@/components/Comps/Loading";
import * as XLSX from 'xlsx';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useDropzone } from 'react-dropzone';
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Pagination from "@mui/material/Pagination";

const headCells = [
  {
    id: "studname",
    label: "Student Name",
  },
  {
    id: "counsellorname",
    label: "Assigned to Counsellor",
  },
  {
    id: "mobnumber",
    label: "Mobile Number",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "state",
    label: "State",
  },
  {
    id: "city",
    label: "City",
  },
  {
    id: "budget",
    label: "Budget",
  },
  {
    id: "course",
    label: "Course",
  },
  {
    id: "preferred_city",
    label: "Preferred City",
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
      // console.log(response);
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


  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      // setJsonData(json);
      // console.log(json)
      // console.log(JSON.stringify(json))
      props.loader(true)
      const fd = new FormData();
      fd.append("data", JSON.stringify(json));
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/mbaleads-template-upload`,
        {
          method: "POST",
          body: fd,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (res) => {
        let response = await res.json();
        if (response.data) {
          Swal.fire({
            title: "Success",
            html: `${response.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          }).then((s) => {
            props.userListData()
          })
        } else {
          Swal.fire({
            title: "Error",
            html: `${response.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          })
        }
        props.loader(false)

        // setIsLoading(false)

      });


    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.xlsx',
    onDrop,
  });



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
            Total Rows : {props.rowsList.length} , Total Records :{props.totalrecord}
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Assigned Leads">
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
            <div className='d-flex justify-content-end'>
              <Tooltip title="Upload UgLeads Form Excel" arrow>
                <Button className='m-4' variant="primary" {...getRootProps()} >
                  <input {...getInputProps()} />
                  <FileUploadIcon />
                  Upload
                </Button>
              </Tooltip>

              {/* <a href=`process.env.NEXT_PUBLIC_API_ENDPOINT + 'download_excel'` target='blank'> <Button className='m-4' variant="success" > */}
              <a href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/mbaleads-template-download`} target='blank'>
                <Tooltip title="Download UgLeads Excel Template" arrow>

                  <Button className='m-4' variant="success" >
                    <FileDownloadIcon />
                    Download
                  </Button>
                </Tooltip></a>
            </div>
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
export default function Studentappliedclg() {
  const [selected, setSelected] = React.useState([]);
  const [rows, setRows] = useState([]);
  const [counsellorList, setCounsellorList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isremarkLoading, setIsRemarkLoading] = useState(false)
  const [selectedCounsellor, setSelectedCounsellor] = useState("");
  const [remarkshowModal, setRemarkshowModal] = useState(false);
  const [remarksHistory, setRemarksHistory] = useState([]);
  const [pipeline, setPipeLine] = useState(null);
  const [page, setPage] = React.useState(1);
  const [totalrecord, setTotalrecord] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const rowsPerPage = 50;
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    setIsLoading(true)
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/learnerhunt-landing-page-leads?lt=7&page=${page}`,
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

          setCount(Math.ceil(response.totalRecords / rowsPerPage));
        }
        setTotalrecord(response.totalRecords);
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
      setIsLoading(false)

    });
  };
  useEffect(()=>{
    getUserList();
  },[page])
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
        searchKeyword.test(data.email.toLowerCase())
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
    fd.append("lt", 7);
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
      // console.log(res);
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
          setSelectedCounsellor("");
          setSelected([])
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
    try {
      setIsRemarkLoading(true);

      setRemarkshowModal(true);
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/admin/counsellor-lead-status?lid=${id}&lt=7&cid=${c._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (res) => {
        if (res.ok) {
          // console.log(res)
          let response = await res.json();
          // console.log(response.data);
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
  const handlePage = (event, newPage) => {
    event.preventDefault()
    setPage(newPage);
   
  }
  const steps = [
    "First Followup Complete",
    "Bit-link Registration Complete",
    "Fee Payment Success",
  ];
  const getMaxCount = (p) => {
    // console.log(p)
    if (p.stage3) {
      return 3;
    } else if (p.stage2) {
      return 2;
    } else if (p.stage1) {
      return 1;
    }
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            userListData={getUserList}
            totalrecord={totalrecord}
            rowsList={rows}
            onSearchChange={(value) => handleSearchChange(value)}
            OnModalOpen={(value) => handleModalOpen(value)}
            counsellorList={(list) => setCounsellorList(list)}
            loader={setIsLoading}
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
                      <TableCell>{row.name}</TableCell>
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
                      <TableCell>{row.mobile || 'NA'}</TableCell>
                      <TableCell>{row.email || 'NA'}</TableCell>
                      <TableCell>{row.state || 'NA'}</TableCell>
                      <TableCell>{row.city || 'NA'}</TableCell>
                      <TableCell>{row.budget || 'NA'}</TableCell>
                      <TableCell>{row.course || 'NA'}</TableCell>
                      <TableCell>{row.preferred_city || 'NA'}</TableCell>

                      <TableCell>{formatTimestamp(row.createdAt)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination className="p-2 d-flex justify-content-center" count={count} page={page} color="primary" onChange={handlePage} />
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
          <Modal.Title>Assign Leads to Counsellor</Modal.Title>
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
                    className={`${Classes.counsellorList} ${s._id == selectedCounsellor ? Classes.selected : ""
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
                <hr />
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
                <hr />
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
      <Loading show={isLoading} onHide={() => setIsLoading(false)} />
    </>
  );
}
