import { useState, useEffect } from "react";
import axios from "axios";
//import Toast from "react-bootstrap/Toast";
//import ToastContainer from "react-bootstrap/ToastContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

export default function Home() {
  const [id, setId] = useState();
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState("");
  const [listaEmpleados, setListaEmpleados] = useState([]);

  //const [showA, setShowA] = useState(false);
  //const toggleShowA = () => setShowA(!showA);
  //const [mensaje, setMensaje] = useState("");
  const [flagEditar, setFlagEditar] = useState(false);

  const Guardar = () => {
    axios
      .post(
        "/api/v1/empleados",
        {
          nombre,
          edad,
          pais,
          cargo,
          anios,
        },
        { validateStatus: false }
      )
      .then((response) => {
        if (response.status === 201) {
          LimpiarForm();
          CargarEmpleados();
          Swal.fire(
            "Empleado registrado",
            "Se registró exitosamente el empleado",
            "success"
          );
        } else {
          let listaError = "";
          response.data.errors.forEach(element => {
            listaError += "- " + element.msg + " <br>";
          });
          //setMensaje(listaError);
          //setShowA(true);
          Swal.fire({
            icon: "error",
            title: "Error, no se ha podido registrar el empleado",
            text: listaError,
            footer: "Revise la información o intentelo más tarde",
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        //setMensaje(err.message);
        //setShowA(true);
        Swal.fire({
          icon: "error",
          title: "Error, no se ha podido registrar el empleado",
          text: "Error de excepción",
          footer: err.message,
        });
      });
  };

  const Actualizar = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Estas seguro?",
        text: "Se actualizará la información",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, actualizar",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              "/api/v1/empleados/"+id,
              {
                nombre,
                edad,
                pais,
                cargo,
                anios,
              },
              { validateStatus: false }
            )
            .then((response) => {
              if (response.status === 200) {
                LimpiarForm();
                CargarEmpleados();
                //mostrar mensaje
                swalWithBootstrapButtons.fire(
                  "Actualizado",
                  "Información Actualizada",
                  "success"
                );
              } else {
                let listaError = "";
                response.data.errors.forEach(element => {
                  listaError += "- " + element.msg + " ";
                });
                swalWithBootstrapButtons.fire(
                  "Error en actualización",
                  listaError,
                  "error"
                );
                /*Swal.fire({
                  icon: "error",
                  title: "Error, no se ha podido actualizar el empleado",
                  text: listaError,
                  footer: "Revise la información o intentelo más tarde",
                });*/
              }
            })
            .catch((err) => {
              console.log("error", err);
              /*Swal.fire({
                icon: "error",
                title: "Error, no se ha podido registrar el empleado",
                text: listaError,
                footer: err.message,
              });*/
              swalWithBootstrapButtons.fire(
                "Error en actualización",
                err.message,
                "error"
              );
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "Información sin cambios",
            "error"
          );
        }
      });
  };

  const Eliminar = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Estas seguro?",
        text: "Se eliminará la información",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "No, conservar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              "/api/v1/empleados/"+id,
              { validateStatus: false }
            )
            .then((response) => {
              if (response.status === 202) {
                LimpiarForm();
                CargarEmpleados();
                //mostrar mensaje
                swalWithBootstrapButtons.fire(
                  "Eliminado",
                  "Información eliminada",
                  "success"
                );
              } else {
                let listaError = "";
                response.data.errors.forEach(element => {
                  listaError += "- " + element.msg + " ";
                });
                swalWithBootstrapButtons.fire(
                  "Error en eliminación",
                  listaError,
                  "error"
                );
              }
            })
            .catch((err) => {
              console.log("error", err);
              swalWithBootstrapButtons.fire(
                "Error en eliminación",
                err.message,
                "error"
              );
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "Información sin cambios",
            "error"
          );
        }
      });
  };

  const LimpiarForm = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setFlagEditar(false);
  };

  const CargarEmpleados = () => {
    axios
      .get("/api/v1/empleados")
      .then((response) => {
        //console.log(response);
        setListaEmpleados(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditarPrevio = (val) => {
    setFlagEditar(true);
    setId(val.id);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
  };

  const EliminarPrevio = (val) => {
    setId(val.id);
    setNombre(val.nombre);
    Eliminar();
  };

  useEffect(() => {
    CargarEmpleados();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-around">
        <div className="col-12 col-sm-4  mb-3 mt-3">
          {/*
            <ToastContainer className="p-3" position="top-center">
            <Toast show={showA} onClose={toggleShowA}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Mensaje</strong>
                <small>Ahora</small>
              </Toast.Header>
              <Toast.Body>{mensaje}</Toast.Body>
            </Toast>
          </ToastContainer>
            */}

          <h1 className="text-center">Nuevo empleado</h1>
          <form className="form-horizontal " id="crear">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="info"
                value={nombre}
                onChange={(event) => {
                  setNombre(event.target.value);
                }}
              />
              <label>Nombre</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="info"
                value={edad}
                onChange={(event) => {
                  setEdad(event.target.value);
                }}
              />
              <label>Edad</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="info"
                value={pais}
                onChange={(event) => {
                  setPais(event.target.value);
                }}
              />
              <label>Pais</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="info"
                value={cargo}
                onChange={(event) => {
                  setCargo(event.target.value);
                }}
              />
              <label>Cargo</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="info"
                value={anios}
                onChange={(event) => {
                  setAnios(event.target.value);
                }}
              />
              <label>Años trabajando</label>
            </div>
            {!flagEditar ? (
              <div className="d-grid gap-2 col-6 mx-auto">
                <button
                  type="button"
                  id="boton"
                  className="btn btn-primary"
                  onClick={Guardar}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={LimpiarForm}
                >
                  Limpiar
                </button>
              </div>
            ) : (
              <div className="d-grid gap-2 col-6 mx-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={Actualizar}
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={LimpiarForm}
                >
                  Limpiar
                </button>
              </div>
            )}
          </form>
        </div>
        <div className="col-12 col-sm-4   mb-3 mt-3">
          <h1 className="text-center">Empleados registrados</h1>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Pais</th>
                <th scope="col">Cargo</th>
                <th scope="col">Años</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {listaEmpleados.map((val) => {
                return (
                  <tr key={val.id}>
                    <th>{val.id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.edad}</td>
                    <td>{val.pais}</td>
                    <td>{val.cargo}</td>
                    <td>{val.anios}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => EditarPrevio(val)}
                      >
                        Editar
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => EliminarPrevio(val)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              type="button"
              id="boton"
              className="btn btn-primary"
              onClick={CargarEmpleados}
            >
              Actualizar información
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
