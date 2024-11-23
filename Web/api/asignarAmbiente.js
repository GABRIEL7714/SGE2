function asignarMateriales(idAmbiente) {
  window.location.href = `/MaterialesAmbiente?id=${idAmbiente}`;
}

function editarAmbiente(idAmbiente) {
  window.location.href = `/EditarAmbiente?id=${idAmbiente}`;
}

async function crearAmbiente() {
  // Redirige a la página para crear un ambiente
  window.location.href = "/CrearAmbiente";
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Obtener los ambientes desde el servidor
    console.log("entroasignar");
    const response = await fetch("http://localhost:5000/getAllAmbientes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Error al obtener los datos de ambientes.");
    }

    const ambientes = await response.json();
    console.log(ambientes);

    // Obtener referencia al cuerpo de la tabla
    const tbody = document.getElementById("ambientes-table-body");
    tbody.innerHTML = ""; // Limpiar el contenido existente

    // Iterar sobre los ambientes y crear filas dinámicamente
    ambientes.forEach((ambiente) => {
      const row = document.createElement("tr");

      // Crear las celdas para cada columna de datos
      row.innerHTML = `
        <td>${ambiente.nombre}</td>
        <td>${ambiente.ubicacion}</td>
        <td>${ambiente.capacidad}</td>
        <td class="${ambiente.disponible ? "text-success" : "text-danger"}">
          ${ambiente.disponible ? "Disponible" : "No Disponible"}
        </td>
        <td>
          <div class="d-flex justify-content-center">
            <button class="btn btn-primary btn-sm mx-2" onclick="editarAmbiente('${
              ambiente.id
            }')">Editar</button>
            <button class="btn btn-secondary btn-sm mx-2" onclick="asignarMateriales('${
              ambiente.id
            }')">Asignar materiales</button>
            <button class="btn btn-info btn-sm mx-2">Seleccionar</button>
          </div>
        </td>
      `;

      // Añadir la fila al cuerpo de la tabla
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al cargar los ambientes:", error);

    // Mostrar un mensaje de error en la interfaz
    const errorDiv = document.getElementById("error-message");
    errorDiv.innerText =
      "Hubo un problema al cargar los ambientes. Inténtalo más tarde.";
    errorDiv.style.display = "block";
  }

  // Agregar el evento al botón de "Crear Ambiente"
  document
    .getElementById("crearAmbienteBtn")
    .addEventListener("click", crearAmbiente);
});
