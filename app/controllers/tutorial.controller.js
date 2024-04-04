const db = require("../models"); // Requiere el módulo que contiene los modelos de la base de datos
const Tutorial = db.tutorials; // Accede al modelo de Tutorial desde la base de datos

// Función para crear y guardar un nuevo Tutorial
exports.create = (req, res) => {
  // Valida la solicitud para asegurar que el campo "title" no esté vacío
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Crea un nuevo Tutorial con los datos proporcionados en la solicitud
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false // Si no se proporciona el campo "published", se establece como false
  });

  // Guarda el Tutorial en la base de datos
  tutorial
    .save(tutorial) // Guarda el Tutorial en la base de datos
    .then(data => {
      res.send(data); // Envía la respuesta con los datos del Tutorial creado
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial." // En caso de error, envía un mensaje de error al cliente
      });
    });
};

// Función para obtener todos los Tutoriales de la base de datos
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Tutorial.find(condition)
      .then(data => {
        res.send(data); // Envía la respuesta con todos los Tutoriales encontrados
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials." // En caso de error, envía un mensaje de error al cliente
        });
      });
  };

// Función para encontrar un Tutorial específico por su ID
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id }); // Si no se encuentra el Tutorial, envía un mensaje de error
        else res.send(data); // Si se encuentra el Tutorial, envía los datos del Tutorial encontrado
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id }); // En caso de error, envía un mensaje de error al cliente
      });
  };

// Función para actualizar un Tutorial por su ID
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!" // Valida que los datos a actualizar no estén vacíos
      });
    }
  
    const id = req.params.id;
  
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false }) // Actualiza el Tutorial en la base de datos
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!` // Si no se encuentra el Tutorial, envía un mensaje de error
          });
        } else res.send({ message: "Tutorial was updated successfully." }); // Si se actualiza correctamente, envía un mensaje de éxito
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id // En caso de error, envía un mensaje de error al cliente
        });
      });
  };

// Función para eliminar un Tutorial por su ID
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
      const tutorial = await Tutorial.findById(id);
      if (!tutorial) {
          res.status(404).send({
              message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!` // Si no se encuentra el Tutorial, envía un mensaje de error
          });
      } else {
          await Tutorial.deleteOne({_id: id}); // Elimina el Tutorial de la base de datos
          res.send({
              message: "Tutorial was deleted successfully!" // Envía un mensaje de éxito
          });
      }
  } catch (err) {
      console.error(err); // Imprime el error en la consola
      res.status(500).send({
          message: "Could not delete Tutorial with id=" + id // En caso de error, envía un mensaje de error al cliente
      });
  }
};


// Función para eliminar todos los Tutoriales de la base de datos
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({}) // Elimina todos los Tutoriales de la base de datos
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!` // Envía un mensaje con la cantidad de Tutoriales eliminados
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials." // En caso de error, envía un mensaje de error al cliente
        });
      });
  };

// Función para encontrar todos los Tutoriales publicados
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true }) // Encuentra todos los Tutoriales con el campo "published" establecido como true
      .then(data => {
        res.send(data); // Envía la respuesta con todos los Tutoriales publicados
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials." // En caso de error, envía un mensaje de error al cliente
        });
      });
  };
