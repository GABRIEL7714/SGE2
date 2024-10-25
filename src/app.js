import express from "express";
import path from "path";
import cors from "cors";
import setTZ from "set-tz";

// Setear la zona horaria
setTZ("America/Lima");

const app = express();

// Configurar cors y json
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// ********* NUEVO CÓDIGO PARA SERVIR ARCHIVOS ESTÁTICOS Y index.html **********

// Servir archivos estáticos desde la carpeta 'Web'
const __dirname = path.resolve(); // Obtener el directorio raíz
app.use(express.static(path.join(__dirname, "Web")));

// Ruta para servir index.html

// ********* FIN DEL NUEVO CÓDIGO **********

// Habilitar CORS antes de las rutas
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Rutas de la API
import usersRoutes from "./routes/users.routes.js";
// import inscriptionsRoutes from './routes/inscriptions.routes.js';
import logInRoutes from "./routes/logIn.routes.js";
import eventsRoutes from "./routes/events.routes.js";

app.use(usersRoutes);
// app.use(inscriptionsRoutes);
app.use(logInRoutes);
app.use(eventsRoutes);

export default app;
