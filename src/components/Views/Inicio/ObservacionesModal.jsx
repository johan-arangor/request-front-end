import { Modal } from "react-bootstrap";
import React from "react";
import moment from "moment";

export default function ObservacionesModal({
  show,
  handleClose,
  inputList,
  tokenRol
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Observaciones {inputList.length}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {inputList.length > 0 ? (
        inputList.map((input) => (
          <>
            <div>Fecha: {moment(input.Fecha).format("DD/MM/YYYY")}</div>
            {tokenRol === "true" && (
              <div>Usuario: {input.Usuario}</div>
            )}
            <div>Observacion: {input.Observacion}</div>
            <br />
          </>
        ))) : (
          <p>No hay observaciones</p>
        )}
      </Modal.Body>
    </Modal>
  );
}
