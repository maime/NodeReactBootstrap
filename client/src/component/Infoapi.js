import "bootstrap/dist/css/bootstrap.min.css";

export default function Infoapi() {
  return (
    <div className="container">
      <div className="row justify-content-around">
        <div className="col-12 col-sm-6   mb-3 mt-3">
          <h1>Información API REST</h1>
          <div>
            <h3>URL API REST: /api/v1/empleados</h3>
            <span className="badge bg-secondary">GET</span>{" "}
            <label>Obtener información de todos los empleados</label>
            <br></br>
            <span className="badge bg-secondary">POST</span>{" "}
            <label>Crear empleado</label>
            <br></br>
            <span className="badge bg-secondary">PUT</span>{" "}
            <label>Actualizar empleado</label>
            <br></br>
            <span className="badge bg-secondary">DELETE</span>{" "}
            <label>Eliminar empleado</label>
          </div>
        </div>
      </div>
    </div>
  );
}
