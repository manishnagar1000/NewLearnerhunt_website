// RemarkModal.js
import React, { useState,useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PdfViewerFile from './PdfViewer';
import { IconButton } from '@mui/material';
import Tablenav from "../../Comps/Tablenav";
import Tooltip from "@mui/material/Tooltip";

const BitlinkSend = ({ showbitModal, togglebitModal, clgBroucher ,handleShare}) => {
  const [showpdfModal, setShowpdfModal] = useState(false);
  const [pdf,setPdf]= useState('')
  const [searchInput,setSearchInput] =useState('')
  const [filteredBroucher, setFilteredBroucher] = useState(clgBroucher);


  useEffect(() => {
    // Filter data when searchInput changes
    const filtered = clgBroucher.filter(obj =>
      obj.college_name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredBroucher(filtered);
  }, [searchInput, clgBroucher]);

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

const handleSearchChange = (event) => {
  setSearchInput(event.target.value);
};
const handleTogglebitModal = () => {
  togglebitModal();
  setSearchInput(''); // Clear search input when toggling the modal
};

  return (
    <>
      <Modal show={showbitModal} onHide={handleTogglebitModal} backdrop="static" keyboard={false} scrollable size="xl">
        <Modal.Header closeButton>
          <Modal.Title>College Broucher</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-0'>
            <>
             <Tablenav
              Actions={{
                Actions: (
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      value={searchInput}
                      placeholder="Search..."
                      onChange={handleSearchChange}
                    />
                 
               
                  </div>
                ),
              }}
            />
          {filteredBroucher && filteredBroucher.length > 0 ? (
              <Table hover className="table table-hover custom-table">
                <thead>
                  <tr>
                    <th style={{ background: "var(--primary)" }}>College Name</th>
                    <th colSpan={2} style={{ background: "var(--primary)",textAlign:'center'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBroucher.map((obj, i) => (
                    <tr key={i}>
                      <td style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>{obj.college_name}</td>
                      <td style={{ cursor: 'pointer' }}>
                      <Tooltip title="Send Broucher">
                        <IconButton>
                        <ShareIcon color="secondary" onClick={() => handleShare(obj)} />
                        </IconButton>
                        </Tooltip>
                      </td>
                      <td style={{ cursor: 'pointer' }} >
                      <Tooltip title="Preview Broucher">
                      <IconButton>
                        <VisibilityIcon color="primary" onClick={() => handlePreview(obj.college_broucher_pdf)} />
                        </IconButton>
                        </Tooltip>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "70vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: "500" }}>
                <span style={{ color: "#0d6efd", cursor: "pointer" }}>No Records</span>
              </div>
            </div>
          )}
            </>
       
        </Modal.Body>
      </Modal>

      <PdfViewerFile showpdfModal={showpdfModal} togglepdfModal={togglePdfModal} pdf={pdf}/>
    </>
  );
};

export default BitlinkSend;
