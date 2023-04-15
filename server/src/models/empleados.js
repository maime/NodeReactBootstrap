"use strict";
var conexion = require("../config/db");

// Campos del producto (Objeto)
var Empleado = function (producto) {
  this.nombre = producto.nombre;
  this.edad = producto.edad;
  this.pais = producto.pais;
  this.cargo = producto.cargo;
  this.anios = producto.anios;
};

// Crear un Producto
Empleado.create = function (newEmp, result) {
  conexion.query(
    "INSERT INTO empleados set ?",
    newEmp,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    }
  );
};

// Leer un Empleado por su ID
Empleado.findById = function (id, result) {
  conexion.query(
    "Select * from empleados where id = ? ",
    id,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

// Listar todos los productos en la Vista Principal
Empleado.findAll = function (result) {
  conexion.query("Select * from empleados", function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// Actualizar un Empleado por su ID
Empleado.update = function (id, producto, result) {
  conexion.query(
    "UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id = ?",
    [
      producto.nombre,
      producto.edad,
      producto.pais,
      producto.cargo,
      producto.anios,
      id,
    ],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Eliminar un Empleado por su ID
Empleado.delete = function (id, result) {
  conexion.query(
    "DELETE FROM empleados WHERE id = ?",
    [id],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
module.exports = Empleado;
