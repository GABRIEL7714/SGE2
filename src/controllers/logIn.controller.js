import pool from "../db.js";

// Ruta de inicio de sesión
export const logIn = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Consultar la base de datos para verificar usuario
    const query = "SELECT * FROM usuario WHERE correo = $1 AND contraseña = $2";
    const values = [correo, contraseña];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const rol = result.rows[0].rol;

      res.cookie("rol", "administrador", {
        secure: false, // Cambia a true si usas HTTPS
        sameSite: "Lax",
        maxAge: 3600000, // Tiempo en milisegundos
      });

      res.cookie("loggedIn", "true", {
        secure: false, // Cambia a true si usas HTTPS
        sameSite: "Lax",
        maxAge: 3600000, // Tiempo en milisegundos
      });

      // Envía el rol en la respuesta JSON
      res.json({
        redirect: rol !== "usuario" ? "/indexAdmin" : "/EventsUser",
        rol,
      });
    } else {
      res.status(401).send("Credenciales inválidas");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};
