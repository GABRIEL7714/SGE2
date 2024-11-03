import pool from "../db.js";

//AC-001
export const getAllEventActivities = async (req, res) => {
  const { id_evento } = req.body;
  const query = "SELECT * FROM actividad WHERE id_evento = $1";
  const values = [id_evento];
  const result = await pool.query(query, values);

  if (result.rows.length > 0) {
    return res.json(result.rows);
  } else {
    res.status(401).send("Error con la carga de Actividades");
  }

  return res.json(posts);
};

//AC-002
export const getEventActivitiesById = async (req, res) => {
  const { id_evento } = req.body; // Obtener el id_evento de los parámetros de la URL
  const query = "SELECT * FROM actividad WHERE id_evento = $1";
  const values = [id_evento];

  console.log("Si entra");
  console.log(id_evento);
  try {
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      return res.json(result.rows); // Enviar las actividades encontradas como JSON
    } else {
      return res
        .status(404)
        .send("No se encontraron actividades para el evento especificado.");
    }
  } catch (error) {
    console.error("Error al obtener las actividades:", error);
    return res
      .status(500)
      .send("Error en el servidor al obtener las actividades.");
  }
};

export const getNumberEventActivities = async (req, res) => {
  const { idEvento } = req.body;
  console.log("Si entra al getNumber", idEvento);

  // Modificamos la consulta para contar las actividades
  const query = "SELECT COUNT(*) as count FROM actividad WHERE id_evento = $1";
  const values = [idEvento];

  try {
    const result = await pool.query(query, values);

    // Verificamos el resultado antes de enviarlo
    console.log("Resultado de la consulta:", result.rows);

    if (result.rows.length > 0) {
      const numberOfActivities = result.rows[0].count;
      res.status(200).json({ numberOfActivities });
    } else {
      res.status(200).json({ numberOfActivities: 0 });
    }
  } catch (error) {
    console.error("Error al obtener el número de actividades:", error);
    res
      .status(500)
      .json({ error: "Error al obtener el número de actividades" });
  }
};
