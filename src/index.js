import express from "express"; // Asegúrate de importar express
import app from "./app.js";
import { PORT } from "./config.js";
import { logIn } from "./controllers/logIn.controller.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "..", "Web"))); // Ya puedes usar express.static

app.listen(PORT);
console.log("Listening on port: ", PORT);

// Rutas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Web", "index.html"));
});

app.get("/logIn", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Web", "pages", "logIn.html"));
});

app.get("/EventsUser", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "User", "events.html")
  );
});

app.get("/Register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Web", "pages", "singUp.html"));
});

app.get("/Combos", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "User", "combos.html")
  );
});

app.get("/PreInscripcion", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "User", "preinscription.html")
  );
});

app.get("/Categorias", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "User", "categories.html")
  );
});

app.get("/Payment", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "User", "payment.html")
  );
});

//ADMINISTRADOR

app.get("/indexAdmin", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "indexAdmin.html")
  );
});

app.get("/GestionarEventos", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "gestionarEventos.html")
  );
});

app.get("/CrearEvento", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "crearEvento.html")
  );
});

app.get("/AdaptarEvento", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "adaptarEvento.html")
  );
});

app.get("/ActividadesEvento", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "Web",
      "pages",
      "Admin",
      "actividadesEvento.html"
    )
  );
});

app.get("/EditarEvento", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "editarEvento.html")
  );
});

app.get("/GestionarRoles", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "gestionRoles.html")
  );
});

app.get("/DesignarRol", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "designarRol.html")
  );
});

app.get("/CrearActividad", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "crearActividad.html")
  );
});

app.get("/Caja", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "caja.html")
  );
});
app.get("/CajaEvento", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "cajaEvento.html")
  );
});

app.get("/IngresoEgreso", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "ingresoEgreso.html")
  );
});
