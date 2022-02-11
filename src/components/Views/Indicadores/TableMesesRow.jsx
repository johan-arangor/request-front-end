import React from "react";
import moment from 'moment';
import 'moment/locale/es';


export default function TableMesesRow({el}) {
  return (
    <tr>
        <td>{moment.months(el.mes - 1)}</td>
        <td>{el.solicitud}</td>
        <td>{el.canceladosCant}</td>
        <td>{Math.round((el.canceladosCant/el.solicitud) * 100)}%</td>
        <td>{el.solicitud-el.canceladosCant}</td>
        <td>{el.contratados}</td>
        <td>{el.vinculadosAns}</td>
        <td>{el.solicitud-el.contratados-el.canceladosCant}</td>
        <td>{Math.round(el.vinculadosAns/(el.solicitud-el.canceladosCant) * 100)}%</td>
        <td>{Math.round((el.contratados/(el.solicitud-el.canceladosCant)) * 100)}%</td>
    </tr>
  );
}