document.addEventListener("DOMContentLoaded", async function () {
  try {
    const responseEvents = await fetch("/getAllEvents");
    const eventos = await responseEvents.json();

    const tableBody = document.getElementById("event-table-body");
    tableBody.innerHTML = ""; // Limpiar el contenido existente

    // Usamos un bucle para procesar cada evento
    for (const evento of eventos) {
      const idEvento = evento.id; // Asegúrate de que el ID del evento esté disponible

      // Crear una nueva fila para la tabla
      const row = document.createElement("tr");

      row.innerHTML = `
                  <td>${evento.nombre}</td>
                  <td>${evento.tipo}</td>
                  <td>${evento.fechainicio}</td>
                  <td>${evento.fechafin}</td>
                  <td style="background-color: ${
                    evento.num_actividades === 0 ? "#f8d7da" : "#d4edda"
                  }">
                      ${evento.num_actividades} actividades
                  </td>
                  </td>
                  <td><button class="btn-primary btn-sm" onclick="adaptarEvento('${idEvento}')">Adaptar</button></td>
              `;

      tableBody.appendChild(row);
    }
  } catch (error) {
    console.error("Error al manejar los eventos:", error);
  }
});

// Función para redirigir al usuario a la página de adaptación con el id del evento en la URL
function adaptarEvento(idEvento) {
  window.location.href = `/CrearEvento?id=${idEvento}`;
}
