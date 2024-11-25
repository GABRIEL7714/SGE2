// Función para renderizar los datos en la tabla
function renderMaterialsTable(materials) {
  const tableBody = document.getElementById("materials-table-body");

  // Limpiar contenido previo de la tabla
  tableBody.innerHTML = "";

  // Insertar cada material como una fila de la tabla
  for (const material of materials) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${material.nombre}</td>
      <td>${material.descripcion}</td>
      <td>${material.stock}</td>
      <td>${material.to_give ? "Sí" : "No"}</td>
      <td>
        <button onclick="EditarMaterial('${
          material.id
        }')" class="btn btn-primary btn-sm">Editar</button>
      </td>
    `;

    tableBody.appendChild(row);
  }
}

// Cargar datos al cargar la página
document.addEventListener("DOMContentLoaded", async function () {
  if (window.location.search.includes("refresh=true")) {
    location.reload();
  }
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const idAmbiente = urlParams.get("id");
    const response = await fetch(
      "http://localhost:5000/getMaterialsByEnvironmentId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          idAmbiente,
        }),
      }
    );

    const materials = await response.json();
    console.log(materials);
    renderMaterialsTable(materials);
  } catch (error) {
    console.error("Error al manejar los eventos:", error);
  }

  document.getElementById("cancelarBtn").addEventListener("click", () => {
    const previousUrl = document.referrer; // Captura la URL de referencia
    if (previousUrl) {
      window.location.href = previousUrl; // Regresa a la página anterior
    } else {
      console.warn(
        "No hay referencia previa, redirigiendo a la página de inicio."
      );
      window.location.href = "/"; // Opcional, redirige a una página de inicio si no hay referrer
    }
  });
});

document.getElementById("create-material-btn").addEventListener("click", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idAmbiente = urlParams.get("id");
  window.location.href = `/CrearMaterial?id=${idAmbiente}`;
});

function EditarMaterial(idMaterial) {
  window.location.href = `/EditarMaterial?id=${idMaterial}`;
}
