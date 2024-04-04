module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js"); // Requiere el controlador de tutoriales

  let router = require("express").Router(); // Crea un enrutador de Express

  // Define las rutas para las diferentes operaciones CRUD de los tutoriales

  // Ruta para crear un nuevo Tutorial (POST)
  router.post("/", tutorials.create);

  // Ruta para obtener todos los Tutoriales (GET)
  router.get("/", tutorials.findAll);

  // Ruta para obtener todos los Tutoriales publicados (GET)
  router.get("/published", tutorials.findAllPublished);

  // Ruta para obtener un Tutorial específico por su ID (GET)
  router.get("/:id", tutorials.findOne);

  // Ruta para actualizar un Tutorial por su ID (PUT)
  router.put("/:id", tutorials.update);

  // Ruta para eliminar un Tutorial por su ID (DELETE)
  router.delete("/:id", tutorials.delete);

  // Ruta para eliminar todos los Tutoriales (DELETE)
  router.delete("/", tutorials.deleteAll);

  // Aplica el enrutador de Express a la ruta base '/api/tutorials'
  app.use('/api/tutorials', router);
};