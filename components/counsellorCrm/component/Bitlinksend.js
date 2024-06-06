// RemarkModal.js
import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PdfViewerFile from './PdfViewer';
import { IconButton } from '@mui/material';

const BitlinkSend = ({ showbitModal, togglebitModal, clgBroucher ,handleShare}) => {
  const [showpdfModal, setShowpdfModal] = useState(false);
  const [pdf,setPdf]= useState('')

  const togglePdfModal = () => {
    setShowpdfModal(!showpdfModal);
  };

  

  const handlePreview = (pdfUrl) => {
    return new Promise((resolve, reject) => {
        setPdf(pdfUrl);
        resolve(); // Resolve the Promise once the PDF is set and the modal is toggled
        togglePdfModal();
    });
};

  return (
    <>
      <Modal show={showbitModal} onHide={togglebitModal} backdrop="static" keyboard={false} scrollable size="xl">
        <Modal.Header closeButton>
          <Modal.Title>College Bit Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clgBroucher.length > 0 ? (
            <>
              <Table hover className="table table-hover">
                <thead>
                  <tr>
                    <th style={{ background: "var(--primary)" }}>College Name</th>
                    <th colSpan={2} style={{ background: "var(--primary)",textAlign:'center'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clgBroucher.map((obj, i) => (
                    <tr key={i}>
                      <td style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>{obj.college_name}</td>
                      <td style={{ cursor: 'pointer' }}>
                        <IconButton>
                        <ShareIcon color="secondary" onClick={() => handleShare(obj)} />
                        </IconButton>
                      </td>
                      <td style={{ cursor: 'pointer' }} >
                      <IconButton>
                        <VisibilityIcon color="primary" onClick={() => handlePreview(obj.college_broucher_pdf)} />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
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
          )}
        </Modal.Body>
      </Modal>

      <PdfViewerFile showpdfModal={showpdfModal} togglepdfModal={togglePdfModal} pdf={pdf}/>
    </>
  );
};

export default BitlinkSend;
