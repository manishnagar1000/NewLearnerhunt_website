import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ isLoading }) => (
  isLoading ? (
    <div className="spinner-overlay">
      <Spinner animation="border" role="status" variant="info">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : null
);

export default LoadingSpinner;
