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

      const fechaCell = document.createElement("td");
      const fechaRegistro = new Date(item.fecha); // Asegúrate de que `item.fecha` exista
      fechaCell.textContent = fechaRegistro.toLocaleDateString("es-ES"); // Formatear fecha

      // Agregar columnas a la fila
      row.appendChild(conceptoCell);
      row.appendChild(montoCell);
      row.appendChild(reciboCell);
      row.appendChild(fechaCell); // Agregar la columna de fecha

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

// Obtén el ID de la URL actual
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Redirigir al hacer clic en "Agregar Ingreso"
document.getElementById("btnAgregarIngreso").addEventListener("click", () => {
  if (id) {
    const ineg = 0;
    window.location.href = `/IngresoEgreso?id=${id}&ineg=${ineg}`;
  } else {
    alert("ID no encontrado en la URL");
  }
});

// Redirigir al hacer clic en "Agregar Gasto"
document.getElementById("btnAgregarGasto").addEventListener("click", () => {
  if (id) {
    const ineg = 1;
    window.location.href = `/IngresoEgreso?id=${id}&ineg=${ineg}`;
  } else {
    alert("ID no encontrado en la URL");
  }
});
