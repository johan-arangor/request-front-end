import React from "react";
import CampusTableRow from "./CampusTableRow";
import { Container, Table } from "react-bootstrap";

export default function CampusTable({ data, editCampus, removeCampus }) {
  return (
    <div>
      <Container fluid>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nombre</th>
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
                <CampusTableRow
                  key={el._id}
                  el={el}
                  editCampus={editCampus}
                  removeCampus={removeCampus}
                />
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
