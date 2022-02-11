import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function CampusModalForm({
  handleChange,
  handleSubmit,
  form,
  modalShow,
  modalType
}) {
  const [show, setShow] = useState(modalShow);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{modalType === "edit" ? "Editar" : "Crear Nueva"} Sede</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Nombre Sede</Form.Label>
                <Form.Control
                  className="mb-3 "
                  name="Nombre"
                  type="text"
                  onChange={handleChange}
                  value={form.Nombre}
                  required
                  autoFocus
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                size="lg"
                variant={modalType === "edit" ? "outline-warning btn-block" : "outline-primary btn-block"}
                type="submit"
                block
              >
                {modalType === "edit" ? "Editar" : "Crear"} Sede
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
