const puerto = process.env.PORT || 3001;
const app = require("./app");
const con = require("./config/db");

app.listen(puerto, () => {
  console.log(`Corriendo en el puerto ${puerto}`);
});
