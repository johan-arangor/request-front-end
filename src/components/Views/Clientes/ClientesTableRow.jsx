import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap'
import {BsFillDiagram3Fill, BsTrashFill, BsPenFill, BsPower} from "react-icons/bs";

export default function ClientesTableRow ({el, removeCliente, editCliente, setAns}) {
    return(
        <tr>
            <td>{el.Nombre}</td>
            <td>{el.Status ? 'Activo' : 'Inactivo'}</td>
            <td>
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant="success" onClick={() => setAns(el)}>
                        <BsFillDiagram3Fill />
                    </Button>
                    <Button variant="warning" onClick={() => editCliente(el)}>
                        <BsPenFill />
                    </Button>
                    {el.Status ? (
                        <Button variant="danger" onClick={() => removeCliente(el)}>
                            <BsTrashFill />
                        </Button>
                    ) : (
                        <Button variant="info" onClick={() => removeCliente(el)}>
                            <BsPower />
                        </Button>
                    )}
                </ButtonGroup>
            </td>
        </tr>
    )
}