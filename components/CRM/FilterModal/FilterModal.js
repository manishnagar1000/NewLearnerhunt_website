import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const FilterModal = ({ show, handleClose, searchValue, handleSearchValueChange, handleApplyFilter, handleResetFilter, filterApplied }) => {

    const isSearchValueEmpty = !searchValue.trim();

    return (
        <Modal size="md" show={show} onHide={handleClose}>
             <Modal.Header closeButton>
          <Modal.Title>Advance Search</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <InputGroup>
                    <Form.Control
                        autoFocus
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSearchValueChange}
                    />
                </InputGroup>
                <div className="d-flex justify-content-between mt-3">
                    <Button
                        variant="primary"
                        onClick={handleApplyFilter}
                        disabled={isSearchValueEmpty}
                    >
                        Apply Filter
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleResetFilter}
                        disabled={filterApplied === false}
                    >
                        Reset Filters
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
};

export default FilterModal;
