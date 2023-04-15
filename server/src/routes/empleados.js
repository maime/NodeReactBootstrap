const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const empleadosController = require('../controllers/empleados');

const idValidacion = param('id').trim().isLength({ min: 1 }).withMessage('Identificador vacio.')
    .isNumeric().withMessage("Edad: Debe ser solo numeros")
const nombreValidacion = body('nombre').trim().isLength({ min: 1 }).withMessage('Nombre vacio.')
    .isLength({ min: 3 }).withMessage('Nombre: Minimo 3 letras.')
    .isAlpha().withMessage('Nombre: Deben ser solo letras.');
const edadValidacion = body('edad').trim().isLength({ min: 1 }).withMessage('Edad vacio.')
    .isNumeric().withMessage("Edad: Debe ser solo numeros")
const aniosValidacion = body('anios').isLength({ min: 1 }).withMessage('Años vacio.')
    .isNumeric().withMessage("Años: Debe ser solo numeros")
const cargoValidacion = body('cargo').trim().isLength({ min: 1 }).withMessage('Cargo vacio.')
    .isLength({ min: 3 }).withMessage('Cargo: Minimo 3 letras.')
    .isAlpha().withMessage('Cargo: Debe ser solo letras.');
const paisValidacion = body('pais').trim().isLength({ min: 1 }).withMessage('Pais vacio.')
    .isLength({ min: 3 }).withMessage('Pais: Minimo 3 letras.')
    .isAlpha().withMessage('Pais: Debe ser solo letras.');

// Ruta para listar todos los empleados 
router.get('/', empleadosController.findAll);

// Ruta para crear un nuevo empleado
router.post('/', nombreValidacion, edadValidacion, aniosValidacion, cargoValidacion, paisValidacion, empleadosController.create);

// Ruta para leer un empleado por su ID 
router.get('/:id', idValidacion, empleadosController.findById);

// Ruta para actualizar un empleado por su ID 
router.put('/:id', idValidacion, nombreValidacion, edadValidacion, aniosValidacion, cargoValidacion, paisValidacion, empleadosController.update);

// Ruta para eliminar un empleado por su ID 
router.delete('/:id', idValidacion, empleadosController.delete);

module.exports = router 
