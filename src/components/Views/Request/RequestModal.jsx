import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import Axios from "axios";
import Swal from "sweetalert2";
import { url } from "../../../global";

export default function CreateRequest({ 
  departamentos, 
  municipios,
  clientes, 
  handleChange, 
  handleSubmit, 
  tiposCargos,
  form, 
  requestEdit,
  modalShow,
  handleClose,
  tokenRol
}) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if(requestEdit){
      getAnalistas();
    }
  }, []);

  const getAnalistas = async () => {
    try {
      await Axios.get(url + "/users", {
        headers: { "access-token": localStorage.getItem("token") },
      })
        .then((res) => {
          setUsuarios(res.data);
        })
        .catch((err) => {
          console.log("sin usuarios: ", err);
        });
    } catch (err) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: err,
      });
    }
  };

  return (
    <Modal show={modalShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{requestEdit ? "Editar" : "Crear Nueva"} Solicitud</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        {(tokenRol === "true" && requestEdit) && (
          <>
        <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Analista</Form.Label>
                <Form.Control
                  className="mb-3 "
                  name="responsable"
                  as="select"
                  onChange={handleChange}
                  value={form.responsable}
                  required
                  autoFocus
                >
                  <option value="">Seleccione un analista</option>
                  {usuarios.length > 0
                    ? usuarios.map((responsable) => (
                        <option key={responsable._id} value={responsable._id}>
                          {responsable.Names + " " + responsable.LastNames}
                        </option>
                      ))
                    : ""}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  className="mb-3 "
                  name="fecha"
                  type="date"
                  onChange={handleChange}
                  value={form.fecha}
                  required
                >
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Fecha Indicador</Form.Label>
                <Form.Control
                  className="mb-3 "
                  name="fechaIndicador"
                  type="date"
                  onChange={handleChange}
                  value={form.fechaIndicador}
                  required
                >
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>            
          </>
        )}        
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Cliente</Form.Label>
                <Form.Control
                  className="mb-3 "
                  name="cliente"
                  as="select"
                  onChange={handleChange}
                  value={form.cliente}
                  required
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.length > 0
                    ? clientes.map((cliente) => (
                        <option key={cliente._id} value={cliente._id}>
                          {cliente.Nombre}
                        </option>
                      ))
                    : ""}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Tipo de Cargo</Form.Label>
                <Form.Control
                  className="mb-3"
                  name="ansId"
                  as="select"
                  onChange={handleChange}
                  value={form.ansId}
                  required
                >
                  <option value="">Seleccione un tipo cargo</option>
                  {tiposCargos.map((tipoCargo) => (
                    <option key={tipoCargo._id} value={tipoCargo._id}>
                      {tipoCargo.TipoCargo}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  name="cargo"
                  onChange={handleChange}
                  value={form.cargo}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Linea</Form.Label>
                <Form.Control
                  className="mb-3"
                  as="select"
                  name="linea"
                  onChange={handleChange}
                  value={form.linea}
                  required
                >
                  <option value="">Linea</option>
                  <option value="Temporal">Temporal</option>
                  <option value="BPO">BPO</option>
                </Form.Control>
              </Form.Group>
            </Col>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="number"
                    name="cantidad"
                    maxLength="3"
                    min="1"
                    onChange={handleChange}
                    value={form.cantidad}
                    required
                    disabled={(tokenRol === "false" && !requestEdit) ? false : 
                      (tokenRol === "false" && requestEdit) ? true : 
                      (tokenRol === "true" && requestEdit) ? false : 
                      (tokenRol === "true" && !requestEdit) ? false : true}
                  />
                </Form.Group>
              </Col>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>ANS</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="number"
                  name="ans"
                  onChange={handleChange}
                  value={form.ans}
                  disabled={true}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Departamento</Form.Label>
                <Form.Control
                  className="mb-3"
                  as="select"
                  name="departamento"
                  onChange={handleChange}
                  value={form.departamento}
                  required
                >
                  <option value="">Seleccione un Departamento</option>
                  {departamentos.map((departamento) => (
                    <option key={departamento._id} value={departamento._id}>
                      {departamento.Nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Municipio</Form.Label>
                <Form.Control
                  className="mb-3"
                  as="select"
                  name="municipio"
                  onChange={handleChange}
                  value={form.municipio}
                  required
                >
                  <option value="">Seleccione un Municipio</option>
                  {municipios != undefined ? (municipios.map((municipio) => (
                    <option key={municipio._id} value={municipio._id}>
                      {municipio.Nombre}
                    </option>
                  ))) : ""}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                size="lg"
                variant={requestEdit ? "outline-warning btn-block" : "outline-primary btn-block"}
                type="submit"
                block
              >
                {requestEdit ? "Editar Solicitud" : "Crear Solicitud"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
