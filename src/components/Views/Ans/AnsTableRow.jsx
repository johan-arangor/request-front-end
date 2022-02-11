import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap'
import {BsInboxesFill, BsTrashFill, BsPenFill, BsPower} from "react-icons/bs";

export default function AnsTableRow ({el, removeAns, editAns}) {
    return(
        <tr>
            <td>{el.TipoCargo}</td>
            <td>{el.Dias}</td>
            <td>{el.Estado ? 'Activo' : 'Inactivo'}</td>
            <td>
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant="warning" onClick={() => editAns(el)}>
                        <BsPenFill />
                    </Button>
                    {el.Estado ? (
                        <Button variant="danger" onClick={() => removeAns(el)}>
                            <BsTrashFill />
                        </Button>
                    ) : (
                        <Button variant="info" onClick={() => removeAns(el)}>
                            <BsPower />
                        </Button>
                    )}
                </ButtonGroup>
            </td>
        </tr>
    )
}