import pool from "../db.js";

// La función para inscribir un usuario en un evento
export const inscribir = async (req, res) => {
  const { categoryId, comboId, idEvento, dni } = req.body;

  if (!categoryId || !comboId || !idEvento || !dni) {
    return res.status(400).json({ error: "Faltan parámetros necesarios." });
  }

  try {
    // Llamada al procedimiento almacenado para inscribir al usuario
    const { data, error } = await pool.rpc("inscribir_usuario_en_evento", {
      category_id_param: categoryId,
      combo_id_param: comboId,
      evento_id_param: idEvento,
      dni_param: dni, // Pasar el DNI también al procedimiento
    });

    if (error) {
      console.error("Error al inscribir en el evento:", error);
      return res
        .status(500)
        .json({ error: "Error al inscribir en el evento." });
    }

    // Responder con un mensaje de éxito y redirigir a una página de confirmación o inicio
    res.json({
      message: "Inscripción realizada con éxito",
      redirect: "/eventoConfirmacion", // Puedes redirigir a la página que desees
    });
  } catch (error) {
    console.error("Error interno al procesar la inscripción:", error);
    return res
      .status(500)
      .json({ error: "Error interno al procesar la inscripción." });
  }
};
