import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import Tablenav from "../../Comps/Tablenav";
import TrashTable from "./TrashTable";

const TrashModal = ({
  show,
  dataId,
  clgList,
  isDataFound,
  isApiHitComplete,
  TotalCountNumber,
  searchInput,
  handleSearchChange,
  handleRestore,
  handleClose,
}) => (
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered size="lg">
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
      <Tablenav
        TotalCount={{ Total: <h5>Total Count : {TotalCountNumber || "0"}</h5> }}
        Actions={{
          Actions: (
            <input
              type="text"
              className="form-control"
              value={searchInput}
              placeholder="Search..."
              onChange={handleSearchChange}
            />
          ),
        }}
      />
      {isApiHitComplete ? (
        isDataFound ? (
          <TrashTable clgList={clgList} dataId={dataId} handleRestore={handleRestore} />
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <div style={{ fontWeight: "500" }}>
              <span style={{ color: "#0d6efd", cursor: "pointer" }}>No Records</span>
            </div>
          </div>
        )
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Spinner animation="border" role="status" variant="info">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </Modal.Body>
  </Modal>
);

export default TrashModal;
