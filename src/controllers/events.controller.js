import pool from "../db.js";

export const getAllEvents = async (req, res) => {
  const events = await pool.query("SELECT * FROM evento ORDER BY fechainicio;");
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

export const createEvent = async (req, res) => {
  let {
    nombre,
    tipoEvento,
    descripcion,
    publica,
    fechainicio,
    fechafin,
    fechaincripcion,
  } = req.body;

  try {
    const query =
      "INSERT INTO evento (nombre, tipo, descripcion, fechainicio, publica, fechafin, fechaincripcion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [
      nombre,
      tipoEvento,
      descripcion,
      fechainicio,
      publica,
      fechafin,
      fechaincripcion, // Nuevo campo
    ];

    const result = await pool.query(query, values);

    res.json({
      redirect: "/GestionarEventos",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating event" });
  }
};

export const updateEvent = async (req, res) => {
  let {
    idEvento,
    nombre,
    tipoEvento,
    descripcion,
    publica,
    fechainicio,
    fechafin,
    fechaincripcion,
  } = req.body;

  try {
    const query =
      "UPDATE evento SET nombre = $1, tipo = $2, descripcion = $3, fechainicio = $4, publica = $5, fechafin = $6, fechaincripcion = $7 WHERE id = $8 RETURNING *";
    const values = [
      nombre,
      tipoEvento,
      descripcion,
      fechainicio,
      publica,
      fechafin,
      fechaincripcion,
      idEvento, // Colocamos el id al final para la condición WHERE
    ];

    const result = await pool.query(query, values);

    res.json({
      message: "Evento actualizado exitosamente",
      event: result.rows[0], // Devuelve el evento actualizado
      redirect: "/GestionarEventos",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating event" });
  }
};
