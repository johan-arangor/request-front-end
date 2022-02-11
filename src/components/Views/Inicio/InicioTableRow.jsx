import React, {useState, useEffect} from "react";
import moment, { isMoment } from "moment";
import { Button, ButtonGroup } from "react-bootstrap";
import { BsInboxesFill, BsTrashFill, BsPenFill, BsPersonBoundingBox, BsBookmarksFill } from "react-icons/bs";
import Axios from "axios";
import Swal from "sweetalert2";
import { url } from "../../../global";

export default function RequestsTableRow({
  el,
  removeRequest,
  handleShow,
  handleShowObservaciones,
  editRequest,
  viewRequest,
  tokenRol,
}) {
  const [contratados, setContratados] = useState(0);
  const [cancelados, setCancelados] = useState(0);
  const [difeDias, setDifeDias] = useState(0);
  const [rangoDias, setRangoDias] = useState(0);
  const [modANS, setModANS] = useState();

  useEffect(() => {
    getHistory();

    let canceladosTemp = 0;

    if (el.Cancelados != undefined) {
      el.Cancelados.forEach((cancelados) => {
        canceladosTemp += cancelados.cantidad;
      });
    }
    setCancelados(canceladosTemp);


    if (el.PrimerSeguimiento != undefined) {
      let cumplimiento = moment.utc(el.PrimerSeguimiento, 'YYYY-MM-DD').diff(moment.utc(el.FechaLimite, 'YYYY-MM-DD').format('L'), 'days');

      (cumplimiento < 0) ?
        setModANS(100)
      : 
        setModANS(0)

    }
  }, []);

  function colorTd () {
    let colorR;

    if (difeDias >= 0 && difeDias <= rangoDias){
      colorR = "text-center text-light bg-warning"
    } else if (difeDias >= rangoDias && difeDias <= rangoDias * 2) {
      colorR = "text-center text-light bg-success"
    } else if (difeDias < 0) {
      colorR = "text-center text-light bg-danger"
    } else if (el.Estado === "cancelado") {
      colorR = "text-center text-light bg-primary"
    }

    return colorR;
  }

  function colorANS() {
    let colorR;

    if (modANS === 0) {
      colorR = "text-center text-light bg-danger"
    } else if (modANS === 100) {
      colorR = "text-center text-light bg-success"
    }

    return colorR;
  }

  const getHistory = async () => {
    try {
        await Axios.get(url + "/seguimientos", {
          headers: { "access-token": localStorage.getItem("token") },
          params: {
            idRequest: el._id,
          },
        })
        .then((res) => {
          let contratadosTotal = 0;
          let difDiasTemp = 0;
  
          res.data.forEach((seguimiento) => {
            let contratados = seguimiento.List.find(
              (el) => el.tipo === "contratados"
            );
            let contratadosTemp = 0;
  
            if (contratados != null) {
              contratadosTemp = contratados.inputList.length;
            }
            contratadosTotal += contratadosTemp;
          });
          if (el.Estado === "Finalizado"){
            difDiasTemp = moment.utc(el.FechaLimite).diff(moment.utc(el.FechaFinalizado), 'days');
          } else if (el.Estado === "Cancelado") {
            difDiasTemp = 0
          } else {
            difDiasTemp = moment.utc(el.FechaLimite).diff(moment.utc(), 'days');
          }

          setRangoDias(el._idAns.Dias / 2);
          setContratados(contratadosTotal);
          setDifeDias(difDiasTemp);
        }).catch((err) => {
          Swal.fire({
            title: "Ocurrió un error",
            icon: "error",
            text: err,
            showConfirmButton: false,
            timer: 5000,
          });
        })
    } catch (err) {
      Swal.fire({
        title: "Ocurrió un error",
        icon: "error",
        text: err,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  }

  return (
    <tr>
      <td>{el._idCliente.Nombre}</td>
      <td>{el._idAns.TipoCargo}</td>
      <td>{el.Cargo}</td>
      <td>{moment.utc(el.Fecha, 'YYYY-MM-DD').format("DD/MM/YYYY")}</td>
      <td>{el.Linea}</td>
      <td className="text-center">{el.Cantidad > 0 ? el.Cantidad : 0}</td>
      <td className="text-center">{cancelados}</td>
      <td className="text-center">{contratados > 0 ? contratados : 0}</td>
      <td className="text-center">{contratados || cancelados > 0 ? el.Cantidad - (contratados + cancelados) : 0}</td>
      <td className="text-center">{el._idAns.Dias}</td>
      <td className={colorANS()}>{modANS != undefined ? modANS + "%": ""}</td>
      <td>
        {moment.utc(el.FechaLimite, 'YYYY-MM-DD').format("DD/MM/YYYY")}
      </td>
      <td className={colorTd()}>{difeDias}</td>
      <td>{el._idMunicipio[0].Nombre}</td>
      <td>{el._idMunicipio[0]._idDepartamento[0].Nombre}</td>
      <td>{el.Estado}</td>
      {tokenRol === "true" && (
        <>
          <td>
            {el._idUsuario[0].Names} {el._idUsuario[0].LastNames}
          </td>
        </>
      )}
      <td>
        <Button variant="success" onClick={() => viewRequest(el)}>
          <BsInboxesFill />
        </Button>
        <Button variant="primary" onClick={() => handleShow(el)}>
          <BsPersonBoundingBox />
        </Button>
        <Button variant="info" onClick={() => handleShowObservaciones(el)}>
          <BsBookmarksFill />
        </Button>
            {tokenRol === "true" && (
              <Button variant="warning" onClick={() => editRequest(el)}>
                <BsPenFill />
              </Button>
            )}
            <Button variant="danger" onClick={() => removeRequest(el)}>
              <BsTrashFill />
            </Button>
      </td>
    </tr>
  );
}
