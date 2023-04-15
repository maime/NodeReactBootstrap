const request = require('supertest');
const app = require("../app");


describe("CRUD EMPLEADOS", () => {
  describe("Obtener todos los empleados", () => {
    it("Debería retornar 200 y los empleados", async () => {
      const response = await request(app)
        .get("/api/v1/empleados")
        .set("content-type", "application/json");

      expect(response.status).toBe(200);
    });
  });
  describe("Obtener 1 empleado", () => {
    it("Debería retornar 200 y el empleado", async () => {
      const response = await request(app)
        .get("/api/v1/empleados/35")
        .set("content-type", "application/json");

      expect(response.status).toBe(200);
    });
  });
  describe("Obtener 1 empleado con error", () => {
    it("Debería retornar 400 y error", async () => {
      const response = await request(app)
        .get("/api/v1/empleados/asdasd")
        .set("content-type", "application/json");

      expect(response.status).toBe(400);
    });
  });
  describe("crear empleado", () => {
    it("Debería retonar 201 y crear el usuario", async () => {
      const response = await request(app)
        .post("/api/v1/empleados")
        .set("content-type", "application/json")
        .send({
          nombre: "prueba",
          edad: "123",
          pais: "prueba",
          cargo: "prueba",
          anios: "123"
        });

      expect(response.status).toBe(201);
    });
  });

  describe("crear empleado con error", () => {
    it("Debería retonar 404 y devolver error", async () => {
      const response = await request(app)
        .post("/api/v1/empleados")
        .set("content-type", "application/json")
        .send({
          nombre: "prueba",
          edad: "malo",
          pais: "prueba",
          cargo: "",
          anios: "malo"
        });
      expect(response.status).toBe(400);
    });
  });

  describe("crear empleado con error", () => {
    it("Debería retonar 404 y devolver error", async () => {
      const response = await request(app)
        .post("/api/v1/empleados")
        .set("content-type", "application/json")

      expect(response.status).toBe(400);
    });
  });

  describe("actualizar empleado", () => {
    it("Debería retonar 200 y actualizar el usuario", async () => {
      const response = await request(app)
        .put("/api/v1/empleados/35")
        .set("content-type", "application/json")
        .send({
          nombre: "prueba",
          edad: "123",
          pais: "prueba",
          cargo: "prueba",
          anios: "123"
        });

      expect(response.status).toBe(200);
    });
  });

  describe("actualizar empleado con error", () => {
    it("Debería retonar 400 y devolver error", async () => {
      const response = await request(app)
        .put("/api/v1/empleados/35")
        .set("content-type", "application/json")
        .send({
          nombre: "prueba",
          edad: "malo"
        });
      expect(response.status).toBe(400);
    });
  });

  describe("eliminar empleado", () => {
    it("Debería retonar 202 y eliminar el usuario", async () => {
      const response = await request(app)
        .delete("/api/v1/empleados/35")
        .set("content-type", "application/json")
        .send({
          nombre: "prueba",
          edad: "123",
          pais: "prueba",
          cargo: "prueba",
          anios: "123"
        });

      expect(response.status).toBe(202);
    });
  });

  describe("eliminar empleado con error", () => {
    it("Debería retonar 400 y devolver error", async () => {
      const response = await request(app)
        .delete("/api/v1/empleados/asdasd")
        .set("content-type", "application/json");
      expect(response.status).toBe(400);
    });
  });

});