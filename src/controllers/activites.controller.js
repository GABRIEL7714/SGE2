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
  const { id_evento } = req.body; // Obtener el id_evento de los parámetros del cuerpo de la solicitud

  const query = `
    SELECT 
      actividad.*, 
      ambiente.locacion
    FROM 
      actividad 
    LEFT JOIN 
      ambiente 
    ON 
      actividad.id_ambiente = ambiente.id
    WHERE 
      actividad.id_evento = $1
    ORDER BY date;
  `;
  const values = [id_evento];

  console.log("Si entra");
  console.log(id_evento);

  try {
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      console.log(result.rows);
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

export const createActivity = async (req, res) => {
  const {
    date,
    id_evento,
    hora_inicio,
    hora_fin,
    expositor,
    tipo,
    nombre,
    descripcion,
  } = req.body;

  try {
    // Consulta para insertar los datos en la tabla actividad
    const query =
      "INSERT INTO actividad (date, id_evento, hora_inicio, hora_fin, expositor, tipo, nombre, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    const values = [
      date,
      id_evento,
      hora_inicio,
      hora_fin,
      expositor,
      tipo,
      nombre,
      descripcion,
    ];

    // Ejecutar la consulta
    const result = await pool.query(query, values);

    // Devolver la actividad creada y redirigir
    res.json({
      activity: result.rows[0], // Actividad creada
      redirect: `/ActividadesEvento?id=${id_evento}`, // Redirigir con el ID del evento
    });
  } catch (error) {
    console.error("Error al crear la actividad:", error);
    return res.status(500).json({ error: "Error creando actividad" });
  }
};

export const updateActivity = async (req, res) => {
  const {
    idActividad, // ID de la actividad a actualizar
    date,
    id_evento,
    hora_inicio,
    hora_fin,
    expositor,
    tipo,
    nombre,
    descripcion,
  } = req.body;
  console.log("ID ACTIVIDAD");
  console.log(idActividad);
  try {
    // Consulta para actualizar los datos en la tabla actividad
    const query = `
      UPDATE actividad 
      SET 
        date = $1, 
        hora_inicio = $2, 
        hora_fin = $3, 
        expositor = $4, 
        tipo = $5, 
        nombre = $6, 
        descripcion = $7 
      WHERE id = $8 
      RETURNING *
    `;
    const values = [
      date,
      hora_inicio,
      hora_fin,
      expositor,
      tipo,
      nombre,
      descripcion,
      idActividad, // Condición para identificar la actividad a actualizar
    ];

    // Ejecutar la consulta
    const result = await pool.query(query, values);

    // Respuesta exitosa con la actividad actualizada
    res.json({
      message: "Actividad actualizada exitosamente",
      activity: result.rows[0], // Actividad actualizada
      redirect: `/ActividadesEvento?id=${id_evento}`, // Redirigir al listado de actividades del evento
    });
  } catch (error) {
    console.error("Error al actualizar la actividad:", error);
    return res.status(500).json({ error: "Error actualizando actividad" });
  }
};

export const getActivity = async (req, res) => {
  // Obtén el ID del cuerpo de la solicitud
  const { id } = req.body;

  try {
    // Define la consulta SQL y los valores
    const query = "SELECT * FROM actividad WHERE id = $1;";
    const values = [id];

    // Ejecuta la consulta con los valores correctos
    const result = await pool.query(query, values);

    // Devuelve los resultados como respuesta
    return res.json(result.rows[0] || {});
  } catch (error) {
    console.error("Error al obtener la actividad:", error);
    return res.status(500).json({ error: "Error al obtener la actividad." });
  }
};
