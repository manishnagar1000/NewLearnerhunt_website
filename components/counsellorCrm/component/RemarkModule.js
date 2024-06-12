// RemarkModal.js
import React from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { Stack, Stepper, Step, StepLabel,Select, MenuItem, FormControl, InputLabel, FormHelperText,Input } from '@mui/material';

const RemarkModal = ({
  showModal,
  toggleModal,
  remark,
  handleRemarkChange,
  isCustomRemark,
  handleCustomRemarkChange,
  handleAddRemark,
  remarksHistory,
  formatTimestamp,
  steps,
  getMaxCount,
  pipeline
}) => (
  <Modal show={showModal} onHide={toggleModal} backdrop="static" keyboard={false} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Add Remark</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel>Remark</InputLabel>
        <Select
          value={remark}
          label="Remark"
          onChange={handleRemarkChange}
        >
          <MenuItem value="" disabled>
            <em>Select</em>
          </MenuItem>
          <MenuItem value="-1">Custom</MenuItem>
          <MenuItem value="Interested">Interested</MenuItem>
          <MenuItem value="Not Interested">Not Interested</MenuItem>
          <MenuItem value="Error">Error</MenuItem>
          <MenuItem value="Busy">Busy</MenuItem>
          <MenuItem value="Disconnected">Disconnected</MenuItem>
          <MenuItem value="No Response">No Response</MenuItem>
          <MenuItem value="Appearing Exam">Appearing Exam</MenuItem>
        </Select>
        {isCustomRemark && (
          <FormControl sx={{ m: 2 }}>
            <InputLabel>Enter custom remark</InputLabel>
            <Input
              type="text"
              placeholder="Enter custom remark"
              value={remark}
              onChange={handleCustomRemarkChange}
            />
            <FormHelperText>Please enter your custom remark.</FormHelperText>
          </FormControl>
        )}
      </FormControl>
      <div className="text-center mt-2">
        <Button variant="primary" onClick={handleAddRemark}>
          Add
        </Button>
      </div>
    </Modal.Body>
    <Modal.Body>
      <h5>Remarks History</h5>
      {remarksHistory.length > 0 ? (
        <>
          <Table hover className="custom-table">
            <thead>
              <tr>
                <th style={{ background: "var(--primary)" }}>Remarks</th>
                <th style={{ background: "var(--primary)" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {remarksHistory.map((obj, i) => (
                <tr key={i}>
                  <td style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>{obj.remarks}</td>
                  <td>{formatTimestamp(obj.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <hr />
          <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper alternativeLabel activeStep={pipeline ? getMaxCount(pipeline) : -1}>
              {steps.map((label, index) => (
                <Step key={index}>
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
              <span style={{ color: "#0d6efd", cursor: "pointer" }}>No Records</span>
            </div>
          </div>
          {/* <hr />
          <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper alternativeLabel activeStep={pipeline ? getMaxCount(pipeline) : -1}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack> */}
        </>
      )}
    </Modal.Body>
  </Modal>
);

export default RemarkModal;
