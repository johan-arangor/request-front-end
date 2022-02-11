import React, { useEffect, useState } from "react";
import {Container, Table} from 'react-bootstrap'
import TableMesesClientesRow from "./TableMesesClientesRow";

export default function TableMesesClientes({data}) {
  const meses = [];

  useEffect(() => {
    onlyUnique();
  }, [data]);

  function onlyUnique() {
    if (data.length > 0) {
      data.forEach(el => {
          if (meses.length === 0) {
            meses.push(el.mes);
        } else {
          let existe = meses.find((el2) => el2 === el.mes);
          if (existe === undefined) {
            meses.push(el.mes);
          }
        }
      });
    }
  }

  return(
    <div>
      <Container fluid>
        <Table striped bordered size="sm" style={{ flexFlow: "column", width: "100%"}}>
            <thead variant="dark" style={{position: "sticky", top: "0", background: "rgba(217,213,213)"}}>
                <tr>
                    <th>Mes</th>
                    <th>Cliente</th>
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
                  <TableMesesClientesRow
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