// Importación de módulos
const express = require("express");
const cors = require("cors");


// Creación de la aplicación Express
const app = express();

// Configuración de CORS
let corsOptions = {
  origin: "http://localhost:8081"
};

// Habilitar CORS para la aplicación
app.use(cors(corsOptions));

// Analizar las solicitudes de tipo de contenido - application/json
app.use(express.json());

// Analizar las solicitudes de tipo de contenido - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Ruta simple
app.get("/", (req, res) => {
  // Responder con un mensaje JSON
  res.json({ message: "Welcome to Heriberto application." });
});

require("./app/routes/tutorial.routes")(app);

// Establecer el puerto y escuchar las solicitudes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // Imprimir un mensaje cuando el servidor esté en marcha
  console.log(`Server is running on port ${PORT}.`);
});
