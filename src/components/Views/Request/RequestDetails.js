import React, { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import Axios from "axios";
import { url } from "../../../global";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert2";
import SeguimientoModal from "../Seguimientos/SeguimientoModal";
import SeguimientosTable from "../Seguimientos/SeguimientosTable";
import SeguimientosObservaciones from "../Seguimientos/SeguimientosObservaciones";

const initialForm = {
  cantidad: 0,
  fecha: new Date(),
  canceladosEU: 0,
  desistenC: 0,
  desistenV: 0,
  adicional: 0,
  examenes: 0,
  asistentes: 0,
  noAsistentes: 0,
  seleccionadosEU: 0,
  rechazadosEU: 0,
  observacion: "",
};

export default function RequestDetails() {
  const [details, setDetails] = useState({});
  const [seguimientos, setSeguimientos] = useState([]);
  const [seguimientoType, setSeguimientoType] = useState("enviado");
  const [seguimientoId, setSeguimeintoId] = useState("");
  const [showSeguimientoState, setShowSeguimientoState] = useState(false);
  const [form, setForm] = useState(initialForm);
  const { slug } = useParams();
  const [inputList, setInputList] = useState([]);
  const [ShowObservation, setShowObservation] = useState(false);
  const [observaciones, setObservaciones] = useState([]);
  const [cantidadPrev, setCantidadPrev] = useState(0);
  const [contratados, setContratados] = useState(0);
  const [canceladosEU, setCanceladosEU] = useState(0);
  const tokenRol = localStorage.getItem("rol") !== null || undefined ? localStorage.getItem("rol") : "";


  useEffect(() => {
    if (inputList.length < cantidadPrev) {
      let inputListTemp = [...inputList];
      for (let i = inputList.length; i < cantidadPrev; i++) {
        inputListTemp.push({ key: i, nombre: "", cedula: "" });
      }
      setInputList(inputListTemp);
    }
  }, [cantidadPrev]);

  useEffect(() => {
    async function fetchData() {
      if (
        localStorage.getItem("token") === null ||
        localStorage.getItem("token") === undefined
      ) {
        window.location.href = "/";
        return;
      }
      await Axios.get(url + "/request", {
        headers: { "access-token": localStorage.getItem("token") },
        params: {
          id: slug,
        },
      })
        .then((res) => {
          if (res.status === 403) {
            Swal.fire({
              title: "Ocurrió un error",
              text: "No tienes permisos para acceder a esta página",
              icon: "error",
              showConfirmButton: false,
              timer: 2500,
            }).finally(() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            });
          } else {
            let data = res.data;
            let canceladosTotal = 0;
            if (data.Cancelados != undefined) {
              data.Cancelados.forEach((cancelado) => {
                canceladosTotal += cancelado.cantidad;
              });
              setCanceladosEU(canceladosTotal);
            }

            setDetails({ ...details, ...data });
            getSeguimientos();
            getObservaciones();
          }
        })
        .catch((err) => {
          //error
          return;
        });
    }
    fetchData();
  }, [contratados]);

  const addSeguimiento = async (e) => {
    e.preventDefault();
    setShowSeguimientoState(false);

    let headersForm = {
      headers: { "access-token": localStorage.getItem("token") },
    };

    if (seguimientoType === "enviados") {
      await Axios.post(
        url + `/seguimientos`,
        {
          _idRequest: slug,
          cantidad: form.cantidad,
          fecha: form.fecha,
        },
        headersForm
      )
        .then((res) => {
          let { title, icon, text } = res.data.message;

          Swal.fire({
            title,
            icon,
            text,
            showConfirmButton: false,
            timer: 5000,
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Ocurrió un error",
            icon: "error",
            text: "Digite un valor mayor a 0",
            showConfirmButton: false,
            timer: 5000,
          });
        });
    } else {
      let body = {
        _id: seguimientoId,
        fecha: form.fecha,
        tipo: seguimientoType,
      };
      if (seguimientoType === "asistieron") {
        let {
          asistentes,
          noAsistentes,
          seleccionadosEU,
          rechazadosEU,
          backup
        } = e.target;
        body = {
          ...body,
          cantidad: seleccionadosEU.value,
          asistentes: asistentes.value,
          noAsistentes: noAsistentes.value,
          rechazadosEU: rechazadosEU.value,
          backup: backup.value
        };
      } else if (seguimientoType === "vinculados") {
        let { seleccionadosEU, noAdicional, noExamenes, desistenV, noRequisitos, canceladosEU } =
          e.target;
        body = {
          ...body,
          cantidad: seleccionadosEU.value,
          desistenV: desistenV.value,
          canceladosEU: canceladosEU.value,
          adicional: noAdicional.value,
          examenes: noExamenes.value,
          requisitos: noRequisitos.value
        };
      } else if (seguimientoType === "contratados") {
        let { contratar } = e.target;
        
        body = {
          ...body,
          inputs: inputList.slice(0, contratar.value),
          cantidad: contratar.value,
          _idRequest: slug,
        };
      }
      await Axios.put(url + `/seguimientos`, body, headersForm)
        .then((res) => {
          let { title, icon, text } = res.data.message;

          Swal.fire({
            title,
            icon,
            text,
            showConfirmButton: false,
            timer: 5000,
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Ocurrió un error",
            icon: "error",
            text: "Las cantidades deben ser iguales a la cantidad de candidatos",
            showConfirmButton: false,
            timer: 5000,
          });
        });
    }
    getSeguimientos();
  };

  const getSeguimientos = async () => {
    await Axios.get(url + "/seguimientos", {
      headers: { "access-token": localStorage.getItem("token") },
      params: {
        idRequest: slug,
      },
    })
      .then((res) => {
        setSeguimientos(res.data);
        let contratadosTotal = 0;

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

        setContratados(contratadosTotal);
      })
      .catch((err) => {
        Swal.fire({
          title: "Ocurrió un error",
          icon: "error",
          text: err,
          showConfirmButton: false,
          timer: 5000,
        });
      });
  };

  const getObservaciones = async () => {
    await Axios.get(url + "/observaciones", {
      headers: { "access-token": localStorage.getItem("token") },
      params: {
        idRequest: slug,
      },
    })
      .then((res) => {
        setObservaciones(res.data);
      })
      .catch((err) => {
        Swal.fire({
          title: "Ocurrió un error",
          icon: "error",
          text: err,
          showConfirmButton: false,
          timer: 5000,
        });
      });
      setForm(initialForm);
  };

  const changeInput = (e) => {
    let inputListTemp = [...inputList];
    let inputIndex = inputListTemp.findIndex(
      (input) => parseInt(input.key) === parseInt(e.target.dataset.key)
    );

    if (e.target.name === "nombre") {
      inputListTemp[inputIndex].nombre = e.target.value;
    } else {
      inputListTemp[inputIndex].cedula = e.target.value;
    }
    setInputList(inputListTemp);
  };

  const handleShow = (e, cantidad) => {
    setForm({ ...form, initialForm });

    if (e.target.dataset.id != null) {
      setSeguimeintoId(e.target.dataset.id);
      setCantidadPrev(cantidad);
    }
    
    setSeguimientoType(e.target.dataset.type);
    setShowSeguimientoState(true);
  };

  const handleClose = () => {
    setShowSeguimientoState(false);
    setShowObservation(false);
  };

  const handleChange = (e) => {
    if (e.target.name === "fecha")
      setForm({
        ...form,
        [e.target.name]: moment(e.target.value, "YYYY-MM-DD").toDate(),
      });
    else if (e.target.type === "number") {
      if (e.target.value < 0) {
        setForm({ ...form, [e.target.name]: 0 });
      } else if (e.target.value <= 120) {
        setForm({ ...form, [e.target.name]: e.target.value });
      } else {
        setForm({ ...form, [e.target.name]: 120 });
      }
    } else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleShowObservation = () => {
    setShowObservation(!ShowObservation);
  };

  const addObservaciones = async (e) => {
    e.preventDefault();

    setShowSeguimientoState(false);

    let headersForm = {
      headers: { "access-token": localStorage.getItem("token") },
    };

    let body = {
      _idRequest: slug,
      Observacion: form.observacion,
      Fecha: Date.now(),
    };

    await Axios.post(url + `/observaciones`, body, headersForm)
      .then((res) => {
        let { title, icon, text } = res.data;

        Swal.fire({
          title,
          icon,
          text,
          showConfirmButton: false,
          timer: 5000,
        });
        getObservaciones();
        setShowObservation(false);
      })
      .catch((err) => {
        Swal.fire({
          title: "Ocurrió un error",
          icon: "error",
          text: err,
          showConfirmButton: false,
          timer: 5000,
        });
      });
  };
  
  return (
    <>
      <Container fluid>
        <Card>
          {(details.Estado === "Abierto" || details.Estado === "En Proceso" ) && (
            <Button data-type="enviados" onClick={handleShow}>
              Agregar un Seguimiento
            </Button>
          )}
          <Card.Header>
            <Row>
              <Col md={6} sm={12}>
                <h3>
                  Cargo: {details.Cargo !== undefined ? details.Cargo : ""}
                </h3>
              </Col>
              <Col md={5} sm={12}>
                <h3>
                  Tipo Cargo:{" "}
                  {details._idAns !== undefined ? details._idAns.TipoCargo : ""}
                </h3>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={3} sm={12}>
                Cliente:{" "}
                {details._idCliente !== undefined
                  ? details._idCliente.Nombre
                  : ""}
              </Col>
              <Col md={3} sm={6}>
                Fecha de Solicitud:{" "}
                {details.Fecha !== undefined
                  ? moment(details.Fecha).format("DD/MM/YYYY")
                  : ""}
              </Col>
              <Col md={3} sm={6}>
                ANS: {details._idAns !== undefined ? details._idAns.Dias : ""}
              </Col>
              <Col md={3} sm={6}>
                Fecha Limite:{" "}
                {details.FechaLimite !== undefined
                  ? moment(details.FechaLimite).format("DD/MM/YYYY")
                  : ""}
              </Col>
            </Row>
            <Row>
              <Col md={3} sm={6}>
                Linea: {details.Linea !== undefined ? details.Linea : ""}
              </Col>
              <Col md={3} sm={6}>
                Cantidad Contratada:{" "}
                {contratados !== undefined ? contratados + canceladosEU: 0 + canceladosEU} de{" "}
                {details.Cantidad !== undefined ? details.Cantidad : ""}
              </Col>
              <Col md={3} sm={6}>
                Cantidad Pendiente:{" "}
                {contratados !== undefined ? details.Cantidad - (canceladosEU + contratados) : details.Cantidad - canceladosEU}
              </Col>
              <Col md={3} sm={6}>
                cancelados EU: {canceladosEU}
              </Col>
            </Row>
            <Row>
              <Col md={6} sm={12}>
                Departamento:{" "}
                {details._idMunicipio !== undefined
                  ? details._idMunicipio[0]._idDepartamento[0].Nombre
                  : ""}
              </Col>
              <Col md={6} sm={12}>
                Municipio:{" "}
                {details._idMunicipio !== undefined
                  ? details._idMunicipio[0].Nombre
                  : ""}
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <SeguimientosTable
              handleShow={handleShow}
              seguimientos={seguimientos}
            />
            {(details.Estado === "Abierto" || details.Estado === "En Proceso" || tokenRol === "true") && (
              <div>
                <Button
                  variant="outline-primary"
                  onClick={handleShowObservation}
                  className="btn-block"
                >
                  Agregar Observaciones
                </Button>
              </div>
            )}
            <SeguimientosObservaciones
              ShowObservation={ShowObservation}
              addObservaciones={addObservaciones}
              seguimientos={seguimientos}
              form={form}
              handleClose={handleClose}
              handleChange={handleChange}
              observaciones={observaciones}
              tokenRol={tokenRol}
            />
          </Card.Footer>
        </Card>
        <SeguimientoModal
          addSeguimiento={addSeguimiento}
          form={form}
          handleChange={handleChange}
          handleClose={handleClose}
          changeInput={changeInput}
          seguimientoType={seguimientoType}
          inputList={inputList}
          seguimientoModal={showSeguimientoState}
          cantidadPrev={cantidadPrev}
        />
      </Container>
    </>
  );
}
