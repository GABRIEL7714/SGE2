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
                      ${numberOfActivities} actividades
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
