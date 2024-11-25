import pool from "../db.js";
//C-001
export const getEventCajaById = async (req, res) => {
  const { id_evento } = req.body; // Recibir el ID del evento

  try {
    const { data, error } = await pool.rpc("get_event_caja_by_id", {
      p_id_evento: id_evento, // Pasar el parámetro al RPC
    });

    if (error) {
      console.error("Error al obtener datos de la caja:", error);
      return res
        .status(500)
        .send(
          "Error en el servidor al obtener los datos de la caja del evento."
        );
    }

    if (data.length > 0) {
      console.log("Datos de la caja:", data);
      return res.json(data); // Retornar los datos al cliente
    } else {
      return res
        .status(404)
        .send("No se encontraron datos de caja para este evento.");
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    return res
      .status(500)
      .send("Error en el servidor al procesar la solicitud.");
  }
};

//C-001
export const registrarIngresoEgreso = async (req, res) => {
  const { concepto, id_evento, monto, tipo, num_recibo } = req.body;
  const idEvento = BigInt(id_evento); // O usar parseInt si BigInt no es compatible
  try {
    const { data, error } = await pool.rpc("registrar_ingreso_egreso", {
      p_concepto: concepto,
      p_id_evento: idEvento.toString(),
      p_monto: monto,
      p_tipo: tipo,
      p_num_recibo: num_recibo,
    });

    console.log("Si entra");
    console.log(data);
    console.log(error);
    if (error) {
      return res.status(500).send("Error al registrar el ingreso/egreso");
    }

    res.json({
      success: true,
      message: "Ingreso/Egreso registrado correctamente.",
    });
  } catch (error) {
    console.error("Error en la función de base de datos:", error);
    res.status(500).send("Error al registrar el ingreso/egreso.");
  }
};
