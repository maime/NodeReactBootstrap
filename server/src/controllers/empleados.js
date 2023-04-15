"use strict";
const Empleado = require("../models/empleados");
const { validationResult } = require('express-validator');


// Listar todos los empleado en la vista principal
exports.findAll = function (req, res) {
  Empleado.findAll(function (err, empleado) {
    if (err) res.send(err);
    res.status(200).send(empleado);
  });
};

// Crear un empleado
exports.create = function (req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const empleado = {
    nombre: req.body.nombre,
    edad: req.body.edad,
    pais: req.body.pais,
    cargo: req.body.cargo,
    anios: req.body.anios
  };

  const nuevo_empleado = new Empleado(empleado);

  Empleado.create(nuevo_empleado, function (err, empleado) {
    if (err) res.status(404).json(err);
    res.status(201).json({ "message": "Empleado Creado Correctamente !" });
  });

};

// Leer un empleado
exports.findById = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Empleado.findById(req.params.id, function (err, empleado) {
    if (err) res.status(404).json(err);
    res.status(200).json(empleado);
  });
};

// Actualizar un empleado
exports.update = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Empleado.findById(req.params.id, function (err, empleado) {
    const aempleado = {
      nombre: req.body.nombre,
      edad: req.body.edad,
      pais: req.body.pais,
      cargo: req.body.cargo,
      anios: req.body.anios
    };

    Empleado.update(
      req.params.id,
      new Empleado(aempleado),
      function (err, aempleado) {
        if (err) res.status(404).json(err);
        res.status(200).json({ "message": "Empleado Actualizado Correctamente !" });
      }
    );
  });
};

// Eliminar un empleado
exports.delete = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Empleado.delete(req.params.id, function (err, empleado) {
    if (err) res.status(404).json(err);
    res.status(202).json({ "message": "Empleado Eliminado Correctamente !" });
  });
};
