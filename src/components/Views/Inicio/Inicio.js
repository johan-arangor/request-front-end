import React, { useState, useEffect } from "react";
import Loader from "../../Layouts/Loader/Loader";
import Axios from "axios";
import Swal from "sweetalert2";
import Request from "../Request/Request";
import { Button, Card, Container } from "react-bootstrap";
import { url } from "../../../global";
import InicioTable from "./InicioTable";
import ContratadosModal from "../Request/ContratadosModal";
import DeleteModal from "../Request/DeleteModal";
import ObservacionesModal from "./ObservacionesModal";
import moment from "moment";

const initialFormEdit = {
  id: "",
  Cliente: "",
  ansId: "",
  Cargo: "",
  Linea: "",
  Cantidad: "",
  ANS: "",
  Departamento: "",
  Municipio: "",
  Responsable: "",
  idResponsable: "",
  Fecha: "",
  FechaIndicador: ""
};

const initialDeleteForm = {
  motivoCancelacion: "",
  canceladosEU: 0,
  observacion: "",
};

export default function Inicio() {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowContratados, setModalShowContratados] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [contratadosList, setContratadosList] = useState([]);
  const [reloadInicio, setReloadInicio] = useState(false);
  const [data, setData] = useState([]);
  const [cargoDelete, setCargoDelete] = useState("");
  const [cantidadMax, setCantidadMax] = useState(0);
  const [departamentos, setDepartamentos] = useState([]);
  const [deleteRequestId, setDeleteRequestId] = useState("");
  const [clientes, setClientes] = useState([]);
  const [formDelete, setFormDelete] = useState(initialDeleteForm);
  const [showObservaciones,setShowObservaciones] =useState(false)
  const [observaciones,setObservaciones] = useState([])
  const tokenRol =
    localStorage.getItem("rol") !== null || undefined
      ? localStorage.getItem("rol")
      : "";
  const [requestEdit, setRequestEdit] = useState(false);
  const [requestData, setRequestData] = useState(initialFormEdit);

  useEffect(() => {
    setLoading(true);
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      window.location.href = "/";
    }

    getRequest();
    getDepartamentos();
    getClientes();

    if (modalShow) {
      setModalShow(false);
    }

    if (requestEdit) {
      setRequestEdit(false);
    }

    setModalShow(false);

    if (reloadInicio) {
      setReloadInicio(false);
      getRequest();
    }

    setReloadInicio(false);

    setLoading(false);
  }, [url]);
  
  const changeModalShow = () => {
    if (modalShow) {
      setModalShow(false);
      setRequestEdit(false);
    } else {
      setModalShow(true);
    }
  };

  const handleClose = () => {
    setModalShow(false);
    setRequestEdit(false);
  };

  const handleCloseObservaciones = () => {
    setShowObservaciones(false);
  }

  const handleShowObservaciones = async (el) => {
    await Axios.get(url + "/observaciones", {
      headers: { "access-token": localStorage.getItem("token") },
      params: {
        idRequest: el._id,
      },
    })
      .then((res) => {
        if (res.data.length > 0) {
          setObservaciones(res.data[0].List);
        }
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
    setShowObservaciones(true);
  }

  const changeReloadInicio = () => {
    setModalShow(false);
    getRequest();
  };
  
  const changeDeleteForm = (e) => {
    setFormDelete({ ...formDelete, [e.target.name]: e.target.value });
  };

  const getRequest = async () => {
    try {
      await Axios.get(url + "/inicio/getRequest", {
        headers: { "access-token": localStorage.getItem("token") },
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
            setData(res.data);
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Ocurrió un error",
            text: error,
            icon: "error",
            showConfirmButton: false,
            timer: 2500,
          }).finally(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
          });
        });
    } catch (err) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: err,
      }).finally(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      });
    }
  };

  const getDepartamentos = async () => {
    try {
      await Axios.get(url + "/departamentos/getDepartamentos", {
        headers: { "access-token": localStorage.getItem("token") },
      })
        .then((res) => {
          setDepartamentos(res.data);
        })
        .catch((err) => {
          console.log("sin departamentos: ", err);
        });
    } catch (err) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: err,
      });
    }
  };

  const getClientes = async () => {
    try {
      await Axios.get(url + "/clientes", {
        headers: { "access-token": localStorage.getItem("token") },
      })
        .then((res) => {
          setClientes(res.data);
        })
        .catch((err) => {
          console.log("sin clientes: ", err);
        });
    } catch (err) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: err,
      });
    }
  };

  const handleShowContratados = async (el) => {
    await Axios.get(url + "/request/contratados", {
      headers: { "access-token": localStorage.getItem("token") },
      params: {
        id: el._id,
      },
    })
      .then((res) => {
        setContratadosList([...res.data]);
      })
      .catch((err) => {
        Swal.fire({
          title: "Ocurrió un error",
          text: "Error",
          icon: "error",
          showConfirmButton: false,
          timer: 2500,
        });
      });
    setModalShowContratados(true);
  };

  const handleCloseContratados = () => {
    setModalShowContratados(false);
  };

  const handleCloseDelete = () => {
    setModalShowDelete(false);
  };

  const viewRequest = (request) => {
    window.location.href = "/request/details/" + request._id;
  };

  const changeRequestEdit =(request) => {
    setRequestEdit(!requestEdit);

    setRequestData({
      ...requestData,
      id: request._id,
      Cliente: request._idCliente._id,
      ansId: request._idAns._id,
      Cargo: request.Cargo,
      Linea: request.Linea,
      Cantidad: request.Cantidad,
      ANS: request._idAns.Dias,
      Departamento: request._idMunicipio[0]._idDepartamento[0]._id,
      Municipio: request._idMunicipio[0]._id,
      Responsable: request._idUsuario[0]._id,
      Estado: request.Estado,
      Fecha: moment.utc(request.Fecha, 'YYYY-MM-DD').format('yyyy-MM-DD'),
      FechaIndicador: moment.utc(request.FechaIndicador, 'YYYY-MM-DD').format('yyyy-MM-DD'),
    });
  }

  const editRequest = (request) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro de editar la solicitud?",
      text: `${request.Cargo}`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          changeRequestEdit(request);
          changeModalShow();
        } catch (err) {
          Swal.fire({
            type: "error",
            title: "Error",
            text: err,
          });
        }
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const removeRequest = (request) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro de cancelar la solicitud?",
      text: `${request.Cargo}`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setCargoDelete(request.Cargo);
        let canceladosReq = request.Cancelados.length > 0 ? request.Cancelados.forEach((element) => {
          return element.cantidad;
        })
        : 0
        
        setCantidadMax(request.Cantidad - canceladosReq);

        setModalShowDelete(true);
        setDeleteRequestId(request._id);
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setModalShowDelete(false);

      Axios.put(
        url + `/request/cantidad`,
        {
          id: deleteRequestId,
          motivoCancelacion: formDelete.motivoCancelacion,
          observacion: formDelete.observacion,
          cantidad: formDelete.cancelados,
        },
        {
          headers: { "access-token": localStorage.getItem("token") },
        }
      ).then((resp)=>{
        let {title,icon,text} =resp.data
        Swal.fire({
          title,
          icon,
          text,
          showConfirmButton: false,
          timer: 5000,
        });
        changeReloadInicio();
      }).catch((error)=>{
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "error" + error,
          showConfirmButton: false,
          timer: 5000,
        });
      });
  };

  return (
    <Container fluid>
      <Card>
        <Button onClick={changeModalShow}>Agregar Solicitud</Button>
        <Card.Header>
          <h1 className="text-center">Lista de Solicitudes</h1>
        </Card.Header>
        <Card.Body>
          {data && (
            <InicioTable
              data={data}
              handleShow={handleShowContratados}
              handleShowObservaciones={handleShowObservaciones}
              viewRequest={viewRequest}
              editRequest={editRequest}
              removeRequest={removeRequest}
              tokenRol={tokenRol}
              event={'open'}
            />
          )}
        </Card.Body>
      </Card>
      {modalShow && (
        <Request
          departamentos={departamentos}
          clientes={clientes}
          modalShow={modalShow}
          handleClose={changeModalShow}
          changeReloadInicio={changeReloadInicio}
          requestEdit={requestEdit}
          requestData={requestData}
          tokenRol={tokenRol}
        />
      )}
      <ContratadosModal
        inputList={contratadosList}
        showContratado={modalShowContratados}
        handleClose={handleCloseContratados}
      />
      <ObservacionesModal 
        show={showObservaciones} 
        handleClose={handleCloseObservaciones} 
        inputList={observaciones}
        tokenRol={tokenRol}
      />
      <DeleteModal
        handleSubmitDelete={handleSubmitDelete}
        showDelete={modalShowDelete}
        handleClose={handleCloseDelete}
        cargoDelete={cargoDelete}
        cantidadMax={cantidadMax}
        form={formDelete}
        changeForm={changeDeleteForm}
      />
      {loading && <Loader />}
    </Container>
  );
}
