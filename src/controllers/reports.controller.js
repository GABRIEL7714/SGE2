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
