import React, { useState } from "react";
import { Modal} from "react-bootstrap";
import Chip from '@mui/material/Chip';
import Swal from "sweetalert2";
import IframeModal from "./IframeModal";
import Loading from "@/components/Comps/Loading";

function BitlinkModal({ isBitLinkModalOpen, handlebitlinkClose, collegebitlink,ListType,leadId,counsellorId,handleGetBitlink }) {

  // console.log(ListType)


  const [isIframeModalOpen, setIsIframeModalOpen] = useState(false);
  const [applyLink, setApplyLink] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [isBitLinkLoading,setIsBitLinkLoading]= useState(false)


  const handleOpeniframe = (clg) => {
    setIsIframeModalOpen(true);
    setCollegeId(clg.college_id);
    setApplyLink(clg.where_to_apply);
  };

  
 const handleSubmitIframe = (e)=>{
  e.preventDefault()
  Swal.fire({
    title: "Are you sure you registered the lead?",
    text:"If yes, You will not be able to re-apply this lead for this college bitlink!",
    showDenyButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      // setIsRemarkLoading(true);
    const fd = new FormData();
    fd.append("leadType",ListType);
    fd.append("leadId", leadId);
    fd.append("cid", counsellorId);
    fd.append("collegeId",collegeId)
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
          setIsIframeModalOpen(false)
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
      <Modal
        show={isBitLinkModalOpen}
        onHide={handlebitlinkClose}
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
                <th style={{ background: "var(--primary)" }}>College Name</th>
                <th style={{ background: "var(--primary)" }}>Application Link</th>
              </tr>
            </thead>
            <tbody>
              {collegebitlink && collegebitlink.map((clg, i) => (
                <tr key={i}>
                  <td>{clg.college_name}</td>
                  <td>
                    <Chip
                      label={clg.registered ? "Application sent" : "Apply Now"}
                      color={clg.registered ? "success" : "primary"}
                      variant={clg.registered ? "filled" : "outlined"}
                      onClick={() => !clg.registered && handleOpeniframe(clg)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
      <IframeModal
        isOpen={isIframeModalOpen}
        handleClose={() => setIsIframeModalOpen(false)}
        applyLink={applyLink}
        collegeID={collegeId}
        handleSubmitIframe={handleSubmitIframe}
      />
   {/* <Loading show={isBitLinkLoading} onHide={() => setIsBitLinkLoading(false)} /> */}
    </>
  );
}

export default BitlinkModal;
