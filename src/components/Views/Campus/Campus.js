import React, { useEffect, useState } from "react";
import Loader from "../../Layouts/Loader/Loader";
import Axios from "axios";
import Swal from "sweetalert2";
import { Button, Card, Container } from "react-bootstrap";
import { url } from "../../../global";
import CampusTable from "./CampusTable";
import CampusModalForm from "./CampusModalForm";

const initialForm = {
  id: "",
  Nombre: "",
  Status: true,
};

export default function Campus() {
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [reloadInicio, setReloadInicio] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [data, setData] = useState([]);
  const [modalType, setModalType] = useState("create");
  const [modalAnsShow, setModalAnsShow] = useState(false);
  const [ansList, setAnsList] = useState([]);
  const [selectAnsList, setSelectAnsList] = useState([]);
  const [selectAnsId, setSelectAnsId] = useState("");

  useEffect(
    (reloadInicio) => {
      setLoading(true);
      if (
        localStorage.getItem("token") === null ||
        localStorage.getItem("token") === undefined
      ) {
        window.location.href = "/";
        return;
      }

      getCampus();

      if (modalShow) {
        setModalShow(false);
      }

      setModalShow(false);

      if (reloadInicio) {
        setReloadInicio(false);
        getCampus();
      }

      setReloadInicio(false);

      setLoading(false);
    },
    [reloadInicio]
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

	const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (modalType === "edit") {
        putForm();
      } else {
        postForm();
      }
    }
  };

  const validateForm = () => {
    if (form.Nombre === "") {
      return Swal.fire({
        title: "Datos incompletos",
        icon: "error",
        text: "Debe diligenciar todos los campos.",
        showConfirmButton: false,
        timer: 5000,
      });
    } else {
      return true;
    }
  };

  async function putForm(){
    await Axios.put(url + `/campus`, form, {
      headers: { "access-token": localStorage.getItem("token") },
    })
      .then((res) => {
        let { title, icon, text } = res.data;
        Swal.fire({
          title,
          icon,
          text,
          showConfirmButton: false,
          timer: 5000,
        }).finally(() => {
          setForm(initialForm);

          setReloadInicio(true);
        });
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }

	async function postForm() {
    try {
      await Axios.post(url + `/campus`, form, {
        headers: { "access-token": localStorage.getItem("token") },
      })
        .then((res) => {
          let { title, icon, text } = res.data;
          Swal.fire({
            title,
            icon,
            text,
            showConfirmButton: false,
            timer: 5000,
          }).finally(() => {
            setForm(initialForm);

            setReloadInicio(true);
          });
        })
        .catch((err) => {
          console.log("error:", err);
        });
    } catch (err) {
      console.log("error:", err);
    }
  }

	const getCampus = async () => {
    try {
      await Axios.get(url + "/campus", {
        headers: { "access-token": localStorage.getItem("token") },
      })
        .then((res) => {
          if (res.status === 403) {
            Swal.fire(res.data.message, {
              showConfirmButton: false,
              timer: 2500,
            }).finally(() => {
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

	async function changeModalShow() {
    setModalType("create");
    setForm({ ...form, id: "" });
    if (modalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  }

	async function editCampus(id) {
    setModalType("edit");
    setForm({ ...form, id: id._id, Nombre: id.Name });
    if (modalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  }

  const handleAnsModalClose = () => {
    setModalAnsShow(false);
  };

  async function removeCampus(data) {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro de " + (data.Status ? "eliminar" : "activar") + " la sede?",
      text: `${data.Name}`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          Axios.delete(url + "/campus", {
            data: { id: data._id },
            headers: { "access-token": localStorage.getItem("token") },
          })
            .then((res) => {
              let { title, icon, text } = res.data;
              Swal.fire({
                title,
                icon,
                text,
                showConfirmButton: false,
                timer: 5000,
              });
              setReloadInicio(true);
            })
            .catch((error) => {
              console.log("error:", error);
            });
        } catch (error) {
          console.log("error:", error);
        }
      } else if (result.isDenied) {
        return;
      }
    });
  }

  return (
    <Container fluid>
      <Card>
        <Button onClick={changeModalShow}>Agregar Sede</Button>
        <Card.Header>
          <h1 className="text-center">Zona Sedes</h1>
        </Card.Header>
        <Card.Body>
          {data && (
            <CampusTable
              data={data}
              editCampus={editCampus}
              removeCampus={removeCampus}
            />
          )}
          {modalShow && (
            <CampusModalForm
              form={form}
              modalShow={modalShow}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
							modalType={modalType}
            />
          )}
          {loading && <Loader />}
        </Card.Body>
      </Card>
    </Container>
  );
}
