import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Classes from "/styles/Popup.module.css";

function AssignLeadModal({ isOpen, handleClose, counsellorList, selectedCounsellor, handleAssign, isLoading, counsellorID }) {
  return (
    <Modal
      centered
      show={isOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Assign Lead</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {counsellorList.map((s, i) => {
            return (
              <div
                key={i}
                className={`${Classes.counsellorList} ${s._id == selectedCounsellor ? Classes.selected : ""
                  }`}
                onClick={() => { counsellorID(s._id) }}
              >
                <Avatar>{s.name.substring(0, 1)}</Avatar>
                <span className="ms-3">{s.name}</span>
              </div>
            );
          })}
        </div>
        {selectedCounsellor != "" ? (
          <div className="d-flex justify-content-center align-items-center m-2">
            <Button
              disabled={isLoading}
              type="submit"
              variant="primary" size="md"
              onClick={handleAssign}
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
          </div>
        ) : (
          ""
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AssignLeadModal;
