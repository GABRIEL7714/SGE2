document.addEventListener("DOMContentLoaded", async function () {
  try {
    const responseEvents = await fetch("/getAllEvents");
    const eventos = await responseEvents.json();

    const tableBody = document.getElementById("event-table-body");
    tableBody.innerHTML = "";

    for (const evento of eventos) {
      const row = document.createElement("tr");

      row.innerHTML = `
            <td>${evento.nombre}</td>
            <td>${evento.tipo}</td>
            <td>${evento.fechainicio}</td>
            <td>${evento.fechafin}</td>
            <td style="background-color: ${
              evento.num_actividades === 0 ? "#f8d7da" : "#d4edda"
            }">
              <a href="#" class="btn btn-sm ${
                evento.num_actividades === 0 ? "btn-danger" : "btn-success"
              }">${evento.num_actividades} actividades</a>
            </td>
            <td><button class="btn btn-primary btn-sm" onclick="asistenciaEvento('${
              evento.id
            }')">Tomar Asistencia</button></td>
          `;

      tableBody.appendChild(row);
    }
  } catch (error) {
    console.error("Error al manejar los eventos:", error);
  }
});

function asistenciaEvento(idEvento) {
  window.location.href = `/AsistenciaEvento?id=${idEvento}`;
}
