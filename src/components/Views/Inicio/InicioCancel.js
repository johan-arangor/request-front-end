import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../../Layouts/Loader/Loader";
import Axios from "axios";
import Swal from "sweetalert2";
import { Card, Container } from "react-bootstrap";
import { url } from "../../../global";
import InicioTable from "./InicioTable";
import ContratadosModal from "../Request/ContratadosModal";
import ObservacionesModal from "./ObservacionesModal";

export default function Inicio() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalShowContratados, setModalShowContratados] = useState(false);
  const [contratadosList, setContratadosList] = useState([]);
  const [showObservaciones,setShowObservaciones] =useState(false)
  const [observaciones,setObservaciones] = useState([])
  const tokenRol = localStorage.getItem("rol") !== null || undefined ? localStorage.getItem("rol") : "";

  useEffect(() => {
    setLoading(true);
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      window.location.href = "/";
    }

    getRequest();

    setLoading(false);
  }, [url]);

  const getRequest = async () => {
    try {
      await Axios.get(url + "/inicio/getRequestCancel", {
        headers: { "access-token": localStorage.getItem("token") },
      })
        .then((res) => {
          if (res.status === 403) {
            Swal.fire({
              title: "Ocurrió un error",
              text: "No tienes permisos para acceder a esta página",
              icon: "error",
              showConfirmButton: false,
              timer: 2500
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

  const viewRequest = (request) => {
    window.location.href = "/request/details/" + request._id;
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

  return (
    <Container fluid>
      <Card>
        <Card.Header>
          <h1 className="text-center">Lista de Solicitudes Canceladas</h1>
        </Card.Header>
        <Card.Body>
          {data && (
            <InicioTable
              data={data}
              handleShow={handleShowContratados}
              handleShowObservaciones={handleShowObservaciones}
              viewRequest={viewRequest}
              tokenRol={tokenRol}
              event={'cancel'}
            />
          )}
        </Card.Body>
      </Card>
      <ContratadosModal
        inputList={contratadosList}
        showContratado={modalShowContratados}
        handleClose={handleCloseContratados}
      />
      <ObservacionesModal 
        show={showObservaciones} 
        handleClose={handleCloseObservaciones} 
        inputList={observaciones}
      />
      {loading && <Loader />}
    </Container>
  );
}
