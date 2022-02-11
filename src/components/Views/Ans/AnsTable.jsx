import React from "react";
import AnsTableRow from "./AnsTableRow";
import { Container, Table } from "react-bootstrap";

export default function AnsTable({ data, editAns, removeAns }) {
  return (
    <div>
      <Container fluid>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Tipo Cargo</th>
              <th>Días</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody striped>
            {data.length === 0 ? (
              <tr>
                <td colSpan="8">Sin Datos para mostrar</td>
              </tr>
            ) : (
              data.map((el) => (
                <AnsTableRow
                  key={el._id}
                  el={el}
                  editAns={editAns}
                  removeAns={removeAns}
                />
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}