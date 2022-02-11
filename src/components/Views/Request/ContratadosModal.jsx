import { Modal, Row, Col, Form } from "react-bootstrap";
import React from "react";

export default function ContratadosModal({
  showContratado,
  handleClose,
  inputList,
}) {
  return (
    <Modal show={showContratado} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Contratados {inputList.length}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {inputList.length > 0 ? (
        inputList.map((input) => (
          input.tipo !== "backup" ? (
            <>
              <Row>
                <Col>
                    <Form.Label>Cedula: {input.cedula}</Form.Label>
                </Col>
                <Col>
                    <Form.Label>Nombre: {input.nombre}</Form.Label>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <h4>Backups</h4>
              <Row>
                <Col>
                    <Form.Label>Cedula: {input.cedula}</Form.Label>
                </Col>
                <Col>
                    <Form.Label>Nombre: {input.nombre}</Form.Label>
                </Col>
              </Row>
            </>
          )
        ))) : (
          <p>No hay contratados</p>
        )}
      </Modal.Body>
    </Modal>
  );
}
