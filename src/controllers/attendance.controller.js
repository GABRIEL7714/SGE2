import pool from "../db.js";

export const registrarAsistencia = async (req, res) => {
  // Obtén los valores del cuerpo de la solicitud
  const { numerodoc, idEvento } = req.body;

  try {
    // Llama a la función creada en PostgreSQL usando supabase.rpc()
    const { data, error } = await pool.rpc("registrar_asistencia", {
      p_numerodoc: numerodoc,
      p_id_evento: idEvento,
    });
    console.log(data);
    console.log(error);
    if (error) {
      console.error("Error al registrar asistencia:", error);
      return res
        .status(500)
        .json({ error: "Error al registrar la asistencia." });
    }

    // Devuelve la respuesta de la función RPC
    return res.json({
      message: "Asistencia registrada correctamente.",
      data,
    });
  } catch (error) {
    console.error("Error al registrar asistencia:", error);
    return res.status(500).json({ error: "Error al registrar la asistencia." });
  }
};
