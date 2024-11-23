import pool from "../db.js";
import QRCode from "qrcode"; // Asegúrate de instalar este paquete: npm install qrcode

//UC-001 NO SE USA
export const getAllUsers = async (req, res) => {
  try {
    // Llamada al procedimiento almacenado
    const { data, error } = await pool.rpc("obtener_usuarios");

    if (error) {
      console.error("Error llamando al procedimiento:", error);
      throw error;
    }

    res.json({
      message: "Usuarios obtenidos exitosamente",
      data,
    });
  } catch (error) {
    console.error("Error llamando al procedimiento:", error);
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
};

//UC-002
// Función para crear un usuario llamando al procedimiento almacenado
export const createUser = async (req, res) => {
  const { nombre, apellido, correo, telefono, contrasena, tipodoc, numerodoc } =
    req.body;

  try {
    // Generar un QR único basado en el número de documento
    const qrData = await QRCode.toDataURL(numerodoc); // Genera un QR como base64

    // Llamada al procedimiento almacenado
    const { data, error } = await pool.rpc("registrar_usuario", {
      nombre_param: nombre,
      apellido_param: apellido,
      correo_param: correo,
      telefono_param: telefono,
      contrasena_param: contrasena,
      tipodoc_param: tipodoc,
      numerodoc_param: numerodoc,
      qr_param: qrData, // Enviar el QR como parámetro
    });

    if (error) {
      console.error("Error llamando al procedimiento:", error);
      // Enviar respuesta y salir
      return res.status(400).json({
        message: "Error al crear el usuario",
        errorMessage: error.message,
      });
    }

    // Respuesta en caso de éxito
    return res.json({
      message: "Usuario creado exitosamente",
      data,
      redirect: "/logIn",
    });
  } catch (error) {
    console.error("Error inesperado:", error);
    // Manejo del error general
    return res.status(500).json({ error: "Error creando usuario" });
  }
};

//UC-003
export const changeRol = async (req, res) => {
  const { numerodoc, rolNuevo } = req.body;

  try {
    // Llamada al procedimiento almacenado
    const { data, error } = await pool.rpc("cambiar_rol_usuario", {
      numerodoc_param: numerodoc,
      rol_nuevo_param: rolNuevo,
    });

    if (error) {
      console.error("Error llamando al procedimiento:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User role updated successfully",
      user: data[0],
      redirect: "/indexAdmin",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating user role" });
  }
};

export const getUserByNumeroDoc = async (req, res) => {
  // Obtén el numerodoc del cuerpo de la solicitud
  const { numerodoc } = req.body;

  if (!numerodoc) {
    return res
      .status(400)
      .json({ error: "El campo 'numerodoc' es requerido." });
  }

  try {
    // Llama a la función RPC en PostgreSQL usando supabase.rpc()
    const { data, error } = await pool.rpc("get_user_by_numerodoc", {
      p_numerodoc: numerodoc,
    });
    console.log(data);
    console.log(error);
    if (error) {
      console.error("Error al obtener el usuario:", error);
      return res.status(500).json({ error: "Error al obtener el usuario." });
    }

    // Devuelve el usuario como respuesta
    return res.json(data || {});
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return res.status(500).json({ error: "Error al obtener el usuario." });
  }
};
