document.addEventListener("DOMContentLoaded", async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const id_evento = params.get("id"); // Por ejemplo, id_evento=1

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
                <td>${actividad.fecha}</td>
                <td>${actividad.inicio}</td>
                <td>${actividad.fin}</td>
                <td class="${
                  actividad.ambiente === "NO" ? "text-danger" : ""
                }">${actividad.ambiente}</td>
                <td>
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-success btn-sm">Asignar ambiente</button>
                </td>
            `;

      // Añadir la fila al cuerpo de la tabla
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error cargando actividades:", error);
  }
});
