document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id_evento = urlParams.get("id");

  try {
    // Obtener datos de la caja del evento
    const response = await fetch("http://localhost:5000/getEventCajaById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_evento }), // Enviar el ID del evento
    });

    if (!response.ok)
      throw new Error("Error al obtener datos de la caja del evento");

    const caja = await response.json(); // Convertir respuesta a JSON
    console.log("Caja del evento:", caja);

    // Referencias a los cuerpos de las tablas
    const ingresosBody = document.getElementById("ingresos-body");
    const egresosBody = document.getElementById("egresos-body");

    // Limpiar tablas
    ingresosBody.innerHTML = "";
    egresosBody.innerHTML = "";

    // Recorrer datos y llenar las tablas
    caja.forEach((item) => {
      const row = document.createElement("tr"); // Crear fila

      // Crear columnas
      const conceptoCell = document.createElement("td");
      conceptoCell.textContent = item.concepto;

      const montoCell = document.createElement("td");
      montoCell.textContent = `$${item.monto.toLocaleString()}`;

      const reciboCell = document.createElement("td");
      reciboCell.textContent = item.id; // Usamos `id` como el número de recibo

      // Agregar columnas a la fila
      row.appendChild(conceptoCell);
      row.appendChild(montoCell);
      row.appendChild(reciboCell);

      // Agregar fila a la tabla correspondiente
      if (item.tipo === "ingreso") {
        ingresosBody.appendChild(row);
      } else if (item.tipo === "egreso") {
        egresosBody.appendChild(row);
      }
    });
  } catch (error) {
    console.error("Error:", error.message);
    // Mostrar un mensaje de error en la UI si es necesario
    const container = document.querySelector(".container");
    const errorMsg = document.createElement("div");
    errorMsg.className = "alert alert-danger";
    errorMsg.textContent = "Error al cargar los datos de la caja del evento.";
    container.prepend(errorMsg);
  }
});

// Manejo de botones para agregar ingresos o egresos
document.getElementById("btnAgregarGasto").addEventListener("click", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id_evento = urlParams.get("id");
  const id = id_evento; // Cambia al valor deseado
  const ineg = 1; // 1 para egreso

  window.location.href = `/IngresoEgreso?id=${encodeURIComponent(
    id
  )}&ineg=${encodeURIComponent(ineg)}`;
});

document.getElementById("btnAgregarIngreso").addEventListener("click", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id_evento = urlParams.get("id");
  const id = id_evento; // Cambia al valor deseado
  const ineg = 0; // 0 para ingreso

  window.location.href = `/IngresoEgreso?id=${encodeURIComponent(
    id
  )}&ineg=${encodeURIComponent(ineg)}`;
});
