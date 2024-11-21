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
  materials.forEach((material) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${material.name}</td>
      <td>${material.description}</td>
      <td>${material.quantity}</td>
      <td>${material.deliverable}</td>
      <td>
        <button class="btn btn-primary btn-sm">Editar</button>
        <button class="btn btn-secondary btn-sm">Asignar materiales</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Cargar datos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const materials = fetchMaterialsFromDatabase(); // Simula una consulta a la base de datos
  renderMaterialsTable(materials);

  // Agregar evento al botón de creación de materiales
  document
    .getElementById("create-material-btn")
    .addEventListener("click", () => {
      alert("Crear nuevo material");
    });
});
