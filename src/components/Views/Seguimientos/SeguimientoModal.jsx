import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import SeguimientoInputModal from "./SeguimientoInputModal";
import moment from "moment";
import React, { useState, useEffect } from "react";

export default function SeguimientoModal({
  seguimientoModal,
  handleClose,
  handleChange,
  addSeguimiento,
  seguimientoType,
  inputList,
  changeInput,
  form,
  cantidadPrev
}) {
  let [asistentes, setAsistentes] = useState(0);
  let [noAsistentes, setNoAsistentes] = useState(0);
  let [seleccionados, setSeleccionados] = useState(0);
  let [rechazadosEU, setRechazadosEU] = useState(0);
  let [seleccionadosEU, setSeleccionadosEU] = useState(0);
  let [noAdicional, setNoAdicional] = useState(0);
  let [noExamenes, setNoExamenes] = useState(0);
  let [desistenV, setDesistenV] = useState(0);
  let [contratar, setContratar] = useState(0);
  let [canceladosEU, setCanceladosEU] = useState(0);
  let [desistenC, setDesistenC] = useState(0);
  let [backup, setBackup] = useState(0);
  let [noRequisitos, setNoRequisitos] = useState(0);
  const [title, setTitle] = useState();


  let seleccionadosChange = (e) => {
    if(e.name === "asistentes"){
      setAsistentes(e.value);
      setSeleccionados(e.value);
      setNoAsistentes(cantidadPrev - e.value);
      setRechazadosEU(0);
      setBackup(0);
    }
    if(e.name === "seleccionadosEU"){
      setSeleccionados(e.value);
      setRechazadosEU(0);
    }
    if(e.name === "rechazadosEU"){
      setRechazadosEU(e.value);
      setSeleccionados(asistentes - backup - e.value);  
    }
    if(e.name === "backup"){
      setBackup(e.value);
      setSeleccionados(asistentes - rechazadosEU - e.value);
    }
  }

  let vincularChange = (e) => {
      if(e.name === "noAdicional"){
        if(parseInt(noExamenes) + parseInt(desistenV) + parseInt(noRequisitos) +parseInt(canceladosEU) + parseInt(e.value) <= cantidadPrev){
          setNoAdicional(e.value);
        }
      } else if(e.name === "noExamenes"){
        if(parseInt(noAdicional) + parseInt(desistenV)  + parseInt(noRequisitos) +parseInt(canceladosEU) + parseInt(e.value) <= cantidadPrev){
          setNoExamenes(e.value);
        }
      } else if(e.name === "desistenV"){
        if(parseInt(noExamenes) + parseInt(noAdicional)  + parseInt(noRequisitos) +parseInt(canceladosEU) + parseInt(e.value) <= cantidadPrev){
          setDesistenV(e.value);
        }
      } else if(e.name === "canceladosEU"){
        if(parseInt(noExamenes) + parseInt(noAdicional) + parseInt(desistenV)  + parseInt(noRequisitos) + parseInt(e.value) <= cantidadPrev){
          setCanceladosEU(e.value);
        }
      } else if(e.name === "noRequisitos"){
        if(parseInt(noExamenes) + parseInt(noAdicional) + parseInt(desistenV) + parseInt(canceladosEU) + parseInt(e.value) <= cantidadPrev){
          setNoRequisitos(e.value);
        }
      }     
      if (noAdicional + noExamenes + desistenV + canceladosEU + noRequisitos < cantidadPrev && seleccionadosEU === 0) {
        setSeleccionadosEU(seleccionadosEU + e.value);
      }
  }

  let contratarChange = (e) => {
    if(e.name === "canceladosEU"){
      if(parseInt(desistenC) + parseInt(e.value) <= cantidadPrev){
        setCanceladosEU(e.value);
      }
    } else if(e.name === "desistenC"){
      if(parseInt(canceladosEU) + parseInt(e.value) <= cantidadPrev){
        setDesistenC(e.value);
      }
    } else if(e.name === "contratar"){
      setContratar(e.value);
    }
  }

  useEffect(() => {
    setContratar(cantidadPrev - canceladosEU - desistenC);
  }, [canceladosEU, desistenC]);

  useEffect(() => {
    setSeleccionadosEU(cantidadPrev - noAdicional - noExamenes - desistenV - noRequisitos - canceladosEU);
  }, [noAdicional, noExamenes, desistenV, noRequisitos, canceladosEU]);

  useEffect(() => {
    setAsistentes(cantidadPrev);
    setSeleccionados(cantidadPrev);
    setNoAsistentes(0);
    setSeleccionadosEU(cantidadPrev);
    setNoAdicional(0);
    setNoExamenes(0);
    setDesistenV(0);
    setContratar(cantidadPrev);
    setCanceladosEU(0);
    setDesistenC(0);
    setRechazadosEU(0);
    setBackup(0);
    setNoRequisitos(0);

    if (seguimientoType === "enviados") {
      setTitle("Candidatos enviados");
    } else if (seguimientoType === "asistieron") {
      setTitle("Candidatos asistentes");
    } else if (seguimientoType === "vinculados") {
      setTitle("Candidatos en proceso de vinculación");
    } else if ((seguimientoType === "contratados") || (seguimientoType === "backup")) {
      setTitle("Candidatos en vinculación");
    }

  }, [seguimientoModal]);

  return (
    <Modal show={seguimientoModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{title}: {cantidadPrev}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addSeguimiento}>
          {seguimientoType === "enviados" && (
            <>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cantidad Enviados:</Form.Label>
                    <Form.Control
                      type="number"
                      name="cantidad"
                      min="0"
                      max="200"
                      onChange={handleChange}
                      value={form.cantidad}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha"
                      value={moment(form.fecha).format("YYYY-MM-DD")}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
          {seguimientoType === "asistieron" && (
            <>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cantidad Asistentes:</Form.Label>
                    <Form.Control
                      type="number"
                      name="asistentes"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => seleccionadosChange(e.target)}
                      value={asistentes}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha"
                      value={moment(form.fecha).format("YYYY-MM-DD")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>No Asisten:</Form.Label>
                    <Form.Control
                      type="number"
                      name="noAsistentes"
                      disabled
                      value={noAsistentes}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Seleccionados EU:</Form.Label>
                    <Form.Control
                      type="number"
                      name="seleccionadosEU"
                      disabled
                      min="0"
                      max={cantidadPrev - noAsistentes - backup}
                      onChange={(e) => seleccionadosChange(e.target)}
                      value={seleccionados}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Backup:</Form.Label>
                      <Form.Control
                        type="number"
                        name="backup"
                        min="0"
                        max={cantidadPrev - noAsistentes - rechazadosEU}
                        onChange={(e) => seleccionadosChange(e.target)}
                        value={backup}
                      />
                    </Form.Group>
                  </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Rechazados EU:</Form.Label>
                    <Form.Control
                      type="number"
                      name="rechazadosEU"
                      min="0"
                      max={seleccionados}
                      onChange={(e) => seleccionadosChange(e.target)}
                      value={rechazadosEU}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
          {seguimientoType === "vinculados" && (
            <>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cantidad Seleccionados:</Form.Label>
                    <Form.Control
                      type="number"
                      name="seleccionadosEU"
                      min="0"
                      max={cantidadPrev}
                      disabled
                      value={seleccionadosEU}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha"
                      value={moment(form.fecha).format("YYYY-MM-DD")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Desisten:</Form.Label>
                    <Form.Control
                      type="number"
                      name="desistenV"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => vincularChange(e.target)}
                      value={desistenV}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cancelados EU:</Form.Label>
                    <Form.Control
                      type="number"
                      name="canceladosEU"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => vincularChange(e.target)}
                      value={canceladosEU}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>No x Adicional:</Form.Label>
                    <Form.Control
                      type="number"
                      name="noAdicional"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => vincularChange(e.target)}
                      value={noAdicional}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>No x Examenes:</Form.Label>
                    <Form.Control
                      type="number"
                      name="noExamenes"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => vincularChange(e.target)}
                      value={noExamenes}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>No x Requisitos:</Form.Label>
                    <Form.Control
                      type="number"
                      name="noRequisitos"
                      min="0"
                      max={cantidadPrev}
                      onChange={(e) => vincularChange(e.target)}
                      value={noRequisitos}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
          {(seguimientoType ===  "contratados" || seguimientoType === "backup" ) && (
            <>
              <Row>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cantidad a Contratar:</Form.Label>
                    <Form.Control
                      type="number"
                      name="contratar"
                      min="0"
                      max={cantidadPrev}
                      disabled = {seguimientoType === "Candidatos contratados backup" ? false : true}
                      value={contratar}
                      onChange={(e) => contratarChange(e.target)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha"
                      value={moment(form.fecha).format("YYYY-MM-DD")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              Personas:
              {inputList.slice(0, contratar).map((input) => (
                <Row>
                  <SeguimientoInputModal
                    changeInput={changeInput}
                    input={input}
                  />
                </Row>
              ))}
            </>
          )}
          <Row>
            <Col>
              <Button
                size="lg"
                variant="outline-primary btn-block"
                type="submit"
                block
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
