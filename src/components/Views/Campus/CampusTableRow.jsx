import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap'
import { BsTrashFill, BsPenFill, BsPower} from "react-icons/bs";

export default function ClientesTableRow ({el, removeCampus, editCampus}) {
    return(
        <tr>
            <td>{el.Name}</td>
            <td>{el.Status ? 'Activo' : 'Inactivo'}</td>
            <td>
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant="warning" onClick={() => editCampus(el)}>
                        <BsPenFill />
                    </Button>
                    {el.Status ? (
                        <Button variant="danger" onClick={() => removeCampus(el)}>
                            <BsTrashFill />
                        </Button>
                    ) : (
                        <Button variant="info" onClick={() => removeCampus(el)}>
                            <BsPower />
                        </Button>
                    )}

                </ButtonGroup>
            </td>
        </tr>
    )
}