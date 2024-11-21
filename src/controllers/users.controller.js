import supabase from "../db.js";

//UC-001
export const getAllUsers = async (req, res) => {
  try {
    // Llamada al procedimiento almacenado
    const { data, error } = await supabase.rpc("obtener_usuarios");

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
    // Llamada al procedimiento almacenado
    const { data, error } = await supabase.rpc("crear_usuario", {
      nombre_param: nombre,
      apellido_param: apellido,
      correo_param: correo,
      telefono_param: telefono,
      contrasena_param: contrasena,
      tipodoc_param: tipodoc,
      numerodoc_param: numerodoc,
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
    const { data, error } = await supabase.rpc("cambiar_rol_usuario", {
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
