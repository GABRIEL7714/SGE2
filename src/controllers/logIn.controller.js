import pool from "../db.js";

// Ruta de inicio de sesión

//LC-001
export const logIn = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Llamada al procedimiento almacenado
    console.log("Si entra");
    const { data, error } = await pool.rpc("verificar_usuario", {
      correo_param: correo,
      contrasena_param: contraseña,
    });
    console.log("NO");
    if (error) {
      console.error("Error llamando al procedimiento:", error);
      throw error;
    }

    console.log(data);

    if (data && data.length > 0) {
      const rol = data[0].rol_usuario;
      const DNI = data[0].numerodoc;
      // Configurar cookies
      res.cookie("rol", rol, {
        secure: false,
        sameSite: "Lax",
        maxAge: 3600000,
      });

      res.cookie("loggedIn", "true", {
        secure: false, // Cambia a true si usas HTTPS
        sameSite: "Lax",
        maxAge: 3600000, // Tiempo en milisegundos
      });

      res.cookie("DNI", DNI, {
        secure: false, // Cambia a true si usas HTTPS
        sameSite: "Lax",
        maxAge: 3600000, // Tiempo en milisegundos
      });

      // Respuesta exitosa con redirección basada en el rol
      res.json({
        redirect: rol !== "usuario" ? "/indexAdmin" : "/EventsUser",
        rol,
      });
    } else {
      res.status(401).send("Credenciales inválidas");
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).send("Error del servidor");
  }
};
