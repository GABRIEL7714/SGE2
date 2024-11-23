import pool from "../db.js";

// AMB-001: Obtener todos los ambientes
export const getAllAmbientes = async (req, res) => {
  try {
    console.log("entro");
    const { data, error } = await pool.rpc("get_all_ambientes");

    if (error) {
      console.error("Error al obtener los ambientes:", error);
      return res
        .status(500)
        .json({ error: "Error en el servidor al obtener los ambientes." });
    }

    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.status(404).send("No se encontraron ambientes.");
    }
  } catch (error) {
    console.error("Error interno:", error);
    return res
      .status(500)
      .json({ error: "Error interno al procesar la solicitud." });
  }
};

// AMB-002: Obtener un ambiente por su ID
export const getAmbienteById = async (req, res) => {
  const { id } = req.body; // Obtener el ID del ambiente de la solicitud

  if (!id) {
    return res.status(400).json({ error: "El ID del ambiente es obligatorio." });
  }

  try {
    const { data, error } = await pool.rpc("get_ambiente_by_id", {
      id_input: id,
    });

    if (error) {
      console.error("Error al obtener el ambiente:", error);
      return res.status(500).json({ error: "Error al obtener el ambiente." });
    }

    return res.json(data.length > 0 ? data[0] : {});
  } catch (error) {
    console.error("Error interno:", error);
    return res
      .status(500)
      .json({ error: "Error interno al procesar la solicitud." });
  }
};

// AMB-003: Crear un nuevo ambiente
export const createAmbiente = async (req, res) => {
  const { nombre, ubicacion, capacidad, disponible } = req.body;

  try {
    const query =
      "INSERT INTO ambiente (nombre, ubicacion, capacidad, disponible) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [nombre, ubicacion, capacidad, disponible];

    const result = await pool.query(query, values);

    res.json({
      ambiente: result.rows[0], // Ambiente creado
      message: "Ambiente creado exitosamente.",
    });
  } catch (error) {
    console.error("Error al crear el ambiente:", error);
    return res.status(500).json({ error: "Error creando ambiente." });
  }
};

// AMB-004: Actualizar un ambiente existente
export const updateAmbiente = async (req, res) => {
  const { id, nombre, ubicacion, capacidad, disponible } = req.body;

  if (!id) {
    return res.status(400).json({ error: "El ID del ambiente es obligatorio." });
  }

  try {
    const { data, error } = await pool.rpc("update_ambiente_by_id", {
      id_input: id,
      nombre_input: nombre,
      ubicacion_input: ubicacion,
      capacidad_input: capacidad,
      disponible_input: disponible,
    });

    if (error) {
      console.error("Error al actualizar el ambiente:", error);
      return res
        .status(500)
        .json({ error: "Error al actualizar el ambiente." });
    }

    res.json({
      message: "Ambiente actualizado exitosamente.",
      ambiente: data[0], // Ambiente actualizado
    });
  } catch (error) {
    console.error("Error interno:", error);
    return res
      .status(500)
      .json({ error: "Error interno al procesar la solicitud." });
  }
};

// AMB-005: Eliminar un ambiente por su ID
export const deleteAmbiente = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "El ID del ambiente es obligatorio." });
  }

  try {
    const { data, error } = await pool.rpc("delete_ambiente_by_id", {
      id_input: id,
    });

    if (error) {
      console.error("Error al eliminar el ambiente:", error);
      return res
        .status(500)
        .json({ error: "Error al eliminar el ambiente." });
    }

    res.json({
      message: "Ambiente eliminado exitosamente.",
    });
  } catch (error) {
    console.error("Error interno:", error);
    return res
      .status(500)
      .json({ error: "Error interno al procesar la solicitud." });
  }
};
