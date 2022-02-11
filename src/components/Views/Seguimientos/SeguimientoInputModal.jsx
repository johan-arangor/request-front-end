import React, {useEffect} from "react";
import { Form, Col } from "react-bootstrap";

export default function ContratacionesModal({ input, changeInput }) {
  useEffect(() => {
    input.cedula = "";
    input.nombre = "";
  }, []);


  return (
    <>
      <Col>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="text"
            name="nombre"
            placeholder="nombre"
            data-key={input.key}
            onChange={changeInput}
            value={input.nombre}
            required
            autoComplete="off"
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="number"
            name="cedula"
            placeholder="cedula"
            data-key={input.key}
            onChange={changeInput}
            value={input.cedula}
            required
            autoComplete="off"
          />
        </Form.Group>
      </Col>
    </>
  );
}
