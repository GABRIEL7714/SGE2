function editarActividad(idActividad) {
  window.location.href = `/EditarActividad?id=${idActividad}`;
}

function asignarAmbiente(idActividad) {
  window.location.href = `/AsignarAmbiente?id=${idActividad}`;
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    id_evento = params.get("id");
    if (localStorage.getItem("refreshPreviousPage") === "true") {
      localStorage.removeItem("refreshPreviousPage"); // Elimina la marca
      location.reload(); // Recarga la página para actualizar la información
    }

    console.log("id evenot");
    console.log(id_evento);
    if (!id_evento) {
      throw new Error("No se proporcionó un ID de evento en la URL");
    }
    // Hacer una solicitud GET al endpoint de la API
    const response = await fetch(
      "http://localhost:5000/getEventActivitiesById",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_evento }),
      }
    );
    if (!response.ok) throw new Error("Error al obtener datos");

    // Convertir la respuesta a JSON
    const actividades = await response.json();
    console.log(actividades);

    // Obtener referencia al cuerpo de la tabla
    const tbody = document.getElementById("actividades-table-body");
    tbody.innerHTML = ""; // Limpiar el contenido existente

    // Iterar sobre las actividades y crear filas dinámicamente
    actividades.forEach((actividad) => {
      const row = document.createElement("tr");

      // Crear las celdas para cada columna de datos
      row.innerHTML = `
                <td>${actividad.nombre}</td>
                <td>${actividad.tipo}</td>
                <td>${actividad.expositor}</td>
                <td>${actividad.date}</td>
                <td>${actividad.hora_inicio}</td>
                <td>${actividad.hora_fin}</td>
                <td class="${
                  actividad.id_ambiente === null ? "text-danger" : ""
                }">
  ${actividad.id_ambiente === null ? "No asignado" : actividad.locacion}
</td>

                <td>
                    <button class="btn btn-primary btn-sm" onclick="editarActividad('${
                      actividad.id
                    }')">Editar</button>
                    <button class="btn btn-success btn-sm" onclick="asignarAmbiente('${
                      actividad.id
                    }')">Asignar ambiente</button>
                </td>
            `;

      // Añadir la fila al cuerpo de la tabla
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error cargando actividades:", error);
  }

  document
    .getElementById("crearActividad")
    .addEventListener("click", function () {
      window.location.href = `/CrearActividad?eventId=${id_evento}`;
    });
});
