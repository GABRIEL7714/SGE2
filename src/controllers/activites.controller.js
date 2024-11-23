import pool from "../db.js";

//AC-001
export const getAllEventActivities = async (req, res) => {
  const { id_evento } = req.body; // Obtener id_evento de la solicitud

  // Llamar a la función remota (RPC) de Supabase
  const { data, error } = await pool.rpc("get_actividades_por_evento", {
    id_evento: id_evento,
  }); // Llamada a la función

  // Manejo de errores
  if (error) {
    return res
      .status(401)
      .send("Error con la carga de Actividades: " + error.message);
  }

  // Respuesta exitosa con las actividades
  if (data.length > 0) {
    return res.json(data);
  } else {
    return res
      .status(404)
      .send("No se encontraron actividades para el evento proporcionado.");
  }
};

//AC-002
export const getEventActivitiesById = async (req, res) => {
  const { id_evento } = req.body; // Obtener el id_evento de los parámetros del cuerpo de la solicitud

  try {
    const { data, error } = await pool.rpc("get_event_activities_by_id", {
      p_id_evento: id_evento,
    });

    // Manejo de errores
    if (error) {
      console.error("Error al obtener actividades:", error);
      return res
        .status(500)
        .send("Error en el servidor al obtener las actividades.");
    }

    // Responder con los resultados
    if (data.length > 0) {
      console.log(data);
      return res.json(data); // Enviar las actividades encontradas como JSON
    } else {
      return res
        .status(404)
        .send("No se encontraron actividades para el evento especificado.");
    }
  } catch (error) {
    console.error("Error al obtener actividades:", error);
    return res
      .status(500)
      .send("Error en el servidor al obtener las actividades.");
  }
};
//AC-003
export const getNumberEventActivities = async (req, res) => {
  const { idEvento } = req.body;
  console.log("Si entra al getNumber", idEvento);

  try {
    // Llamamos al procedimiento almacenado utilizando Supabase
    const { data, error } = await pool.rpc("get_number_event_activities", {
      p_id_evento: idEvento, // Nombre del parámetro definido en la función
    });

    if (error) {
      console.error("Error al llamar al procedimiento almacenado:", error);
      return res
        .status(500)
        .json({ error: "Error al obtener el número de actividades" });
    }

    console.log("Resultado del procedimiento:", data);

    // data debería ser un array con el resultado
    res.status(200).json({ data });
  } catch (error) {
    console.error(
      "Error inesperado al obtener el número de actividades:",
      error
    );
    res
      .status(500)
      .json({ error: "Error al obtener el número de actividades" });
  }
};

//AC-004
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

  const id_ambiente = null;

  try {
    const { data, error } = await pool
      .from("actividad")
      .insert([
        {
          date,
          id_evento,
          id_ambiente,
          hora_inicio,
          hora_fin,
          expositor,
          tipo,
          nombre,
          descripcion,
        },
      ])
      .select("*") // Devuelve la actividad creada
      .single();

    if (error) {
      console.error("Error al crear la actividad:", error);
      return res
        .status(500)
        .json({ error: "Error creando actividad", details: error.message });
    }

    res.json({
      activity: data, // Actividad creada
      redirect: `/ActividadesEvento?id=${id_evento}`, // Redirigir con el ID del evento
    });
  } catch (error) {
    console.error("Error inesperado al crear la actividad:", error);
    return res
      .status(500)
      .json({ error: "Error inesperado al crear actividad" });
  }
};

//AC-005
export const updateActivity = async (req, res) => {
  const {
    idActividad, // ID de la actividad a actualizar
    date,
    hora_inicio,
    hora_fin,
    expositor,
    tipo,
    nombre,
    descripcion,
  } = req.body;

  if (!idActividad) {
    return res
      .status(400)
      .json({ error: "El ID de la actividad es obligatorio." });
  }

  try {
    const { data, error } = await pool.rpc("update_actividad_by_id", {
      id_input: idActividad,
      date_input: date,
      hora_inicio_input: hora_inicio,
      hora_fin_input: hora_fin,
      expositor_input: expositor,
      tipo_input: tipo,
      nombre_input: nombre,
      descripcion_input: descripcion,
    });

    if (error) {
      console.error("Error al actualizar la actividad:", error);
      return res
        .status(500)
        .json({ error: "Error al actualizar la actividad." });
    }
    res.json({
      message: "Actividad actualizada exitosamente",
      activity: data[0], // Actividad actualizada
      redirect: `/ActividadesEvento?id=${data[0].id_evento}`, // Redirigir al listado de actividades del evento
    });
  } catch (error) {
    console.error("Error interno:", error);
    return res
      .status(500)
      .json({ error: "Error interno al procesar la solicitud." });
  }
};

//AC-006
export const getActivity = async (req, res) => {
  // Obtén el ID del cuerpo de la solicitud
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "El ID es obligatorio." });
  }

  try {
    // Llama al procedimiento almacenado usando rpc
    const { data, error } = await pool.rpc("get_actividad_by_id", {
      id_input: id,
    });

    if (error) {
      console.error("Error al obtener la actividad:", error);
      return res.status(500).json({ error: "Error al obtener la actividad." });
    }

    // Devuelve los resultados como respuesta
    return res.json(data.length > 0 ? data[0] : {});
  } catch (error) {
    console.error("Error interno:", error);
    return res
      .status(500)
      .json({ error: "Error interno al procesar la solicitud." });
  }
};
