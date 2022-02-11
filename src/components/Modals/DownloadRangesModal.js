import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { url } from "../../global";
import moment from "moment";


export default function AreasMenu({
  modalShow,
  changeModalShow,
}) {
  const [beginDate, setBeginDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState();
  const download = async () => {
    await Axios({
      url: url + "/download",
      method: "post",
      headers: { "access-token": localStorage.getItem("token") },
      responseType: "blob",
      data: { beginDate, finishDate }
    }).then((response) => {
      var headers = response.headers;
      var blob = new Blob([response.data], { type: headers["content-type"] });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Datos";
      link.click();

      modalShow = false;
    });
  };

  return (
    <div>
      <Modal show={modalShow} onHide={changeModalShow}>
        <Modal.Header>
          <Modal.Title>Descargua de Datos </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Desde:</Form.Label>
                <Form.Control
                  type="date"
                  selected={beginDate}
                  onChange={(e) => setBeginDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Hasta:</Form.Label>
                <Form.Control
                  type="date"
                  selected={finishDate}
                  onChange={(e) => setFinishDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={download}>
            Descargar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
