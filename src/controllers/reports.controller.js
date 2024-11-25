import { createClient } from "@supabase/supabase-js";
import supabase from "../db.js"; // Asegúrate de exportar supabase correctamente desde tu archivo db.js

export const displayReports = async (req, res) => {
  const { tipo, fecha } = req.body;

  if (!tipo || !fecha) {
    return res.status(400).send("Faltan datos de tipo o fecha.");
  }

  try {
    // Realiza la consulta con Supabase
    const { data, error } = await supabase
      .from("evento")
      .select("*")
      .eq("tipo", tipo)
      .eq("fechainicio", fecha);

    if (error) {
      throw error;
    }

    // Enviar los resultados como JSON
    res.json(data);
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    res.status(500).send("Error en el servidor.");
  }
};

export const obtenerUsuariosPorEvento = async (req, res) => {
  console.log("Cuerpo recibido:", req.body);

  const { idEvento } = req.body; // Obtenemos el id_evento desde los parámetros de la URL
  if (!idEvento) {
    return res.status(400).json({ error: "Falta el id del evento." });
  }

  try {
    // Obtener todas las inscripciones con 'id_usuario' e 'id_combo'
    const { data: inscripciones, error: errorInscripciones } = await supabase
      .from("inscripcion")
      .select("*");
    console.log(inscripciones);
    console.log("estoy aqui");

    if (errorInscripciones) {
      return res
        .status(500)
        .json({ error: "Error al consultar inscripciones." });
    }
    console.log("estoy aqui2");

    if (!inscripciones || inscripciones.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron inscripciones." });
    }
    console.log("estoy aqui3");
    // Consultar todos los combos relacionados y filtrar por 'id_evento'
    let usuarios = [];
    for (const inscripcion of inscripciones) {
      const { data: combo, error: errorCombo } = await supabase
        .from("combo")
        .select("id_evento")
        .eq("id", inscripcion.id_combo);

      if (errorCombo) {
        console.error("Error al consultar combo:", errorCombo);
        continue;
      }

      if (
        combo &&
        combo.length > 0 &&
        combo[0].id_evento === parseInt(idEvento)
      ) {
        usuarios.push(inscripcion.id_usuario);
      }
    }
    console.log(usuarios);
    // Devolver la lista de usuarios en formato JSON
    return res.json({ usuarios });
  } catch (error) {
    console.error("Error inesperado:", error);
    return res
      .status(500)
      .json({ error: "Hubo un error al obtener los usuarios." });
  }
};
