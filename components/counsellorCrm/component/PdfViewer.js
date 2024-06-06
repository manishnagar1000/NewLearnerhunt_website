// PdfViewerFile.js
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
// import { Document } from "react-pdf/dist/esm/entry.webpack";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const PdfViewerFile = ({ showpdfModal, togglepdfModal ,pdf }) => {
    console.log(pdf)
  return (
    <Modal show={showpdfModal} onHide={togglepdfModal} backdrop="static" keyboard={false} scrollable fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>College Broucher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <iframe
            src={`https://learnerhunt-assets.s3.amazonaws.com/${pdf}`}
            title="Where to Apply"
            width="100%"
            height="600px"
            style={{ border: 'none' }}
          ></iframe>
        {/* <div>
        <Document
            file="https://learnerhunt-assets.s3.us-east-1.amazonaws.com/03bf739d-6d2d-4558-8b9d-d6ee54bcd5ed.pdf"
        >
        </Document>
        </div> */}
      </Modal.Body>
    </Modal>
  );
};

export default PdfViewerFile;
