import moment from "moment";
import React, { useState, useEffect } from "react";
import { Card, Button, CardGroup } from "react-bootstrap";

export default function SeguimientosTableRow({ seguimiento, handleShow }) {
  const [enviados, SetEnviados] = useState("");
  const [asistieron, SetAsistieron] = useState("");
  const [vinculados, SetVinculados] = useState("");
  const [contratados, SetContratados] = useState("");
  const tokenRol = localStorage.getItem("rol") !== null || undefined ? localStorage.getItem("rol") : "";

  useEffect(() => {
    let enviadosTemp = seguimiento.List.find((el) => el.tipo === "enviados");
    SetEnviados(enviadosTemp);

    let asistieronTemp = seguimiento.List.find((el) => el.tipo === "asistieron");
    SetAsistieron(asistieronTemp);

    let vinculadosTemp = seguimiento.List.find((el) => el.tipo === "vinculados");
    SetVinculados(vinculadosTemp);

    let contratadosTemp = seguimiento.List.find((el) => el.tipo === "contratados");
    SetContratados(contratadosTemp);
  }, [seguimiento]);
  
  return (
    <CardGroup>
      {enviados !== undefined && (
        <Card className="text-center" border="primary" style={{ width: '18rem' }}>
          <Card.Header>
            Enviados del { moment(enviados.fecha).format("DD/MM/YYYY")}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Cantidad Enviada: {enviados.cantidad}
            </Card.Title>
            <Card.Text className="text-left">
            </Card.Text>
          </Card.Body>
          {asistieron === undefined && (
            <Button data-type="asistieron" data-id={seguimiento._id} onClick={(e) => {handleShow(e, enviados.cantidad)}}>
              Agregar a Asistieron
            </Button>
          )}
        </Card>
      )}
      {asistieron !== undefined && (
        <Card className="text-center" border="primary" style={{ width: '18rem' }}>
          <Card.Header>
            Pre seleccionados del {moment(asistieron.fecha).format("DD/MM/YYYY")}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Cantidad de pre Seleccionados: {asistieron.cantidad}
            </Card.Title>
            <Card.Text className="text-left">
              Cantidad Asistieron: {asistieron.asistentes}
            <br />
              Cantidad No Asisten: {asistieron.noAsistentes}
            <br />
              Cantidad Rechazados EU: {asistieron.rechazadosEU}
            <br />
              Backup: {asistieron.backup}
            </Card.Text>
          </Card.Body>
          {((vinculados === undefined && asistieron.cantidad) || tokenRol === "true") > 0 && (
            <Button data-type="vinculados" data-id={seguimiento._id} onClick={(e) => {handleShow(e, asistieron.cantidad)}}>
              Agregar a Vinculados
            </Button>
          )}
        </Card>
      )}
      {vinculados !== undefined && (
        <Card className="text-center" border="primary" style={{ width: '18rem' }}>
          <Card.Header>
            Proceso de Vinculación del {moment(vinculados.fecha).format("DD/MM/YYYY")}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Cantidad en proceso de Vinculación: {vinculados.cantidad}
            </Card.Title>
            <Card.Text className="text-left">
              Cantidad Desisten: {vinculados.desistenV}
              <br />
              Cantidad Cancelados EU: {vinculados.canceladosEU}
              <br />
              Cantidad no Adicional: {vinculados.adicional}
              <br />
              Cantidad no Examenes: {vinculados.examenes}
              <br />
              Cantidad no Requisitos: {vinculados.requisitos}
            </Card.Text>
          </Card.Body>
          {((contratados === undefined && vinculados.cantidad > 0) || tokenRol === "true") && (
            <>
              <Button data-type="contratados" data-id={seguimiento._id} onClick={(e) => {handleShow(e, vinculados.cantidad)}}>
                Agregar a Contratados
              </Button>
            </>
          )}
        </Card>
      )}
      {contratados !== undefined && (
        <Card className="text-center" border="primary" style={{ width: '18rem' }}>
          <Card.Header>
            Vinculados del {moment(contratados.fecha).format("DD/MM/YYYY")}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Cantidad Vinculados: {contratados.cantidad}
            </Card.Title>
            <Card.Text className="text-left">
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </CardGroup>
  );
}
