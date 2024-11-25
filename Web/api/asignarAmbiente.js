function asignarMateriales(idAmbiente) {
  window.location.href = `/MaterialesAmbiente?id=${idAmbiente}`;
}

function editarAmbiente(idAmbiente) {
  window.location.href = `/EditarAmbiente?id=${idAmbiente}`;
}

function crearAmbiente() {
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
        <td>${ambiente.locacion}</td>
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
<button class="btn btn-info btn-sm mx-2" onclick="seleccionarAmbiente('${
        ambiente.id
      }')">Seleccionar</button>
          </div>
        </td>
      `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al cargar los ambientes:", error);

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

function seleccionarAmbiente(idAmbiente) {
  // Obtener el id de la actividad desde los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const idActividad = urlParams.get("id");

  if (!idActividad) {
    alert("No se encontró el ID de la actividad en la URL.");
    return;
  }

  // Buscar la fila del ambiente seleccionado para verificar disponibilidad
  const row = document
    .querySelector(`button[onclick="seleccionarAmbiente('${idAmbiente}')"]`)
    .closest("tr");
  const disponibilidad = row.querySelector(
    ".text-success, .text-danger"
  ).innerText;

  if (disponibilidad === "No Disponible") {
    alert("No se puede seleccionar un ambiente que no está disponible.");
    return;
  }

  // Realizar la solicitud POST
  fetch("http://localhost:5000/asignarAmbiente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idActividad,
      idAmbiente,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al asignar el ambiente");
      }
      return response.json();
    })
    .then((data) => {
      alert("Ambiente asignado exitosamente.");
      const previousUrl = document.referrer; // Captura la URL de referencia
      if (previousUrl) {
        window.location.href = previousUrl; // Regresa a la página anterior
      } else {
        console.warn(
          "No hay referencia previa, redirigiendo a la página de inicio."
        );
        window.location.href = "/"; // Opcional, redirige a una página de inicio si no hay referrer
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error al asignar el ambiente.");
    });
}
