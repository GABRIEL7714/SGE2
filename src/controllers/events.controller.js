import pool from "../db.js";

//Ev-001
export const getAllEvents = async (req, res) => {
  try {
    const { data, error } = await pool.rpc("obtener_eventos_con_actividades");
    if (error) throw error;

    console.log(data);
    return res.json(data || []);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return res.status(500).json({ message: "Error al obtener eventos" });
  }
};

//Ev-002
export const getEvent = async (req, res) => {
  // Obtén el ID del cuerpo de la solicitud
  const { id } = req.body;

  try {
    const { data, error } = await pool.rpc("get_event_by_id", { p_id: id });
    console.log(data);
    if (error) {
      console.error("Error al obtener el evento:", error);
      return res.status(500).json({ error: "Error al obtener el evento." });
    }

    // Devuelve el evento como respuesta, o un objeto vacío si no existe
    return res.json(data || {});
  } catch (error) {
    console.error("Error al obtener el evento:", error);
    return res.status(500).json({ error: "Error al obtener el evento." });
  }
};

//Ev-003
export const createEvent = async (req, res) => {
  let {
    nombre,
    tipoEvento,
    descripcion,
    publica,
    fechainicio,
    fechafin,
    fechainscripcion,
  } = req.body;

  try {
    // Llamada a la función en PostgreSQL
    const { data, error } = await pool.rpc("create_event", {
      p_nombre: nombre,
      p_tipo_evento: tipoEvento,
      p_descripcion: descripcion,
      p_publica: publica,
      p_fechainicio: fechainicio,
      p_fechafin: fechafin,
      p_fechainscripcion: fechainscripcion,
    });

    if (error) {
      console.error("Error al crear evento:", error);
      return res.status(500).json({ error: "Error creando el evento" });
    }

    // Responde con la redirección o los datos del evento creado
    res.json({
      event: data, // Enviar los datos del evento creado
      redirect: "/GestionarEventos",
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

//Ev-004
export const updateEvent = async (req, res) => {
  let {
    idEvento,
    nombre,
    tipoEvento,
    descripcion,
    publica,
    fechainicio,
    fechafin,
    fechainscripcion,
  } = req.body;

  try {
    console.log("Si entra a la funcion");

    // Llamada a la función RPC en PostgreSQL con parámetros como un objeto JSON
    const result = await pool.rpc("update_event", {
      data: {
        p_id_evento: idEvento,
        p_descripcion: descripcion,
        p_fechafin: fechafin,
        p_fechainicio: fechainicio,
        p_fechainscripcion: fechainscripcion,
        p_nombre: nombre,
        p_publica: publica,
        p_tipo: tipoEvento,
      },
    });

    console.log(result);

    if (result.statusText == "OK") {
      return res.json({
        message: "Evento actualizado exitosamente",
        event: result[0], // Devuelve el evento actualizado
        redirect: "/GestionarEventos",
      });
    } else {
      return res.status(404).json({ error: "Evento no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el evento:", error);
    return res.status(500).json({ error: "Error al actualizar el evento" });
  }
};
