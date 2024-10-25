import pool from "../db.js";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");

// Crear una instancia de LocalStorage
// Ruta de inicio de sesión
export const logIn = async (req, res) => {
  console.log(req.body);
  const { correo, contraseña } = req.body;

  try {
    // Consultar la base de datos para verificar usuario
    const query = "SELECT * FROM usuario WHERE correo = $1 AND contraseña = $2";
    const values = [correo, contraseña];
    const result = await pool.query(query, values);

    console.log(result.rows[0].nombre); // Esto imprimirá el valor 'walter'
    console.log(result.rows[0].rol); // Esto imprimirá el valor 'walter'

    const rol = result.rows[0].rol;

    localStorage.setItem("rol", rol);

    if (result.rows.length > 0) {
      console.log("si");

      const rol = result.rows[0].rol; // Asegúrate de obtener el rol desde la base de datos

      if (rol == "usuario") {
        res.json({ redirect: "/indexAdmin" }); // Redireccionar a Ruta1 si no es usuario
      } else {
        res.json({ redirect: "/EventsUser" }); // Redireccionar a Ruta2 si es usuario
      }
    } else {
      res.status(401).send("Credenciales inválidas");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};
