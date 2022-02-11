import React from "react";
import InicioTableRow from "./InicioTableRow";
import InicioTableRowClose from "./InicioTableRowClose";
import InicioTableRowCancel from "./InicioTableRowCancel";
import {Container, Table} from 'react-bootstrap'

export default function InicioTable({
    data,
    handleShow, 
    handleShowObservaciones,
    viewRequest, 
    editRequest, 
    removeRequest, 
    tokenRol, 
    event
}) {
    return (
        <div>
            <Container fluid>
                <Table striped bordered size="sm" style={{ flexFlow: "column", width: "100%"}}>
                    <thead variant="dark" style={{position: "sticky", top: "0", background: "rgba(217,213,213)"}}>
                        <tr>
                            <th>Cliente</th>
                            <th>Tipo Cargo</th>
                            <th>Cargo</th>
                            <th>Fecha</th>
                            <th>Linea</th>
                            <th>Solicitados</th>
                            <th>Cancelados</th>
                            <th>Cerrados</th>
                            <th>Total Abiertos</th>
                            <th>ANS</th>
                            {event === 'open' && (
                                <th>% ANS</th>
                            )}
                            <th>Fecha Limite</th>
                            {event === 'close' && (
                                <th>Fecha Fin</th>
                            )}
                            <th>Días</th>
                            <th>Municipio</th>
                            <th>Departamento</th>
                            <th>Estado</th>
                            {tokenRol === "true" && (
                                <>
                                    <th>Responsable</th>
                                </>
                            )}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody striped>
                        {data.length === 0 ? (
                            <tr><td colSpan="17">Sin Datos para mostrar</td></tr>
                        ):(
                            event === 'close' ? (
                                data.map(el => 
                                    <InicioTableRowClose 
                                        key={el._id} el={el} 
                                        handleShow={handleShow}
                                        handleShowObservaciones={handleShowObservaciones}
                                        viewRequest = {viewRequest}
                                        tokenRol = {tokenRol}
                                    />
                                )
                            ) : 
                            (
                                event === 'cancel' ? (
                                    data.map(el => 
                                        <InicioTableRowCancel 
                                            key={el._id} el={el} 
                                            handleShow={handleShow}
                                            handleShowObservaciones={handleShowObservaciones}
                                            viewRequest = {viewRequest}
                                            tokenRol = {tokenRol}
                                        />
                                    )
                                ) :
                                (
                                    data.map(el => 
                                        <InicioTableRow 
                                            key={el._id} el={el} 
                                            handleShow={handleShow}
                                            handleShowObservaciones={handleShowObservaciones}
                                            viewRequest = {viewRequest}
                                            editRequest = {editRequest}
                                            removeRequest = {removeRequest}
                                            tokenRol = {tokenRol}
                                        />
                                    )
                                )
                            )
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}