'use strict';
const mysql = require('mysql');

// Conexión a la base de datos 
const con = mysql.createConnection({
  host     : 'localhost', // Host
  user     : 'root',      // Usuario 
  password : '',          // Password  
  database : 'empleados_crud' // Base de datos 
});

// Realizamos la conexión 
con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado a la Base de Datos !");
}); 

// Exportamos este módulo 
module.exports = con;