import pool from "../db.js";

export const getMaterialsByEnvironmentId = async (req, res) => {
  const { idAmbiente } = req.body; // Obtener el idAmbiente de los parámetros del cuerpo de la solicitud
  console.log(idAmbiente);

  try {
    // Llama a la función almacenada en Supabase
    const { data, error } = await pool.rpc("get_materials_by_environment_id", {
      p_id_ambiente: idAmbiente,
    });

    console.log(data);
    console.log(error);
    if (error) {
      console.error("Error al obtener materiales:", error);
      return res
        .status(500)
        .send("Error en el servidor al obtener los materiales.");
    }

    // Responder con los resultados
    if (data.length > 0) {
      console.log(data);
      return res.json(data); // Enviar los materiales encontrados como JSON
    } else {
      return res
        .status(404)
        .send("No se encontraron materiales para el ambiente especificado.");
    }
  } catch (error) {
    console.error("Error al obtener materiales:", error);
    return res.status(500).send("Error inesperado al obtener los materiales.");
  }
};

export const getMaterialById = async (req, res) => {
  const { id } = req.body; // Obtener el id del material del cuerpo de la solicitud
  console.log(`ID del material: ${id}`);

  try {
    // Llama a la función almacenada en Supabase
    const { data, error } = await pool.rpc("get_material_by_id", {
      p_id: id, // Asocia el parámetro al valor recibido
    });

    console.log(data);
    console.log(error);

    // Manejo de errores
    if (error) {
      console.error("Error al obtener el material:", error);
      return res
        .status(500)
        .send("Error en el servidor al obtener el material.");
    }

    // Verifica si se encontró el material
    if (data.length > 0) {
      console.log("Material encontrado:", data[0]);
      return res.json(data[0]); // Devuelve el material encontrado como JSON
    } else {
      return res
        .status(404)
        .send("No se encontró el material con el ID especificado.");
    }
  } catch (error) {
    console.error("Error inesperado al obtener el material:", error);
    return res.status(500).send("Error inesperado al obtener el material.");
  }
};

export const updateMaterial = async (req, res) => {
  const { id, nombre, descripcion, to_give, stock } = req.body;

  try {
    // Llamar a la función almacenada en Supabase
    const { data, error } = await pool.rpc("update_material", {
      p_descripcion: descripcion, // Descripción
      p_id: id, // ID del material
      p_nombre: nombre, // Nombre del material
      p_stock: stock, // Stock
      p_to_give: to_give, // Para entregar
    });

    // Manejo de errores
    if (error) {
      console.error("Error al actualizar el material:", error);
      return res
        .status(500)
        .send("Error en el servidor al actualizar el material.");
    }

    // Verificar si se realizó la actualización y devolver los datos
    if (data && data.length > 0) {
      console.log("Material actualizado:", data[0]);
      return res.json({
        message: "Material actualizado con éxito.",
        material: data[0],
      });
    } else {
      return res.status(404).send("No se encontró el material a actualizar.");
    }
  } catch (error) {
    console.error("Error inesperado al actualizar el material:", error);
    return res.status(500).send("Error inesperado al actualizar el material.");
  }
};

export const createMaterial = async (req, res) => {
  const { nombre, descripcion, stock, to_give, id_ambiente } = req.body;

  try {
    // Llamada a la función en PostgreSQL
    const { data, error } = await pool.rpc("create_material", {
      p_nombre: nombre,
      p_descripcion: descripcion,
      p_stock: stock,
      p_to_give: to_give,
      p_id_ambiente: id_ambiente,
    });

    if (error) {
      console.error("Error al crear material:", error);
      return res.status(500).json({ error: "Error creando el material" });
    }
    console.log(data);
    console.log(error);

    // Responder con los datos del material creado
    res.json({
      material: data, // Enviar los datos del material creado
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};
