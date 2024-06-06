
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function IframeModal({ isOpen, handleClose, applyLink, handleSubmitIframe, isLoading, collegeID }) {

  console.log(applyLink, "APPLYlINK")



  return (
    <>
      <Modal
        show={isOpen}
        onHide={handleClose}
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
            style={{ border: "none" }}
          ></iframe>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary" onClick={handleSubmitIframe}>
            BitLink Registration Success?
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              Swal.fire({
                title: "Do you want to close the application form?",
                showDenyButton: true,
                confirmButtonText: "Yes",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClose();
                }
              });
            }}
          >
            Close Application Form
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default IframeModal;
