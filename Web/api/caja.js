document.addEventListener("DOMContentLoaded", async function () {
  try {
    const responseEvents = await fetch("/getAllEvents");
    const eventos = await responseEvents.json();

    const tableBody = document.getElementById("event-table-body");
    tableBody.innerHTML = ""; // Limpiar el contenido existente

    console.log(eventos);

    // Usamos un bucle para procesar cada evento
    for (const evento of eventos) {
      const idEvento = evento.id; // Asegúrate de que el ID del evento esté disponible

      // Hacemos la solicitud para obtener el número de actividades
      console.log("SI ENTRA ANTES DEL FETCH");
      const responseActivities = await fetch(
        "http://localhost:5000/getNumberEventActivities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idEvento }),
        }
      );

      let numberOfActivities = 0; // Inicializamos en 0
      if (!responseActivities.ok) {
        // Manejo de error
        console.error(
          "Error al obtener el número de actividades para el evento:",
          idEvento
        );
      } else {
        const data = await responseActivities.json(); // Extraemos el número de actividades
        numberOfActivities = data.numberOfActivities; // Asignamos el número de actividades
      }

      // Crear una nueva fila para la tabla
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${evento.nombre}</td>
          <td>${evento.tipo}</td>
          <td>${evento.fechainicio}</td>
          <td>${evento.fechafin}</td>
          <td style="background-color: ${
            numberOfActivities === 0 ? "#f8d7da" : "#d4edda"
          }">
            <a href="#" class="btn btn-sm ${
              numberOfActivities === 0 ? "btn-danger" : "btn-success"
            }">${numberOfActivities} actividades</a>
          </td>
          <td><button class="btn btn-primary btn-sm" onclick="editarEvento('${idEvento}')">Gestionar Caja</button></td>
        `;

      tableBody.appendChild(row);
    }
  } catch (error) {
    console.error("Error al manejar los eventos:", error);
  }
});

function editarEvento(idEvento) {
  window.location.href = `/CajaEvento?id=${idEvento}`;
}
