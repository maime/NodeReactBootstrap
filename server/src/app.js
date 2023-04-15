const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require('node:path');

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../../client/build')));

const ruta_empleados = require("./routes/empleados");

app.use("/api/v1/empleados", ruta_empleados);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});

module.exports = app