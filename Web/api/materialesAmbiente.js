function fetchMaterialsFromDatabase() {
  return [
    {
      name: "Almuerzo",
      description: "Pollo",
      quantity: "-",
      deliverable: "Sí",
    },
    {
      name: "Lapiceros",
      description: "Artesco azul",
      quantity: "-",
      deliverable: "Sí",
    },
    { name: "Micrófono", description: "-", quantity: 3, deliverable: "No" },
    { name: "Laptops", description: "-", quantity: 30, deliverable: "Sí" },
  ];
}

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
  try {
    const idAmbiente = 41;
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
    console.log("recivido:");
    console.log(materials);
    renderMaterialsTable(materials);
  } catch (error) {
    console.error("Error al manejar los eventos:", error);
  }
});

//funcionalidad boton crear material
document.getElementById("create-material-btn").addEventListener("click", () => {
  alert("Crear nuevo material");
});

function EditarMaterial(idMaterial) {
  window.location.href = `/EditarMaterial?id=${idMaterial}`;
}
