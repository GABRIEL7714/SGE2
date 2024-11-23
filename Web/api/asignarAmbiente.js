function asignarMateriales(idAmbiente) {
  window.location.href = `/AsignarMateriales?id=${idAmbiente}`;
}

function editarAmbiente(idAmbiente) {
  window.location.href = `/EditarAmbiente?id=${idAmbiente}`;
}

const ambientes = [
  {
    nombre: "N201",
    ubicacion: "Sede Sucre",
    capacidad: 50,
    disponible: "SI",
  },
  {
    nombre: "Auditorio José",
    ubicacion: "Sede San Lázaro",
    capacidad: 300,
    disponible: "NO",
  },
];

function llenarTabla() {
  const tabla = document
    .getElementById("ambientesTable")
    .getElementsByTagName("tbody")[0];

  tabla.innerHTML = "";

  ambientes.forEach((ambiente) => {
    let row = tabla.insertRow();
    const id = 0;
    row.insertCell(0).innerText = ambiente.nombre;
    row.insertCell(1).innerText = ambiente.ubicacion;
    row.insertCell(2).innerText = ambiente.capacidad;
    row.insertCell(3).innerText = ambiente.disponible;

    let accionesCell = row.insertCell(4);
    accionesCell.classList.add("text-center");
    accionesCell.innerHTML = `
        <div class="d-flex justify-content-center">
          <button class="btn btn-primary btn-sm mx-2" onclick="editarAmbiente(${id})">Editar</button>
          <button class="btn btn-secondary btn-sm mx-2">Asignar materiales</button>
          <button class="btn btn-info btn-sm mx-2">Seleccionar</button>
        </div>
      `;
  });
}

// Llamar a la función para llenar la tabla al cargar la página
document.addEventListener("DOMContentLoaded", llenarTabla);
