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

app.get("/indexAdmin", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "Web", "pages", "Admin", "indexAdmin.html")
  );
});
