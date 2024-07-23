import React from 'react';
import { KeyPressForAlphabets, KeyPressForNumeric } from './formValidation';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const TalktoExpertModal = ({ show, handleClose, handleInputChange, handleSubmit, formData }) => {
  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton >
        <Modal.Title className="w-100 text-center">Enquire Now</Modal.Title>

      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={handleSubmit} >
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control value={formData.name} name="name" autoComplete='off' onChange={handleInputChange} onKeyDown={KeyPressForAlphabets} type="text" placeholder="Enter your name" required />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control value={formData.email} name="email" autoComplete='off' onChange={handleInputChange} type="email" placeholder="Enter your email" required />
          </Form.Group>

          <Form.Group controlId="formMobile" className="mb-3">
            <Form.Label >Mobile Number</Form.Label>
            <Form.Control value={formData.mobile} name="mobile" onChange={handleInputChange} onKeyDown={KeyPressForNumeric} maxLength={10} minLength={10} autoComplete='off' type="tel" placeholder="Enter your mobile number" required />
          </Form.Group>

          <Row>
            <Col className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TalktoExpertModal;