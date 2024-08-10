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
import * as XLSX from "xlsx";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDropzone } from "react-dropzone";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Pagination from "@mui/material/Pagination";

import AssignLeadModal from "./components/AssignLeadModal";
import RemarkHistoryModal from "./components/RemarkHistoryModal";
import FormatTimestamp from "../../Comps/FormatTimestamp";
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
    id: "course",
    label: "Course",
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
//   console.log(props);
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
      //   console.log(response);
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
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      // setJsonData(json);
      //   console.log(json)
      //   console.log(JSON.stringify(json))
      props.loader(true);
      const fd = new FormData();
      fd.append("data", JSON.stringify(json));
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/admin/llbleads-template-upload`,
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
            props.userListData();
          });
        } else {
          Swal.fire({
            title: "Error",
            html: `${response.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
        props.loader(false);

        // setIsLoading(false)
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".xlsx",
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
            <div className="d-flex justify-content-end">
              <Tooltip title="Upload UgLeads Form Excel" arrow>
                <Button className="m-4" variant="primary" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FileUploadIcon />
                  Upload
                </Button>
              </Tooltip>

              {/* <a href=`process.env.NEXT_PUBLIC_API_ENDPOINT + 'download_excel'` target='blank'> <Button className='m-4' variant="success" > */}
              <a
                href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/llbleads-template-download`}
                target="blank"
              >
                <Tooltip title="Download UgLeads Excel Template" arrow>
                  <Button className="m-4" variant="success">
                    <FileDownloadIcon />
                    Download
                  </Button>
                </Tooltip>
              </a>
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
const ListType = "9"

var oldData = [];
export default function LLBPageLeads() {
  const [selected, setSelected] = React.useState([]);
  const [rows, setRows] = useState([]);
  const [counsellorList, setCounsellorList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isremarkLoading, setIsRemarkLoading] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState("");
  const [remarkshowModal, setRemarkshowModal] = useState(false);
  const [remarksHistory, setRemarksHistory] = useState([]);
  const [pipeline, setPipeLine] = useState(null);
  const [page, setPage] = React.useState(1);
  const [totalrecord, setTotalrecord] = React.useState(0);
  const [count, setCount] = React.useState(0);

  
  const [isAssignLeadModalOpen, setIsAssignLeadModalOpen] = useState(false);
  const [isRemarkHistoryModalOpen, setIsRemarkHistoryModalOpen] = useState(false);
  const [leadId, setLeadId] = useState('')
  const [counsellorId, setCounsellorId] = useState('')
  const rowsPerPage = 50;
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    setIsLoading(true);
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/admin/learnerhunt-landing-page-leads?lt=${ListType}&page=${page}`,
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
      setIsLoading(false);
    });
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
    setIsAssignLeadModalOpen(value);

    setIsLoading(false);
  };

  const handleAssignLead = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData();
    fd.append("lid", selected.join("&"));
    fd.append("lt", ListType);
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
      //   console.log(res);
      setIsLoading(false);
      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: `${res.message}`,
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
          setIsAssignLeadModalOpen(false);
          setSelectedCounsellor("");
          setSelected([]);
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
    setLeadId(id)
    setCounsellorId(c._id)
    try {
      setIsRemarkLoading(true);

      setIsRemarkHistoryModalOpen(true);

      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/admin/counsellor-lead-status?lid=${id}&lt=${ListType}&cid=${c._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (res) => {
        if (res.ok) {
          // console.log(res)
          let response = await res.json();
          //   console.log(response.data);
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
    // console.log(p)
    if (p.stage3) {
      return 3;
    } else if (p.stage2) {
      return 2;
    } else if (p.stage1) {
      return 1;
    }
  };

  // useEffect(()=>{
  //   getUserList();
  // },[page])
 
  const handlePage=(event, newPage)=>{
    event.preventDefault()
    setPage(newPage);
    getUserList()
    // console.log(newPage)
    

  }
  const SetSelectedCounsellorID = (id) => {
    setSelectedCounsellor(id)
  }
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            userListData={getUserList}
            rowsList={rows}
            totalrecord={totalrecord}
            onSearchChange={(value) => handleSearchChange(value)}
            OnModalOpen={(value) => handleModalOpen(value)}
            counsellorList={(list) => setCounsellorList(list)}
            loader={setIsLoading}
          />
          <TableContainer sx={{ maxHeight: "calc(70vh - 28px)" }}>
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
                      <TableCell>{row.mobile || "NA"}</TableCell>
                      <TableCell>{row.email || "NA"}</TableCell>
                      <TableCell>{row.course || "NA"}</TableCell>
                      <TableCell><FormatTimestamp timestamp={row.createdAt} /></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination className="p-2 d-flex justify-content-center" count={count} page={page} color="primary" onChange={handlePage}/>
        </Paper> 
      </Box>
      <AssignLeadModal
        isOpen={isAssignLeadModalOpen}
        handleClose={() => setIsAssignLeadModalOpen(false)}
        counsellorList={counsellorList}
        selectedCounsellor={selectedCounsellor}
        handleAssign={handleAssignLead}
        isLoading={isLoading}
        counsellorID={SetSelectedCounsellorID}

      />
      <RemarkHistoryModal
        isOpen={isRemarkHistoryModalOpen}
        handleClose={() => setIsRemarkHistoryModalOpen(false)}
        remarksHistory={remarksHistory}
        pipeline={pipeline}
        ListType={ListType}
        getMaxCount={getMaxCount}
        steps={steps}
        leadId={leadId}
        isremarkedLoading={isremarkLoading}
        counsellorId={counsellorId}
      />
      <Loading show={isLoading} onHide={() => setIsLoading(false)} />
    </>
  );
}
