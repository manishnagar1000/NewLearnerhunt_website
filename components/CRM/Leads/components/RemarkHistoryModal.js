import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Stepper from "@mui/material/Stepper";
import BitlinkModal from "./BitLinkModal";
import Loading from "@/components/Comps/Loading";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import FormatTimestamp from "../../../Comps/FormatTimestamp";
import Spinner from 'react-bootstrap/Spinner';
function RemarkHistoryModal({ isOpen, handleClose, ListType, remarksHistory, pipeline, getMaxCount, steps, leadId, counsellorId,isremarkedLoading }) {



  const [isBitLinkModalOpen, setIsBitLinkModalOpen] = useState(false)
  const [collegebitlink, setCollegebitlink] = useState([])
  const [isremarkLoading, setIsRemarkLoading] = useState(false)


  const handleGetBitlink = (e) => {
    e.preventDefault();
    try {
      setIsRemarkLoading(true)
      fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/admin/collegebitlinks?lt=${ListType}&lid=${leadId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (res) => {
        if (res.ok) {
          let response = await res.json();
          setCollegebitlink(response.data);
        } else {
          let response = await res.json();
        }
      setIsRemarkLoading(false)
    setIsBitLinkModalOpen(true)


      });
    } catch (error) {
      console.error(error);
    }
  };


  const renderStepper = () => {
    if (remarksHistory.length === 0) {
      return (
        <Stepper alternativeLabel activeStep={-1}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      );
    }

    return (
      <Stepper alternativeLabel activeStep={pipeline ? getMaxCount(pipeline) : -1}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              {index === 1 ? (
                <Button variant="outline-primary" onClick={handleGetBitlink}>
                  {label}
                </Button>
              ) : (
                label
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  };

  const handleStepClick = (index) => {
    // Handle step click action here
    // console.log("Step clicked:", index);
  };

  const handleOpeniframe = (clg) => {
    setIsIframeModalOpen(true)
    setApplyLink("")
    setCollegeId("")
  }


  return (
    <>

      <Modal
        show={isOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Counsellor Remark History</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!isremarkedLoading ? (
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
                          <td style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>{obj.remarks}</td>
                          <td><FormatTimestamp timestamp={obj.createdAt} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <hr />
                {renderStepper()}
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
                {renderStepper()}
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

      <BitlinkModal
        isBitLinkModalOpen={isBitLinkModalOpen}
        handlebitlinkClose={() => setIsBitLinkModalOpen(false)}
        collegebitlink={collegebitlink}
        handleOpeniframe={handleOpeniframe}
        ListType={ListType}
        leadId={leadId}
        counsellorId={counsellorId}
        handleGetBitlink={(e) => handleGetBitlink(e)}

      />
      <Loading show={isremarkLoading} onHide={() => setIsRemarkLoading(false)} />

    </>
  );
}

export default RemarkHistoryModal;
