import React, { useEffect } from "react";
import {Container, Table} from 'react-bootstrap'
import TableMesesRow from "./TableMesesRow";

export default function TableMeses({data}) {

  return(
    <div>
      <Container fluid>
        <Table striped bordered size="sm" style={{ flexFlow: "column", width: "100%"}}>
            <thead variant="dark" style={{position: "sticky", top: "0", background: "rgba(217,213,213)"}}>
                <tr>
                    <th>Mes</th>
                    <th>Recibidos</th>
                    <th>Cancelados</th>
                    <th>% Cancelación</th>
                    <th>Total</th>
                    <th>Vinculados</th>
                    <th>Vinculados en tiempo Respuesta</th>
                    <th>Abiertos</th>
                    <th>% Ejecución tiempo de Respuesta</th>
                    <th>% Ejecución Total</th>
                </tr>
            </thead>
            <tbody striped>
              {data.length === 0 ? (
                <tr><td colSpan="10">Sin Datos para mostrar</td></tr>
              ):(
                data.map(el =>
                  <TableMesesRow
                    key={el._id}
                    el={el}
                  />
                )
              )}
            </tbody>
        </Table>
      </Container>
    </div>
  );
}