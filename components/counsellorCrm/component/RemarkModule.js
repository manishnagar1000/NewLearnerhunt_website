// RemarkModal.js
import React from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { Stack, Stepper, Step, StepLabel } from '@mui/material';

const RemarkModal = ({
  showModal,
  toggleModal,
  remark,
  handleRemarkChange,
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
      <Form.Group controlId="remarkForm">
        <Form.Label>Remark</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter remark"
          value={remark}
          onChange={handleRemarkChange}
        />
      </Form.Group>
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
      )}
    </Modal.Body>
  </Modal>
);

export default RemarkModal;
