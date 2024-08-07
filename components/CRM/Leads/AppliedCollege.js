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
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
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
    label: "Counsellor name",
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
    label: "Interested Course",
  },
  {
    id: "state",
    label: "State",
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
  const [searchInput, setSearchInput] = useState("");
  const { numSelected } = props;
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    props.onSearchChange(e.target.value);
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
                        onClick={() =>props.userListData()}
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
const ListType = "2"
var oldData = [];
export default function AppliedCollege() {
  const [selected, setSelected] = React.useState([]);
  const [rows, setRows] = useState([]);
  const [counsellorList, setCounsellorList] = useState([]);
  const [isAssignLeadModalOpen, setIsAssignLeadModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState("");
  const [isremarkLoading,setIsRemarkLoading] = useState(false)
  const [remarksHistory, setRemarksHistory] = useState([]);
  const [pipeline, setPipeLine] = useState(null);
  const [isRemarkHistoryModalOpen, setIsRemarkHistoryModalOpen] = useState(false);
  const [leadId, setLeadId] = useState('')
  const [counsellorId, setCounsellorId] = useState('')
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    setIsLoading(true)
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/leads?lid=${-1}&type=${ListType}`,
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
    setIsLoading(false)

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
          setIsAssignLeadModalOpen(false);
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
                      <TableCell>{row.full_name}</TableCell>
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
                      <TableCell>{row.contact_no}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.course_interested}</TableCell>
                      <TableCell>{row.state}</TableCell>
                      <TableCell> <FormatTimestamp timestamp={row.createdAt} /></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
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
