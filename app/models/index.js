const dbConfig = require("../config/db.config.js"); // Requiere la configuración de la base de datos desde un archivo

const mongoose = require("mongoose"); // Requiere el módulo de Mongoose para interactuar con MongoDB
mongoose.Promise = global.Promise; // Configura la promesa de Mongoose para usar la promesa global de Node.js

const db = {}; // Crea un objeto vacío para almacenar la configuración y los modelos de la base de datos
db.mongoose = mongoose; // Asigna la instancia de Mongoose al objeto db
db.url = dbConfig.url; // Asigna la URL de conexión a la base de datos desde la configuración

// Requiere el modelo de Tutorial y lo asigna al objeto db
db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db; // Exporta el objeto db para que esté disponible en otros archivos
