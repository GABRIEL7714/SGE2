import pool from "../db.js";

export const getAllEvents = async (req, res) => {
  const events = await pool.query("SELECT * FROM evento;");
  return res.json(events.rows);
};

export const getEvent = async (req, res) => {
  // Obtén el ID del cuerpo de la solicitud
  const { id } = req.body;

  try {
    // Define la consulta SQL y los valores
    const query = "SELECT * FROM evento WHERE id = $1;";
    const values = [id];

    // Ejecuta la consulta con los valores correctos
    const result = await pool.query(query, values);

    // Devuelve los resultados como respuesta
    return res.json(result.rows[0] || {});
  } catch (error) {
    console.error("Error al obtener el evento:", error);
    return res.status(500).json({ error: "Error al obtener el evento." });
  }
};
